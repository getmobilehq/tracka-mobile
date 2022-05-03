import React from "react";
import * as dayjs from "dayjs";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";

import MainModal from "../modal/MainModal";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import EditDeleteButton from "../table/EditDeleteButton";
import MainDrawer from "../drawer/MainDrawer";
import RidersDrawer from "../drawer/RidersDrawer";

const RidersTable = ({ riders }) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  const name = (rider) => `${rider.first_name} ${rider.last_name}`;

  return (
    <>
      <MainDrawer>
        <RidersDrawer id={serviceId} />
      </MainDrawer>

      {serviceId && <MainModal id={serviceId} />}

      <TableBody>
        {riders
          ? riders.map((rider, key) => (
              <TableRow key={rider.id}>
                <TableCell>
                  <span className="font-semibold uppercase text-xs">
                    {key + 1}
                  </span>
                </TableCell>

                <TableCell>
                  <div className="flex items-center">
                    <div>
                      <h2 className="text-sm font-medium capitalize">
                        {name(rider)}
                      </h2>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <span className="text-sm">{rider.email}</span>
                </TableCell>

                <TableCell>
                  <span className="text-sm">{rider.phone}</span>
                </TableCell>

                <TableCell>
                  <span className="text-sm">
                    {dayjs(rider.date_joined).format("MMM D, YYYY")}
                  </span>
                </TableCell>

                <TableCell>
                  <EditDeleteButton
                    id={rider.id}
                    handleUpdate={handleUpdate}
                    handleModalOpen={handleModalOpen}
                  />
                </TableCell>
              </TableRow>
            ))
          : null}
      </TableBody>
    </>
  );
};

export default RidersTable;
