import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Input,
  Card,
  CardBody,
  Pagination,
} from "@windmill/react-ui";
import NotFound from "../../components/table/NotFound";
import Loading from "../../components/preloader/Loading";
import PageTitle from "../../components/Typography/PageTitle";
import ProjectServices from "../../services/ProjectServices";
import FederalAllocationTable from "../../components/allocations/FederalAllocationTable";

const FederalAllocation = () => {
  const [loading, setLoading] = useState(false);
  const [federalAllocations, setFederalAllocations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPage = async (page = 1) => {
    setLoading(true);

    const response = await ProjectServices.getFederalAllocations();

    setFederalAllocations(response.federals);

    setLoading(false);

    return response;
  };

  useEffect(() => {
    fetchPage();
  }, []);

  const handleSubmitForAll = () => {};

  const searchRef = useRef();

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const pageSize = 10;

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return federalAllocations.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, federalAllocations]);

  return (
    <>
      <PageTitle>Federal Allocations</PageTitle>

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

                <TableCell>Year</TableCell>
                <TableCell>Month</TableCell>
                <TableCell>Net Allocation</TableCell>

                {/* <TableCell className="text-right">Actions</TableCell> */}
              </tr>
            </TableHeader>

            <FederalAllocationTable allocations={currentTableData} />
          </Table>

          <TableFooter>
            {federalAllocations?.length > 0 && (
              <Pagination
                totalResults={federalAllocations?.length}
                resultsPerPage={10}
                onChange={(page) => handleChangePage(page)}
                label="Holding Bays Page Navigation"
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

export default FederalAllocation;
