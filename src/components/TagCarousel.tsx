"use client";

import { randomTagStore, selectedAttraction } from "@/zustand/store";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import axios from 'axios';
import { attraction } from "@/Type";
import { useQuery } from "react-query";
import Loading from "./Loading";
import Error from "./Error";
import AttractionCard from "./layout/AttractionCard";
import AttractionCardPlus from "./layout/AttractionCardPlus";
import { redirect } from "next/navigation";




const fetchAttraction = async ({ tag }: {tag: string}) => {
    const response = await axios('/api/attraction/tag', {
        params: {
            tag: tag
        },
    });
    return response.data;
}

function TagCarousel() {
  const { tag } = randomTagStore();
  const {setAttraction} = selectedAttraction();
  

  const safeTag = tag ??  "";

  const { data: locationAttraction, isLoading, isError } = useQuery<attraction[]>(
    ['tagAttraction', safeTag],
    () => fetchAttraction({tag: safeTag}),
    {
      enabled: safeTag !== ''  // tag가 빈 값일 때 쿼리 요청을 하지 않음
    }
  );

  if (safeTag === "") {
    return <Loading />
  }

  if (isLoading) return <Loading />
  if (isError) return <Error />

  const cardClick = (attraction: attraction) => {
      setAttraction(attraction);
      redirect(`/explore/place/${attraction.id}`);
    };

  const tagClick = () => {
    redirect(`/explore/${encodeURIComponent(safeTag)}`);
  }

  

  return (

    <div className="lg:w-full">
      <Carousel className="">
        <div className="flex flex-row justify-between items-center my-2">
          <article>
          <div className="font-bold text-[28px]">테마: {safeTag}</div>
          </article>
          <div className="relative left-[-60px]">
            <div className="absolute">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </div>
        </div>
        <CarouselContent>
          {locationAttraction?.map((attraction) => (
            <CarouselItem
              key={attraction.id}
              className="basis-1/2 xl:basis-1/5 lg:basis-1/3"
            >
              <div className="sm:w-1/2 lg:w-[280px] md:w-[300px]" onClick={() => cardClick(attraction)}>
                <AttractionCard attraction={attraction} />
              </div>
            </CarouselItem>
          ))}
          <CarouselItem >
                 <div className="sm:w-1/2 lg:w-[280px] md:w-[300px]" onClick={tagClick}>
                     <AttractionCardPlus />
                     </div>
                 </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default TagCarousel;
