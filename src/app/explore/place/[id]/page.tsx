import React, { Suspense } from 'react'

import Loading from '@/components/Loading'
import PlacePageClient from '../PlacePageClient';

async function page({params}: {params: Promise<{id: number}>}) {
    const { id } = await params;
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <PlacePageClient id={Number(id)} />
      </Suspense>
    </div>
  )
}

export default page