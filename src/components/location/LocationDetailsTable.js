import React from "react";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";
import EditDeleteButton from "../table/EditDeleteButton";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import * as dayjs from "dayjs";
import MainDrawer from "../drawer/MainDrawer";
import SubLocationDrawer from "../drawer/SubLocationDrawer/index";
import MainModal from "../modal/MainModal";

const LocationDetailsTable = ({ centers }) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      <MainDrawer>
        <SubLocationDrawer id={serviceId} />
      </MainDrawer>

      {serviceId && <MainModal id={serviceId} />}

      <TableBody>
        {centers?.map((center, i) => (
          <TableRow key={center.id}>
            <TableCell>
              <span className="text-xs uppercase font-semibold"> {i + 1}</span>
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <h2 className="text-sm font-medium">{center?.center_name}</h2>
                </div>
              </div>
            </TableCell>

            <TableCell>
              <span className="text-sm">{center?.address}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm">{center?.no_of_compartment}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm">{center?.available_space}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {dayjs(center?.created_at).format("MMM D, YYYY")}
              </span>
            </TableCell>

            <TableCell className="flex justify-end items-center">
              <EditDeleteButton
                id={center?.id}
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

export default React.memo(LocationDetailsTable);
