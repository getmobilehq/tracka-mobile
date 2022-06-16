import requests from "./httpService";

const AllocationServices = {
  getAllocation(page = 1, limit = 10) {
    return requests.get(`/api/v1/allocation?limit=${limit}&page=${page}`);
  },

  getAllocationById(id) {
    return requests.get(`/api/v1/allocation/${id}`);
  },

  addAllocation(body) {
    return requests.post("/api/v1/allocation", body);
  },

  updateAllocation(id, body) {
    return requests.put(`/api/v1/allocation/${id}`, body);
  },

  deleteAllocation(id, body) {
    return requests.patch(`/api/v1/allocation/${id}`, body);
  },
};

export default AllocationServices;
