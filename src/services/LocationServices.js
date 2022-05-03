import requests from "./httpService";

const LocationServices = {
  getAllLocations() {
    return requests.get("/locations/");
  },

  getLocationById(id) {
    return requests.post(`/locations/${id}`);
  },

  addLocation(body) {
    return requests.post("/locations/add/", body);
  },

  updateCity(name, body) {
    return requests.post(`/locations/update_city/${name}/`, body);
  },

  deleteCity(name) {
    return requests.delete(`/locations/update_city/${name}/`);
  },

  updateLocation(id, body) {
    return requests.put(`/locations/${id}`, body);
  },

  deleteLocation(id) {
    return requests.delete(`/locations/${id}`);
  },
};

export default LocationServices;
