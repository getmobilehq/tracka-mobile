import React from "react";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";
import numberFormatter from "../../utils/numberFormatter";
import EditDeleteButton from "../table/EditDeleteButton";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import MainModal from "../modal/MainModal";
import MainDrawer from "../drawer/MainDrawer";
import AllocationDrawer from "../drawer/AllocationDrawer";

const FederalAllocationTable = ({ allocations }) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      {serviceId && <MainModal id={serviceId} />}

      <MainDrawer>
        <AllocationDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {allocations?.map((allocation, key) => (
          <TableRow key={key}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">{key + 1}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm">{allocation.year}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm">{allocation.month}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {numberFormatter(allocation.netAllocation)}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm">{allocation.state}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm text-center">{allocation.lga}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm">{allocation.category}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {new Date(allocation.createdAt).toLocaleString()}
              </span>{" "}
            </TableCell>

            <TableCell className="flex justify-end items-center">
              <EditDeleteButton
                id={allocation.id}
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

export default FederalAllocationTable;

const data = {
  year: "2022",
  month: "Match",
  netAllocation: 23567488.9,
  category: "lga",
  state: "abia",
  lga: "Aba",
};
