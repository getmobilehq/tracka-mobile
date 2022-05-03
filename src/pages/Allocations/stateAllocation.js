import React, { useRef } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Input,
  Card,
  CardBody,
} from "@windmill/react-ui";
import NotFound from "../../components/table/NotFound";
import Loading from "../../components/preloader/Loading";
import PageTitle from "../../components/Typography/PageTitle";
import { useProjectsContext } from "../../context/Projects";
import Pagination from "../../components/pagination";
import AllocationTable from "../../components/allocations/AllocationTable";

const StateAllocation = () => {
  const {
    loading,
    currentTableData,
    totalCount,
    pageSize,
    currentPage,
    handlePageChange,
  } = useProjectsContext();

  console.log({ currentTableData });

  const handleSubmitForAll = () => {};

  const searchRef = useRef();

  return (
    <>
      <PageTitle>State Allocations</PageTitle>

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
                <TableCell>State</TableCell>
                <TableCell>Allocation Area</TableCell>
                <TableCell>Allocation Type</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Month</TableCell>
                <TableCell>Net Allocation</TableCell>

                {/* <TableCell className="text-right">Actions</TableCell> */}
              </tr>
            </TableHeader>

            <AllocationTable allocations={currentTableData} />
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

export default StateAllocation;
