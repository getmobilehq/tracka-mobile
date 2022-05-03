import React from "react";
import { Input } from "@windmill/react-ui";

const CustomInputValue = ({
  register,
  required,
  minValue,
  maxValue,
  defaultValue,
  name,
  label,
  type,
  placeholder,
  index,
}) => {
  const value = {
    valueAsNumber: true,
    required: required ? false : `${label} is required!`,
    max: {
      value: maxValue,
      message: `Maximum value ${maxValue}!`,
    },
    min: {
      value: minValue,
      message: `Minimum value ${minValue}!`,
    },
  };
  return (
    <>
      <Input
        {...register(`centers.${index}.${name}`, value)}
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
        name={`centers.${index}.${name}`}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
      />
    </>
  );
};

export default CustomInputValue;
