import React, { Suspense } from 'react'
import TagPageClient from './TagPageClient'
import Loading from '@/components/Loading'

async function page({params}: {params: Promise<{tag: string}>}) {
  const { tag } = await params;

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <TagPageClient tag={String(tag)}/>
      </Suspense>
    </div>
  )
}

export default page