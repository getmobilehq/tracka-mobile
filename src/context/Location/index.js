import React, { createContext, useContext } from "react";
import useAsync from "../../hooks/useAsync";
import LocationServices from "../../services/LocationServices";

const LocationContext = createContext();

const LocationProvider = ({ children }) => {
  const { data, loading, refetchData } = useAsync(
    LocationServices.getAllLocations
  );

  return (
    <LocationContext.Provider value={{ data, loading, refetchData }}>
      {children}
    </LocationContext.Provider>
  );
};

export function useLocationContext() {
  const context = useContext(LocationContext);

  if (context === undefined) {
    throw new Error(
      "useLocationContext should be used within a LocationProvider"
    );
  }

  const { data, loading, refetchData } = context;

  return { data, loading, refetchData };
}
export default LocationProvider;
