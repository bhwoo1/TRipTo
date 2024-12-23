"use client";

import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { attraction } from "@/Type";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Image from "next/image";
import { TiLocation } from "react-icons/ti";
import FixedLocationCarosuel from "./FixedLocationCarousel";
import FixedTagList from "./FixedTagList";

// API 호출 함수
const fetchPlace = async ({ id }: { id: number }) => {
  const response = await axios.get("/api/attraction/place", {
    params: {
      id: id,
    },
  });
  return response.data;
};

function PlacePageClient({ id }: { id: number }) {
  // 상태를 추가해 데이터 로딩 후에 상태 업데이트
  const [placeData, setPlaceData] = useState<attraction | null>(null);

  const {
    isLoading,
    isError,
  } = useQuery<attraction>(["place", id], () => fetchPlace({ id: Number(id) }), {
    enabled: id !== 0, // id가 0일 때는 쿼리 실행되지 않음
    refetchOnWindowFocus: false, // 페이지 리렌더링 시 불필요한 쿼리 방지
    onSuccess: (data) => {
      // 데이터가 성공적으로 로드되면 setPlaceData로 상태 업데이트
      setPlaceData(data);
    },
  });

  useEffect(() => {
    console.log(placeData); // 데이터 로딩 후 상태 확인
  }, [placeData]);

  // 로딩 중일 때는 로딩 화면 표시
  if (isLoading) return <Loading />;

  // 데이터가 없거나 오류가 발생한 경우 에러 처리
  if (isError || !placeData) return <Error />;

  // 데이터가 로딩된 후 렌더링
  return (
    <div>
      <section className="flex lg:flex-row flex-col items-center text-center lg:text-left justify-center lg:justify-normal">
        <div className="relative min-w-[200px] min-h-[200px] lg:w-[300px] lg:h-[300px] overflow-hidden m-4">
          <Image
            src={placeData?.image || "/path/to/default-image.jpg"} // 서버에서 가져온 이미지 사용
            fill
            alt="place_image"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
        <article className="m-4 flex flex-col gap-1 lg:gap-3">
          <div className="text-[28px] font-bold">{placeData?.name}</div>
          <div className="text-[20px] font-bold text-neutral-700">
            {placeData?.area} {placeData?.subarea}
          </div>
          <div className="text-[12px] flex flex-row gap-3 justify-center lg:justify-normal">
            {placeData?.tags?.map((tag, index) => (
              <div key={index} className="text-neutral-600 font-bold">{tag}</div>
            ))}
          </div>
          <div className="mt-4 lg:mt-32">
            <button
              className="bg-green-500 hover:bg-green-600 px-[8px] py-[2px] text-white rounded-full"
              onClick={() => {
                window.open(
                  `https://map.naver.com?lng=${placeData?.longitude}&lat=${placeData?.latitude}&title=${placeData?.name}`,
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
        <FixedLocationCarosuel location={String(placeData?.area)} id={Number(id)} />
      </div>
      <div className="flex justify-start items-center mt-24 w-full">
        <FixedTagList tags={placeData?.tags ?? []} />
      </div>
    </div>
  );
}

export default PlacePageClient;