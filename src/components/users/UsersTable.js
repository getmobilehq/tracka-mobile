import React, { useState } from "react";
import * as dayjs from "dayjs";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";
import MainModal from "../modal/MainModal";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import EditDeleteButton from "../table/EditDeleteButton";
import MainDrawer from "../drawer/MainDrawer";
import AdminDrawer from "../admin/AdminDrawer";
import { useLocation } from "react-router-dom";
import ViewDetailButton from "../table/ViewDetailButton";
import CustomerDetailDrawer from "../drawer/CustomerDetailDrawer";

const UsersTable = ({ users, isAdminTable }) => {
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
      {isAdminTable && serviceId && <MainModal id={serviceId} />}

      {isAdminTable && (
        <MainDrawer>
          <AdminDrawer />
        </MainDrawer>
      )}

      {serviceId && (
        <MainDrawer>
          <CustomerDetailDrawer customer={currentCustomer} />
        </MainDrawer>
      )}

      <TableBody>
        {users?.map((user, key) => (
          <TableRow key={user.id}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">{key + 1}</span>
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <h2 className="text-sm capitalize font-medium">
                    {name(user)}
                  </h2>
                </div>
              </div>
            </TableCell>

            <TableCell>
              <span className="text-sm">{user.email}</span>{" "}
            </TableCell>

            <TableCell>
              <span className="text-sm ">{user.phone}</span>
            </TableCell>

            {isAdminTable && (
              <TableCell>
                <span className="text-sm ">
                  {user?.role === "admin"
                    ? "Admin"
                    : user?.role === "shipping_admin"
                    ? "Shipping Admin"
                    : user?.role === "bay_admin"
                    ? "Bay Admin"
                    : ""}
                </span>
              </TableCell>
            )}

            {user.role === "user" && (
              <>
                <TableCell>
                  <span className="text-sm ">{user?.company_name || "--"}</span>
                </TableCell>

                <TableCell>
                  <span className="text-sm ">{user?.address || "--"}</span>
                </TableCell>

                <TableCell>
                  <span className="text-sm ">{user?.user_type || "--"}</span>
                </TableCell>
              </>
            )}

            <TableCell>
              <span className="text-sm">
                {dayjs(user.date_joined).format("MMM D, YYYY")}
              </span>
            </TableCell>

            <TableCell className="flex justify-end items-center">
              <ViewDetailButton
                id={user.id}
                title="Customer"
                onClick={() => toggleCustomerDetailDrawer(user)}
              />

              {location.pathname !== "/customer" && (
                <EditDeleteButton
                  id={user.id}
                  handleUpdate={() => {}}
                  handleModalOpen={handleModalOpen}
                  enableEdit={false}
                />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default UsersTable;
