import React, { createContext, useContext } from "react";
import useAsync from "../../hooks/useAsync";
import CategoryServices from "../../services/CategoryServices";

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const { data, loading, refetchData } = useAsync(
    CategoryServices.getAllCategory
  );

  return (
    <CategoryContext.Provider
      value={{ data: data?.data, loading, refetchData }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export function useCategoryContext() {
  const context = useContext(CategoryContext);

  if (context === undefined) {
    throw new Error(
      "useCategoryContext should be used within a CategoryProvider"
    );
  }

  const { data, loading, refetchData } = context ?? {};

  return { data, loading, refetchData };
}
export default CategoryProvider;
