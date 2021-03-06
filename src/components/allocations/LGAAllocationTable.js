import React, { useState } from "react";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";
import numberFormatter from "../../utils/numberFormatter";

const LGAAllocationTable = ({ allocations }) => {
  return (
    <>
      <TableBody>
        {allocations?.map((allocation, key) => (
          <TableRow key={key}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">{key + 1}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm">{allocation.lga}</span>{" "}
            </TableCell>
            <TableCell>
              <span className="text-sm ">{allocation.state}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm ">{allocation.year}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm ">{allocation.month}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm ">
                {numberFormatter(allocation.net_allocation)}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default LGAAllocationTable;
