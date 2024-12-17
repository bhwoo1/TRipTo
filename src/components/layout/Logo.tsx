"use client"

import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

function Logo() {
  return (
    <div onClick={() => redirect('/')} className='cursor-pointer'>
        <Image src={'/TRipTo.-removebg-preview.png'}  width={100} height={100} alt='logo' />
    </div>
  )
}

export default Logo