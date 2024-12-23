import React from 'react'
import SearchPageClient from './SearchPageClient'
import SuspenseComponent from '@/components/SuspenseComponent'

function page() {
  return (
    <div>
      <SuspenseComponent>
        <SearchPageClient /> 
      </SuspenseComponent>
    </div>
  )
}

export default page