import React from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableContainer,
} from "@windmill/react-ui";
import { FiTrendingUp } from "react-icons/fi";
import { GrMoney } from "react-icons/gr";
import Loading from "../components/preloader/Loading";
import CardItem from "../components/dashboard/CardItem";
import PageTitle from "../components/Typography/PageTitle";
import { useProjectsContext } from "../context/Projects";
import ProjectsTable from "../components/projects/ProjectTable";

const Dashboard = () => {
  const { pageDetails, loading, currentTableData } = useProjectsContext();

  console.log({ pageDetails });

  return (
    <>
      <PageTitle>Dashboard Overview</PageTitle>
      <div className={`grid gap-4 mb-8 md:grid-cols-2 xl:grid-cols-2`}>
        <CardItem
          title="Projects"
          Icon={FiTrendingUp}
          quantity={pageDetails?.total || 0}
          className="text-blue-600 dark:text-blue-100 bg-blue-100 dark:bg-blue-500"
        />

        <CardItem
          title="Allocations"
          Icon={GrMoney}
          quantity={0}
          className="text-teal-600 dark:text-teal-100 bg-teal-100 dark:bg-teal-500"
        />
      </div>

      <PageTitle>Latest Projetcs</PageTitle>

      {loading ? (
        <Loading loading={loading} />
      ) : (
        currentTableData?.length !== 0 && (
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
                </tr>
              </TableHeader>

              <ProjectsTable projects={currentTableData.slice(0, 6)} />
            </Table>
          </TableContainer>
        )
      )}
    </>
  );
};

export default Dashboard;
