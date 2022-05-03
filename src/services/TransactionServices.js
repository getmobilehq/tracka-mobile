import requests from "./httpService";

const TransactionServices = {
  getAllPayments(body, headers) {
    return requests.get("/payments/", body, headers);
  },

  //   getOrderByUser(id, body) {
  //     return requests.get(`/orders/user/${id}`, body);
  //   },

  //   getOrderById(id, body) {
  //     return requests.get(`/orders/${id}`, body);
  //   },

  //   updateOrder(id, body, headers) {
  //     return requests.put(`/orders/${id}`, body, headers);
  //   },

  //   deleteOrder(id) {
  //     return requests.delete(`/orders/${id}`);
  //   },
};

export default TransactionServices;