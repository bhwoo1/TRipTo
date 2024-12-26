import React from 'react'
import Navigator from './Navigator'
import Logo from './Logo'
import YourLocation from '../YourLocation'

function SideBar({children}: {
    children: React.ReactNode
}) {
  return (
    <div className='flex flex-row h-full'>
        <YourLocation />
        <nav className='hidden flex-col w-[240px] lg:flex'>
            <section className='py-2 px-8'>
                <Logo />
            </section>
            <div className='p-8'>
                <Navigator isFooter={false} />
            </div>
        </nav>
        <div className='w-full lg:w-[calc(100%-240px)] overflow-auto'>
            {children}
        </div>
    </div>
  )
}

export default SideBar