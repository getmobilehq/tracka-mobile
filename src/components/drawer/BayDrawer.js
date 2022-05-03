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
import { useBayContext } from "../../context/Bay";
import InputValue from "../form/InputValue";
import BayServices from "../../services/BayServices";
import { Select } from "@windmill/react-ui";
import SelectShippingLine from "../form/SelectShippingLine";
// ========== FORM COMPONENTS =============

const BayDrawer = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const { toggleDrawer } = useContext(SidebarContext);
  const { data, refetchData } = useBayContext();

  const currHoldingBay = data?.find((option) => option.id === id);

  const {
    handleSubmit,
    register,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (currHoldingBay) {
      setValue("name", currHoldingBay?.name);
      setValue("address", currHoldingBay?.address);
      setValue("available_space", currHoldingBay?.available_space);
      setValue("shipping_company", currHoldingBay?.shipping_company);
    } else {
      setValue("name");
      setValue("address");
      setValue("available_space");
      setValue("shipping_company");

      clearErrors("name");
      clearErrors("address");
      clearErrors("available_space");
      clearErrors("shipping_company");
    }
  }, [currHoldingBay, setValue, clearErrors]);

  const onSubmit = (data) => {
    setLoading(true);

    console.log(data);

    if (id) {
      BayServices.updateBayArea(id, data)
        .then((res) => {
          setLoading(false);

          // console.log(res);
          notifySuccess(res.message);

          refetchData();

          toggleDrawer();
        })
        .catch(() => setLoading(false));
    } else {
      BayServices.addBayArea([data])
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
          <Title title="Update Holding Bay" />
        ) : (
          <Title title="Add Holding Bay" />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form className="block" onSubmit={handleSubmit(onSubmit)}>
          <div className="add-location">
            <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Name of Holding Bay" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="Name of Holding Bay"
                    name="name"
                    type="text"
                    placeholder="Name of Holding Bay"
                  />

                  <Error errorName={errors?.name} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Address" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="Address"
                    name="address"
                    type="text"
                    placeholder="Address"
                  />

                  <Error errorName={errors?.address} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Available Space" />
                <div className="col-span-8 sm:col-span-4">
                  <InputValue
                    register={register}
                    maxValue={1000}
                    minValue={0}
                    label="Available Space"
                    name="available_space"
                    type="text"
                    placeholder="Available Space"
                  />

                  <Error errorName={errors?.available_space} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Shipping Line" />
                <div className="col-span-8 sm:col-span-4">
                  <SelectShippingLine
                    register={register}
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                    name="shipping_company"
                    label="Shipping Line"
                    placeholder="Select Shipping Line"
                  ></SelectShippingLine>

                  {errors?.role && (
                    <Error errorName={errors.shipping_company} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <DrawerButton id={id} title="Holding Bay" loading={loading} />
        </form>
      </Scrollbars>
    </>
  );
};

export default BayDrawer;
