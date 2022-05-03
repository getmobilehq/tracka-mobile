import React from "react";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import EditDeleteButton from "../table/EditDeleteButton";
import MainModal from "../modal/MainModal";
import MainDrawer from "../drawer/MainDrawer";
import BayDrawer from "../drawer/BayDrawer";

const BayTable = ({ bays }) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      {serviceId && <MainModal id={serviceId} />}

      <MainDrawer>
        <BayDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {bays?.map((option, key) => (
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
              <span className="tetx-sm">{option.address}</span>
            </TableCell>

            <TableCell className="text-center">
              <span className="tetx-sm">
                {option.shipping_company_detail.name}
              </span>
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

export default BayTable;
