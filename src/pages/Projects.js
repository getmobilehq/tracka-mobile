import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Input,
  Card,
  CardBody,
  //   Pagination,
} from "@windmill/react-ui";
import NotFound from "../components/table/NotFound";
import Loading from "../components/preloader/Loading";
import PageTitle from "../components/Typography/PageTitle";
import ProjectsTable from "../components/projects/ProjectTable";
import Pagination from "../components/pagination";
import ProjectServices from "../services/ProjectServices";

const Projects = () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState([]);
  const [pageDetails, setPageDetails] = useState({});

  const fetchPage = async (page = 1) => {
    setLoading(true);
    const response = await ProjectServices.getProjectsPerPage(page);

    setLoading(false);

    console.log({ page, response });

    setProjects((prevProjects) => [...prevProjects, ...response.projects.data]);

    setPageDetails(response.projects);

    return response;
  };

  useEffect(() => {
    fetchPage();
  }, []);

  const handlePageChange = async (page) => {
    console.log("Setting Page Number", page);

    // console.log(page);
    setCurrentPage(page);

    page > pageDetails.current_page && fetchPage(page);
  };

  const pageSize = pageDetails?.per_page;
  const totalCount = pageDetails?.total;

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return projects.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pageSize, projects]);

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
                <TableCell>Title</TableCell>
                <TableCell>Region</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Code</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Agency</TableCell>
                <TableCell>Ministry</TableCell>
                <TableCell>Amount</TableCell>

                {/* <TableCell className="text-right">Actions</TableCell> */}
              </tr>
            </TableHeader>

            <ProjectsTable projects={currentTableData} />
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
        <NotFound title="Projects" />
      )}
    </>
  );
};

export default Projects;
