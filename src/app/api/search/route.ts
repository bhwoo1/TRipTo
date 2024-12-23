import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword");
  const page = parseInt(searchParams.get("page") || "0");
  const take = 6;

  try {
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

    console.log(keyword);
    console.log(page);

    const totalAttractionCount = await prisma.touristSpot.count({
      where: {
        OR: [
          { name: { contains: keyword } },
          { area: { contains: keyword } },
          { subarea: { contains: keyword } },
          {
            tags: {
              array_contains: keyword,
            },
          },
        ],
      },
    });

    // 전체 관광지
    const totalAttraction = await prisma.touristSpot.findMany({
      where: {
        OR: [
          { name: { contains: keyword } },
          { area: { contains: keyword } },
          { subarea: { contains: keyword } },
          {
            tags: {
              array_contains: keyword,
            },
          },
        ],
      },
      skip: page * take,
      take,
    });

    const hasNextPage =
      totalAttraction.length === 6 &&
      totalAttraction.length < totalAttractionCount;

    return NextResponse.json(
      {
        attractions: totalAttraction,
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
