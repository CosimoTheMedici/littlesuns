import axios from "axios";
import useAxiosAuth from "../../hooks/useAxiosAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ax from "../../hooks/test";
import httpService from "../http/httpService";
 

export function getAllMyProperties() {
    return useAxiosPrivate.get(`/api/v1/properties/`,
    {
      withCredentials: true,
    });
  }

  export function createProperty1(payload,token) {
    return axios.post(`http://localhost:3500/api/v1/properties/create`,payload,
    {
      headers: { Authorization: 
       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjFlbWFpbC5qbmpjQGdtYWlsLmNvbSIsInN0YXR1cyI6MCwidXNlcl9jYXRlZ29yeSI6IjIwMDEiLCJ1dWlkIjoib3AwMCIsImJ1c2luZXNzX2lkIjo5OCwiaWF0IjoxNjczNDY5NTgwLCJleHAiOjE2NzM0NzMxODB9.cwS6NPYdX8Jwiv80dColuPp_MdVs4nOYKhlKmIMqtXI"},
      withCredentials: true,
    });
  }




  export function createProperty2(payload) {
    return ax.post(`/api/v1/properties/create`,payload,
    {
      withCredentials: true,
    });
  }

  export async function CreateProperty(payload) {
    let {axiosInstance}=useAxiosPrivate();
    let response = await axiosInstance.post(`/api/v1/properties/create`,payload,
    {
      withCredentials: true,
    });

    return response;
  }

  export function createProperty(payload) {
    return httpService.post(`http://localhost:3500/api/v1/properties/create`,payload,
    {
     withCredentials: true,
    });
  }


  
  export const CreateProperty1 = (payload) => {

  const axiosInstance = useAxiosPrivate();
  return axiosInstance.post(`http://localhost:3500/api/v1/properties/create`,payload,
  {
   withCredentials: true,
  });
}
  
  
export function CreateProperty4(payload,token) {
  return axios.post(`http://localhost:3500/api/v1/properties/create`,payload,
  {
    withCredentials: true,
  });
}