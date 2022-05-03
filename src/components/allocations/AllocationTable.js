import React, { useState } from "react";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import { useLocation } from "react-router-dom";
import numberFormatter from "../../utils/numberFormatter";

const AllocationTable = ({ allocations }) => {
  const [currentCustomer, setCurrentCustomer] = useState({});

  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  const location = useLocation();

  const name = (user) => `${user.first_name} ${user.last_name}`;

  const toggleCustomerDetailDrawer = (user) => {
    handleUpdate(user.id);
    setCurrentCustomer(user);
  };

  return (
    <>
      {/* {serviceId && <MainModal id={serviceId} />}

      {
        <MainDrawer>
          <AdminDrawer />
        </MainDrawer>
      }

      {serviceId && (
        <MainDrawer>
          <CustomerDetailDrawer customer={currentCustomer} />
        </MainDrawer>
      )} */}

      <TableBody>
        {allocations?.map((project, key) => (
          <TableRow key={key}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">{key + 1}</span>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <div>
                  <h2 className="text-sm capitalize font-medium">
                    {project.state}
                  </h2>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <span className="text-sm">{project.allocation_area}</span>{" "}
            </TableCell>
            <TableCell>
              <span className="text-sm ">{project.allocation_type}</span>
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

export default AllocationTable;
