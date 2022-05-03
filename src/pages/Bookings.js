import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Card,
  CardBody,
  Input,
  Button,
  Pagination,
} from "@windmill/react-ui";
import ReactTooltip from "react-tooltip";
import { BiExport } from "react-icons/bi";
import PageTitle from "../components/Typography/PageTitle";
import useFilter from "../hooks/useFilter";
import Loading from "../components/preloader/Loading";
import BookingTable from "../components/booking/bookingTable";
import { useBookingContext } from "../context/Booking";
import Tooltip from "../components/tooltip/Tooltip";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Bookings = () => {
  const { data, loading, refetchData } = useBookingContext();

  useEffect(() => {
    refetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    searchRef,
    handleChangePage,
    totalResults,
    resultsPerPage,
    dataTable,
    handleSubmitForAll,
  } = useFilter(data);

  return (
    <>
      <div className="flex justify-between items-center">
        <PageTitle>Bookings</PageTitle>

        <>
          <Button data-tip data-for="pdf-export">
            <a
              href={`${BASE_URL}/bookings/today/pdf`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <BiExport size={20} />
            </a>
          </Button>

          <ReactTooltip
            id="pdf-export"
            place="bottom"
            backgroundColor="rgba(28, 100, 242)"
          >
            <span className="text-sm font-medium">Export Today's Booking</span>
          </ReactTooltip>
        </>
      </div>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            onSubmit={handleSubmitForAll}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                ref={searchRef}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder="Search by booking"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-5 mr-1"
              ></button>
            </div>
          </form>
        </CardBody>
      </Card>

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
                <TableCell>Action</TableCell>
              </tr>
            </TableHeader>

            <BookingTable bookings={dataTable} />
          </Table>

          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Transaction Page Navigation"
            />
          </TableFooter>
        </TableContainer>
      )}
    </>
  );
};

export default Bookings;
