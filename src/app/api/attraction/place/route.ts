import { attraction } from "@/Type";
import mysql from "mysql2/promise";
import { NextResponse } from "next/server";


const host = process.env.NEXT_PUBLIC_DB_HOST
const user = process.env.NEXT_PUBLIC_DB_USER
const password = process.env.NEXT_PUBLIC_DB_PASSWORD
const db = process.env.NEXT_PUBLIC_DB_DBNAME
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