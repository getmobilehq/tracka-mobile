import React, { useRef, useContext } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Input,
  Card,
  CardBody,
  Button,
} from "@windmill/react-ui";
import { FiPlus } from "react-icons/fi";
import Pagination from "../../components/pagination";
import NotFound from "../../components/table/NotFound";
import Loading from "../../components/preloader/Loading";
import PageTitle from "../../components/Typography/PageTitle";
import FederalAllocationTable from "../../components/allocations/FederalAllocationTable";
import { useAllocationsContext } from "../../context/Allocations";
import { SidebarContext } from "../../context/SidebarContext";

const Allocations = () => {
  const { toggleDrawer } = useContext(SidebarContext);

  const {
    loading,
    totalCount,
    pageSize,
    currentPage,
    currentTableData,
    handlePageChange,
  } = useAllocationsContext();

  const handleSubmitForAll = () => {};

  const searchRef = useRef();

  return (
    <>
      <PageTitle>Allocations</PageTitle>

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
                placeholder="Search by name/email/phone"
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
                Create Allocations
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>

      {loading ? (
        <Loading loading={loading} />
      ) : currentTableData?.length !== 0 ? (
        <TableContainer className="mb-8 rounded-b-lg">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>S/N</TableCell>

                <TableCell>Year</TableCell>
                <TableCell>Month</TableCell>
                <TableCell>Net Allocation</TableCell>
                <TableCell>State</TableCell>
                <TableCell>LGA</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Created At</TableCell>

                <TableCell className="text-right">Actions</TableCell>
              </tr>
            </TableHeader>

            <FederalAllocationTable allocations={currentTableData} />
          </Table>

          <TableFooter>
            {currentTableData?.length > 0 && (
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={totalCount}
                pageSize={pageSize}
                onPageChange={(page) => handlePageChange(page)}
              />
            )}
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Allocations" />
      )}
    </>
  );
};

export default Allocations;
