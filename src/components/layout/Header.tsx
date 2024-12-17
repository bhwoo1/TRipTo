import React from 'react'
import SearchBar from '../SearchBar'
import Logo from './Logo'
import BgImg from './BgImg'

function Header({children}: {
    children: React.ReactNode
}) {
  return (
    <header className='relative'>
        <section className=' absolute top-0 w-full'>
            <BgImg />
        </section>
        <section className='sticky h-[100px] flex flex-row justify-between items-center p-4'>
            <div className='h-[100px] min-w-[100px]'>
                <div className='lg:hidden flex'>
                <Logo />
             </div>
            </div>
            <div className='lg:w-[480px] w-[240px] mt-2 p-4'>
                <SearchBar />
            </div>
        </section>
        <div className='h-[calc(100% - 200px)] absolute'>
            {children}
        </div>
    </header>
  )
}

export default Header