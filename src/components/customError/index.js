import React from "react";

const CustomError = (props) => {
  return (
    <div className="mt-8 rounded w-full p-4 bg-red-200 text-red-800">
      {props.children}
    </div>
  );
};

export default CustomError;
