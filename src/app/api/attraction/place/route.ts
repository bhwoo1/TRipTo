import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    try {
        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }


        const searchedAttraction = await prisma.touristSpot.findUnique({
            where: {
                id: Number(id)
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