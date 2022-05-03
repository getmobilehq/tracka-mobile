import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Pagination,
  Button,
} from "@windmill/react-ui";
import { IoBagHandle } from "react-icons/io5";
import useFilter from "../hooks/useFilter";
import Loading from "../components/preloader/Loading";
import PageTitle from "../components/Typography/PageTitle";
import LocationDetailsTable from "../components/location/LocationDetailsTable";
import { FiPlus } from "react-icons/fi";
import { SidebarContext } from "../context/SidebarContext";
import LocationSubmitContextProvider from "../context/LocationSubmitContext";
import { useBayContext } from "../context/Bay";

const ViewBay = () => {
  const { bayId } = useParams();

  const { data, loading, error } = useBayContext();
  const { toggleDrawer } = useContext(SidebarContext);

  const currBay = data.find((bay, index) => bay.id === bayId);

  const { handleChangePage, totalResults, resultsPerPage, dataTable } =
    useFilter(data);

  return (
    <>
      <div className="mt-4 mb-6 flex items-center justify-between">
        <PageTitle>Bay Details</PageTitle>

        <div className="w-full md:w-56 lg:w-56 xl:w-56">
          <Button onClick={toggleDrawer} className="w-full rounded-md h-12">
            <span className="mr-3">
              <FiPlus />
            </span>
            Add More Centers
          </Button>
        </div>
      </div>

      {loading && <Loading loading={loading} />}
      {!error && !loading && dataTable.length === 0 && (
        <div className="w-full bg-white rounded-md dark:bg-gray-800">
          <div className="p-8 text-center">
            <span className="flex justify-center my-30 text-red-500 font-semibold text-6xl">
              <IoBagHandle />
            </span>
            <h2 className="font-medium text-base mt-4 text-gray-600">
              No Centers has been added
            </h2>
          </div>
        </div>
      )}

      {!error && !loading ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>S/N</TableCell>
                <TableCell>Center Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Number of Compartments</TableCell>
                <TableCell>Available Space</TableCell>
                <TableCell>Created At</TableCell>

                <TableCell className="text-center">Actions</TableCell>
              </tr>
            </TableHeader>
          </Table>

          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : null}
    </>
  );
};

export default ViewBay;
