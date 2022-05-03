import { req } from "./httpService";

const ProjectServices = {
  getFederalAllocations() {
    return req.get("/budgitapi/index.php/federals");
  },

  getStateAllocations() {
    return req.get("/budgitapi/index.php/state-allocations");
  },

  getLgaAllocations(lga, state, pageNumber = 1, postPerPage = 10) {
    return req.get(`/budgitapi/index.php/lga-allocations?lga=${lga}&state=${state}&page=${pageNumber}&count=${postPerPage}
    `);
  },

  getAllocationsPerPage(pageNumber = 1, postPerPage = 10) {
    return req.get(
      `/budgitapi/index.php/state-allocations?page=${pageNumber}&count=${postPerPage}`
    );
  },

  getProjects() {
    return req.get("/budgitapi/index.php/projects");
  },

  getProjectsPerPage(pageNumber = 1, postPerPage = 10) {
    return req.get(
      `/budgitapi/index.php/projects?page=${pageNumber}&count=${postPerPage}`
    );
  },

  getStates() {
    return req.get("https://openstates.ng/api/states");
  },

  getLGAs(state_slug) {
    return req.get(`https://openstates.ng/api/${state_slug}/lgas`);
  },
};

export default ProjectServices;
