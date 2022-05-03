import React from "react";
import MainModal from "../modal/MainModal";
import { useLocation } from "react-router-dom";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import ViewDetailButton from "../table/ViewDetailButton";
import Status from "../table/Status";
import MainDrawer from "../drawer/MainDrawer";
import VerifyBookingDrawer from "../drawer/BookingDrawer";

const BookingTable = ({ bookings }) => {
  const { serviceId, handleUpdate } = useToggleDrawer();

  const location = useLocation();

  return (
    <>
      {/* <MainModal id={serviceId} /> */}

      <MainDrawer>
        <VerifyBookingDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {bookings?.map((booking, idx) => (
          <TableRow key={booking.id}>
            <TableCell>
              <span className="text-xs uppercase font-semibold">
                {" "}
                {idx + 1}
              </span>
            </TableCell>

            <TableCell>{booking?.shipping_company_detail?.name}</TableCell>

            <TableCell>
              <span className="text-sm">{booking?.bay_area_detail?.name}</span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">{booking?.date}</span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">{booking?.laden_number}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm">{booking.container_number}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm capitalize">
                {booking?.container_size}
              </span>
            </TableCell>

            <TableCell>
              <Status status={booking?.status?.toLowerCase()} />
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {new Date(booking.date_created).toLocaleString()}
              </span>
            </TableCell>

            {location.pathname !== "/dashboard" && (
              <TableCell className="flex justify-end items-center">
                <ViewDetailButton
                  id={booking.id}
                  title="Verify Booking"
                  noTitle={true}
                  onClick={() => handleUpdate(booking.id)}
                />
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default React.memo(BookingTable);
