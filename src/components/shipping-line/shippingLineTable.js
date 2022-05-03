import React from "react";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import EditDeleteButton from "../table/EditDeleteButton";
import MainModal from "../modal/MainModal";
import MainDrawer from "../drawer/MainDrawer";
import ShippingLineDrawer from "../drawer/ShippingLineDrawer";

const ShippingLineTable = ({ shippingLines }) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      {serviceId && <MainModal id={serviceId} />}

      <MainDrawer>
        <ShippingLineDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {shippingLines?.map((option, key) => (
          <TableRow key={option?.id}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">{key + 1}</span>
            </TableCell>

            <TableCell>
              <h2 className="text-sm capitalize font-medium">{option?.name}</h2>
            </TableCell>

            <TableCell>
              <span className="text-sm">{option?.email || "--"}</span>{" "}
            </TableCell>

            <TableCell>
              <span className="text-sm font-medium">
                {option?.phone || "--"}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm">{option?.address || "--"}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm">{option?.opening_hours || "--"}</span>
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

export default ShippingLineTable;
