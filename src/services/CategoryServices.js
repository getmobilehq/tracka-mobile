import requests from "./httpService";

const CategoryServices = {
  getAllCategory() {
    return requests.get(`/api/v1/community/category`);
  },

  getCategoryById(id) {
    return requests.get(`/api/v1/community/category/${id}`);
  },

  addCategory(body) {
    return requests.post("/api/v1/community/category", body);
  },

  updateCategory(id, body) {
    return requests.put(`/api/v1/community/category/${id}`, body);
  },

  deleteCategory(id, body) {
    return requests.patch(`/api/v1/community/category/${id}`, body);
  },
};

export default CategoryServices;
