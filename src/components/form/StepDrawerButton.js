import React, { useContext } from "react";
import { SidebarContext } from "../../context/SidebarContext";
import ExtendedButton from "../extendedButton/ExtendedButton";

const StepDrawerButton = ({
  id,
  title,
  handleSubmit,
  handleLocationUpdate,
  noOfSteps,
  activeStepIndex,
  previousStep,
  nextStep,
  loading,
}) => {
  const { toggleDrawer } = useContext(SidebarContext);

  return (
    <>
      <div className="fixed bottom-0 w-full right-0 py-4 lg:py-8 px-6 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex bg-gray-50 border-t border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
          <ExtendedButton
            onClick={activeStepIndex === 0 ? toggleDrawer : previousStep}
            className="h-12 bg-white w-full text-red-500 hover:bg-red-50 hover:border-red-100 hover:text-red-600 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-red-700"
            layout="outline"
          >
            {activeStepIndex === 0 ? "Cancel" : "Previous"}
          </ExtendedButton>
        </div>

        <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
          <ExtendedButton
            loading={loading}
            onClick={
              id
                ? handleLocationUpdate
                : activeStepIndex === noOfSteps - 1
                ? handleSubmit
                : nextStep
            }
            type={activeStepIndex === noOfSteps - 1 ? "button" : "submit"}
            className="w-full h-12"
          >
            {id
              ? "Update"
              : activeStepIndex === noOfSteps - 1
              ? `Add ${title}`
              : "Next"}
          </ExtendedButton>
        </div>
      </div>
    </>
  );
};

export default StepDrawerButton;
