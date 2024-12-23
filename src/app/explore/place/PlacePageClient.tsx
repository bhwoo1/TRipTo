"use client";

import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { attraction } from "@/Type";
import axios from "axios";
import React, { useEffect } from "react";
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
  const {
    data: place,
    isLoading,
    isError,
  } = useQuery<attraction>(["place", id], () => fetchPlace({ id: Number(id) }), {
    enabled: id !== 0, // id가 0일 때는 쿼리 실행되지 않음
    refetchOnWindowFocus: false, // 페이지 리렌더링 시 불필요한 쿼리 방지
  });

  useEffect(() => {
    console.log(place); // 데이터 로딩 후 확인
  }, [place]);

  // 로딩 중일 때는 로딩 화면 표시
  if (isLoading) return <Loading />;

  // 데이터가 없거나 오류가 발생한 경우 에러 처리
  if (isError || !place) return <Error />;

  // 초기 렌더링 시 `place`가 null 또는 undefined이면 대체값을 사용하도록
  const imageSrc = place?.image ?? "/path/to/default-image.jpg"; // 기본 이미지
  const name = place?.name ?? "장소 이름을 불러오는 중..."; // 기본 텍스트
  const area = place?.area ?? "지역을 불러오는 중..."; // 기본 텍스트
  const subarea = place?.subarea ?? "세부지역을 불러오는 중..."; // 기본 텍스트
  const tags = place?.tags ?? []; // 기본 빈 배열

  return (
    <div>
      {/* 데이터가 로드된 후 렌더링 */}
      <section className="flex lg:flex-row flex-col items-center text-center lg:text-left justify-center lg:justify-normal">
        <div className="relative min-w-[200px] min-h-[200px] lg:w-[300px] lg:h-[300px] overflow-hidden m-4">
          <Image
            src={imageSrc}
            fill
            alt="place_image"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
        <article className="m-4 flex flex-col gap-1 lg:gap-3">
          <div className="text-[28px] font-bold">{name}</div>
          <div className="text-[20px] font-bold text-neutral-700">
            {area} {subarea}
          </div>
          <div className="text-[12px] flex flex-row gap-3 justify-center lg:justify-normal">
            {/* 태그 데이터 표시 */}
            {tags.map((tag) => (
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
        <FixedTagList tags={tags} />
      </div>
    </div>
  );
}

export default PlacePageClient;