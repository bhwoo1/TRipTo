"use client"

import React from 'react'
import { BarLoader } from 'react-spinners';

const LoadingBar = () => {
  return (
    <div className='w-full h-auto'>
        <BarLoader color={"#2ddb10"} cssOverride={{width: "100%"}}/>
    </div>
  )
}

export default LoadingBar;