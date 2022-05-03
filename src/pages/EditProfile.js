import React from "react";
import Error from "../components/form/Error";
import useStaffSubmit from "../hooks/useStaffSubmit";
import LabelArea from "../components/form/LabelArea";
import InputArea from "../components/form/InputArea";
import { useAuthContext } from "../context/AuthContext";
import PageTitle from "../components/Typography/PageTitle";
import Uploader from "../components/image-uploader/Uploader";
import ExtendedButton from "../components/extendedButton/ExtendedButton";

const EditProfile = () => {
  const {
    state: { adminInfo },
  } = useAuthContext();

  const {
    register,
    handleSubmit,
    loading,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
  } = useStaffSubmit({
    ...adminInfo,
  });

  return (
    <>
      <PageTitle>Edit Profile</PageTitle>
      <div className="container p-6 mx-auto bg-white  dark:bg-gray-800 dark:text-gray-200 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 flex-grow scrollbar-hide w-full max-h-full">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Profile Picture" />
              <div className="col-span-8 sm:col-span-4">
                <Uploader imageUrl={imageUrl} onChange={setImageUrl} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="First Name" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="First Name"
                  name="first_name"
                  type="text"
                  placeholder="Your First Name"
                />
                <Error errorName={errors.first_name} />
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
                  placeholder="Your Last Name"
                />
                <Error errorName={errors.last_name} />
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
                <Error errorName={errors.email} />
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
                <Error errorName={errors.phone} />
              </div>
            </div>
          </div>

          <div className="flex flex-row-reverse pr-6 pb-6">
            <ExtendedButton
              loading={loading}
              type="submit"
              className="h-12 px-6"
            >
              {" "}
              Update Profile
            </ExtendedButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
