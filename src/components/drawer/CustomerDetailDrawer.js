import React from "react";
import * as dayjs from "dayjs";
import Scrollbars from "react-custom-scrollbars";

// ========== FORM COMPONENTS =============
import Title from "../form/Title";
// ========== FORM COMPONENTS =============

const CustomerDetailDrawer = ({ customer }) => {
  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        <Title title="View Customer" />
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
          <div className="mb-6">
            <strong>Name:</strong>{" "}
            {`${customer?.first_name} ${customer?.last_name}`}
          </div>

          <div className="mb-6">
            <strong>Email:</strong> {customer?.email}
          </div>

          <div className="mb-6">
            <strong>Phone:</strong> {customer?.phone}
          </div>

          <div className="mb-6">
            <strong>Company Name:</strong> {customer?.company_name}
          </div>

          <div className="mb-6">
            <strong>Address:</strong> {customer?.address}
          </div>

          <div className="mb-6">
            <strong>Role:</strong> {customer?.user_type}
          </div>

          <div className="mb-6">
            <strong>Date Joined: </strong>

            {dayjs(customer?.date_joined).format("MMM D, YYYY")}
          </div>
        </div>
      </Scrollbars>
    </>
  );
};

export default CustomerDetailDrawer;
