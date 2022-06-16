import React, { useState } from "react";
import * as dayjs from "dayjs";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";
import MainModal from "../modal/MainModal";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import EditDeleteButton from "../table/EditDeleteButton";
import MainDrawer from "../drawer/MainDrawer";
import AdminDrawer from "../admin/AdminDrawer";
import { useLocation } from "react-router-dom";
import ViewDetailButton from "../table/ViewDetailButton";
import CustomerDetailDrawer from "../drawer/CustomerDetailDrawer";
import numberFormatter from "../../utils/numberFormatter";

const ProjectsTable = ({ projects }) => {
  const [currentCustomer, setCurrentCustomer] = useState({});

  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  const location = useLocation();

  const name = (user) => `${user.first_name} ${user.last_name}`;

  const toggleCustomerDetailDrawer = (user) => {
    handleUpdate(user.id);
    setCurrentCustomer(user);
  };

  return (
    <>
      {/* {serviceId && <MainModal id={serviceId} />}

      
        
      

      {serviceId && (
        <MainDrawer>
          <CustomerDetailDrawer customer={currentCustomer} />
        </MainDrawer>
      )} */}

      <MainDrawer>
        <AdminDrawer />
      </MainDrawer>

      <TableBody>
        {projects?.map((project, key) => (
          <TableRow key={project.id}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">{key + 1}</span>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <div>
                  <h2 className="text-sm capitalize font-medium">
                    {project.name}
                  </h2>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <span className="text-sm">{project.description}</span>{" "}
            </TableCell>
            <TableCell>
              <span className="text-sm ">
                {numberFormatter(project.amount)}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm ">{project.source_link}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm ">{project.year}</span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">{project.num_views}</span>{" "}
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">{project.upvote}</span>{" "}
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">{project.downvote}</span>{" "}
            </TableCell>

            <TableCell>
              <span className="text-sm">{project.state}</span>{" "}
            </TableCell>

            <TableCell>
              <span className="text-sm ">
                {numberFormatter(project.amount_disbursed)}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {new Date(project.createdAt).toLocaleString()}
              </span>{" "}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default ProjectsTable;
