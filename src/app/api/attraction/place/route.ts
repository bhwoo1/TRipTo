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
    const id = searchParams.get("id");

    try {
        const connection = await pool.getConnection();
        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        const [rows] = await connection.execute(
            'SELECT * FROM TouristSpot WHERE id = ?',
            [Number(id)]
        );

        const searchedAttraction = rows as Array<attraction>;


        if (!searchedAttraction) {
            return NextResponse.json({ error: "Attractions not found" }, { status: 404 }); 
        }

        return NextResponse.json(searchedAttraction, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({error: "Failed to search attractions"}, { status: 500 });
    } 
}