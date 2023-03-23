// import {  useEffect} from 'react';
// import useAuth from './useAuth';
 import { axiosPrivate } from '../services/axios/axios';

// // const axiosInstance = axios.create();

// // // Interceptor to add the token to the headers
// // axiosInstance.interceptors.request.use(config => {
// //   const token = localStorage.getItem('token');
// //   if (token) {
// //     config.headers.Authorization = `Bearer ${token}`;
// //   }
// //   return config;
// // });

// // // Custom hook to handle fetching and setting the token
// // function useAuth() {
// //   const [token, setToken] = useState(null);

// //   useEffect(() => {
// //     async function fetchToken() {
// //       // Code to fetch the token from the server
// //     }
// //     fetchToken();
// //   }, []);

// //   return { token, setToken };
// // }

// // // Example of using the hook in a component
// // function MyComponent() {
// //   const { token } = useAuth();

// //   useEffect(() => {
// //     if (token) {
// //       axiosInstance
// //         .get('/protected-endpoint')
// //         .then(response => {
// //           // Handle the response
// //         })
// //         .catch(error => {
// //           // Handle the error
// //         });
// //     }
// //   }, [token]);

// //   return <div>My Component</div>;
// // }


// // const useAxiosAuth = () => {
// //     const { auth } = useAuth();

// //     useEffect(() => {

// //         const requestIntercept = axiosPrivate.interceptors.request.use(
// //             async  config => {
// //                   if(!config.headers['Authorization']){
// //                       config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
// //                   }
// //                   return config;
// //               }, (error)=> Promise.reject(error)
// //           );

// //           return () => {
// //             axiosPrivate.interceptors.request.eject(requestIntercept);
// //         }

// //     }
// //     , [auth])
// //   return axiosPrivate
// // }

// // export default useAxiosAuth


// import axios from "axios";
// //import logger from "../logging/logginService";
// //import { services } from "./Service";
// //logger.init();





//  const useAxiosAuth = () => {
//   const { auth } = useAuth();

//   useEffect(() => {
//     console.log("ndjejn")
//     axiosPrivate.interceptors.request.use(config => {
//       if (!config.headers.Authorization) {
//         config.headers.Authorization = `Bearer ${auth?.accessToken}`;
//       }
//       return config;
//     }, error => {
//       console.error("Error setting up axios request interceptor:", error);
//       return Promise.reject(error);
//     });
//   }, [auth]);
//   return axiosPrivate
// };

  




// // axios.interceptors.response.use(
// //   (response) => {
// //     response = services.insertSerialNumberIdIfIsGet(response);
// //     return response;
// //   },
// //   async (error) => {
// //     try {
// //       logger.log(error);
// //       await services.handle40XRedirect(error);
// //       error = await services.getErrorResponse(error);
// //       return Promise.reject(error);
// //     } catch (catchedError) {}
// //   }
// // );
// // try {
// //   const acc_token = JSON.parse(localStorage.getItem("token"));
// //   const token_config = "Bearer " + acc_token;
// //   axios.defaults.headers.common["Authorization"] = token_config;
// //   axios.defaults.headers.common["Ocp-Apim-Subscription-Key"] =
// //     "52445114b0c34eaaa42ed83f4e64f94a";
// // } catch (error) {}
// export default {
//   get: axiosPrivate.get,
//   post: axiosPrivate.post,
//   put: axiosPrivate.put,
//   patch: axiosPrivate.patch,
//   delete: axiosPrivate.delete,
// };
import { useEffect } from 'react';
import axios from "axios";
//import logger from "../logging/logginService";
//import { services } from "./Service";
import  useAuth  from './useAuth';

//logger.init();

const axiosInstance = axios.create();

const useAxiosAuth = () => {
    const { auth } = useAuth();

    useEffect(() => {
        axiosInstance.interceptors.request.use(config => {
            if (!config.headers['Authorization']) {
                config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
            }
            return config;
        }, error => {
            console.error("Error setting up axios request interceptor:", error);
            return Promise.reject(error);
        });

        axiosInstance.interceptors.response.use(
            (response) => {
                //response = services.insertSerialNumberIdIfIsGet(response);
                return response;
            },
            async (error) => {
                // try {
                //     await logger.log(error);
                //     await services.handle40XRedirect(error);
                //     error = await services.getErrorResponse(error);
                //     return Promise.reject(error);
                // } catch (catchedError) {
                //     console.error(catchedError);
                // }
            }
        );
    }, [auth]);
    
    return axiosInstance
};

export default useAxiosAuth;
