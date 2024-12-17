import React from 'react'
import TagList from './TagList'

async function page () {
  return (
    <div className="w-full">
      <div className="flex justify-center items-center mt-24">
        <TagList />
      </div>
    </div>
  )
}

export default page