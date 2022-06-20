import React, { useContext, useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars";

// ========== FORM COMPONENTS =============
import Title from "../form/Title";
import LabelArea from "../form/LabelArea";
import InputArea from "../form/InputArea";
import Error from "../form/Error";
import DrawerButton from "../form/DrawerButton";
import { useForm } from "react-hook-form";
import { notifySuccess } from "../../utils/toast";
import { SidebarContext } from "../../context/SidebarContext";
import { useAllocationsContext } from "../../context/Allocations";
import { Select } from "@windmill/react-ui";
import AllocationServices from "../../services/AllocationServices";
// ========== FORM COMPONENTS =============

const AllocationDrawer = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const { toggleDrawer } = useContext(SidebarContext);
  const { allocations, refetchData } = useAllocationsContext();

  const currAllocation = allocations?.find((option) => option.id === id);

  const {
    handleSubmit,
    register,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (currAllocation) {
      setValue("year", currAllocation?.year);
      setValue("month", currAllocation?.month);
      setValue("netAllocation", currAllocation?.netAllocation);
      setValue("category", currAllocation?.category);
      setValue("state", currAllocation?.state);
      setValue("lga", currAllocation?.lga);
    } else {
      setValue("year");
      setValue("month");
      setValue("netAllocation");
      setValue("category");
      setValue("state");
      setValue("lga");

      clearErrors("year");
      clearErrors("month");
      clearErrors("netAllocation");
      clearErrors("category");
      clearErrors("state");
      clearErrors("lga");
    }
  }, [currAllocation, setValue, clearErrors]);

  const onSubmit = (data) => {
    setLoading(true);

    console.log(data);

    if (id) {
      AllocationServices.updateAllocation(id, data)
        .then((res) => {
          setLoading(false);

          // console.log(res);
          notifySuccess(res.message);

          refetchData();

          toggleDrawer();
        })
        .catch(() => setLoading(false));
    } else {
      AllocationServices.addAllocation(data)
        .then((res) => {
          setLoading(false);
          // console.log(res);
          notifySuccess(res.message);
          refetchData();
          toggleDrawer();
        })
        .catch(() => setLoading(false));
    }
  };

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title title="Update Allocation" />
        ) : (
          <Title title="Add Allocation" />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form className="block" onSubmit={handleSubmit(onSubmit)}>
          <div className="add-location">
            <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Year" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="Year"
                    name="year"
                    type="number"
                    placeholder="Year"
                  />

                  <Error errorName={errors?.year} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Month" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="Month"
                    name="month"
                    type="text"
                    placeholder="Month"
                  />

                  <Error errorName={errors?.month} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Net Allocation" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="Net Allocation"
                    name="netAllocation"
                    type="number"
                    placeholder="Net Allocation"
                  />

                  <Error errorName={errors?.netAllocation} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Category" />
                <div className="col-span-8 sm:col-span-4">
                  <Select
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    placeholder="Category"
                    name="category"
                    {...register(`category`, {
                      required: `Category is required!`,
                    })}
                  >
                    <option value="" defaultValue hidden>
                      Select
                    </option>

                    <option value="federal">Federal</option>
                    <option value="state">State</option>
                    <option value="lga">LGA</option>
                  </Select>

                  <Error errorName={errors?.category} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="State" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="State"
                    name="state"
                    type="text"
                    placeholder="State"
                  />

                  <Error errorName={errors?.state} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="LGA" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="LGA"
                    name="lga"
                    type="text"
                    placeholder="LGA"
                  />

                  <Error errorName={errors?.lga} />
                </div>
              </div>
            </div>
          </div>
          <DrawerButton id={id} title="Allocation" loading={loading} />
        </form>
      </Scrollbars>
    </>
  );
};

export default AllocationDrawer;
