import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const tag = searchParams.get("tag");

    try {
        if (!tag) {
            return NextResponse.json({ error: "Tag is required" }, { status: 400 });
        }

        // 전체 관광지의 수를 먼저 구함
        const totalCount = await prisma.touristSpot.count({
            where: {
                tags: {
                    array_contains: [tag]
                }
            }
        });

        // 랜덤 시작 위치 x를 계산
        const randomOffset = Math.floor(Math.random() * (totalCount - 10));

        const searchedAttraction = await prisma.touristSpot.findMany({
            where: {
                tags: {
                    array_contains: [tag]
                }
            },
            skip: randomOffset,
            take: 5
        });

        if (!searchedAttraction) {
            return NextResponse.json({ error: "Attractions not found" }, { status: 404 }); 
        }

        return NextResponse.json(searchedAttraction, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({error: "Failed to search attractions"}, { status: 500 });
    }
}