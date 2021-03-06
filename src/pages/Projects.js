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
  Pagination,
} from "@windmill/react-ui";
import NotFound from "../components/table/NotFound";
import Loading from "../components/preloader/Loading";
import PageTitle from "../components/Typography/PageTitle";
import ProjectsTable from "../components/projects/ProjectTable";
// import Pagination from "../components/pagination";
import { useProjectsContext } from "../context/Projects";

const Projects = () => {
  const {
    loading,
    totalCount,
    pageSize,
    currentPage,
    currentTableData,
    handlePageChange,
  } = useProjectsContext();

  const handleSubmitForAll = () => {};

  const searchRef = useRef();

  return (
    <>
      <PageTitle>Projects</PageTitle>

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
                placeholder="Search Projects"
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
          <Table className="table-auto">
            <TableHeader>
              <tr>
                <TableCell>S/N</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Source Link</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Number of Views</TableCell>
                <TableCell>Upvote</TableCell>
                <TableCell>Downvote</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Amount Disbursed</TableCell>
                <TableCell>Created At</TableCell>

                <TableCell className="text-right">Actions</TableCell>
              </tr>
            </TableHeader>

            <ProjectsTable projects={currentTableData} />
          </Table>

          <TableFooter>
            {currentTableData?.length > 0 && (
              <>
                <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={totalCount}
                  pageSize={pageSize}
                  onPageChange={(page) => handlePageChange(page)}
                />

                {/* <Pagination
                  totalResults={totalCount}
                  resultsPerPage={pageSize}
                  onChange={(page, i) => {
                    console.log({ page, i });
                    handlePageChange(page);
                  }}
                  label="Page navigation"
                /> */}
              </>
            )}
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Projects" />
      )}
    </>
  );
};

export default Projects;
