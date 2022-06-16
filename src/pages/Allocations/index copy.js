import React from "react";
import DataTabs from "../../components/tab/dataTabs";
import FederalAllocation from "./federalAllocation";
import LGAAllocation from "./lgaAllocation";
import StateAllocation from "./stateAllocation";

const Allocations = () => {
  const tabData = [
    {
      label: "Federal Allocations",
      content: <FederalAllocation />,
    },
    {
      label: "State Allocations",
      content: <StateAllocation />,
    },
    {
      label: "LGA Allocations",
      content: <LGAAllocation />,
    },
  ];

  return (
    <>
      <DataTabs tabData={tabData} />
    </>
  );
};

export default Allocations;
