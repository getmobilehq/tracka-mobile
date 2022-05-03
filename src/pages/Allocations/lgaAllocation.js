import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Input,
  Select,
  Card,
  CardBody,
} from "@windmill/react-ui";
import NotFound from "../../components/table/NotFound";
import Loading from "../../components/preloader/Loading";
import PageTitle from "../../components/Typography/PageTitle";
import ProjectServices from "../../services/ProjectServices";
import useAsync from "../../hooks/useAsync";
import LGAAllocationTable from "../../components/allocations/LGAAllocationTable";
import Pagination from "../../components/pagination";

const LGAAllocation = () => {
  const [loading, setLoading] = useState(false);
  const [isLGALoading, setIsLGALoading] = useState(false);
  const [states, setStates] = useState([]);
  const [lgas, setLGAs] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedLGA, setSelectedLGA] = useState("");
  const [pageDetails, setPageDetails] = useState({});

  const [lgaAllocations, setLGAAllocations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: statesData, loading: isStatesLoading } = useAsync(
    ProjectServices.getStates
  );

  useEffect(() => {
    if (statesData) {
      setStates(statesData.states);
    }
  }, [statesData]);

  const fetchPage = async (lga, state, page = 1, pageSize = 10) => {
    setLoading(true);

    const response = await ProjectServices.getLgaAllocations(
      lga,
      state,
      page,
      pageSize
    );

    setLoading(false);

    setLGAAllocations((prevState) => [
      ...prevState,
      ...response.allocations.data,
    ]);

    setPageDetails(response.allocations);

    return response;
  };

  const fetchLGAs = async (state) => {
    setIsLGALoading(true);

    const response = await ProjectServices.getLGAs(state);

    setLGAs(response.lgas);

    setIsLGALoading(false);

    return response;
  };

  // useEffect(() => {
  //   fetchPage();
  // }, []);

  const onChangeState = (state) => {
    console.log(state);

    setSelectedState(state);

    fetchLGAs(state);
  };

  const onChangeLGA = (lga) => {
    console.log(lga);

    setSelectedLGA(lga);

    fetchPage(lga, selectedState);
  };

  const handleSubmit = () => {};

  const handleChangePage = (page) => {
    console.log("setting page", page);

    setCurrentPage(page);

    page > pageDetails.current_page && fetchPage(selectedLGA, selectedState);
  };

  const pageSize = 10;

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return lgaAllocations.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, lgaAllocations]);

  return (
    <>
      <PageTitle>Federal Allocations</PageTitle>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            onSubmit={handleSubmit}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:grid-cols-2 xl:grid-cols-2"
          >
            {/* <div>
              <Input
                ref={searchRef}
                type="search"
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                placeholder="Search by phone"
              />
            </div> */}

            <div>
              <Select
                onChange={(e) => onChangeState(e.target.value)}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                disabled={isStatesLoading}
              >
                <option value="Status" defaultValue hidden>
                  States
                </option>

                {states?.map((state) => (
                  <option key={state.id} value={state.slug}>
                    {state.name}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Select
                onChange={(e) => onChangeLGA(e.target.value)}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                disabled={isLGALoading || !selectedState}
              >
                <option value="Order limits" defaultValue hidden>
                  LGA
                </option>
                {lgas?.map((lga) => (
                  <option key={lga.id} value={lga.slug}>
                    {lga.name}
                  </option>
                ))}
              </Select>
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
                <TableCell>LGA</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Month</TableCell>
                <TableCell>Net Allocation</TableCell>

                {/* <TableCell className="text-right">Actions</TableCell> */}
              </tr>
            </TableHeader>

            <LGAAllocationTable allocations={currentTableData} />
          </Table>

          <TableFooter>
            {lgaAllocations?.length > 0 && (
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={lgaAllocations?.length}
                pageSize={pageSize}
                onPageChange={(page) => handleChangePage(page)}
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

export default LGAAllocation;
