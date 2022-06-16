import React, { useContext, useState } from "react";
import Scrollbars from "react-custom-scrollbars";

// ============================== FORM COMPONENTS ==============================
import Title from "../form/Title";
import LabelArea from "../form/LabelArea";
import InputArea from "../form/InputArea";
import Error from "../form/Error";
import DrawerButton from "../form/DrawerButton";
import { useForm } from "react-hook-form";
import { SidebarContext } from "../../context/SidebarContext";
import AdminServices from "../../services/AdminServices";
import { notifySuccess } from "../../utils/toast";
// ============================== FORM COMPONENTS ==============================

const ProjectDrawer = () => {
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { toggleDrawer } = useContext(SidebarContext);

  const onSubmit = (data) => {
    setLoading(true);

    console.log(data);

    AdminServices.inviteAdmin(data)
      .then((res) => {
        setLoading(false);

        if (res.status === 200) {
          notifySuccess(res.data.message);
          toggleDrawer();
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        <Title title="Invite Admin" />
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form className="block" onSubmit={handleSubmit(onSubmit)}>
          <div className="add-location">
            <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Name" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="Name"
                    name="name"
                    type="text"
                    placeholder="Name"
                  />
                  {errors?.name && <Error errorName={errors.name} />}
                </div>
              </div>
            </div>

            <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Description" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="Description"
                    name="description"
                    type="text"
                    placeholder="Description"
                  />
                  {errors?.description && (
                    <Error errorName={errors.description} />
                  )}
                </div>
              </div>
            </div>

            <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Amount" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="Amount"
                    name="amount"
                    type="text"
                    placeholder="Amount"
                  />
                  {errors?.amount && <Error errorName={errors.amount} />}
                </div>
              </div>
            </div>
          </div>

          <DrawerButton title="Administrator" loading={loading} />
        </form>
      </Scrollbars>
    </>
  );
};

export default ProjectDrawer;
