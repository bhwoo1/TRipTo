import { randomTagStore } from '@/zustand/store'
import Image from 'next/image'
import React from 'react'

function AttractionCardPlus() {
    const {img} = randomTagStore();
  return (
    <div className='cursor-pointer group'>
        <article>
        <div className='relative h-[240px] overflow-hidden'>
                <Image src={img} alt='attraction_img' fill className='group-hover:scale-110 group-hover:blur-sm transition-transform duration-300 ease-in-out'/>
            </div>
            <div className='font-bold text-[18px] mt-2'>더 많은 장소가 궁금하다면?</div>
        </article>
    </div>
  )
}

export default AttractionCardPlus