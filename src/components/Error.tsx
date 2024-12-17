import React from 'react'
import { HashLoader } from 'react-spinners'

function Error() {
    return (
        <div className=' my-20 flex flex-col items-center justify-center gap-4'>
            <HashLoader color='red' />
            <div className='font-bold text-2xl'>Ooops!</div>
            <div>에러가 발생했습니다. 잠시 후 다시 시도해주세요.</div>
        </div>
      )
}

export default Error