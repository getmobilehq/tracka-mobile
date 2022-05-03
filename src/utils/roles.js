const isSPAdmin = (user) => user?.role === "admin" && user?.is_admin;
const isShippingAdmin = (user) => user?.role === "shipping_admin";
const isBayAdmin = (user) => user?.role === "bay_admin";

const getUserRole = (user) => {
  return isSPAdmin(user)
    ? "IS_SP_ADMIN"
    : isShippingAdmin(user)
    ? "IS_SHIPPING_ADMIN"
    : isBayAdmin(user)
    ? "IS_BAY_ADMIN"
    : "User";
};

const roles = {
  IS_SP_ADMIN: "IS_SP_ADMIN",
  IS_SHIPPING_ADMIN: "IS_SHIPPING_ADMIN",
  IS_BAY_ADMIN: "IS_BAY_ADMIN",
};

export { isSPAdmin, isShippingAdmin, isBayAdmin, roles, getUserRole };
