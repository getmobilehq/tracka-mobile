import React, { useEffect, useContext } from "react";
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
  Button,
} from "@windmill/react-ui";

import useFilter from "../hooks/useFilter";
import Loading from "../components/preloader/Loading";
import PageTitle from "../components/Typography/PageTitle";
import UsersTable from "../components/users/UsersTable";
import { FiPlus } from "react-icons/fi";
import { SidebarContext } from "../context/SidebarContext";
import { useAdminContext } from "../context/Admin";
import { getUserRole, isSPAdmin } from "../utils/roles";
import { useAuthContext } from "../context/AuthContext";

const Administrators = () => {
  const { data, loading, refetchData } = useAdminContext();
  const {
    state: { adminInfo },
  } = useAuthContext();

  useEffect(() => {
    refetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userType = getUserRole(adminInfo);

  const { toggleDrawer } = useContext(SidebarContext);

  const {
    searchRef,
    handleChangePage,
    totalResults,
    resultsPerPage,
    dataTable,
    handleSubmitForAll,
  } = useFilter(data);

  return (
    <>
      <PageTitle>
        {userType === "IS_SHIPPING_ADMIN" && "Bay"} Administrators
      </PageTitle>

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
                Add Administrator
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
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Admin Type</TableCell>
                <TableCell>Joining Date</TableCell>

                <TableCell className="text-right">Actions</TableCell>
              </tr>
            </TableHeader>

            <UsersTable
              users={dataTable?.filter((user) => isSPAdmin(user))}
              isAdminTable
            />
          </Table>

          {dataTable && dataTable?.length ? (
            <TableFooter>
              <Pagination
                totalResults={totalResults}
                resultsPerPage={resultsPerPage}
                onChange={handleChangePage}
                label="Table navigation"
              />
            </TableFooter>
          ) : null}
        </TableContainer>
      )}
    </>
  );
};

export default Administrators;
