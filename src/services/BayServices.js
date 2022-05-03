import requests from "./httpService";

const BayServices = {
  getAllBayAreas() {
    return requests.get("/main/bay_area/");
  },

  getBayAreaById(id) {
    return requests.get(`/category/${id}`);
  },

  addBayArea(body) {
    return requests.post("/main/bay_area/", body);
  },

  updateBayArea(id, body) {
    return requests.put(`/main/bay_area/${id}`, body);
  },

  deleteBayArea(id) {
    return requests.delete(`/main/bay_area/${id}`);
  },
};

export default BayServices;
