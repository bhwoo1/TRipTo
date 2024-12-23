"use client"
import React, { Suspense } from 'react'
import Loading from './Loading'

function SuspenseComponent({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
        {children}
    </Suspense>
  )
}

export default SuspenseComponent