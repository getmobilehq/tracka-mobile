import React, { createContext, useContext } from "react";
import useAsync from "../../hooks/useAsync";
import AdminServices from "../../services/AdminServices";

const DeliveryContext = createContext();

const DeliveryProvider = ({ children }) => {
  const { data, loading, refetchData } = useAsync(AdminServices.getAllRiders);

  return (
    <DeliveryContext.Provider value={{ data: data.data, loading, refetchData }}>
      {children}
    </DeliveryContext.Provider>
  );
};

export function useDeliveryContext() {
  const context = useContext(DeliveryContext);

  if (context === undefined) {
    throw new Error(
      "useDeliveryContext should be used within a DeliveryProvider"
    );
  }

  const { data, loading, refetchData } = context;

  return { data, loading, refetchData };
}
export default DeliveryProvider;
