import requests from "./httpService";

const AdminServices = {
  login(body) {
    return requests.post(
      `https://api.budgit.link/api/v1/user/login/mobile`,
      body
    );
  },

  getBayAdmins() {
    return requests.get("/auth/admins/bay/");
  },
  addBayAdmin(body) {
    return requests.post("/auth/admins/bay/", body);
  },

  getShippingAdmins() {
    return requests.get("/auth/admins/shipping/");
  },
  addShippingAdmin(body) {
    return requests.post("/auth/admins/shipping/", body);
  },

  loginAdmin(body) {
    return requests.post(`/auth/login/`, body);
  },
  createAccount(body) {
    return requests.post(`/auth/users/`, body);
  },

  addAdmin(body) {
    return requests.post("/user/add_admin/", body);
  },
  changeRole(id, body) {
    return requests.post(`/user/admin/change_role/${id}`, body);
  },
  getAllUsers() {
    return requests.get("/auth/users/");
  },
  getAllAdmin() {
    return requests.get("/user/all_admin/");
  },
  myProfile() {
    return requests.get(`/user/profile/`);
  },
  updateProfile(body) {
    return requests.put(`/user/profile/`, body);
  },
  forgotPassword(body) {
    return requests.post("/user/forget_password/", body);
  },
  verifyOTP(body) {
    return requests.post("/user/forgot_password/confirm_otp/", body);
  },
  confirmPassword(body) {
    return requests.post("/user/forgot_password/confirm_password/", body);
  },
  resetPassword(body) {
    return requests.post("auth/users/reset_password/", body);
  },
  addDeliveryPerson(body) {
    return requests.post("/user/add_delivery_person/", body);
  },
  getAllRiders() {
    return requests.get("/user/delivery_persons/");
  },
  deleteUser(id, body) {
    return requests.delete(`/auth/users/${id}`, body);
  },
};

export default AdminServices;
