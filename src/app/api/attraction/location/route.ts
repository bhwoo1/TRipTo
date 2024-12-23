import { attraction } from "@/Type";
import mysql from "mysql2/promise";
import { NextResponse } from "next/server";


// MySQL 데이터베이스 연결 설정
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
  const area = searchParams.get("area");
  const id = searchParams.get("id");

  try {
    const connection = await pool.getConnection();

    if (!area && !id) {
      return NextResponse.json(
        { error: "Area or ID are required" },
        { status: 400 }
      );
    } else if (!id || area) {
      const shortedArea = area?.split(" ").slice(0, 1)[0];

      // MySQL 쿼리 실행 (area로 검색)
      const [rows] = await connection.execute(
        'SELECT * FROM TouristSpot WHERE area = ?',
        [shortedArea]
      );

      
      const touristSpots = rows as Array<attraction>;

      if (touristSpots.length === 0) {
        return NextResponse.json(
          { error: "Attractions not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(touristSpots, { status: 200 });
    } else if (id || !area) {
      // MySQL 쿼리 실행 (id로 검색)
      const [rows] = await connection.execute(
        "SELECT * FROM TouristSpot WHERE id = ?",
        [Number(id)]
      );

      const touristSpot = rows as Array<attraction>;

      if (!touristSpot) {
        return NextResponse.json(
          { error: "Attractions not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(touristSpot, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Area and ID cannot exist at the same time" },
        { status: 400 }
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