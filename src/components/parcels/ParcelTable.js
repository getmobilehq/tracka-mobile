import React from "react";
import * as dayjs from "dayjs";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";

import Status from "../table/Status";
import SelectStatus from "../form/SelectStatus";
import parsePaymentName from "../../utils/parsePaymentName";

const ParcelTable = ({ parcels }) => {
  return (
    <>
      <TableBody>
        {parcels?.map((parcel, i) => (
          <TableRow key={parcel?.id}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">{i + 1}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm capitalize">{parcel?.name}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm capitalize">{parcel?.city}</span>
            </TableCell>

            <TableCell>
              {" "}
              <span className="text-sm">{parcel?.phone}</span>{" "}
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {parsePaymentName(parcel?.parcel_type)}
              </span>
            </TableCell>

            <TableCell className="text-center text-xs">
              <Status status={parcel?.status?.toLowerCase()} />
            </TableCell>

            <TableCell className="text-center">
              <SelectStatus parcel={parcel} />
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {dayjs(parcel?.created_at).format("MMM D, YYYY")}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default ParcelTable;
