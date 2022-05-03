import React from "react";
import { Select } from "@windmill/react-ui";
import { useBayContext } from "../../context/Bay";

const SelectHoldingBay = ({ register, name, label }) => {
  const { data: bays } = useBayContext();

  return (
    <>
      <Select
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: `${label} is required!`,
        })}
      >
        <option value="" defaultValue hidden>
          Select
        </option>
        {bays?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </Select>
    </>
  );
};

export default SelectHoldingBay;
