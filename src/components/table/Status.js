import React from "react";
import { Badge } from "@windmill/react-ui";

const Status = ({ status }) => {
  return (
    <>
      <span className="font-serif">
        {status === "pending" && (
          <Badge type="warning" className="capitalize">
            {status}
          </Badge>
        )}
        {status === "assigned" && (
          <Badge className="capitalize">{status}</Badge>
        )}
        {status === "processing" && (
          <Badge type="info" className="capitalize">
            {status}
          </Badge>
        )}
        {status === "delivered" && (
          <Badge type="success" className="capitalize">
            {status}
          </Badge>
        )}
        {status === "cancel" && (
          <Badge type="danger" className="capitalize">
            {status}
          </Badge>
        )}
      </span>
    </>
  );
};

export default Status;
