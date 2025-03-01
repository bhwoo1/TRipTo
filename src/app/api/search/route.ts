import { attraction } from "@/Type";
import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

const host = process.env.DB_HOST
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const db = process.env.DB_DBNAME
const port = 3306


// MySQL 데이터베이스 연결 설정
const pool = mysql.createPool({
  host: host,
  port: port,
  user: user,
  password: password,
  database: db,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword");
  const page = parseInt(searchParams.get("page") || "0");
  const take = 6;

  try {
    const connection = await pool.getConnection();
    if (!keyword) {
      return NextResponse.json(
        { error: "Keyword is required" },
        { status: 400 }
      );
    }

    const pageNumber = Number(page);
    if (isNaN(pageNumber)) {
      return NextResponse.json(
        { error: "Invalid page number" },
        { status: 400 }
      );
    }

    const [row] = await connection.execute(
      `SELECT *
       FROM TouristSpot
       WHERE name LIKE CONCAT('%', ?, '%')
          OR area LIKE CONCAT('%', ?, '%')
          OR subarea LIKE CONCAT('%', ?, '%')
          OR JSON_CONTAINS(tags, ?)`,
      [keyword, keyword, keyword, JSON.stringify([keyword])]
    );

    const totalAttraction = row as Array<attraction>;
      const totalCount = totalAttraction.length;



    // 전체 관광지
    const [rows] = await connection.execute(
      `SELECT *
       FROM TouristSpot
       WHERE name LIKE CONCAT('%', ?, '%')
          OR area LIKE CONCAT('%', ?, '%')
          OR subarea LIKE CONCAT('%', ?, '%')
          OR JSON_CONTAINS(tags, ?)
       LIMIT ?, ?`,
      [keyword, keyword, keyword, JSON.stringify([keyword]), page * take, take]
    );

    const returnAttraction = rows as Array<attraction>;

    const hasNextPage =
    returnAttraction.length === 6 &&
    returnAttraction.length < totalCount;

    return NextResponse.json(
      {
        attractions: returnAttraction,
        hasNextPage: hasNextPage, // 다음 페이지 존재 여부
        page: page,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to search attractions" },
      { status: 500 }
    );
  }
}
