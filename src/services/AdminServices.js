import requests from "./httpService";

const AdminServices = {
  login(body) {
    return requests.post(
      `https://api.budgit.link/api/v1/user/login/mobile`,
      body
    );
  },

  inviteAdmin(data) {
    return requests.post("https://api.budgit.link/api/v1/user/invite", data);
  },
};

export default AdminServices;
