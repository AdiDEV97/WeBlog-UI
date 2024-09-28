import { BASE_URL, performPrivateApiRequest } from "../../../Services/ApiHandler"

// Header API Handler

export const getUserProfileImageApi = async (profileImageName) => {
    const response = await performPrivateApiRequest.get(`${BASE_URL}/user/profile-image/${profileImageName}`, profileImageName);
    return response;
}
