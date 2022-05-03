import React, { createContext, useContext } from "react";
import useAsync from "../../hooks/useAsync";
import BayServices from "../../services/BayServices";

const BayContext = createContext();

const BayProvider = ({ children }) => {
  const { data, loading, refetchData } = useAsync(BayServices.getAllBayAreas);

  return (
    <BayContext.Provider value={{ data: data.data, loading, refetchData }}>
      {children}
    </BayContext.Provider>
  );
};

export function useBayContext() {
  const context = useContext(BayContext);

  //   if (context === undefined) {
  //     throw new Error("useBayContext should be used within a BayProvider");
  //   }

  const { data, loading, refetchData } = context ?? {};

  return { data, loading, refetchData };
}
export default BayProvider;
