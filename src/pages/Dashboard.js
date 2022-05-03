import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Pagination,
} from "@windmill/react-ui";
import { FiUsers, FiTruck, FiMapPin, FiTrendingUp } from "react-icons/fi";

import useFilter from "../hooks/useFilter";
import Loading from "../components/preloader/Loading";
import CardItem from "../components/dashboard/CardItem";
import PageTitle from "../components/Typography/PageTitle";
import { useShippingContext } from "../context/Shipping";
import { useBookingContext } from "../context/Booking";
import BookingTable from "../components/booking/bookingTable";
import { getUserRole } from "../utils/roles";
import { useAuthContext } from "../context/AuthContext";
import { useBayContext } from "../context/Bay";

const Dashboard = () => {
  // const { data: bookings } = useBookingContext();
  const { data: bays } = useBayContext();

  const {
    state: { adminInfo },
  } = useAuthContext();

  const userType = getUserRole(adminInfo);

  const loading = false;

  // const { handleChangePage, totalResults, resultsPerPage, dataTable } =
  //   useFilter(null);

  return (
    <>
      <PageTitle>Dashboard Overview</PageTitle>
      <div className={`grid gap-4 mb-8 md:grid-cols-2 xl:grid-cols-4`}>
        <CardItem
          title="Holding Bays"
          Icon={FiMapPin}
          quantity={0}
          className="text-orange-600 dark:text-orange-100 bg-orange-100 dark:bg-orange-500"
        />

        <CardItem
          title="Pending Bookings"
          Icon={FiTrendingUp}
          quantity={0}
          className="text-blue-600 dark:text-blue-100 bg-blue-100 dark:bg-blue-500"
        />

        <CardItem
          title="Customers"
          Icon={FiUsers}
          quantity={0}
          className="text-teal-600 dark:text-teal-100 bg-teal-100 dark:bg-teal-500"
        />

        <CardItem
          title="Completed Bookings"
          Icon={FiTruck}
          quantity={0}
          className="text-green-600 dark:text-green-100 bg-green-100 dark:bg-green-500"
        />
      </div>

      <PageTitle>Latest Bookings</PageTitle>

      {loading ? (
        <Loading loading={loading} />
      ) : (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>S/N</TableCell>
                <TableCell>Shipping Line</TableCell>
                <TableCell>Holding Bay</TableCell>
                <TableCell>Drop-Off Date</TableCell>
                <TableCell>Bill of Laden</TableCell>
                <TableCell>Container Number</TableCell>
                <TableCell>Container Size</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date of Booking</TableCell>
              </tr>
            </TableHeader>

            {/* <BookingTable bookings={dataTable} /> */}
          </Table>

          {/* <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Transaction Page Navigation"
            />  
          </TableFooter> */}
        </TableContainer>
      )}

      {/* <div className="mb-8">
        <Link
          className="underline hover:text-green-700 dark:text-gray-300"
          to="/transactions"
        >
          More Transactions
        </Link>
      </div> */}
    </>
  );
};

export default Dashboard;
