import React from 'react'

const Balance = ({balance}) => {
  return (
    <div className='h-14 flex justify-start items-center'>
         <div>Your Account Balance Is : <span className='font-bold'>{balance}</span></div>
    </div>
  )
}

export default Balance