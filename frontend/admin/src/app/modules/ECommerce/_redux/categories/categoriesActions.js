import * as requestFromServer from "./categoriesCrud";
import {categoriesSlice, callTypes} from "./categoriesSlice";

const {actions} = categoriesSlice;

export const fetchCategories = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllCategories(queryParams)
    .then(response => {
      const { count, results, next } = response.data;
      let pageNumber = null;
      if(next) {
        let url = new URL(next);
        pageNumber = url.searchParams.get('page') ;
      }
      dispatch(actions.categoriesFetched({ count, results, pageNumber }));
    })
    .catch(error => {
      error.clientMessage = "Can't find categories";
      return dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCategory = id => dispatch => {
  if (!id) {
    return dispatch(actions.categoryFetched({ categoryForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCategoryById(id)
    .then(response => {
      const category = {
        ...response.data, 
        supplier:response.data.supplier ? response.data.supplier.id : "",
        category_manufacturer:response.data.category_manufacturer ? response.data.category_manufacturer.id : "",
        category_category:response.data.category_category ? response.data.category_category.id : "",
      };

      dispatch(actions.categoryFetched({ categoryForEdit: category }));
    })
    .catch(error => {
      error.clientMessage = "Can't find category";
      return dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCategory = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCategory(id)
    .then(response => {
      dispatch(actions.categoryDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete category";
      return dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createCategory = categoryForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createCategory(categoryForCreation)
    .then(response => {
      const { data } = response;
      dispatch(actions.categoryCreated({ category:data }));
    })
    .catch(error => {
      error.clientMessage = "Can't create category";
      return dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCategory = category => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCategory(category)
    .then(() => {
      dispatch(actions.categoryUpdated({ category }));
    })
    .catch(error => {
      error.clientMessage = "Can't update category";
      return dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCategoriesStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForCategories(ids, status)
    .then(() => {
      dispatch(actions.categoriesStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update categories status";
      return dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCategories = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCategories(ids)
    .then(() => {
      dispatch(actions.categoriesDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete categories";
      return dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
