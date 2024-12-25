import React from 'react'
import Navigator from './Navigator'

function Footer({children}: {
    children: React.ReactNode
}) {
  return (
    <div className='flex flex-col'>
        <div className='h-[calc(100%-200px)]'>
            {children}
        </div>
        <section className='fixed lg:hidden h-[100px] w-full flex flex-row justify-between items-center p-4 bottom-0 left-0 right-0 bg-white'>
            <Navigator isFooter={true} />
        </section>
    </div>
  )
}

export default Footer