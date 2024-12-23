import React from 'react'
import PlacePageClient from './PlacePageClient'
import SuspenseComponent from '@/components/SuspenseComponent'

function page() {
  return (
    <div>
      <SuspenseComponent>
        <PlacePageClient />
      </SuspenseComponent>
    </div>
  )
}

export default page