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
import { usePartnerContext } from "../context/Partners";
import { FiPlus } from "react-icons/fi";
import { SidebarContext } from "../context/SidebarContext";
import RidersTable from "../components/delivery/RidersTable";

const ViewPartner = () => {
  const { partner } = useParams();
  const { data, loading, error } = usePartnerContext();
  const { toggleDrawer } = useContext(SidebarContext);

  const currPartner = data?.find(
    (item, i) => item.name.split(" ").join("_").toLowerCase() === partner
  );

  const { handleChangePage, totalResults, resultsPerPage, dataTable } =
    useFilter(currPartner?.users);

  return (
    <>
      <div className="mt-4 mb-6 flex items-center justify-between">
        <PageTitle>Partner Details</PageTitle>

        <div className="w-full md:w-56 lg:w-56 xl:w-56">
          <Button onClick={toggleDrawer} className="w-full rounded-md h-12">
            <span className="mr-3">
              <FiPlus />
            </span>
            Add More Riders
          </Button>
        </div>
      </div>

      {loading && <Loading loading={loading} />}
      {!error && !loading && dataTable?.length === 0 && (
        <div className="w-full bg-white rounded-md dark:bg-gray-800">
          <div className="p-8 text-center">
            <span className="flex justify-center my-30 text-red-500 font-semibold text-6xl">
              <IoBagHandle />
            </span>
            <h2 className="font-medium text-base mt-4 text-gray-600">
              No Rider has been added.
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
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Joining Date</TableCell>

                <TableCell className="text-center">Actions</TableCell>
              </tr>
            </TableHeader>

            <RidersTable riders={dataTable} />
          </Table>

          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Table Navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : null}
    </>
  );
};

export default ViewPartner;
