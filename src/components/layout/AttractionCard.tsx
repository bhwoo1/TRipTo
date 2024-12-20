"use client"

import { attraction } from "@/Type";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

function AttractionCard({ attraction }: { attraction: attraction }) {
  const pathname = usePathname();
  return (
    <div className="cursor-pointer group">
      <article>
        <div className={`relative overflow-hidden ${pathname.startsWith('/explore/tag') ? "lg:h-[360px] h-[240px]" : "h-[240px]"}`}>
          <Image
            src={attraction.image}
            alt="attraction_img"
            fill
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            className="group-hover:scale-110 group-hover:blur-sm transition-transform duration-300 ease-in-out"
          />
        </div>
        <div className="font-bold text-[18px] mt-2">{attraction.name}</div>
        <div className="text-[12px]">
          {attraction.area} {attraction.subarea}
        </div>
        <div className="flex flex-row gap-2 text-[10px]">
          {attraction.tags.map((tag) => (
            <p key={tag}>{tag}</p>
          ))}
        </div>
      </article>
    </div>
  );
}

export default AttractionCard;
