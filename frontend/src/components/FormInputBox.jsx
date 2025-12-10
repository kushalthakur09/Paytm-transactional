import React from "react";

const FormInputBox = ({label,placeholder,type,onChange}) => {
  return (
    <div className="flex flex-col justify-between gap-1 lg:gap-2">
      <span className="font-bold">{label}{" "}:</span>
      <input
        type={type}
        placeholder={placeholder}
        className="p-1 px-2 lg:p-3  outline-0 border rounded-xl text-gray-600"
        onChange={onChange}
      ></input>
    </div>
  );
};

export default FormInputBox;
