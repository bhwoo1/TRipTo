import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const area = searchParams.get("area");

    try {
        if (!area) {
            return NextResponse.json({ error: "Area is required" }, { status: 400 });
        }

        const shortedArea = area.split(' ').slice(0,1)[0];

        const searchedAttraction = await prisma.touristSpot.findMany({
            where: {
                area: shortedArea
            }
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