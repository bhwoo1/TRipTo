"use client";

import { bgImages } from "@/Type";
import { randomTagStore } from "@/zustand/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

function BgImg() {
  const { setTag, setImg, setDes } = randomTagStore();

  const [randomIdx, setRandomIdx] = useState<number | null>(null);

  // tag와 일치하는 bgImages 필터링

  useEffect(() => {
    const idx = Math.floor(Math.random() * bgImages.length);
    setTag(bgImages[idx].tag);
    setImg(bgImages[idx].img);
    setDes(bgImages[idx].description);
    setRandomIdx(idx);
  }, []);

  if (randomIdx === null) {
    return (
      <div className="flex justify-center items-center">
        <BarLoader color={"#2ddb10"} cssOverride={{ width: "100%" }} />
      </div>
    ); // 로딩 중 화면
  }

  return (
    <section>
      <div className="relative aspect-[16/10]">
          <Image
            src={bgImages[randomIdx || 0].img}
            fill
            className="object-cover"
            alt="background-images"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            quality={35}
          />
      </div>
      <div className="absolute top-0 bg-white opacity-40 w-full h-full"></div>
      <div className="absolute top-0 bg-gradient-to-t from-white opacity-100 w-full h-full"></div>
    </section>
  );
}

export default BgImg;
