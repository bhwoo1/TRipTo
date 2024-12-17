"use client";

import { userLocationStore } from "@/zustand/store";
import React, { useEffect } from "react";

function YourLocation() {
  const { locationState, setLocation, setArea, locationArea } =
    userLocationStore();
  const naverMapApiKey = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

  useEffect(() => {
    // 네이버 지도 API 스크립트 로드
    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${naverMapApiKey}&submodules=geocoder`;
    script.async = true;
    script.onerror = () => alert("Naver Maps API 로드 실패");

    // 스크립트 로드 완료 후 reverseGeocode 함수 호출
    script.onload = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            reverseGeocode(position.coords.latitude, position.coords.longitude); // 위치를 가져온 후 reverseGeocode 호출
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      } else {
        console.error("Error getting location: Geolocation not supported");
      }
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script); // Clean up script tag when component unmounts
    };
  }, [naverMapApiKey, locationState]);

  // Reverse geocoding
  const reverseGeocode = (lat: number, lng: number) => {
    if (window.naver && window.naver.maps) {
      window.naver.maps.Service.reverseGeocode(
        {
          coords: new window.naver.maps.LatLng(lat, lng),
          orders: "roadaddr,addr",
        },
        (status, response) => {
          if (status !== window.naver.maps.Service.Status.OK) {
            console.error("Reverse geocoding failed:", status);
            return;
          }
          const result = response.v2;
          const address =
            result.address.roadAddress || result.address.jibunAddress;
          const addressParts = address.split(" ");
          const shortAddress = addressParts.slice(0, 2).join(" ");

          setArea(shortAddress);
        }
      );
    } else {
      console.error("Naver Maps API is not loaded yet.");
    }
  };

  return (
    <div className="flex flex-col mt-24">
        <span className="font-bold text-[18px] lg:text-[24px]">당신의 위치는?</span>
        <span className="text-[36px] lg:text-[48px] font-bold">{locationArea}!</span>
    </div>
  );
}

export default YourLocation;
