import React from "react";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import EditDeleteButton from "../table/EditDeleteButton";
import MainModal from "../modal/MainModal";
import MainDrawer from "../drawer/MainDrawer";
import CategoryDrawer from "../drawer/CategoryDrawer";

const CategoryTable = ({ categories }) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      {serviceId && <MainModal id={serviceId} />}

      <MainDrawer>
        <CategoryDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {categories?.map((option, key) => (
          <TableRow key={option?.id}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">{key + 1}</span>
            </TableCell>

            <TableCell>
              <div>
                <div>
                  <h2 className="text-sm capitalize font-medium">
                    {option?.name}
                  </h2>
                </div>
              </div>
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {new Date(option?.createdAt).toLocaleString() || "--"}
              </span>
            </TableCell>

            <TableCell className="flex justify-end items-center">
              <EditDeleteButton
                id={option.id}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CategoryTable;
