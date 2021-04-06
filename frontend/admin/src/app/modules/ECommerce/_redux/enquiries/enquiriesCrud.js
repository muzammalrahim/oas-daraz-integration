import axios from "axios";
import { API_URL } from '../../../../pages/helper/api'

export const PRODUCTS_URL = API_URL + "enquiry";

// CREATE =>  POST: add a new enquiry to the server
export function createEnquiry(enquiry) {
  return axios.post(PRODUCTS_URL+'/', { ...enquiry });
}

// READ
export function getAllEnquiries({pageNumber, filter, pageSize, sortField, sortOrder}) {
  return axios.get(PRODUCTS_URL,  {
    params: {...filter, page:pageNumber, page_size: pageSize, ordering: (sortOrder == 'asc') ? sortField : '-'+sortField}
  });
}

export function getEnquiryById(enquiryId) {
  return axios.get(`${PRODUCTS_URL}/${enquiryId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findEnquiries(queryParams) {
  return axios.post(`${PRODUCTS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the procuct on the server
export function updateEnquiry(enquiry) {
  return axios.put(`${PRODUCTS_URL}/${enquiry.id}/`, { ...enquiry });
}

// UPDATE Status
export function updateStatusForEnquiries(ids, status) {
  return axios.post(`${PRODUCTS_URL}/updateStatusForEnquiries`, {
    ids,
    status
  });
}

// DELETE => delete the enquiry from the server
export function deleteEnquiry(enquiryId) {
  return axios.delete(`${PRODUCTS_URL}/${enquiryId}`);
}

// DELETE Enquiries by ids
export function deleteEnquiries(ids) {
  return axios.post(`${PRODUCTS_URL}/delete-all/`, { ids });
}
