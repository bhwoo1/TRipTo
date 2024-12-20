"use client"

import { bgImages } from "@/Type";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";
import { BarLoader } from "react-spinners";

function BgImgByPathname() {
    const searchParams = useSearchParams();
    const tag = searchParams.get("tag");

  
  
    // tag와 일치하는 bgImages 필터링
    const matchingImage = bgImages.find((image) => image.tag === tag);


  
    if (tag === "") {
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
              src={matchingImage?.img || ""}
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

export default BgImgByPathname