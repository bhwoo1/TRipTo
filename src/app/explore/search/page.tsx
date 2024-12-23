import React, { Suspense } from 'react'
import SearchPageClient from './SearchPageClient'

function page() {
  return (
    <div>
      <Suspense>
        <SearchPageClient /> 
      </Suspense>
    </div>
  )
}

export default page