"use client";

import React from "react";
import SearchBar from "../SearchBar";
import Logo from "./Logo";
import BgImg from "./BgImg";
import { usePathname } from "next/navigation";
import BgImgByPathname from "./BgImgByPathname";

function Header({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const bgImgByPathname = () => {
    if (pathname.startsWith("/explore/tag")) {
      return <BgImgByPathname />;
    } else {
      return <BgImg />;
    }
  };
  return (
    <header className="relative">
      <section className=" absolute top-0 w-full">{bgImgByPathname()}</section>
      <section className="sticky h-[100px] flex flex-row justify-between items-center p-4">
        <div className="h-[100px] min-w-[100px]">
          <div className="lg:hidden flex">
            <Logo />
          </div>
        </div>
        <div className="lg:w-[480px] w-[240px] mt-2 p-4">
          <SearchBar />
        </div>
      </section>
      <div className="relative z-10">
        <div className="h-[calc(100%-200px)] ">{children}</div>
      </div>
    </header>
  );
}

export default Header;
