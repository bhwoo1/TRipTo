import React from 'react'
import SearchBar from '../SearchBar'

function Header({children}: {
    children: React.ReactNode
}) {
  return (
    <div className='flex flex-col'>
        <section className='h-[80px] bg-neutral-500 flex flex-row justify-between items-center'>
            <div>
             Header
            </div>
            <div className='lg:w-[480px] w-[240px]'>
                <SearchBar />
            </div>
            <div>
                Header
            </div>
        </section>
        <div className='h-[calc(100% - 80px)]'>
            {children}
        </div>
    </div>
  )
}

export default Header