import React, { createContext, useContext } from "react";
import useAsync from "../../hooks/useAsync";
import AdminServices from "../../services/AdminServices";
import { getUserRole } from "../../utils/roles";
import { useAuthContext } from "../AuthContext";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const {
    state: { adminInfo },
  } = useAuthContext();

  const userType = getUserRole(adminInfo);

  const req =
    userType === "IS_SP_ADMIN"
      ? AdminServices.getAllUsers
      : userType === "IS_SHIPPING_ADMIN"
      ? AdminServices.getBayAdmins
      : AdminServices.getAllUsers;

  const { data, loading, refetchData } = useAsync(req);

  return (
    <AdminContext.Provider
      value={{
        data: userType === "IS_SP_ADMIN" ? data : data.data,
        loading,
        refetchData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export function useAdminContext() {
  const context = useContext(AdminContext);

  if (context === undefined) {
    throw new Error("useAdminContext should be used within an AdminProvider");
  }

  const { data, loading, refetchData } = context;

  return { data, loading, refetchData };
}

export default AdminProvider;
