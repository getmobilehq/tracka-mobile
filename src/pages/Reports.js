import React, { useContext, useState } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Card,
  CardBody,
  Input,
  Pagination,
} from "@windmill/react-ui";
import PageTitle from "../components/Typography/PageTitle";
import useFilter from "../hooks/useFilter";
import useAsync from "../hooks/useAsync";
import Loading from "../components/preloader/Loading";
import TransactionTable from "../components/transaction/TransactionTable.js";
import MainDrawer from "../components/drawer/MainDrawer";
import TransactionDrawer from "../components/drawer/CustomerDetailDrawer";
import { SidebarContext } from "../context/SidebarContext";
import TransactionServices from "../services/TransactionServices";

const reportData = [
  {
    shipping_line: "Sifax Shipping Company LTD",
    holding_bay: "Apppa North Holding Bay",
    drop_off_date: "Sun Jan 16 2021",
    bill_of_laden: "22298329802",
    container_number: "MHOP23456039",
    container_size: "40 feet",
  },
  {
    shipping_line: "Consignee Shipping Company LTD",
    holding_bay: "Apppa North Holding Bay",
    drop_off_date: "Sun Jan 19 2021",
    bill_of_laden: "32928211002",
    container_number: "MHOP23456039",
    container_size: "20 feet",
  },
  {
    shipping_line: "Maersk Shipping Company LTD",
    holding_bay: "Apppa North Holding Bay",
    drop_off_date: "Sun Jan 16 2021",
    bill_of_laden: "222211002",
    container_number: "MHOP23456039",
    container_size: "40 feet",
  },
];

const Reports = () => {
  const [currentTransaction, setCurrentTransaction] = useState();

  const loading = false;

  //   const { data, loading } = useAsync(TransactionServices.getAllPayments);
  const { toggleDrawer } = useContext(SidebarContext);

  const {
    searchRef,
    serviceData,
    handleChangePage,
    totalResults,
    resultsPerPage,
    dataTable,
    handleSubmitForAll,
  } = useFilter(reportData);

  const toggleTransactionDetailDrawer = (transaction) => {
    setCurrentTransaction(transaction);

    toggleDrawer();
  };

  return (
    <>
      <PageTitle>Reports</PageTitle>

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
                placeholder="Search by report detail"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-5 mr-1"
              ></button>
            </div>
          </form>
        </CardBody>
      </Card>

      <MainDrawer>
        {currentTransaction ? (
          <TransactionDrawer currentTransaction={currentTransaction} />
        ) : null}
      </MainDrawer>

      {loading ? (
        <Loading loading={loading} />
      ) : (
        <TableContainer className="mb-8 rounded-b-lg">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>S/N</TableCell>
                <TableCell>Shipping Line</TableCell>
                <TableCell>Holding Bay</TableCell>
                <TableCell>Drop-Off Date</TableCell>
                <TableCell>Bill of Laden</TableCell>
                <TableCell>Container Number</TableCell>
                <TableCell>Container Size</TableCell>

                {/* <TableCell>Date of Transaction</TableCell>

                <TableCell className="text-center">Actions</TableCell> */}
              </tr>
            </TableHeader>

            <TransactionTable
              transactions={dataTable}
              toggleTransactionDetailDrawer={toggleTransactionDetailDrawer}
            />
          </Table>

          {serviceData?.length > 0 && (
            <TableFooter>
              <Pagination
                totalResults={totalResults}
                resultsPerPage={resultsPerPage}
                onChange={handleChangePage}
                label="Transaction Page Navigation"
              />
            </TableFooter>
          )}
        </TableContainer>
      )}
    </>
  );
};

export default Reports;
