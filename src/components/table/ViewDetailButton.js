import React from "react";
import { FiEye } from "react-icons/fi";
import Tooltip from "../tooltip/Tooltip";

const ViewDetailButton = ({
  id,
  noTitle,
  title,
  enableView = true,
  ...rest
}) => {
  return (
    <>
      {enableView && (
        <div
          className="p-2 cursor-pointer text-gray-400 hover:text-green-600"
          {...rest}
        >
          {" "}
          <Tooltip
            id="view"
            Icon={FiEye}
            title={noTitle ? title : `View ${title}`}
            bgColor="#34D399"
          />
        </div>
      )}
    </>
  );
};

export default ViewDetailButton;
