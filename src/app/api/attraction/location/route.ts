// import { prisma } from "@/prisma";
// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const area = searchParams.get("area");
//   const id = searchParams.get("id");

//   try {
    
//     if (!area && !id) {
//       return NextResponse.json(
//         { error: "Area or ID are required" },
//         { status: 400 }
//       );
//     } else if (!id || area) {
//       const shortedArea = area?.split(" ").slice(0, 1)[0];


//       const searchedAttraction = await prisma.touristSpot.findMany({
//         where: {
//           area: shortedArea,
//         },
//       });

//       if (!searchedAttraction) {
//         return NextResponse.json(
//           { error: "Attractions not found" },
//           { status: 404 }
//         );
//       }

//       return NextResponse.json(searchedAttraction, { status: 200 });
//     } else if (id || !area) {
//       const searchedAttraction = await prisma.touristSpot.findUnique({
//         where: {
//           id: Number(id),
//         },
//       });

//       if (!searchedAttraction) {
//         return NextResponse.json(
//           { error: "Attractions not found" },
//           { status: 404 }
//         );
//       }

//       return NextResponse.json(searchedAttraction, { status: 200 });
//     } else {
//       return NextResponse.json(
//         { error: "Area and ID connot exist at the same time" },
//         { status: 400 }
//       );
//     }
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Failed to search attractions" },
//       { status: 500 }
//     );
//   }
// }




import { attraction } from "@/Type";
import mysql from "mysql2/promise";
import { NextResponse } from "next/server";


// MySQL 데이터베이스 연결 설정
const connection = await mysql.createConnection({
  host: 'my8003.gabiadb.com',
  user: 'bhwoo1',
  password: 'vlald@1592',
  database: 'tripto',
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const area = searchParams.get("area");
  const id = searchParams.get("id");

  try {
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

      // `rows`는 QueryResult의 배열로 반환되므로, `rows`에서 실제 데이터만 가져옵니다.
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
  } finally {
    // 데이터베이스 연결 종료
    await connection.end();
  }
}