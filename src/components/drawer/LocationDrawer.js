import React, { useContext, useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { useWizard } from "react-wizard-primitive";

// ========== FORM COMPONENTS =============
import Title from "../form/Title";
import StepDrawerButton from "../form/StepDrawerButton";
import SubLocationContent from "./SubLocationContent";
import LocationContent from "./LocationContent";
import { useLocationSubmitContext } from "../../context/LocationSubmitContext";
import { useLocationContext } from "../../context/Location";
import LocationServices from "../../services/LocationServices";
import { notifySuccess } from "../../utils/toast";
import { SidebarContext } from "../../context/SidebarContext";
// ========== FORM COMPONENTS =============

const LocationDrawer = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    trigger,
    setValue,
    onSubmit,
    clearErrors,
    getValues,
    loading,
  } = useLocationSubmitContext();
  const { toggleDrawer } = useContext(SidebarContext);
  const { data, refetchData } = useLocationContext();
  const { nextStep, previousStep, activeStepIndex } = useWizard({
    initialStepIndex: 0,
  });

  const locationName = id;

  const currLocation = data?.find(
    (location) =>
      location.name.toLowerCase().split(" ").join("_").toString() ===
      locationName?.toLowerCase().split(" ").join("_").toString()
  );

  useEffect(() => {
    if (locationName && currLocation) {
      setValue("location", currLocation?.name);
      setValue("numOfLocations", currLocation?.centers.length);
    } else {
      setValue("location");
      setValue("numOfLocations");
      clearErrors("location");
      clearErrors("numOfLocations");
    }
  }, [locationName, setValue, currLocation, clearErrors]);

  const steps = [
    <LocationContent id={id} />,
    <SubLocationContent currLocation={currLocation} />,
  ];

  const handleLocationUpdate = () => {
    setIsLoading(true);

    const data = getValues();

    const oldLocationName = currLocation?.name;

    LocationServices.updateCity(oldLocationName, data)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        if (res.message === "successful") {
          refetchData();
          toggleDrawer();
          notifySuccess("Location updated successfully.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title title="Update Location" />
        ) : (
          <Title title="Add Location" />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form className="block">{steps[activeStepIndex]}</form>

        <StepDrawerButton
          id={id}
          title="Location"
          handleLocationUpdate={handleLocationUpdate}
          noOfSteps={steps.length}
          nextStep={async () => {
            const output = await trigger();

            if (output) {
              nextStep();
            }
          }}
          previousStep={previousStep}
          handleSubmit={handleSubmit(onSubmit)}
          activeStepIndex={activeStepIndex}
          loading={loading || isLoading}
        />
      </Scrollbars>
    </>
  );
};

export default LocationDrawer;
