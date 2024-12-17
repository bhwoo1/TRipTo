import React from 'react'

function PagePadding({children}: {
    children: React.ReactNode
}
) {
  return (
    <div className='p-8 lg:p-24'>
        {children}
    </div>
  )
}

export default PagePadding