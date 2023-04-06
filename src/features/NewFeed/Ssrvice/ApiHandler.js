import { BASE_URL, performPrivateApiRequest } from "../../../Services/ApiHandler"

// Create New Post
export const createNewPostApi = async (userId, categoryId, newPost) => {
    const response = await performPrivateApiRequest.post(`${BASE_URL}/api/post/user/${userId}/category/${categoryId}/new-post`, newPost);
    return response;
}

// Update Post
export const updatePostApi = async (post, postId) => {
    const response = await performPrivateApiRequest.put(`${BASE_URL}/api/post/update/postId/${postId}`, post, postId);
    return response;
}

// Upload Image
export const uploadImageApi = async (imageName, post_id) => {

    // *** IMP *** Here we are accepting the image in the form-data from the BackEnd service so we have to create here also a FormData Object and append the {key:value} pair data into it. The key must be equal to the @RequestParam key from the BackEnd and value is the actual file (or file name).

    let formData = new FormData();
    formData.append("image", imageName);
    
    // Here we will pass one extra object (in third parameter) to add the header which tells the contentType of the data as multipart/form-data because we use multipart in the BackEnd service
    const response = await performPrivateApiRequest.post(`${BASE_URL}/api/post/image/upload/${post_id}`, formData, {header: {'Content-Type': 'multipart/form-data'}});
    return response;
}