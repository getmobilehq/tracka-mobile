import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Tooltip from "../tooltip/Tooltip";

const EditDeleteButton = ({
  id,
  enableEdit = true,
  enableDelete = true,
  handleUpdate,
  handleModalOpen,
}) => {
  return (
    <>
      <div className="flex justify-end text-right">
        {enableEdit && (
          <div
            onClick={() => handleUpdate(id)}
            className="p-2 cursor-pointer text-gray-400 hover:text-blue-600"
          >
            <Tooltip
              id="edit"
              Icon={FiEdit}
              title="Edit"
              bgColor="rgba(28, 100, 242)"
            />
          </div>
        )}

        {enableDelete && (
          <div
            onClick={() => handleModalOpen(id)}
            className="p-2 cursor-pointer text-gray-400 hover:text-red-600"
          >
            <Tooltip
              id="delete"
              Icon={FiTrash2}
              title="Delete"
              bgColor="#EF4444"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default EditDeleteButton;
