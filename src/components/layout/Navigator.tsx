"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import { GoHomeFill } from "react-icons/go";
import { FaCompass } from "react-icons/fa6";

function Navigator() {
  const pathname = usePathname();
  const routes = useMemo(() => {
    return [
      {
        icon: <GoHomeFill size={24} />,
        label: "홈",
        isActive: pathname === "/",
        href: "/",
      },
      {
        icon: <FaCompass size={24} />,
        label: "둘러보기",
        isActive: pathname === "/explore",
        href: "/explore"
      }
    ];
  }, [pathname]);

  return (
    <div>
      {routes.map((route) => {
        return (
          <Link key={route.label} href={route.href}>
            <div className={`transition-transform text-[20px] flex flex-row gap-4 hover:scale-110 items-center font-bold p-2 ${route.isActive && "text-green-600"}`}>
              {route.icon}
              <span>{route.label}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Navigator;
