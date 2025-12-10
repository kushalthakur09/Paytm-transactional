import React from 'react'

const Avatar = ({username}) => {
  return (
    <div className='rounded-full text-sm md:text-base lg:text-lg  font-medium py-0 px-3  md:py-2 md:px-4 bg-slate-300 text-white flex justify-center items-center h-full' >{username.charAt(0)}</div>
  )
}

export default Avatar;