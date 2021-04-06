import * as requestFromServer from "./manufacturesCrud";
import {manufacturesSlice, callTypes} from "./manufacturesSlice";

const {actions} = manufacturesSlice;

export const fetchManufactures = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllManufactures(queryParams)
    .then(response => {
      const { count, results, next } = response.data;
      let pageNumber = null;
      if(next) {
        let url = new URL(next);
        pageNumber = url.searchParams.get('page') ;
      }
      dispatch(actions.manufacturesFetched({ count, results, pageNumber }));
    })
    .catch(error => {
      error.clientMessage = "Can't find manufactures";
      return dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchManufacture = id => dispatch => {
  if (!id) {
    return dispatch(actions.manufactureFetched({ manufactureForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getManufactureById(id)
    .then(response => {
      const manufacture = {
        ...response.data, 
        supplier:response.data.supplier ? response.data.supplier.id : "",
        manufacture_manufacturer:response.data.manufacture_manufacturer ? response.data.manufacture_manufacturer.id : "",
        manufacture_category:response.data.manufacture_category ? response.data.manufacture_category.id : "",
      };

      dispatch(actions.manufactureFetched({ manufactureForEdit: manufacture }));
    })
    .catch(error => {
      error.clientMessage = "Can't find manufacture";
      return dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteManufacture = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteManufacture(id)
    .then(response => {
      dispatch(actions.manufactureDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete manufacture";
      return dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createManufacture = manufactureForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createManufacture(manufactureForCreation)
    .then(response => {
      const { data } = response;
      dispatch(actions.manufactureCreated({ manufacture:data }));
    })
    .catch(error => {
      error.clientMessage = "Can't create manufacture";
      return dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateManufacture = manufacture => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateManufacture(manufacture)
    .then(() => {
      dispatch(actions.manufactureUpdated({ manufacture }));
    })
    .catch(error => {
      error.clientMessage = "Can't update manufacture";
      return dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateManufacturesStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForManufactures(ids, status)
    .then(() => {
      dispatch(actions.manufacturesStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update manufactures status";
      return dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteManufactures = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteManufactures(ids)
    .then(() => {
      dispatch(actions.manufacturesDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete manufactures";
      return dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
