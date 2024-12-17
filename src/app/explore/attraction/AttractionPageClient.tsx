"use client"

import { redirect, useSearchParams } from 'next/navigation';
import React from 'react'

function AttractionPageClient() {
    const searchParams = useSearchParams();
  const id = searchParams.get("id"); // id 값 가져오기

  if (!id) redirect('/');
  return (
    <div>{id}</div>
  )
}

export default AttractionPageClient;