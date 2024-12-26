"use client";

import { selectedAreaStore, selectedAttraction, userLocationStore } from "@/zustand/store";
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
import { usePathname, useRouter } from "next/navigation";
import LocationSelect from "@/app/explore/LocationSelect";

const fetchAttraction = async ({ areaToUse }: { areaToUse: string }) => {
  const response = await axios("/api/attraction/location", {
    params: {
      area: areaToUse,
    },
  });
  return response.data;
};

function LocationCarosuel() {
  const pathname = usePathname();
  const { locationArea } = userLocationStore();
  const { selectedArea } = selectedAreaStore();
  const {setAttraction} = selectedAttraction();
  const area = locationArea.split(" ").slice(0, 1);
  const router = useRouter();

  const areaToUse = pathname === "/explore" ? selectedArea : locationArea;

  const {
    data: locationAttraction,
    isLoading,
    isError,
  } = useQuery<attraction[]>(["locationAttraction", areaToUse], () =>
    fetchAttraction({ areaToUse }), {
      keepPreviousData: true
    }
  );

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  const cardClick = (attraction: attraction) => {
    setAttraction(attraction);
    router.push(`/explore/place/${attraction.id}`);
  };

  return (
    <div className="lg:w-full">
      <Carousel className="">
        <div className="flex flex-row justify-between items-center my-2">
          {pathname === "/" ? (
            <article>
              <div className="font-bold text-[28px]">{area}</div>
              <div className="font-bold text-[16px] text-neutral-600">
                멋진 장소들
              </div>
            </article>
          ) : (
            <article>
              <div className="font-bold text-[28px]">지역별로 찾아보기</div>
              <div className="font-bold text-[16px] text-neutral-600">
                <LocationSelect />
              </div>
            </article>
          )}

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
              <div
                className="sm:w-1/2 lg:w-[280px] md:w-[300px]"
                onClick={() => cardClick(attraction)}
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

export default LocationCarosuel;
