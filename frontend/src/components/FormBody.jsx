import React from "react";

const FormBody = ({ children }) => {
  return <div className='flex justify-center items-center border-2 h-screen w-screen bg-slate-300 xl:px-40 2xl:px-60' >
       {children}
    </div>;
};

export default FormBody;
