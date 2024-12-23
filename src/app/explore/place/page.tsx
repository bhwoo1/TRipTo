import React, { Suspense } from 'react'
import PlacePageClient from './PlacePageClient'

function page() {
  return (
    <div>
      <Suspense>
        <PlacePageClient />
      </Suspense>
    </div>
  )
}

export default page