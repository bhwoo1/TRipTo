"use client";

import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { attraction, bgImages } from "@/Type";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import AttractionCard from "@/components/layout/AttractionCard";
import { selectedAttraction } from "@/zustand/store";

// 데이터를 가져오는 함수
const fetchPlace = async ({
  page,
  tag,
  isTagPage,
}: {
  page: number;
  tag: string;
  isTagPage: boolean;
}) => {
  const response = await axios.get("/api/attraction/tag", {
    params: {
      page: page,
      tag: tag,
      isTagPage: isTagPage,
    },
  });
  return response.data;
};

function TagPageClient({ tag }: { tag: string }) {
  const isTagPage = true;
  const { ref, inView } = useInView();
  const { setAttraction } = selectedAttraction();

  const decodeTag = decodeURIComponent(tag);

  // Infinite Query
  const { data, fetchNextPage, isLoading, isError, isFetchingNextPage } =
    useInfiniteQuery(
      ["placeList", tag],
      ({ pageParam = 0 }) =>
        fetchPlace({ page: pageParam, tag: decodeTag, isTagPage: isTagPage }),
      {
        getNextPageParam: (lastPage) => {
          const nextPage = lastPage.page + 1;
          return lastPage.hasNextPage ? nextPage : undefined;
        },
        enabled: decodeTag !== "", // tag가 빈 문자열일 때 쿼리를 실행하지 않음
      }
    );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  // tag와 일치하는 bgImages 필터링
  const matchingImage = bgImages.find((image) => image.tag === decodeTag);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  const cardClick = (place: attraction) => {
    setAttraction(place);
    redirect(`/explore/place/${place.id}`);
  };

  return (
    <div>
      {/* <TopBtn /> */}
      <section className="flex lg:flex-row flex-col items-center lg:items-end text-center lg:text-left justify-center lg:justify-normal">
        {matchingImage?.img ? (
          <div className="relative min-w-[200px] min-h-[200px] lg:w-[300px] lg:h-[300px] overflow-hidden m-4">
            <Image
              src={matchingImage?.img || ""}
              fill
              alt="place_image"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
          </div>
        ) : (
          <div className="relative min-w-[200px] min-h-[200px] lg:w-[300px] lg:h-[300px] overflow-hidden m-4">
            <div className="bg-gray-300 w-full h-full"></div>
          </div>
        )}
        <article className="m-4 flex flex-col gap-1 lg:gap-2">
          <div className="text-[20px] font-bold text-neutral-700">테마</div>
          <div className="text-[40px] font-bold">{decodeTag}</div>
        </article>
      </section>

      <div
        className="grid grid-cols-2 lg:grid-cols-2 gap-12 mt-24"
        key={data?.pages[0].name}
      >
        {data?.pages.map((page) =>
          page.attractions.map((place: attraction) => (
            <div key={`${place.id}`} onClick={() => cardClick(place)}>
              <AttractionCard attraction={place} />
            </div>
          ))
        )}
      </div>

      {/* 무한 스크롤을 위한 감지 요소 */}
      {isFetchingNextPage ? <Loading /> : <div ref={ref} className="h-10" />}
    </div>
  );
}

export default TagPageClient;
