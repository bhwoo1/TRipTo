"use client";

import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { attraction } from "@/Type";
import axios from "axios";
import { redirect, useSearchParams } from "next/navigation";
import React from "react";
import { useQuery } from "react-query";
import Image from "next/image";
import { TiLocation } from "react-icons/ti";
import FixedLocationCarosuel from "./FixedLocationCarousel";
import FixedTagList from "./FixedTagList";

const fetchPlace = async ({ id }: { id: number }) => {
  const response = await axios.get("/api/attraction/location", {
    params: {
      id: id,
    },
  });
  return response.data;
};

function PlacePageClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // id 값 가져오기

  if (!id) redirect("/");

  const {
    data: place,
    isLoading,
    isError,
  } = useQuery<attraction>(["place", id], () => fetchPlace({ id: Number(id) }));

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div>
      <section className="flex lg:flex-row flex-col items-center text-center lg:text-left justify-center lg:justify-normal">
        <div className="relative min-w-[200px] min-h-[200px] lg:w-[300px] lg:h-[300px] overflow-hidden m-4">
          <Image
            src={String(place?.image)}
            fill
            alt="place_image"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
        <article className="m-4 flex flex-col gap-1  lg:gap-3">
          <div className="text-[28px] font-bold">{place?.name}</div>
          <div className="text-[20px] font-bold text-neutral-700">
            {place?.area} {place?.subarea}
          </div>
          <div className="text-[12px] flex flex-row gap-3 justify-center lg:justify-normal ">
            {place?.tags.map((tag) => (
              <div key={tag} className="text-neutral-600 font-bold">{tag}</div>
            ))}
          </div>
          <div className="mt-4 lg:mt-32">
            <button
              className="bg-green-500 hover:bg-green-600 px-[8px] py-[2px] text-white rounded-full"
              onClick={() => {
                window.open(
                  `https://map.naver.com?lng=${place?.longitude}&lat=${place?.latitude}&title=${place?.name}`,
                  "_blank" // 새 탭에서 열기
                );
              }}
            >
              <div className="gap-2 flex flex-row items-center text-[20px] font-bold">
                <TiLocation />
                <span>길찾기</span>
              </div>
            </button>
          </div>
        </article>
      </section>
      <div className="flex justify-center items-center mt-24 w-full">
        <FixedLocationCarosuel location={String(place?.area)} id={Number(id)} />
      </div>
      <div className="flex justify-start items-center mt-24 w-full">
          <FixedTagList tags={place?.tags ?? []} />
      </div>
    </div>
  );
}

export default PlacePageClient;
