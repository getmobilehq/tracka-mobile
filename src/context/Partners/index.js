import React, { createContext, useContext } from "react";
import useAsync from "../../hooks/useAsync";
import PartnerServices from "../../services/PartnerServices";

const PartnerContext = createContext();

const PartnerProvider = ({ children }) => {
  const { data, loading, refetchData } = useAsync(
    PartnerServices.getAllPartners
  );

  return (
    <PartnerContext.Provider value={{ data: data.data, loading, refetchData }}>
      {children}
    </PartnerContext.Provider>
  );
};

export function usePartnerContext() {
  const context = useContext(PartnerContext);

  if (context === undefined) {
    throw new Error(
      "usePartnerContext should be used within a PartnerProvider"
    );
  }

  const { data, loading, refetchData } = context;

  return { data, loading, refetchData };
}

export default PartnerProvider;
