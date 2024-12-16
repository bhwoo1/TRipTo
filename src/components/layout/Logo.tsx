import Image from 'next/image'
import React from 'react'

function Logo() {
  return (
    <div>
        <Image src={'/TRipTo.-removebg-preview.png'}  width={100} height={100} alt='logo' />
    </div>
  )
}

export default Logo