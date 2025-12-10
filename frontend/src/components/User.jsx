import React from 'react'
import Avatar from './Avatar'
import { useNavigate } from 'react-router-dom'

const User = ({user}) => {
    const navigate=useNavigate();
  return (
    <div  className='flex pt-3 justify-between items-center'>
        <Avatar username={user.username}></Avatar>
        <div className='flex justify-start pr-2 text-left w-4/5'>{user.firstName}{" "}{user.lastName}</div>
        <button type="button" onClick={()=>navigate(`/sendmoney?username=${user.username}&id=${user._id}`)} className="w-1/8 cursor-pointer text-white bg-black box-border border border-transparent hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 shadow-xs font-medium leading-5 rounded-xl text-sm  py-1 focus:outline-none">SEND</button>
    </div>
  )
}

export default User