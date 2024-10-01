import { BASE_URL, performApiRequest } from "../../../Services/ApiHandler"

// Login API Handler

export const loginApi = async (user) => {
    const response = await performApiRequest.post(`${BASE_URL}/api/v1/auth/login`, user);
    return response.data;
}

export const updatePasswordApi = async (user, userEmail) => {
    const response = await performApiRequest.put(`${BASE_URL}/verify-email/${userEmail}`, user, userEmail);
    console.log('RESP - ');
    console.log(response);
    return response.data;
}
