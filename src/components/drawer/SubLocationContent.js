import React, { useEffect } from "react";

// ========== FORM COMPONENTS =============
import Error from "../form/Error";
import LabelArea from "../form/LabelArea";
import CustomInputArea from "../form/CustomInputArea";
import { useLocationSubmitContext } from "../../context/LocationSubmitContext";
import CustomInputValue from "../form/CustomInputValue";
// ========== FORM COMPONENTS =============

const SubLocationContent = ({ currLocation }) => {
  const { register, errors, getValues, clearErrors, setValue } =
    useLocationSubmitContext();

  useEffect(() => {
    if (currLocation) {
      currLocation?.centers.forEach(
        ({ center_name, address, no_of_compartment }, i) => {
          setValue(`centers.${i}.center_name`, center_name);
          setValue(`centers.${i}.address`, address);
          setValue(`centers.${i}.no_of_compartment`, no_of_compartment);
        }
      );
    } else {
      currLocation?.centers.forEach((_, i) => {
        setValue(`centers.${i}.center_name`);
        setValue(`centers.${i}.address`);
        setValue(`centers.${i}.no_of_compartment`);
        clearErrors(`centers.${i}.center_name`);
        clearErrors(`centers.${i}.address`);
        clearErrors(`centers.${i}.no_of_compartment`);
      });
    }
  }, [currLocation, setValue, clearErrors]);

  const numOfBoxes = getValues("numOfLocations");

  let arr = new Array(numOfBoxes ? numOfBoxes : 0).fill("");

  return (
    <>
      <div className="add-sub-location">
        <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
          {arr?.length
            ? arr.map((_, i) => (
                <div key={i} className="mb-12">
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={`Center ${i + 1}`} />
                    <div className="col-span-8 sm:col-span-4">
                      <CustomInputArea
                        register={register}
                        index={i}
                        label={`Center Name ${i + 1}`}
                        name={`center_name`}
                        type="text"
                        placeholder={`Center Name ${i + 1}`}
                      />
                      {errors?.centers && (
                        <Error errorName={errors?.centers[i]?.center_name} />
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={`Address ${i + 1}`} />
                    <div className="col-span-8 sm:col-span-4">
                      <CustomInputArea
                        register={register}
                        index={i}
                        label={`Address ${i + 1}`}
                        name={`address`}
                        type="text"
                        placeholder={`Address ${i + 1}`}
                      />
                      {errors?.centers && (
                        <Error errorName={errors?.centers[i]?.address} />
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label="Number of Compartments" />
                    <div className="col-span-8 sm:col-span-4">
                      <CustomInputValue
                        register={register}
                        index={i}
                        name="no_of_compartment"
                        label="Number of Compartments"
                        minValue={0}
                        maxValue={1000}
                        type="number"
                        placeholder="Number of Compartments"
                      />
                      {errors?.centers && (
                        <Error
                          errorName={errors?.centers[i]?.no_of_compartment}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default SubLocationContent;
