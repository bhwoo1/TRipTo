"use client";

import TagCard from "@/app/explore/TagCard";
import { bgImages } from "@/Type";
import React from "react";
import { useRouter } from "next/navigation";

function FixedTagList({tags}: {tags: string[]}) {
  const router = useRouter();
  const cardClick = (tag: string) => {
    router.push(`/explore/${encodeURIComponent(tag)}`);
  };

  const filteredBgImages = bgImages.filter(image => 
    tags?.includes(image.tag) ?? false
  );
  
  return (
    <div className="flex gap-2 lg:w-[1500px]">
      <div className="flex flex-col">
        <article>
          <div className="font-bold text-[28px]">테마별로 찾기</div>
        </article>
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-12 lg:gap-20 mt-4">
          
          {filteredBgImages.map((img) => (
            <div
              key={img.tag}
              className="w-[150px] lg:w-[220px]  md:w-[300px]"
              onClick={() => cardClick(img.tag)}
            >
              <TagCard img={img.img} tag={img.tag} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FixedTagList;
