import { sleep } from '@/lib/utils';
import React from 'react'

async function page () {
    await sleep(2000);
  return (
    <div>explore</div>
  )
}

export default page