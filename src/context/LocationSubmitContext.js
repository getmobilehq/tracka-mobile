import React, { createContext, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import LocationServices from "../services/LocationServices";
import { notifySuccess } from "../utils/toast";
import { useLocationContext } from "./Location";
import { SidebarContext } from "./SidebarContext";

const LocationSubmitContext = createContext();

const LocationSubmitContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const { refetchData } = useLocationContext();

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();
  const { toggleDrawer } = useContext(SidebarContext);

  const onSubmit = (data) => {
    setLoading(true);
    LocationServices.addLocation(data)
      .then((res) => {
        setLoading(false);

        if (res.message === "success") {
          toggleDrawer();
          notifySuccess("Location Added Successfully.");
          refetchData();
        }
      })
      .catch((err) => {
        setLoading(false);

        console.log(err);
      });
  };

  return (
    <LocationSubmitContext.Provider
      value={{
        register,
        handleSubmit,
        onSubmit,
        trigger,
        clearErrors,
        getValues,
        setValue,
        loading,
        errors,
      }}
    >
      {children}
    </LocationSubmitContext.Provider>
  );
};

export function useLocationSubmitContext() {
  const context = useContext(LocationSubmitContext);

  if (context === undefined) {
    throw new Error(
      "useLocationSubmitContext should be used within a LocationSubmitContext Provider"
    );
  }

  const {
    register,
    handleSubmit,
    onSubmit,
    trigger,
    getValues,
    setValue,
    clearErrors,
    loading,
    errors,
  } = context;

  return {
    register,
    handleSubmit,
    onSubmit,
    trigger,
    getValues,
    clearErrors,
    setValue,
    errors,
    loading,
  };
}

export default LocationSubmitContextProvider;
