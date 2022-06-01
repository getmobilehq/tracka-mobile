import React from "react";
import MainModal from "../modal/MainModal";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import ViewDetailButton from "../table/ViewDetailButton";
import MainDrawer from "../drawer/MainDrawer";
import CommunityNeedsDrawer from "../drawer/CommunityNeedsDrawer";

const BookingTable = ({ needs }) => {
  const { serviceId, handleUpdate } = useToggleDrawer();

  return (
    <>
      <MainModal id={serviceId} />

      <MainDrawer>
        {/* <VerifyBookingDrawer id={serviceId} /> */}
        <CommunityNeedsDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {needs?.map((need, idx) => (
          <TableRow key={need.id}>
            <TableCell>
              <span className="text-xs uppercase font-semibold">
                {" "}
                {idx + 1}
              </span>
            </TableCell>

            <TableCell>{need?.title}</TableCell>

            <TableCell>
              <span className="text-sm">{need?.description}</span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">{need?.category?.name}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm capitalize">{need?.status}</span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">{need?.lga}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm">{need.state}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm capitalize">{need?.upvote}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm capitalize">{need?.downvote}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {new Date(need.createdAt).toLocaleString()}
              </span>
            </TableCell>

            <TableCell className="flex justify-end items-center">
              <ViewDetailButton
                id={need.id}
                title="View More Details"
                noTitle={true}
                onClick={() => handleUpdate(need.id)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default React.memo(BookingTable);
