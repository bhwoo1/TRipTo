"use client";

import { userLocationStore } from "@/zustand/store";
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
import Loading from "./Loading";
import Error from "./Error";
import AttractionCard from "./layout/AttractionCard";

const fetchAttraction = async ({ locationArea }: { locationArea: string }) => {
  const response = await axios("/api/attraction/location", {
    params: {
      area: locationArea,
    },
  });
  return response.data;
};

function LocationCarosuel() {
  const { locationArea } = userLocationStore();
  const area = locationArea.split(" ").slice(0, 1);

  const {
    data: locationAttraction,
    isLoading,
    isError,
  } = useQuery<attraction[]>(["locationAttraction", locationArea], () =>
    fetchAttraction({ locationArea })
  );

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (

    <div className="lg:w-screen">
      <Carousel className="">
        <div className="flex flex-row justify-between items-center my-2">
          <article>
            <div className="font-bold text-[28px]">{area}</div>
            <div className="font-bold text-[16px] text-neutral-600">
              멋진 장소들
            </div>
          </article>
          <div className="relative left-[-100px]">
            <div className="absolute lg:hidden">
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
              <div className="sm:w-1/2 lg:w-[280px] md:w-[300px]">
                <AttractionCard attraction={attraction} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default LocationCarosuel;
