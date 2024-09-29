import { BASE_URL, performApiRequest } from "../../../Services/ApiHandler"

// Home Component API Service

export const allPostsApi = async (pageNumber, pageSize) => {
    const response = performApiRequest.get(`${BASE_URL}/api/post/allPosts?pageNumber=${pageNumber}&pageSize=${pageSize}`, null, pageNumber, pageSize);
    return response;
}

export const allPostsByCategoryApi = async (categoryId) => {
    const response = performApiRequest.get(`${BASE_URL}/api/post/byCategory/category/${categoryId}`, categoryId);
    return response;
}
