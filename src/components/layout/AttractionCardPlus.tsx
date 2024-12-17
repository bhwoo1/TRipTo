import { randomTagStore } from '@/zustand/store'
import Image from 'next/image'
import React from 'react'

function AttractionCardPlus() {
    const {img} = randomTagStore();
  return (
    <div>
        <article>
            <div className='relative h-[240px]'>
                <Image src={img} alt='attraction_img' fill/>
            </div>
            <div className='font-bold text-[18px]'>더 많은 장소가 궁금하다면?</div>
        </article>
    </div>
  )
}

export default AttractionCardPlus