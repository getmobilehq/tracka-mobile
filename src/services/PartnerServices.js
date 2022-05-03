import requests from "./httpService";

const PartnerServices = {
  getAllPartners() {
    return requests.get("/logistic_partners/");
  },

  getPartnerById(id) {
    return requests.get(`/logistic_partners/${id}`);
  },

  addPartner(body) {
    return requests.post("/logistic_partners/", body);
  },

  updatePartner(id, body) {
    return requests.put(`/logistic_partners/${id}`, body);
  },

  deletePartner(id) {
    return requests.delete(`/logistic_partners/${id}`);
  },
};

export default PartnerServices;
