import React from 'react'
import SearchBar from '../SearchBar'
import Logo from './Logo'

function Header({children}: {
    children: React.ReactNode
}) {
  return (
    <div className='flex flex-col'>
        <section className='h-[100px] flex flex-row justify-between items-center p-4'>
            <div className='h-[100px] min-w-[100px]'>
                <div className='lg:hidden flex'>
                <Logo />
             </div>
            </div>
            <div className='lg:w-[480px] w-[240px] mt-2 p-4'>
                <SearchBar />
            </div>
        </section>
        <div className='h-[calc(100% - 80px)]'>
            {children}
        </div>
    </div>
  )
}

export default Header