import React from "react";
import * as dayjs from "dayjs";
import MainModal from "../modal/MainModal";
import numberFormatter from "../../utils/numberFormatter";
import { useLocation } from "react-router-dom";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import ViewDetailButton from "../table/ViewDetailButton";
import EditDeleteButton from "../table/EditDeleteButton";

const TransactionTable = ({ transactions, toggleTransactionDetailDrawer }) => {
  const { serviceId } = useToggleDrawer();

  const location = useLocation();

  const getUsersName = (user) => `${user?.first_name} ${user?.last_name}`;
  const parsePaymentName = (name) => {
    if (name === "self_storage") {
      return "Self Storage";
    }

    if (name === "customer_to_customer") {
      return "Customer to Customer";
    }

    if (name === "courier_to_customer") {
      return "Courier to Customer";
    }
  };

  return (
    <>
      <MainModal id={serviceId} />

      <TableBody>
        {transactions?.map((transaction, idx) => (
          <TableRow key={transaction.id}>
            <TableCell>
              <span className="text-xs uppercase font-semibold">
                {" "}
                {idx + 1}
              </span>
            </TableCell>

            <TableCell>{transaction?.shipping_line}</TableCell>

            <TableCell>
              <span className="text-sm">{transaction.holding_bay}</span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">{transaction?.drop_off_date}</span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">{transaction?.bill_of_laden}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm">{transaction.container_number}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm capitalize">
                {transaction?.container_size}
              </span>
            </TableCell>

            {/* {location.pathname !== "/dashboard" && (
              <TableCell className="flex justify-end items-center">
                <ViewDetailButton
                  id={transaction.id}
                  title="Transaction"
                  onClick={() => toggleTransactionDetailDrawer(transaction)}
                />

                <EditDeleteButton
                  id={transaction.id}
                  handleUpdate={() => {}}
                  handleModalOpen={() => {}}
                  enableEdit={false}
                  enableDelete={false}
                />
              </TableCell>
            )} */}
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default React.memo(TransactionTable);
