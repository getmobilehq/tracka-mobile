import React from "react";
import * as dayjs from "dayjs";
import Scrollbars from "react-custom-scrollbars";
import { useCommunityContext } from "../../context/Community";

// ========== FORM COMPONENTS =============
import Title from "../form/Title";
// ========== FORM COMPONENTS =============

const CommunityNeedsDrawer = ({ id }) => {
  const { currentTableData } = useCommunityContext();

  const need = currentTableData.find((need) => need.id === id);

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        <Title title="View Community Need" />
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
          <div className="mb-6">
            <strong>Title:</strong> {need?.title}
          </div>

          <div className="mb-6">
            <strong>Name:</strong> {need?.name}
          </div>

          <div className="mb-6">
            <strong>Description:</strong> {need?.description}
          </div>

          <div className="mb-6">
            <strong>Status:</strong> {need?.status}
          </div>

          <div className="mb-6">
            <strong>Category:</strong> {need?.category?.name}
          </div>

          <div className="mb-6">
            <strong>Address:</strong> {need?.address}
          </div>

          <div className="mb-6">
            <strong>LGA:</strong> {need?.lga}
          </div>

          <div className="mb-6">
            <strong>State:</strong> {need?.state}
          </div>

          <div className="mb-6">
            <strong>Number of Views:</strong> {need?.num_views}
          </div>

          <div className="mb-6">
            <strong>Upvote:</strong> {need?.upvote}
          </div>

          <div className="mb-6">
            <strong>Downvote:</strong> {need?.downvote}
          </div>

          <div className="mb-6">
            <strong>Stake Holder Name:</strong> {need?.stakeHolderName}
          </div>

          <div className="mb-6">
            <strong>Stake Holder Email:</strong>{" "}
            {need?.stakeHolderEmail || "--"}
          </div>

          <div className="mb-6">
            <strong>Stake Holder Mobile:</strong>{" "}
            {need?.stakeHolderMobile || "--"}
          </div>

          <div className="mb-6">
            <strong>Stake Holder Name:</strong> {need?.stakeHolderName || "--"}
          </div>

          <div className="mb-6">
            <strong>Added By:</strong> {`${need?.user?.firstName || "-"}`} $
            {need?.user?.lastName || "-"}`
          </div>

          <div className="mb-6">
            <strong>Date Added: </strong>

            {dayjs(need?.createdAt).format("MMM D, YYYY")}
          </div>
        </div>
      </Scrollbars>
    </>
  );
};

export default CommunityNeedsDrawer;
