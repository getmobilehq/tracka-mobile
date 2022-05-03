import React, { useContext, useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars";

// ========== FORM COMPONENTS =============
import Title from "../form/Title";
import LabelArea from "../form/LabelArea";
import InputArea from "../form/InputArea";
import Error from "../form/Error";
import DrawerButton from "../form/DrawerButton";
import { useForm } from "react-hook-form";
import { useDeliveryContext } from "../../context/Delivery";
import DeliveryServices from "../../services/DeliveryServices";
import { notifySuccess } from "../../utils/toast";
import { SidebarContext } from "../../context/SidebarContext";
// ========== FORM COMPONENTS =============

const RidersDrawer = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const { toggleDrawer } = useContext(SidebarContext);
  const { data, refetchData } = useDeliveryContext();

  const currRider = data?.find((rider) => rider.id === id);

  const {
    handleSubmit,
    register,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (currRider) {
      setValue("first_name", currRider?.first_name);
      setValue("last_name", currRider?.last_name);
      setValue("email", currRider?.email);
      setValue("phone", currRider?.phone);
      setValue("address", currRider?.address);
    } else {
      setValue("first_name");
      setValue("last_name");
      setValue("email");
      setValue("phone");
      setValue("address");
      clearErrors("first_name");
      clearErrors("last_name");
      clearErrors("email");
      clearErrors("phone");
      clearErrors("address");
    }
  }, [currRider, setValue, clearErrors]);

  const onSubmit = (data) => {
    setLoading(true);

    DeliveryServices.addDeliveryPerson(data)
      .then((res) => {
        setLoading(false);

        // console.log(res);
        notifySuccess(res.message);

        refetchData();

        toggleDrawer();
      })
      .catch(() => setLoading(false));
  };

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title title="Update Rider Details" />
        ) : (
          <Title title="Add Delivery Man" />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form className="block" onSubmit={handleSubmit(onSubmit)}>
          <div className="add-location">
            <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="First Name" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="First Name"
                    name="first_name"
                    type="text"
                    placeholder="First Name"
                  />

                  <Error errorName={errors?.first_name} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Last Name" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="Last Name"
                    name="last_name"
                    type="text"
                    placeholder="Last Name"
                  />
                  {errors?.last_name && <Error errorName={errors.last_name} />}
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Email" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="Email"
                    name="email"
                    type="text"
                    placeholder="Email"
                  />
                  {errors?.email && <Error errorName={errors.email} />}
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Contact Number" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="Contact Number"
                    name="phone"
                    type="text"
                    placeholder="Contact Number"
                  />
                  {errors?.phone && <Error errorName={errors.phone} />}
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
                  {errors?.address && <Error errorName={errors.address} />}
                </div>
              </div>
            </div>
          </div>
          <DrawerButton id={id} title="Delivery Man" loading={loading} />
        </form>
      </Scrollbars>
    </>
  );
};

export default RidersDrawer;
