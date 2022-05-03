import requests from "./httpService";

const BookingServices = {
  getAllBookings() {
    return requests.get("/bookings/");
  },

  getBayAreaById(id) {
    return requests.get(`/category/${id}`);
  },

  exportTodaysBooking() {
    return requests.get("/bookings/today/pdf");
  },

  addBayArea(body) {
    return requests.post("/main/bay_area/", body);
  },

  verifyBooking(body) {
    return requests.post("/bookings/mark_complete/", body);
  },

  updateBayArea(id, body) {
    return requests.put(`/main/bay_area/${id}`, body);
  },

  deleteBayArea(id) {
    return requests.delete(`/main/bay_area/${id}`);
  },
};

export default BookingServices;
