"use client";

import { userLocationStore } from "@/zustand/store";
import { useEffect, useRef } from "react";

function YourLocation() {
  const { setLocation, setArea } = userLocationStore();
  const naverMapApiKey = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
  const isScriptLoaded = useRef(false); // 스크립트 로드 상태 관리

  useEffect(() => {
    // 네이버 지도 API 스크립트가 이미 로드되었는지 확인
    if (!isScriptLoaded.current) {
      const script = document.createElement("script");
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${naverMapApiKey}&submodules=geocoder`;
      script.async = true;
      script.onerror = () => alert("Naver Maps API 로드 실패");

      script.onload = () => {
        isScriptLoaded.current = true; // 스크립트 로드 완료 플래그 설정
        getLocationAndGeocode(); // 위치 가져오기 및 reverseGeocode 실행
      };

      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script); // 컴포넌트 언마운트 시 스크립트 제거
      };
    } else {
      getLocationAndGeocode(); // 스크립트가 이미 로드된 경우 바로 실행
    }
  }, [naverMapApiKey]); // `naverMapApiKey`만 의존성 배열에 추가

  const getLocationAndGeocode = () => {
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

  return null;
}

export default YourLocation;