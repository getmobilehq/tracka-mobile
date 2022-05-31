import axios from "axios";
import { notifyError } from "../utils/toast";

const axiosInstance = axios.create({
  baseURL: "https://api.budgit.link",
  timeout: 500000,
});

const axInstance = axios.create({
  // baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 500000,
});

// for multiple requests
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  let adminInfo;
  if (localStorage.getItem("adminInfo")) {
    adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
  }

  return {
    ...config,
    headers: {
      authorization: adminInfo ? `Bearer ${adminInfo.token}` : null,
    },
  };
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    console.log(error.response);

    // Do something with response error
    const errorResponse = error.response;
    const originalConfig = error?.config;

    if (
      errorResponse.config.url === "/user/add_delivery_person/" ||
      errorResponse.config.url === "/user/add_admin/"
    ) {
      const errMsg = errorResponse.data.error.phone[0];

      notifyError(errMsg);

      return Promise.reject(error);
    }

    if (errorResponse.config.url === "/user/add_admin/") {
      const errMsg = errorResponse.data.error.email[0];

      notifyError(errMsg);

      return Promise.reject(error);
    }

    if (
      errorResponse.config.url === "/account/user/forget_password/confirm/" ||
      errorResponse.config.url === "/account/user/forget_password/"
    ) {
      return Promise.reject(error);
    }

    if (
      errorResponse.data.detail === "Token is blacklisted" ||
      errorResponse.data.detail === "Token is invalid or expired"
    ) {
      localStorage.removeItem("adminInfo");

      window.location.href = "/login";

      console.log("Session has expired. Please login again.");

      notifyError("Session has expired. Please login again.");
    }

    if (
      window.location.pathname !== "/login" &&
      errorResponse.status === 401 &&
      errorResponse.data.detail !== "Token is blacklisted" &&
      !originalConfig._retry
    ) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalConfig.headers["authorization"] = "Bearer " + token;
            return axiosInstance(originalConfig);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalConfig._retry = true;
      isRefreshing = true;

      let adminInfo;
      if (localStorage.getItem("adminInfo")) {
        adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
      }

      const refreshToken = adminInfo?.refresh;

      return new Promise(function (resolve, reject) {
        axiosInstance
          .post("/auth/jwt/refresh/", { refresh: refreshToken })
          .then((res) => {
            const { access, refresh } = res.data;

            localStorage.setItem(
              "adminInfo",
              JSON.stringify({ ...adminInfo, access, refresh })
            );

            originalConfig.headers["authorization"] = `Bearer ${access}`;

            processQueue(null, access);
            resolve(axiosInstance(originalConfig));
          })
          .catch((err) => {
            processQueue(err, null);
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    let errorMsg;

    const message =
      typeof errorResponse.data.error === "string"
        ? errorResponse.data.error
        : errorResponse.data.errors &&
          errorResponse.data.errors.length &&
          errorResponse.data.errors[0]
        ? errorResponse.data.errors.toString()
        : typeof errorResponse.data.error === "object"
        ? Object.entries(errorResponse.data.error)[0][1]
        : errorResponse.data.message;

    console.log({ message });

    const detail =
      errorResponse && errorResponse.data.detail
        ? errorResponse.data.detail
        : errorResponse.detail;

    const statusText = errorResponse && errorResponse.statusText;

    if (message) {
      errorMsg = message;
    } else if (detail) {
      errorMsg = detail;
    } else {
      errorMsg = statusText;
    }

    notifyError(errorMsg);

    return Promise.reject(error);
  }
);

const responseBody = (response) => response.data;

const requests = {
  get: (url, body, headers) =>
    axiosInstance.get(url, body, headers).then(responseBody),

  post: (url, body) => axiosInstance.post(url, body).then(responseBody),

  put: (url, body, headers) =>
    axiosInstance.put(url, body, headers).then(responseBody),

  patch: (url, body) => axiosInstance.patch(url, body).then(responseBody),

  delete: (url) => axiosInstance.delete(url).then(responseBody),
};

export const req = {
  get: (url, body, headers) =>
    axInstance.get(url, body, headers).then(responseBody),

  post: (url, body) => axInstance.post(url, body).then(responseBody),

  put: (url, body, headers) =>
    axInstance.put(url, body, headers).then(responseBody),

  patch: (url, body) => axInstance.patch(url, body).then(responseBody),

  delete: (url) => axInstance.delete(url).then(responseBody),
};

export default requests;
