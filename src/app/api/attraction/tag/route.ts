import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tag = searchParams.get("tag");
  const isTagPage = searchParams.get("isTagPage");
  const page = parseInt(searchParams.get("page") || "0");
  const take = 6;

  try {
    if (!tag) {
      return NextResponse.json({ error: "Tag is required" }, { status: 400 });
    }

    if (!isTagPage) {
      // 전체 관광지의 수를 먼저 구함
      const totalCount = await prisma.touristSpot.count({
        where: {
          tags: {
            array_contains: [tag],
          },
        },
      });

      // 랜덤 시작 위치 x를 계산
      const randomOffset = Math.floor(Math.random() * Math.max(1, totalCount - 10));

      const searchedAttraction = await prisma.touristSpot.findMany({
        where: {
          tags: {
            array_contains: [tag],
          },
        },
        skip: randomOffset,
        take: 5,
      });

      if (searchedAttraction.length === 0) {
        return NextResponse.json({ error: "Attractions not found" }, { status: 404 });
      }

      return NextResponse.json(searchedAttraction, { status: 200 });
    } else {
      const pageNumber = Number(page);
      if (isNaN(pageNumber)) {
        return NextResponse.json({ error: "Invalid page number" }, { status: 400 });
      }

      const totalAttractionCount = await prisma.touristSpot.count({
        where: {
          tags: {
            array_contains: [tag],
          },
        },
      });

      // 전체 관광지
      const totalAttraction = await prisma.touristSpot.findMany({
        where: {
          tags: {
            array_contains: [tag],
          },
        },
        skip: page * take,
        take,
      });

      if (totalAttraction.length === 0) {
        return NextResponse.json({ error: "Attractions not found" }, { status: 404 });
      }

      const hasNextPage = totalAttraction.length === 6 && totalAttraction.length < totalAttractionCount;

      return NextResponse.json(
        {
          attractions: totalAttraction,
          hasNextPage: hasNextPage, // 다음 페이지 존재 여부
          page: page
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to search attractions" }, { status: 500 });
  }
}