import React from "react";
import { useLocation } from "react-router-dom";

// ========== FORM COMPONENTS =============
import Error from "../form/Error";
import InputValue from "../form/InputValue";
import LabelArea from "../form/LabelArea";
import InputArea from "../form/InputArea";
import { useLocationSubmitContext } from "../../context/LocationSubmitContext";

// ========== FORM COMPONENTS =============

const LocationContent = ({ id: locationName }) => {
  const { register, errors } = useLocationSubmitContext();

  const location = useLocation();

  return (
    <>
      <div className="add-location">
        <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <LabelArea label="Location" />
            <div className="col-span-8 sm:col-span-4">
              <InputArea
                register={register}
                label="Location"
                name="location"
                type="text"
                placeholder="Location"
                disabled={location.pathname === `/location/${locationName}`}
              />
              <Error errorName={errors.location} />
            </div>
          </div>

          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <LabelArea label="Number of Centers" />
            <div className="col-span-8 sm:col-span-4">
              <InputValue
                register={register}
                maxValue={1000}
                minValue={0}
                label="Number of Centers"
                name="numOfLocations"
                type="number"
                placeholder="Number of Centers"
              />
              <Error errorName={errors.numOfLocations} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationContent;
