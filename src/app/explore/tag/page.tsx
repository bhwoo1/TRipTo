import React, { Suspense } from 'react'
import TagPageClient from './TagPageClient'

function page() {
  return (
    <div>
      <Suspense>
        <TagPageClient />
      </Suspense>
    </div>
  )
}

export default page