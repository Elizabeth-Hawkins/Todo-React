import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://iduzis-api.herokuapp.com/',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken') || null;

    if (token) {
      config.headers = {
        Authorization: token,
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user")

        return Promise.reject(error);
      } else {
        return error.response;
      }
    }
  );

export default axiosInstance;
