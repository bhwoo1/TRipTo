"use client";

import { redirect, useSearchParams } from "next/navigation";
import React from "react";

function TagPageClient() {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag"); // id 값 가져오기

  if (!tag) redirect("/");
  return <div>{tag}</div>;
}

export default TagPageClient;
