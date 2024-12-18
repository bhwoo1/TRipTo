"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { selectedAreaStore } from "@/zustand/store";

function LocationSelect() {
    const {selectedArea, setArea} = selectedAreaStore();
  const locationList = [
    "서울특별시",
    "광주광역시",
    "대구광역시",
    "대전광역시",
    "부산광역시",
    "울산광역시",
    "인천광역시",
    "강원도",
    "경기도",
    "경상남도",
    "경상북도",
    "제주특별자치도",
    "전라남도",
    "전라북도",
    "충청남도",
    "충청북도",
  ];

  return (
    <Select value={selectedArea} onValueChange={(value) => setArea(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="text-bold">지역</SelectLabel>
          {locationList.map((location) => (
            <div key={location}>
              <SelectItem value={`${location}`}>{location}</SelectItem>
            </div>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default LocationSelect;
