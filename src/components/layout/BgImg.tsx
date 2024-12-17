"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

function BgImg() {
    
  const bgImages = [
    {
      tag: "산책",
      img: "https://img.freepik.com/free-vector/flat-people-doing-leisure-outdoor-activities_23-2147863987.jpg?t=st=1734395264~exp=1734398864~hmac=e1bb8679f9e0b648d58f04ea86c4d07f67f67e0fdc1e991a6b4ab5d3dc8bcbd2&w=826",
      description: ""
    },
    {
      tag: "휴식",
      img: "https://img.freepik.com/free-vector/early-morning-concept-illustration_114360-7352.jpg?t=st=1734395290~exp=1734398890~hmac=493ce093d000153847e666ed8c5f8a84c0197a852dd03a4318c42ceb3b5bad1e&w=826",
      description: ""
    },
    {
      tag: "자연",
      img: "https://img.freepik.com/free-vector/hand-drawn-spring-landscape_23-2148822586.jpg?t=st=1734395310~exp=1734398910~hmac=dda49e29bb7ee98833d80d67d055f9d962a6b8ef6cc883c1336e79c857224fee&w=1380",
      description: ""
    },
    {
      tag: "휴양",
      img: "https://img.freepik.com/free-vector/illustration-people-doing-outdoor-activities_52683-67443.jpg?t=st=1734395346~exp=1734398946~hmac=b1e1a90f330004506668802b2b9287bee52f42a15ea5e897164fab64ee9772b0&w=1380",
      description: ""
    },
    {
      tag: "카페",
      img: "https://img.freepik.com/free-vector/cafe-terrace-with-welcome-message_23-2147503932.jpg?t=st=1734395370~exp=1734398970~hmac=c2b1f3b70d98986b057a46307a4a765b1f57207f68a48603402d62f1e68f1bce&w=826",
      description: ""
    },
    {
      tag: "액티비티",
      img: "https://img.freepik.com/free-vector/happy-kids-jumping-rope-children-having-fun-playing-park-outdoors_74855-15443.jpg?t=st=1734395062~exp=1734398662~hmac=59dd11ddcbd3e2c9907bfff67aa6f3015138aa900d3cc78520e54eb87d9b30d0&w=1380",
        description: ""
    },
    {
      tag: "역사",
      img: "https://img.freepik.com/free-vector/seoul-concept-illustration_114360-29522.jpg?t=st=1734395214~exp=1734398814~hmac=dfdb49f149c2544fcfa1d2609accf47c97395c005ed2935028c5dfcff8ec66b2&w=826",
      description: ""
    },
    {
      tag: "사진촬영",
      img: "https://img.freepik.com/free-vector/professional-photographer-taking-pictures-young-woman-female-model-posing-camera-against-white-backdrop-studio-light-vector-illustration-photo-shooting-photography-concept_74855-10141.jpg?t=st=1734395239~exp=1734398839~hmac=e9f1d05d3a8d3cd1bc1f4682b63411f0c741aba64647de100759efe293586c13&w=1380",
      description: ""
    },
    {
      tag: "문화",
      img: "https://img.freepik.com/free-vector/isometric-museum-interior_23-2148598088.jpg?t=st=1734395423~exp=1734399023~hmac=9987729fe29761d9b7991d12fe423a23b1b712a0f7a38a2f508fa311aa43d8f3&w=826",
      description: ""
    },
    {
      tag: "음식",
      img: "https://img.freepik.com/free-vector/hand-drawn-family-eating-illustration_23-2149227206.jpg?t=st=1734395468~exp=1734399068~hmac=6d497743f0ddebf6f47f1cb8a9222dafecde0305512a43da7e5c8079d13905d1&w=1380",
      description: ""
    },
  ];

  const [randomIdx, setRandomIdx] = useState(0);

  useEffect(() => {
    const idx = Math.floor(Math.random() * bgImages.length);
    setRandomIdx(idx);
  }, []);

  return (
    <section>
    <div className="relative aspect-[16/10]">
        <Image src={bgImages[randomIdx].img} fill className="object-cover" alt="background-images" onContextMenu={(e) => e.preventDefault()} onDragStart={(e) => e.preventDefault()}/>
    </div>
    <div className="absolute top-0 bg-white opacity-40 w-full h-full"></div>
    <div className="absolute top-0 bg-gradient-to-t from-white opacity-100 w-full h-full"></div>
    </section>
  );
}

export default BgImg;
