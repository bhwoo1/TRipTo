"use client";

import React from "react";
import Place from "./Place";
import { selectedAttraction } from "@/zustand/store";



function PlacePageClient({ id }: { id: number }) {
  const { Attraction } = selectedAttraction();


    return (
      <div>
        <Place place={Attraction!} id={id} />
      </div>
    );
  
}

export default PlacePageClient;