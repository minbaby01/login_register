import axios from "axios";
import Cookies from "js-cookie";

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: "http://localhost:3000"
});
// axios.defaults.withCredentials = true;

// Alter defaults after instance has been created
// instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${Cookies.get('access_token')}`;

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error?.response?.data) return { data: error?.response?.data , status: error?.response?.status};

    return Promise.reject(error);
  });

export default instance