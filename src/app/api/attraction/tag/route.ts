import { attraction } from "@/Type";
import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

const pool = mysql.createPool({
  host: 'my8003.gabiadb.com',
  port: 3306,
  user: 'bhwoo1',
  password: 'vlald@1592',
  database: 'tripto',
  waitForConnections: true,
  connectionLimit: 10,
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tag = searchParams.get("tag");
  const isTagPage = searchParams.get("isTagPage");
  const page = parseInt(searchParams.get("page") || "0");
  const take = 6;

  try {
    const connection = await pool.getConnection();
    if (!tag) {
      return NextResponse.json({ error: "Tag is required" }, { status: 400 });
    }

    if (!isTagPage) {
      // 전체 관광지의 수를 먼저 구함
      const [row] = await connection.execute(
        `SELECT * FROM TouristSpot
         WHERE JSON_CONTAINS(tags, ?)`,
        [JSON.stringify([tag])]
      );

      const totalAttraction = row as Array<attraction>;
      const totalCount = totalAttraction.length;

      // 랜덤 시작 위치 x를 계산
      const randomOffset = Math.floor(
        Math.random() * Math.max(1, totalCount - 10)
      );

      const [rows] = await connection.execute(
        `SELECT * FROM TouristSpot
         WHERE JSON_CONTAINS(tags, ?) 
         LIMIT ?, 5`,
        [JSON.stringify([tag]), randomOffset]
      );

      const searchedAttraction = rows as Array<attraction>;

      // const searchedAttraction = await prisma.touristSpot.findMany({
      //   where: {
      //     tags: {
      //       array_contains: [tag],
      //     },
      //   },
      //   skip: randomOffset,
      //   take: 5,
      // });

      if (searchedAttraction.length === 0) {
        return NextResponse.json(
          { error: "Attractions not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(searchedAttraction, { status: 200 });
    } else {
      const pageNumber = Number(page);
      if (isNaN(pageNumber)) {
        return NextResponse.json(
          { error: "Invalid page number" },
          { status: 400 }
        );
      }

      const [row] = await connection.execute(
        `SELECT COUNT(*) AS totalCount FROM TouristSpot WHERE JSON_CONTAINS(tags, '["${tag}"]')`
      );

      const totalAttraction = row as Array<attraction>;
      const totalAttractionCount = totalAttraction.length;

      // 전체 관광지
      const [rows] = await connection.execute(
        `SELECT * FROM TouristSpot
         WHERE JSON_CONTAINS(tags, ?)
         LIMIT ?, ?`,
        [JSON.stringify([tag]), page * take, take]
      );

      const returnAttraction = rows as Array<attraction>;

      if (returnAttraction.length === 0) {
        return NextResponse.json(
          { error: "Attractions not found" },
          { status: 404 }
        );
      }

      const hasNextPage =
        returnAttraction.length === 6 &&
        returnAttraction.length < totalAttractionCount;

      return NextResponse.json(
        {
          attractions: returnAttraction,
          hasNextPage: hasNextPage, // 다음 페이지 존재 여부
          page: page,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to search attractions" },
      { status: 500 }
    );
  }
}
