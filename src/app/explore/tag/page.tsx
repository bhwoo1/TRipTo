import React from 'react'
import TagPageClient from './TagPageClient'
import SuspenseComponent from '@/components/SuspenseComponent'

function page() {
  return (
    <div>
      <SuspenseComponent>
        <TagPageClient />
      </SuspenseComponent>
    </div>
  )
}

export default page