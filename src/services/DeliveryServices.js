import requests from "./httpService";

const DeliveryServices = {
  assignParcel(body) {
    return requests.post("/delivery/designate/", body);
  },
  addDeliveryPerson(body) {
    return requests.post("/user/add_delivery_person/", body);
  },
};

export default DeliveryServices;
