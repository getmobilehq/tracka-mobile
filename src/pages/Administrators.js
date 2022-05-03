import React, { useRef, useContext } from "react";
import { Input, Card, CardBody, Button } from "@windmill/react-ui";
import PageTitle from "../components/Typography/PageTitle";
import { FiPlus } from "react-icons/fi";
import { SidebarContext } from "../context/SidebarContext";
import MainDrawer from "../components/drawer/MainDrawer";
import AdminDrawer from "../components/admin/AdminDrawer";

const Administrators = () => {
  const { toggleDrawer } = useContext(SidebarContext);

  const handleSubmitForAll = () => {};

  const searchRef = useRef();

  return (
    <>
      <PageTitle>Invite Administrators</PageTitle>

      <MainDrawer>
        <AdminDrawer />
      </MainDrawer>

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
    </>
  );
};

export default Administrators;
