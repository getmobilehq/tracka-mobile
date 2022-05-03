import React from "react";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";
import numberFormatter from "../../utils/numberFormatter";

const FederalAllocationTable = ({ allocations }) => {
  return (
    <>
      <TableBody>
        {allocations?.map((project, key) => (
          <TableRow key={key}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">{key + 1}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm ">{project.year}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm ">{project.month}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm ">
                {numberFormatter(project.net_allocation)}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default FederalAllocationTable;
