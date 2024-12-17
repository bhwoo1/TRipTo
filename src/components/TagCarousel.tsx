"use client";

import { randomTagStore } from "@/zustand/store";
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


const fetchAttraction = async ({tag}: {tag: string}) => {
    const response = await axios('/api/attraction/tag', {
        params: {
            tag: tag
        }
    });
    return response.data;
}

function TagCarousel() {
  const {tag} = randomTagStore();

  const safeTag = tag ?? '';

  const { data: locationAttraction, isLoading, isError } = useQuery<attraction[]>(
    ['tagAttraction', tag],
    () => fetchAttraction({tag: safeTag}),
    {
      enabled: safeTag !== ''  // tag가 빈 값일 때 쿼리 요청을 하지 않음
    }
  );

  if (tag === "") {
    return <Loading />
  }

  if (isLoading) return <Loading />
  if (isError) return <Error />

  

  return (
      <div className="lg:w-screen">
        <Carousel className="">
          <div className="flex flex-row justify-between items-center my-2">
            <article>
              <div className="font-bold text-[28px]">테마: {tag}</div>
            </article>
            <div className="relative left-[-100px]">
              <div className="absolute lg:hidden">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </div>
          </div>
          <CarouselContent >
                {locationAttraction?.map((attraction) => (
                <CarouselItem key={attraction.id} className="basis-1/2 xl:basis-1/5 lg:basis-1/3">
                    <div className="sm:w-1/2 lg:w-[280px] md:w-[300px]">
                            <AttractionCard attraction={attraction} />
                          </div>
                </CarouselItem>
                ))}
                <CarouselItem >
                <div className="sm:w-1/2 lg:w-[280px] md:w-[300px]">
                    <AttractionCardPlus />
                    </div>
                </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
  );
}

export default TagCarousel;
