"use client"

import { useSearchParams } from 'next/navigation';
import React from 'react'

function TagPageClient() {
    const searchParams = useSearchParams();
      const tag = searchParams.get("tag"); // id 값 가져오기
  return (
    <div>{tag}</div>
  )
}

export default TagPageClient