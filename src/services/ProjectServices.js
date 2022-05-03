import { req } from "./httpService";

const API_SERVICE_URL =
  "http://budgitapi-env.eba-82vtvuzm.eu-west-2.elasticbeanstalk.com";
const isProd = process.env.NODE_ENV === "production";

const ProjectServices = {
  getFederalAllocations() {
    return req.get(
      isProd
        ? API_SERVICE_URL + "/index.php/federals"
        : "/budgitapi/index.php/federals"
    );
  },

  getStateAllocations() {
    return req.get(
      isProd
        ? API_SERVICE_URL + "/index.php/state-allocations"
        : "/budgitapi/index.php/state-allocations"
    );
  },

  getLgaAllocations(lga, state, pageNumber = 1, postPerPage = 10) {
    return req.get(
      isProd
        ? API_SERVICE_URL +
            `/index.php/lga-allocations?lga=${lga}&state=${state}&page=${pageNumber}&count=${postPerPage}
        `
        : `/budgitapi/index.php/lga-allocations?lga=${lga}&state=${state}&page=${pageNumber}&count=${postPerPage}
    `
    );
  },

  getAllocationsPerPage(pageNumber = 1, postPerPage = 10) {
    return req.get(
      isProd
        ? API_SERVICE_URL +
            `/index.php/state-allocations?page=${pageNumber}&count=${postPerPage}`
        : `/budgitapi/index.php/state-allocations?page=${pageNumber}&count=${postPerPage}`
    );
  },

  getProjects() {
    return req.get(
      isProd
        ? API_SERVICE_URL + "/index.php/projects"
        : "/budgitapi/index.php/projects"
    );
  },

  getProjectsPerPage(pageNumber = 1, postPerPage = 10) {
    return req.get(
      isProd
        ? API_SERVICE_URL +
            `/index.php/projects?page=${pageNumber}&count=${postPerPage}`
        : `/budgitapi/index.php/projects?page=${pageNumber}&count=${postPerPage}`
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
