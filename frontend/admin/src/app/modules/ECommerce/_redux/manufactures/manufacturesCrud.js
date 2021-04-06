import axios from "axios";
import { API_URL } from '../../../../pages/helper/api'

export const PRODUCTS_URL = API_URL + "manufacturer";

// CREATE =>  POST: add a new manufacture to the server
export function createManufacture(manufacture) {
  return axios.post(PRODUCTS_URL+'/', { ...manufacture });
}

// READ
export function getAllManufactures({filter, pageNumber, pageSize, sortField, sortOrder}) {
  return axios.get(PRODUCTS_URL,  {
    params: {...filter, page:pageNumber, page_size: pageSize, ordering: (sortOrder == 'asc') ? sortField : '-'+sortField}
  });
}

export function getManufactureById(manufactureId) {
  return axios.get(`${PRODUCTS_URL}/${manufactureId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findManufactures(queryParams) {
  return axios.post(`${PRODUCTS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the procuct on the server
export function updateManufacture(manufacture) {
  return axios.put(`${PRODUCTS_URL}/${manufacture.id}/`, { ...manufacture });
}

// UPDATE Status
export function updateStatusForManufactures(ids, status) {
  return axios.post(`${PRODUCTS_URL}/updateStatusForManufactures`, {
    ids,
    status
  });
}

// DELETE => delete the manufacture from the server
export function deleteManufacture(manufactureId) {
  return axios.delete(`${PRODUCTS_URL}/${manufactureId}`);
}

// DELETE Manufactures by ids
export function deleteManufactures(ids) {
  return axios.post(`${PRODUCTS_URL}/delete-all/`, { ids });
}
