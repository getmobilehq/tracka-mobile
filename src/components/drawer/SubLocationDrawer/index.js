import React from "react";
import AddMoreCenters from "./AddMoreCenters";
import UpdateCenter from "./UpdateCenter";
import LocationSubmitContextProvider from "../../../context/LocationSubmitContext";

const SubLocationDrawer = ({ id }) => {
  return id ? (
    <UpdateCenter id={id} />
  ) : (
    <LocationSubmitContextProvider>
      <AddMoreCenters />
    </LocationSubmitContextProvider>
  );
};

export default SubLocationDrawer;
