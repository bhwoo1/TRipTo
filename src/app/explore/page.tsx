import React from 'react'
import TagList from './TagList'
import LocationCarosuel from '@/components/LocationCarousel'

async function page () {
  return (
    <div className="w-full">
      <div className="flex justify-center items-center mt-24">
        <TagList />
      </div>
      <div className="flex justify-center items-center mt-24 w-full">
        <LocationCarosuel />
      </div>
    </div>
  )
}

export default page