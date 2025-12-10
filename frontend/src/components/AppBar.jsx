import React from 'react'
import Avatar from './Avatar'

const AppBar = ({username}) => {
  return (
    <div className='shadow h-14 flex justify-between  px-4 py-3 sm:px-5 sm:py-3 md:px-7 md:py-2 rounded-xl'>
             <div className='flex justify-center items-center'>PayTm</div>
             <div className='flex gap-1 sm:gap-2 justify-center items-center'>
                <div className='flex justify-center items-center'>Hello</div>
                <Avatar username={username}></Avatar>
             </div>
    </div>
  )
}   

export default AppBar