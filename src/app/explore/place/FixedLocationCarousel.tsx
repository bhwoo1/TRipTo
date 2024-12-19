"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import axios from "axios";
import { attraction } from "@/Type";
import { useQuery } from "react-query";
import { redirect } from "next/navigation";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import AttractionCard from "@/components/layout/AttractionCard";

const fetchAttraction = async ({ location }: { location: string }) => {
  const response = await axios("/api/attraction/location", {
    params: {
      area: location,
    },
  });
  return response.data;
};

function FixedLocationCarosuel({location, id}: {location: string, id: number}) {

  const {
    data: locationAttraction,
    isLoading,
    isError,
  } = useQuery<attraction[]>(["locationAttraction", location], () =>
    fetchAttraction({ location }), {
      keepPreviousData: true
    }
  );

  const newAttraction = locationAttraction?.filter((attraction) => attraction.id !== id);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  const cardClick = (id: number) => {
    redirect(`/explore/place?id=${id}`);
  };

  return (
    <div className="lg:w-full">
      <Carousel className="">
        <div className="flex flex-row justify-between items-center my-2">
            <article>
              <div className="font-bold text-[28px]">{location}</div>
              <div className="font-bold text-[16px] text-neutral-600">
                다른 장소들
              </div>
            </article>

          <div className="relative left-[-100px]">
            <div className="absolute">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </div>
        </div>
        <CarouselContent>
          {newAttraction?.map((attraction) => (
            <CarouselItem
              key={attraction.id}
              className="basis-1/2 xl:basis-1/5 lg:basis-1/3"
            >
              <div
                className="sm:w-1/2 lg:w-[280px] md:w-[300px]"
                onClick={() => cardClick(attraction.id)}
              >
                <AttractionCard attraction={attraction} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default FixedLocationCarosuel;