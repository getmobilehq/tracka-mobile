import React, { useContext, useState } from "react";
import Scrollbars from "react-custom-scrollbars";

// ============================== FORM COMPONENTS ==============================
import Title from "../form/Title";
import LabelArea from "../form/LabelArea";
import InputArea from "../form/InputArea";
import Error from "../form/Error";
import DrawerButton from "../form/DrawerButton";
import { useForm } from "react-hook-form";
import AdminServices from "../../services/AdminServices";
import { notifySuccess } from "../../utils/toast";
import { SidebarContext } from "../../context/SidebarContext";
import { useAdminContext } from "../../context/Admin";
import SelectHoldingBay from "../form/SelectHoldingBay";
import SelectShippingLine from "../form/SelectShippingLine";
import { getUserRole, roles } from "../../utils/roles";
import { useAuthContext } from "../../context/AuthContext";
// ============================== FORM COMPONENTS ==============================

const AdminDrawer = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const {
    state: { adminInfo },
  } = useAuthContext();

  const { refetchData } = useAdminContext();

  // ============================== AUTH DETAILS ============================== //
  const userType = getUserRole(adminInfo);

  const labelText = {
    [roles.IS_SP_ADMIN]: "Shipping Administrator",
    [roles.IS_SHIPPING_ADMIN]: "Bay Administrator",
  };
  // ============================== AUTH DETAILS ============================== //

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { toggleDrawer } = useContext(SidebarContext);

  const onSubmit = (data) => {
    setLoading(true);

    const { shipping_line, bay, ...rest } = data;

    let payload = {};

    if (userType === "IS_SHIPPING_ADMIN") {
      payload = { ...rest, role: "bay_admin", bay_area: bay };

      AdminServices.addBayAdmin(payload)
        .then((res) => {
          setLoading(false);

          if (res.message === "success") {
            refetchData();
            notifySuccess("Bay administrator added successfully.");
            toggleDrawer();
          }
        })
        .catch((err) => {
          setLoading(false);
        });
    }

    if (userType === "IS_SP_ADMIN") {
      payload = {
        ...rest,
        role: "shipping_admin",
        shipping_company: shipping_line,
      };

      AdminServices.addShippingAdmin(payload)
        .then((res) => {
          setLoading(false);

          if (res.message === "success") {
            refetchData();
            notifySuccess("Shipping line administrator added successfully.");
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
        {id ? (
          <Title title="Update Rider Details" />
        ) : (
          <Title title={`Add ${labelText[userType]}`} />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form className="block" onSubmit={handleSubmit(onSubmit)}>
          <div className="add-location">
            <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
              {/* NOTE: ONLY SHIPPING ADMIN CAN ADD BAY DMINISTRATORS */}
              {userType === "IS_SHIPPING_ADMIN" && (
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Holding Bay" />
                  <div className="col-span-8 sm:col-span-4">
                    <SelectHoldingBay
                      register={register}
                      label="Holding Bay"
                      name="bay"
                      type="text"
                    />
                    {errors?.bay ? <Error errorName={errors.bay} /> : null}
                  </div>
                </div>
              )}

              {/* NOTE: ONLY SUPER-ADMIN CAN ADD SHIPPING DMINISTRATORS */}
              {userType === "IS_SP_ADMIN" && (
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Shipping Line" />
                  <div className="col-span-8 sm:col-span-4">
                    <SelectShippingLine
                      register={register}
                      label="Shipping Line"
                      name="shipping_line"
                      type="text"
                    />
                    {errors?.shipping_line ? (
                      <Error errorName={errors.shipping_line} />
                    ) : null}
                  </div>
                </div>
              )}

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
                  {errors?.first_name ? (
                    <Error errorName={errors.first_name} />
                  ) : null}
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

          <DrawerButton id={id} title="Administrator" loading={loading} />
        </form>
      </Scrollbars>
    </>
  );
};

export default AdminDrawer;
