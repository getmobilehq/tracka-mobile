import requests from "./httpService";

const CommunityServices = {
  getAllCommunityNeeds(limit = 10, page = 1) {
    return requests.get(`/api/v1/community/need?limit=${limit}&page=${page}`);
  },

  getCommunityNeedById(id) {
    return requests.get(`/api/v1/community/need/${id}`);
  },

  addCommunityNeed(body) {
    return requests.post("/api/v1/community/need", body);
  },

  updateCommunityNeed(id, body) {
    return requests.put(`/api/v1/community/need/${id}`, body);
  },

  deleteCommunityNeed(id, body) {
    return requests.patch(`/api/v1/community/need/${id}`, body);
  },
};

export default CommunityServices;
