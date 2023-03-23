import React from 'react'
import { refreshToke } from '../services/authServices/AuthServices';
import useAuth from './useAuth'
import jwt_decode from "jwt-decode";


const useRefreshToken = () => {
     const { setAuth } = useAuth();
     const refresh = async () => {
        const {data} = await refreshToke();
        var decoded = jwt_decode(data.accessToken);
        console.log("decoded decoded",decoded)
        
        //setAuth({user:email,roles:cat,accessToken:fetchLoginResponses.accessToken})
        setAuth(prev =>{
            console.log("JSON.stringify(prev)",JSON.stringify(prev));
            console.log("data.accessToken",data.accessToken);
            let cat = decoded.user_category.split(",");
             cat = cat.map(Number)

            return{...prev,accessToken:data.accessToken,user:decoded.email,roles:cat}
        });
        return data;
     }
  return refresh
}

export default useRefreshToken