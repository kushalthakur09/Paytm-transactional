import React from "react";
import { Link } from "react-router-dom";

const FormFooter = ({ title, to, label }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-center text-center">
      <p>
        {title}
      </p>
        <Link className="cursor-pointer underline hover:text-blue-500" to={to}>{label}</Link>
    </div>
  );
};

export default FormFooter;
