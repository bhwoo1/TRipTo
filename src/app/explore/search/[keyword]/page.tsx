import React, { Suspense } from 'react'

import Loading from '@/components/Loading'
import SearchPageClient from '../SearchPageClient';

async function page({params}: {params: Promise<{ keyword: string }>}) {
  const { keyword } = await params;
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <SearchPageClient keyword={String(keyword)}/> 
      </Suspense>
    </div>
  )
}

export default page