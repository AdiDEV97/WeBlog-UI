import { BASE_URL, performApiRequest, performPrivateApiRequest } from "../../../Services/ApiHandler"

// Categories API Handler

// Get all Categories
export const allCategoriesApi = async () => {
    const response = await performApiRequest.get(`${BASE_URL}/category/all-categories`, null);
    return response;
}

// Add New Category
export const AddNewCategoryApi = async (category) => {
    const response = await performPrivateApiRequest.post(`${BASE_URL}/category/new-category`, category);
    return response;
}

// Delete Category
export const DeleteCategoryApi = async (categoryId) => {
    const response = await performPrivateApiRequest.delete(`${BASE_URL}/category/delete-category/${categoryId}`, categoryId);
    return response;
}

// Update Category
export const UpdateCategoryApi = async (catId, updatedCategoryData) => {
    const response = await performPrivateApiRequest.put(`${BASE_URL}/category/update-category/${catId}`, updatedCategoryData, catId);
    return response;
}
