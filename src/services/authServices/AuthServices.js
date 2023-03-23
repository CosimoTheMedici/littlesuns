import { axiosPublic } from "../axios/axios";
import config from "../config/config.json";
// import httpService from "../http/httpService";

// export function getUserById() {
//   try {
//     const fetchUserUrl = `${config.ApiServiceBaseUrl}user/fetchUser/`;
//     return httpService.get(fetchUserUrl).catch((error) => error);
//   } catch (error) {
//     console.log(error);
//   }
// }

// export function loginUser1(data) {
//   return httpService.post(`${config.ApiServiceBaseUrl}user/login/`, data);
// }
export function loginUser(data) {
  return axiosPublic.post(`/api/v1/auth/users/login`, data,
  {
    withCredentials: true,
  });
}
export function refreshToke() {
  return axiosPublic.get(`/api/v1/auth/refresh/token`,
  {
    withCredentials: true,
  });
}
