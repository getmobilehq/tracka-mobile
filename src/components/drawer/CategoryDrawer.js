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
import { useCategoryContext } from "../../context/Category";
import CategoryServices from "../../services/CategoryServices";
// ========== FORM COMPONENTS =============

const CategoryDrawer = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const { toggleDrawer } = useContext(SidebarContext);
  const { data, refetchData } = useCategoryContext();

  const currCategory = data?.find((option) => option.id === id);

  const {
    handleSubmit,
    register,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (currCategory) {
      setValue("name", currCategory?.name);
    } else {
      setValue("name");

      clearErrors("name");
    }
  }, [currCategory, setValue, clearErrors]);

  const onSubmit = (data) => {
    setLoading(true);

    console.log(data);

    if (id) {
      CategoryServices.updateCategory(id, data)
        .then((res) => {
          setLoading(false);

          // console.log(res);
          notifySuccess(res.message);

          refetchData();

          toggleDrawer();
        })
        .catch(() => setLoading(false));
    } else {
      CategoryServices.addCategory(data)
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
          <Title title="Update Category" />
        ) : (
          <Title title="Add Category" />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form className="block" onSubmit={handleSubmit(onSubmit)}>
          <div className="add-location">
            <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Category Name" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="Category Name"
                    name="name"
                    type="text"
                    placeholder="Category Name"
                  />

                  <Error errorName={errors?.name} />
                </div>
              </div>
            </div>
          </div>
          <DrawerButton id={id} title="Category" loading={loading} />
        </form>
      </Scrollbars>
    </>
  );
};

export default CategoryDrawer;
