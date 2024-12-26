"use client";

import TagCard from "@/app/explore/TagCard";
import { bgImages } from "@/Type";
import React from "react";
import TagCardCarousel from "./TagCardCarousel";
import { useRouter } from "next/navigation";

function TagList() {
  const router = useRouter();
  const cardClick = (tag: string) => {
    router.push(`/explore/${encodeURIComponent(tag)}`);
  };

  
  return (
    <div className="flex gap-2 lg:w-[1500px]">
      <div className="lg:flex hidden flex-col">
        <article>
          <div className="font-bold text-[28px]">테마별로 찾기</div>
        </article>
        <div className="grid lg:grid-cols-5 gap-20 mt-4">
          
          {bgImages.map((img) => (
            <div
              key={img.tag}
              className="lg:w-[220px] md:w-[300px]"
              onClick={() => cardClick(img.tag)}
            >
              <TagCard img={img.img} tag={img.tag} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex lg:hidden">
        <TagCardCarousel />
      </div>
    </div>
  );
}

export default TagList;
