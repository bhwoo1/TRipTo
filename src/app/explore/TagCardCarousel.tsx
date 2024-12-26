"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { bgImages } from "@/Type";
import TagCard from "@/app/explore/TagCard";
import { useRouter } from "next/navigation";

function TagCardCarousel() {
  const router = useRouter();
  const cardClick = (tag: string) => {
    router.push(`/explore/${encodeURIComponent(tag)}`);
  };
  return (
    <div className="lg:w-screen">
      <Carousel className="">
        <div className="flex flex-row justify-between items-center my-2">
          <article>
            <div className="font-bold text-[28px]">테마별로 찾기</div>
          </article>
          <div className="relative left-[-60px]">
            <div className="absolute">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </div>
        </div>
        <CarouselContent>
          {bgImages?.map((img) => (
            <CarouselItem key={img.tag} className="basis-1/2 md:basis-1/3">
              <div
                className="sm:w-1/2 lg:w-[280px] md:w-[300px]"
                onClick={() => cardClick(img.tag)}
              >
                <TagCard img={img.img} tag={img.tag} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default TagCardCarousel;
