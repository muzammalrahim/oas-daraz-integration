import axios from "axios";
import { API_URL } from '../../../../pages/helper/api'

export const PRODUCTS_URL = API_URL + "inventory";

// CREATE =>  POST: add a new product to the server
export function createProduct(product) {
  return axios.post(PRODUCTS_URL+'/', { ...product });
}

// READ
export function getAllProducts({pageNumber, filter, pageSize, sortField, sortOrder}) {
  return axios.get(PRODUCTS_URL,  {
    params: {...filter, page:pageNumber, page_size: pageSize, ordering: (sortOrder == 'asc') ? sortField : '-'+sortField}
  });
}

export function getProductById(productId) {
  return axios.get(`${PRODUCTS_URL}/${productId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findProducts(queryParams) {
  return axios.post(`${PRODUCTS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the procuct on the server
export function updateProduct(product) {
  return axios.put(`${PRODUCTS_URL}/${product.id}/`, { ...product });
}

// UPDATE Status
export function updateStatusForProducts(ids, status) {
  return axios.post(`${PRODUCTS_URL}/updateStatusForProducts`, {
    ids,
    status
  });
}

// DELETE => delete the product from the server
export function deleteProduct(productId) {
  return axios.delete(`${PRODUCTS_URL}/${productId}`);
}

// DELETE Products by ids
export function deleteProducts(ids) {
  return axios.post(`${PRODUCTS_URL}/delete-all/`, { ids });
}
