"use client";

import React from "react";
import { FaArrowUp } from "react-icons/fa";

function TopBtn() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드럽게 스크롤
    });
  };

  return (
    <div
      onClick={scrollToTop}
      className="fixed cursor-pointer right-0 bottom-52 lg:bottom-0 border-2 flex justify-center items-center text-center m-12 z-10 rounded-full bg-white w-[50px] h-[50px]"
    >
      <FaArrowUp />
    </div>
  );
}

export default TopBtn;
