import React from 'react'
import Navigator from './Navigator'

function SideBar({children}: {
    children: React.ReactNode
}) {
  return (
    <div className='flex flex-row h-full'>
        <nav className='hidden flex-col w-[240px] lg:flex'>
            <section className='p-8'>
                <span>TRipTo</span>
            </section>
            <div className='p-8'>
                <Navigator />
            </div>
        </nav>
        <div className='w-full lg:w-[calc(100%-240px)]'>
            {children}
        </div>
    </div>
  )
}

export default SideBar