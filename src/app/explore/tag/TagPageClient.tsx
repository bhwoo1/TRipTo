"use client";

import { redirect, useSearchParams } from "next/navigation";
import React from "react";

function TagPageClient() {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag"); // 태그 가져오기기

  if (!tag) redirect("/");
  return <div>{tag}</div>;
}

export default TagPageClient;
