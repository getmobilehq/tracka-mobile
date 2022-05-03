import React, { useContext } from "react";
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
import PageTitle from "../components/Typography/PageTitle";
import { FiPlus } from "react-icons/fi";
import { SidebarContext } from "../context/SidebarContext";
import useFilter from "../hooks/useFilter";
import Loading from "../components/preloader/Loading";
import { useBayContext } from "../context/Bay";
import BayTable from "../components/bay/bayTable";

const HoldingBay = () => {
  const { toggleDrawer } = useContext(SidebarContext);

  const { data, loading } = useBayContext();

  const {
    searchRef,
    serviceData,
    handleChangePage,
    totalResults,
    resultsPerPage,
    dataTable,
    handleSubmitForAll,
  } = useFilter(data);

  return (
    <>
      <PageTitle>Holding Bays</PageTitle>

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
                placeholder="Search by holding bay"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-5 mr-1"
              ></button>
            </div>

            <div className="w-full md:w-56 lg:w-56 xl:w-56">
              <Button onClick={toggleDrawer} className="w-full rounded-md h-12">
                <span className="mr-3">
                  <FiPlus />
                </span>
                Add More Bays
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>

      {loading ? (
        <Loading loading={loading} />
      ) : (
        <TableContainer className="mb-8 rounded-b-lg">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>S/N</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Shipping Line</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Opening Hours</TableCell>

                <TableCell className="text-right">Actions</TableCell>
              </tr>
            </TableHeader>

            <BayTable bays={dataTable} />
          </Table>

          {serviceData.length > 0 && (
            <TableFooter>
              <Pagination
                totalResults={totalResults}
                resultsPerPage={resultsPerPage}
                onChange={handleChangePage}
                label="Holding Bays Page Navigation"
              />
            </TableFooter>
          )}
        </TableContainer>
      )}
    </>
  );
};

export default HoldingBay;