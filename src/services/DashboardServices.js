import requests from "./httpService";

const DashboardServices = {
  getDashboardData() {
    return requests.get("/dashboard/");
  },
};

export default DashboardServices;
