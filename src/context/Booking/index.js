import React, { createContext, useContext } from "react";
import useAsync from "../../hooks/useAsync";
import BookingServices from "../../services/BookingServices";

const BookingContext = createContext();

const BookingProvider = ({ children }) => {
  const { data, loading, refetchData } = useAsync(
    BookingServices.getAllBookings
  );

  return (
    <BookingContext.Provider value={{ data: data.data, loading, refetchData }}>
      {children}
    </BookingContext.Provider>
  );
};

export function useBookingContext() {
  const context = useContext(BookingContext);

  if (context === undefined) {
    throw new Error(
      "useBookingContext should be used within a BookingProvider"
    );
  }

  const { data, loading, refetchData } = context;

  return { data, loading, refetchData };
}
export default BookingProvider;
