"use client"

import { ThemeProvider } from 'next-themes'
import React from 'react'

function ThProvider({children}: {
    children: React.ReactNode
}) {
  return (
    <ThemeProvider>
        {children}
    </ThemeProvider>
  )
}

export default ThProvider;