import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "../context/SidebarContext";
import LocationServices from "../services/LocationServices";
import { notifyError } from "../utils/toast";

const useLocationSubmit = (id) => {
  const { isDrawerOpen } = useContext(SidebarContext);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    getValues,
    reset,
    trigger,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    const locationData = {
      title: data.title,
      numOfLocations: data.numOfLocations,
    };

    // if (id) {
    //   LocationServices.updateLocation(id, locationData)
    //     .then((res) => {
    //       setIsUpdate(true);
    //       notifySuccess(res.message);
    //     })
    //     .catch((err) => notifyError(err.message));
    //   closeDrawer();
    // } else {
    //   LocationServices.addLocation(locationData)
    //     .then((res) => {
    //       setIsUpdate(true);
    //       notifySuccess(res.message);
    //     })
    //     .catch((err) => notifyError(err.message));
    //   closeDrawer();
    // }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue("numOfLocations");
      setValue("centers.0.center_name");
      setValue("centers.0.address");
      setValue("centers.0.no_of_compartment");

      // clearErrors("title");
      // clearErrors("numOfLocations");
      // clearErrors("center_name");
      // clearErrors("address");
      // clearErrors("no_of_compartment");

      clearErrors();

      // reset("", {
      //   keepValues: true,
      // });

      console.log({ isDrawerOpen });

      return;
    }

    if (id) {
      LocationServices.getLocationById(id)
        .then((res) => {
          if (res) {
            setValue("title", res.title);
            setValue("numOfLocations", res.numOfLocations);
            // setValue("center_name");
            // setValue("address");
            // setValue("no_of_compartment");
          }
        })
        .catch((err) => {
          notifyError("There is a server error!");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setValue, isDrawerOpen]);

  return {
    register,
    watch,
    handleSubmit,
    clearErrors,
    onSubmit,
    errors,
    trigger,
    getValues,
  };
};

export default useLocationSubmit;
