import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars";

// ========== FORM COMPONENTS =============
import Title from "../form/Title";
import LabelArea from "../form/LabelArea";
import Error from "../form/Error";
import DrawerButton from "../form/DrawerButton";
import { useForm } from "react-hook-form";
import { useLocationContext } from "../../context/Location";
import InputArea from "../form/InputArea";
import InputValue from "../form/InputValue";
import LocationServices from "../../services/LocationServices";
import { notifySuccess } from "../../utils/toast";
import { SidebarContext } from "../../context/SidebarContext";
// ========== FORM COMPONENTS =============

const AddMoreCenterDrawer = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const { data, refetchData } = useLocationContext();
  const { toggleDrawer } = useContext(SidebarContext);

  const { location } = useParams();

  const result = data.find(
    (loc) => loc.name.split(" ").join("_").toLowerCase() === location
  );

  const currLocation = result?.centers?.find((center) => center.id === id);

  const {
    register,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (currLocation) {
      setValue("center_name", currLocation?.center_name);
      setValue("address", currLocation?.address);
      setValue("no_of_compartment", currLocation?.no_of_compartment);
    } else {
      setValue("address");
      setValue("center_name");
      setValue("no_of_compartment");
      clearErrors("address");
      clearErrors("center_name");
      clearErrors("no_of_compartment");
    }
  }, [clearErrors, setValue, currLocation]);

  const onSubmit = (data) => {
    setLoading(true);

    const payload = {
      location: result?.name,
      centers: [data],
    };

    console.log(payload);

    if (id) {
      LocationServices.updateLocation(id, data)
        .then((res) => {
          setLoading(false);

          if (res.message === "Successful") {
            refetchData();
            notifySuccess("Location Updated Successfully.");
            toggleDrawer();
          }
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      LocationServices.addLocation(payload)
        .then((res) => {
          setLoading(false);

          if (res.message === "Successful") {
            refetchData();
            notifySuccess("Location Added Successfully.");
            toggleDrawer();
          }
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? <Title title="Update Center" /> : <Title title="Add Center" />}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form className="block" onSubmit={handleSubmit(onSubmit)}>
          <div className="add-sub-location">
            <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
              <div className="mb-12">
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={`Center`} />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label={`Center Name`}
                      name="center_name"
                      type="text"
                      placeholder={`Center Name`}
                    />
                    {errors.center_name && (
                      <Error errorName={errors?.center_name} />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={`Address`} />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label={`Address`}
                      name="address"
                      type="text"
                      placeholder={`Address`}
                    />
                    {errors?.address && <Error errorName={errors?.address} />}
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Number of Compartments" />
                  <div className="col-span-8 sm:col-span-4">
                    <InputValue
                      register={register}
                      name="no_of_compartment"
                      label="Number of Compartments"
                      minValue={0}
                      maxValue={1000}
                      type="number"
                      placeholder="Number of Compartments"
                    />
                    {errors?.no_of_compartment && (
                      <Error errorName={errors?.no_of_compartment} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DrawerButton id={id} title="Center" loading={loading} />
        </form>
      </Scrollbars>
    </>
  );
};

export default AddMoreCenterDrawer;
