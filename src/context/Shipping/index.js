import React, { createContext, useContext } from "react";
import useAsync from "../../hooks/useAsync";
import ShippingServices from "../../services/ShippingServices";

const ShippingContext = createContext();

const ShippingProvider = ({ children }) => {
  const { data, loading, refetchData } = useAsync(
    ShippingServices.getAllShippingLines
  );

  return (
    <ShippingContext.Provider value={{ data: data.data, loading, refetchData }}>
      {children}
    </ShippingContext.Provider>
  );
};

export function useShippingContext() {
  const context = useContext(ShippingContext);

  //   if (context === undefined) {
  //     throw new Error(
  //       "useShippingContext should be used within a ShippingProvider"
  //     );
  //   }

  const { data, loading, refetchData } = context ?? {};

  return { data, loading, refetchData };
}
export default ShippingProvider;
