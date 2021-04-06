import axios from "axios";
import { API_URL } from '../../../../pages/helper/api'

export const PRODUCTS_URL = API_URL + "product-category";

// CREATE =>  POST: add a new category to the server
export function createCategory(category) {
  return axios.post(PRODUCTS_URL+'/', { ...category });
}

// READ
export function getAllCategories({pageNumber, filter, pageSize, sortField, sortOrder}) {
  return axios.get(PRODUCTS_URL,  {
    params: {...filter, page:pageNumber, page_size: pageSize, ordering: (sortOrder == 'asc') ? sortField : '-'+sortField}
  });
}

export function getCategoryById(categoryId) {
  return axios.get(`${PRODUCTS_URL}/${categoryId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCategories(queryParams) {
  return axios.post(`${PRODUCTS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the procuct on the server
export function updateCategory(category) {
  return axios.put(`${PRODUCTS_URL}/${category.id}/`, { ...category });
}

// UPDATE Status
export function updateStatusForCategories(ids, status) {
  return axios.post(`${PRODUCTS_URL}/updateStatusForCategories`, {
    ids,
    status
  });
}

// DELETE => delete the category from the server
export function deleteCategory(categoryId) {
  return axios.delete(`${PRODUCTS_URL}/${categoryId}`);
}

// DELETE Categories by ids
export function deleteCategories(ids) {
  return axios.post(`${PRODUCTS_URL}/delete-all/`, { ids });
}
