import axios from 'axios';
const accessTokenAxiosConfig = axios.create();

accessTokenAxiosConfig.interceptors.request.use(
  function(config) {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);


export default accessTokenAxiosConfig;