import { BASE_URL, performApiRequest, performPrivateApiRequest } from "../../../Services/ApiHandler";

// SignUp API Handler

export const signupApi = async (user) => {
    const response = await performApiRequest.post(`${BASE_URL}/api/v1/auth/register`, user);
    return response.data;
}

export const uploadProfileImageApi = async (profileImageName, userId) => {
    let formData = new FormData();
    formData.append("profileImage", profileImageName);

    const response = await performApiRequest.post(`${BASE_URL}/user/profile-image/upload/${userId}`, formData, {header: {'Content-Type': 'multipart/form-data'}});
    return response;
}
