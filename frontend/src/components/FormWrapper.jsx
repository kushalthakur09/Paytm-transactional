import React from "react";

const FormWrapper = ({ children }) => {
  return (
    <div className="p-4 sm:p-5 lg:p-8  bg-white shadow-2xl min-h-[30vh] h-auto w-3/4  sm:w-3/5 rounded-2xl flex flex-col gap-1 sm:gap-2">
      {children}
    </div>
  );
};

export default FormWrapper;
