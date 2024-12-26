"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

function Logo() {
  const router = useRouter();
  return (
    <div onClick={() => router.push('/')} className='cursor-pointer'>
        <Image src={'/TRipTo.-removebg-preview.png'}  width={100} height={100} alt='logo' />
    </div>
  )
}

export default Logo