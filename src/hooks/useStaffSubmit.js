import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import AdminServices from "../services/AdminServices";
import { useAuthContext } from "../context/AuthContext";
import { SidebarContext } from "../context/SidebarContext";
import { notifyError, notifySuccess } from "../utils/toast";
import Cookies from "js-cookie";

const useStaffSubmit = ({ id, first_name, last_name, email, phone }) => {
  const [loading, setLoading] = useState(false);
  const { state } = useAuthContext();
  const { adminInfo } = state;
  const [imageUrl, setImageUrl] = useState("");
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);

  const { dispatch } = useAuthContext();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name,
      last_name,
      email,
      phone,
    },
  });

  const onSubmit = (data) => {
    // if (!imageUrl) {
    //   notifyError("Image is required!");
    //   return;
    // }

    setLoading(true);

    const staffData = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      // joiningDate: data.joiningDate,
      // role: data.role,
      // image: imageUrl,
    };

    const prevAdminInfo = JSON.parse(Cookies.get("adminInfo"));

    if (id) {
      AdminServices.updateProfile({ id, ...staffData })
        .then((res) => {
          setLoading(false);

          setIsUpdate(true);
          notifySuccess(res.message);

          const { password, ...rest } = res.data;

          dispatch({ type: "USER_LOGIN", payload: { ...rest } });

          Cookies.set(
            "adminInfo",
            JSON.stringify({ ...prevAdminInfo, ...rest })
          );
        })
        .catch((err) => {
          setLoading(false);

          notifyError(err.message);
        });
      closeDrawer();
    } else {
      AdminServices.addStaff({ ...staffData })
        .then((res) => {
          setLoading(false);

          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => {
          setLoading(false);

          notifyError(err.message);
        });
      closeDrawer();
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      // setValue("first_name");
      // setValue("last_name");
      // setValue("email");
      // setValue("phone");
      // setValue("joiningDate");
      // setValue("role");
      // setImageUrl("");
      clearErrors("name");
      clearErrors("email");
      clearErrors("phone");
      clearErrors("joiningDate");
      clearErrors("role");
      return;
    }

    // if (id) {
    //   AdminServices.getStaffById(id, { email: adminInfo.email })
    //     .then((res) => {
    //       if (res) {
    //         setValue("first_name");
    //         setValue("last_name");
    //         setValue("phone", res.phone);
    //         setValue("joiningDate", res.joiningData);
    //         setValue("role", res.role);
    //         setImageUrl(res.image);
    //       }
    //     })
    //     .catch((err) => {
    //       notifyError("There is a server error!");
    //     });
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setValue, isDrawerOpen, adminInfo.email]);
  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setImageUrl,
    imageUrl,
    loading,
  };
};

export default useStaffSubmit;
