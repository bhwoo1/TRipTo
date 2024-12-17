"use client"

import Image from "next/image";
import React from "react";

function TagCard({ img, tag }: { img: string; tag: string }) {
  return (
    <div className="cursor-pointer group">
      <article>
        <div className="relative h-[240px] overflow-hidden">
          <Image
            src={img}
            alt="attraction_img"
            fill
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            className="group-hover:scale-110 group-hover:blur-sm transition-transform duration-300 ease-in-out"
          />
        </div>
        <div className="font-bold text-[18px] mt-2">{tag}</div>
      </article>
    </div>
  );
}

export default TagCard;
