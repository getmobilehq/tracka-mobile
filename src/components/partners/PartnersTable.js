import React from "react";
import * as dayjs from "dayjs";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";

import useToggleDrawer from "../../hooks/useToggleDrawer";
import EditDeleteButton from "../table/EditDeleteButton";
import { Link } from "react-router-dom";
import Tooltip from "../tooltip/Tooltip";
import { FiEye } from "react-icons/fi";

const PartnersTable = ({ partners }) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      {/* {isAdminTable && serviceId && <MainModal id={serviceId} />}

      {isAdminTable && (
        <MainDrawer>
          <AdminDrawer />
        </MainDrawer>
      )} */}

      <TableBody>
        {partners?.map((partner, key) => (
          <TableRow key={partner?.name}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">{key + 1}</span>
            </TableCell>

            <TableCell>
              <div>
                <div>
                  <h2 className="text-sm capitalize font-medium">
                    {partner?.name}
                  </h2>
                </div>
              </div>
            </TableCell>

            <TableCell>
              <span className="text-sm ">{partner?.users?.length}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {dayjs(partner?.date_joined).format("MMM D, YYYY")}
              </span>
            </TableCell>

            <TableCell className="flex justify-end items-center">
              <div className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                {" "}
                <Link
                  to={`/logistic-partners/${
                    partner?.name?.split(" ").join("_").toLowerCase() ||
                    partner?.id
                  }`}
                >
                  <Tooltip
                    id="view"
                    Icon={FiEye}
                    title="View Partner"
                    bgColor="#34D399"
                  />
                </Link>
              </div>

              <EditDeleteButton
                id={partner?.name || partner?.id}
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

export default PartnersTable;
