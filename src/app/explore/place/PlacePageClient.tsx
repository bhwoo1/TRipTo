"use client";

import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { attraction } from "@/Type";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Image from "next/image";
import { TiLocation } from "react-icons/ti";
import FixedLocationCarosuel from "./FixedLocationCarousel";
import FixedTagList from "./FixedTagList";

const fetchPlace = async ({ id }: { id: number }) => {
  const response = await axios.get("/api/attraction/place", {
    params: {
      id: id,
    },
  });
  return response.data;
};

function PlacePageClient({ id }: { id: number }) {
  const [isMounted, setIsMounted] = useState(false); // 컴포넌트가 마운트되었는지 추적

  const {
    data: place,
    isLoading,
    isError,
  } = useQuery<attraction>(["place", id], () => fetchPlace({ id: Number(id) }), {
    enabled: id !== 0, // id가 0일 때는 쿼리를 실행하지 않음
  });

  // 데이터 로드가 완료되면 화면을 렌더링하기 위해 사용
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 페이지가 마운트되고 나서, 데이터가 로드되었을 때만 렌더링하도록 처리
  if (!isMounted) {
    return <Loading />;
  }

  if (isLoading) return <Loading />;
  if (isError) return <Error />;


  return (
    <div>
      <section className="flex lg:flex-row flex-col items-center text-center lg:text-left justify-center lg:justify-normal">
        <div className="relative min-w-[200px] min-h-[200px] lg:w-[300px] lg:h-[300px] overflow-hidden m-4">
          <Image
            src={String(place?.image)} // image가 없을 경우 기본 이미지 처리
            fill
            alt="place_image"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
        <article className="m-4 flex flex-col gap-1 lg:gap-3">
          <div className="text-[28px] font-bold">{place?.name}</div>
          <div className="text-[20px] font-bold text-neutral-700">
            {place?.area} {place?.subarea}
          </div>
          <div className="text-[12px] flex flex-row gap-3 justify-center lg:justify-normal">
            {/* {place?.tags.map((tag) => (
              <div key={tag} className="text-neutral-600 font-bold">{tag}</div>
            ))} */}
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