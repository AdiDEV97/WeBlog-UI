import { BASE_URL, performApiRequest, performPrivateApiRequest } from "../../../Services/ApiHandler"

export const allFeedsApi = async (user_id) => {
    const response = await performPrivateApiRequest.get(`${BASE_URL}/api/post/byUser/user/${user_id}`, user_id);
    return response.data;
}

export const onlyFeedApi = async (post_id) => {
    const response = await performApiRequest.get(`${BASE_URL}/api/post/postId/${post_id}`, post_id);
    return response.data;
}

export const feedImageUrl = async (imageName) => {
    const response = await performPrivateApiRequest.get(`${BASE_URL}/api/post/image/${imageName}`);
    return response;
}

export const CategoryFeedsApi = async (user_id, category_id) => {
    const response = await performPrivateApiRequest.get(`${BASE_URL}/api/post/byUser/${user_id}/byCategory/${category_id}`, user_id, category_id);
    return response.data;
}

export const deleteFeedApi = async (post_id) => {
    const response = await performPrivateApiRequest.delete(`${BASE_URL}/api/post/delete/postId/${post_id}`, post_id);
    return response.data;
}

export const getCommentsByPostApi = async (post_id) => {
    const response = await performApiRequest.get(`${BASE_URL}/comment/by-post/${post_id}/all-comments`, post_id);
    return response.data;
}

export const addCommentByPostApi = async (comment_data, user_id, post_id) => {
    const response = await performPrivateApiRequest.post(`${BASE_URL}/comment/user/${user_id}/post/${post_id}/new-comment`, comment_data, user_id, post_id);
    return response.data;
}

export const deleteCommentsByPostApi = async (comment_id) => {
    const response = await performPrivateApiRequest.delete(`${BASE_URL}/comment/${comment_id}/delete-comment`, comment_id);
    return response.data;
}