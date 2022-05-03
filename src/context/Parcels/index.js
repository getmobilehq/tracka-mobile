import React, { createContext, useContext } from "react";
import useAsync from "../../hooks/useAsync";
import ParcelServices from "../../services/OrderServices";

const ParcelContext = createContext();

const ParcelProvider = ({ children }) => {
  const { data, loading, refetchData } = useAsync(ParcelServices.getAllParcels);

  return (
    <ParcelContext.Provider
      value={{
        data: data && data.length ? data.flatMap((d) => d.parcels) : [],
        loading,
        refetchData,
      }}
    >
      {children}
    </ParcelContext.Provider>
  );
};

export function useParcelContext() {
  const context = useContext(ParcelContext);

  if (context === undefined) {
    throw new Error("useParcelContext should be used within a ParcelProvider");
  }

  const { data, loading, refetchData } = context;

  return { data, loading, refetchData };
}
export default ParcelProvider;
