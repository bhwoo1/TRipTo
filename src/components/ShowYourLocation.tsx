"use client";

import { randomTagStore, userLocationStore } from "@/zustand/store";
import React from "react";

function ShowYourLocation() {
  const { locationArea } = userLocationStore();
  const { des } = randomTagStore();
  return (
    <div className="flex flex-col mt-24">
      <span className="font-bold text-[18px] lg:text-[24px]">
        당신의 위치는?
      </span>
      <span className="text-[36px] lg:text-[48px] font-bold">
        {locationArea}!
      </span>
      <span className="font-bold text-[18px] lg:text-[24px] mt-8">{des}</span>
    </div>
  );
}

export default ShowYourLocation;
