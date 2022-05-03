import React, { useContext, useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { useParams } from "react-router-dom";
import { useWizard } from "react-wizard-primitive";
import { useLocationContext } from "../../../context/Location";
import Title from "../../form/Title";
import { useLocationSubmitContext } from "../../../context/LocationSubmitContext";
import { SidebarContext } from "../../../context/SidebarContext";
import LocationServices from "../../../services/LocationServices";
import { notifySuccess } from "../../../utils/toast";
import StepDrawerButton from "../../form/StepDrawerButton";
import LocationContent from "../LocationContent";
import SubLocationContent from "../SubLocationContent";

const AddMoreCenters = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, trigger, setValue, clearErrors, loading } =
    useLocationSubmitContext();
  const { toggleDrawer } = useContext(SidebarContext);
  const { data, refetchData } = useLocationContext();
  const { nextStep, previousStep, activeStepIndex } = useWizard({
    initialStepIndex: 0,
  });

  const params = useParams();
  const locationName = params.location;

  const currLocation = data?.find(
    (location) =>
      location.name.toLowerCase().split(" ").join("_").toString() ===
      locationName?.toLowerCase().split(" ").join("_").toString()
  );

  useEffect(() => {
    if (locationName && currLocation) {
      setValue("location", currLocation?.name);
    } else {
      setValue("location");
      setValue("numOfLocations");
      clearErrors("location");
      clearErrors("numOfLocations");
    }
  }, [locationName, setValue, currLocation, clearErrors]);

  const steps = [<LocationContent id={locationName} />, <SubLocationContent />];

  const onSubmitCenters = (data) => {
    setIsLoading(true);

    LocationServices.addLocation({
      location: data.location,
      centers: data.centers,
    })
      .then((res) => {
        setIsLoading(false);

        if (res.message === "success") {
          refetchData();
          toggleDrawer();
          notifySuccess("Centers added successfully.");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        <Title title="Add More Centers" />
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form className="block">{steps[activeStepIndex]}</form>

        <StepDrawerButton
          title="Centers"
          noOfSteps={steps.length}
          nextStep={async () => {
            const output = await trigger();

            if (output) {
              nextStep();
            }
          }}
          previousStep={previousStep}
          handleSubmit={handleSubmit(onSubmitCenters)}
          activeStepIndex={activeStepIndex}
          loading={loading || isLoading}
        />
      </Scrollbars>
    </>
  );
};

export default AddMoreCenters;
