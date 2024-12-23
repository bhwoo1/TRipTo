"use client";

import Error from "@/components/Error";
import AttractionCard from "@/components/layout/AttractionCard";
import Loading from "@/components/Loading";
import SearchBar from "@/components/SearchBar";
import { attraction } from "@/Type";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";

const fetchPlace = async ({
  page,
  keyword,
}: {
  page: number;
  keyword: string;
}) => {
  const response = await axios.get("/api/search", {
    params: {
      page: page,
      keyword: decodeURIComponent(keyword),
    },
  });
  return response.data;
};


function SearchPageClient({keyword}: {keyword: string}) {

  const { ref, inView } = useInView();


  const { data, fetchNextPage, isLoading, isError, isFetchingNextPage } =
    useInfiniteQuery(
      ["searchPlace", keyword],
      ({ pageParam = 0 }) => fetchPlace({ page: pageParam, keyword: keyword }),
      {
        getNextPageParam: (lastPage) => {
          const nextPage = lastPage.page + 1;
          return lastPage.hasNextPage ? nextPage : undefined;
        },
        enabled: keyword !== "", // tag가 빈 문자열일 때 쿼리를 실행하지 않음
      }
    );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  const cardClick = (id: number) => {
    redirect(`/explore/place?id=${id}`);
  };

  const cancelClick = () => {
    redirect("/explore");
  };

  return (
    <div>
      <div className="mt-24">
        <SearchBar />
      </div>
      <section className="flex justify-between mt-12">
        <div className="flex flex-row items-end gap-4">
          검색어:
          <p className="text-[25px] font-bold">{decodeURIComponent(keyword)}</p>
        </div>
        <button
          onClick={cancelClick}
          className="font-bold items-center text-[24px] lg:text-[15px] p-4"
        >
          X
        </button>
      </section>

      <div
        className="grid grid-cols-2 lg:grid-cols-2 gap-12 mt-24"
        key={data?.pages[0].name}
      >
        {data?.pages.map((page) =>
          page.attractions.map((place: attraction) => (
            <div key={`${place.id}`} onClick={() => cardClick(place.id)}>
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

export default SearchPageClient;
