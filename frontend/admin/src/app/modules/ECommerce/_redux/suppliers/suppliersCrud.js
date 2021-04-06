import axios from "axios";
import { API_URL } from '../../../../pages/helper/api'

export const PRODUCTS_URL = API_URL + "supplier";

// CREATE =>  POST: add a new supplier to the server
export function createSupplier(supplier) {
  return axios.post(PRODUCTS_URL+'/', { ...supplier });
}

// READ
export function getAllSuppliers({pageNumber, filter, pageSize, sortField, sortOrder}) {
  return axios.get(PRODUCTS_URL,  {
    params: {...filter, page: pageNumber,page_size: pageSize, ordering: (sortOrder == 'asc') ? sortField : '-'+sortField}
  });
}

export function getSupplierById(supplierId) {
  return axios.get(`${PRODUCTS_URL}/${supplierId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findSuppliers(queryParams) {
  return axios.post(`${PRODUCTS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the procuct on the server
export function updateSupplier(supplier) {
  return axios.put(`${PRODUCTS_URL}/${supplier.id}/`, { ...supplier });
}

// UPDATE Status
export function updateStatusForSuppliers(ids, status) {
  return axios.post(`${PRODUCTS_URL}/updateStatusForSuppliers`, {
    ids,
    status
  });
}

// DELETE => delete the supplier from the server
export function deleteSupplier(supplierId) {
  return axios.delete(`${PRODUCTS_URL}/${supplierId}`);
}

// DELETE Suppliers by ids
export function deleteSuppliers(ids) {
  return axios.post(`${PRODUCTS_URL}/delete-all/`, { ids });
}
