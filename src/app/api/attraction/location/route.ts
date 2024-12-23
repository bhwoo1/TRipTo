import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

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


      const searchedAttraction = await prisma.touristSpot.findMany({
        where: {
          area: shortedArea,
        },
      });

      if (!searchedAttraction) {
        return NextResponse.json(
          { error: "Attractions not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(searchedAttraction, { status: 200 });
    } else if (id || !area) {
        console.log(id)
      const searchedAttraction = await prisma.touristSpot.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!searchedAttraction) {
        return NextResponse.json(
          { error: "Attractions not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(searchedAttraction, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Area and ID connot exist at the same time" },
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
