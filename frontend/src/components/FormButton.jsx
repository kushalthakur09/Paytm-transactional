import React from 'react'

const FormButton = ({text,onClick}) => {
  return (
    <input type="button" value={text} onClick={onClick} className="p-1 sm:p-2 cursor-pointer rounded-2xl bg-black hover:bg-gray-600 text-white"></input>
  )
}

export default FormButton