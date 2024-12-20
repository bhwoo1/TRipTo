"use client";

import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { attraction, bgImages } from "@/Type";
import axios from "axios";
import { redirect, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import Image from "next/image";
import { useInView } from 'react-intersection-observer';
import AttractionCard from "@/components/layout/AttractionCard";

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

function TagPageClient() {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag"); // 태그 가져오기
  const isTagPage = true;
  const { ref, inView } = useInView();

  if (!tag) redirect("/");

  // Infinite Query
  const {data, fetchNextPage, isLoading, isError, isFetchingNextPage } = useInfiniteQuery(
    ["placeList", tag],
    ({pageParam = 0}) => fetchPlace({ page: pageParam, tag: tag, isTagPage: isTagPage }),
    {
      getNextPageParam: (lastPage) => {
        const nextPage = lastPage.page + 1;
        return lastPage.hasNextPage ? nextPage : undefined;
      },
    }
  );

  useEffect(() => {
    if (inView) {
      console.log("In view: Fetching next page");
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  // tag와 일치하는 bgImages 필터링
  const matchingImage = bgImages.find((image) => image.tag === tag);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  const cardClick = (id: number) => {
    redirect(`/explore/place?id=${id}`);
  } 


  return (
    <div>
      <section className="flex lg:flex-row flex-col items-center lg:items-end text-center lg:text-left justify-center lg:justify-normal">
        <div className="relative min-w-[200px] min-h-[200px] lg:w-[300px] lg:h-[300px] overflow-hidden m-4">
          <Image
            src={matchingImage?.img || ""}
            fill
            alt="place_image"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
        <article className="m-4 flex flex-col gap-1 lg:gap-2">
          <div className="text-[20px] font-bold text-neutral-700">테마</div>
          <div className="text-[40px] font-bold">{tag}</div>
        </article>
      </section>
      
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-12 mt-24" key={data?.pages[0].name}>
        {data?.pages.map((page) =>
          page.attractions.map((place: attraction) => (
            <div key={`${place.id}`} onClick={() => cardClick(place.id)}>
              <AttractionCard attraction={place} />
            </div>
          ))
        )}
      </div>

      {/* 무한 스크롤을 위한 감지 요소 */}
      {isFetchingNextPage ? <Loading /> : <div ref={ref} className="h-10" /> }
    </div>
  );
}

export default TagPageClient;