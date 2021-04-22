import { ADMIN_ROUTE } from "../app/pages/helper/api";

export default function setupAxios(axios, store) {
  axios.interceptors.request.use(
    config => {
      const {
        auth: { token }
      } = store.getState();


      if (token) {
        config.headers.Authorization = `Token ${token}`;
      }

      return config;
    },
    err => Promise.reject(err)
  );

  axios.interceptors.response.use(function (response) {
      return response;
  }, function (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('persist:v713-demo1-auth');
        window.location.assign(`/${ADMIN_ROUTE}/auth/login`);
      }

      return Promise.reject(error);
  });
}
