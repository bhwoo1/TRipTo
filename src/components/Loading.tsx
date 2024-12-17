"use client"

import React from 'react'
import { BeatLoader } from 'react-spinners'

function Loading() {
  return (
    <div className=' my-20 flex flex-col items-center justify-center gap-4'>
      <BeatLoader />
      <div>데이터를 검색 중입니다. 잠시만 기다려주세요.</div>
    </div>
  )
}

export default Loading