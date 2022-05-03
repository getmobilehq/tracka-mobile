import React from "react";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";

import MainModal from "../modal/MainModal";
import EditDeleteButton from "../table/EditDeleteButton";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import Tooltip from "../tooltip/Tooltip";
import { FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import MainDrawer from "../drawer/MainDrawer";
import LocationDrawer from "../drawer/LocationDrawer";

const LocationTable = ({ locations }) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      <MainDrawer>
        <LocationDrawer id={serviceId} />
      </MainDrawer>

      {serviceId && <MainModal id={serviceId} />}

      <TableBody>
        {locations?.map((location, i) => (
          <TableRow key={location.name + i + 1}>
            <TableCell>
              <span className="text-xs uppercase font-semibold"> {i + 1}</span>
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <h2 className="text-sm font-medium">{location?.name}</h2>
                </div>
              </div>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">{location?.centers?.length}</span>
            </TableCell>

            <TableCell className="flex justify-end items-center">
              <div className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                {" "}
                <Link
                  to={`/location/${
                    location?.name?.split(" ").join("_").toLowerCase() || i
                  }`}
                >
                  <Tooltip
                    id="view"
                    Icon={FiEye}
                    title="View Location"
                    bgColor="#34D399"
                  />
                </Link>
              </div>

              <EditDeleteButton
                id={location?.name}
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

export default React.memo(LocationTable);
