import axios from "axios";
import { API_URL } from '../../../../pages/helper/api'

export const PRODUCTS_URL = API_URL + "customer";

// CREATE =>  POST: add a new customer to the server
export function createCustomer(customer) {
  return axios.post(PRODUCTS_URL+'/', { ...customer });
}

// READ
export function getAllCustomers({pageNumber, filter, pageSize, sortField, sortOrder}) {
  return axios.get(PRODUCTS_URL,  {
    params:{ ...filter, page:pageNumber, page_size: pageSize, ordering: (sortOrder == 'asc') ? sortField : '-'+sortField}
  });
}

export function getCustomerById(customerId) {
  return axios.get(`${PRODUCTS_URL}/${customerId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCustomers(queryParams) {
  return axios.post(`${PRODUCTS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the procuct on the server
export function updateCustomer(customer) {
  return axios.patch(`${PRODUCTS_URL}/${customer.id}/`, { ...customer });
}

// UPDATE Status
export function updateStatusForCustomers(ids, status) {
  return axios.post(`${PRODUCTS_URL}/updateStatusForCustomers`, {
    ids,
    status
  });
}

// DELETE => delete the customer from the server
export function deleteCustomer(customerId) {
  return axios.delete(`${PRODUCTS_URL}/${customerId}`);
}

// DELETE Customers by ids
export function deleteCustomers(ids) {
  return axios.post(`${PRODUCTS_URL}/delete-all/`, { ids });
}
