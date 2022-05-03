import React from "react";
import { Select } from "@windmill/react-ui";

const SelectRole = ({ setAdminType, register, name, label }) => {
  return (
    <>
      <Select
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: `${label} is required!`,
        })}
        onChange={(e) => setAdminType(e.target.value)}
      >
        <option value="" defaultValue hidden>
          Select Type
        </option>
        <option value="Holding Bay">Holding Bay</option>
        <option value="Shipping Line">Shipping Line</option>
      </Select>
    </>
  );
};

export default SelectRole;
