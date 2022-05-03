import requests from "./httpService";

const ShippingServices = {
  getAllShippingLines() {
    return requests.get("/main/shipping_companies/");
  },

  getShippingLineById(id) {
    return requests.get(`/category/${id}`);
  },

  addShippingLine(body) {
    return requests.post("/main/shipping_companies/", body);
  },

  updateShippingLine(id, body) {
    return requests.put(`/main/shipping_companies/${id}`, body);
  },

  deleteShippingLine(id) {
    return requests.delete(`/main/shipping_companies/${id}`);
  },
};

export default ShippingServices;
