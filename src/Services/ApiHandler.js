import axios from "axios";
import { getToken } from "../Auth";

//export const BASE_URL='http://localhost:5000';
export const BASE_URL='http://blogging-env.eba-cpfhpmvj.ap-southeast-2.elasticbeanstalk.com'

// ApiRequest for Public URLs
export const performApiRequest = axios.create({
    baseUrl:BASE_URL 
});


// ApiRequest for Private URLs
export const performPrivateApiRequest = axios.create({
    baseURL:BASE_URL
});

performPrivateApiRequest.interceptors.request.use((config) => {
    const token = getToken();
    //console.log(token);

    if(token) {
        //config.headers.common.Authorization = `Bearer ${token}`;  // This is for lower version of AXIOS
        config.headers["Authorization"] = `Bearer ${token}`; // This is for latest version of AXIOS
        return config;
    }

}, error => Promise.reject(error));

