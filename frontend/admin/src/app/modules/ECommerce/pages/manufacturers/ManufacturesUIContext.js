import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./ManufacturesUIHelpers";

const ManufacturesUIContext = createContext();

export function useManufacturesUIContext() {
  return useContext(ManufacturesUIContext);
}

export const ManufacturesUIConsumer = ManufacturesUIContext.Consumer;

export function ManufacturesUIProvider({ manufacturesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    newManufactureButtonClick: manufacturesUIEvents.newManufactureButtonClick,
    openEditManufacturePage: manufacturesUIEvents.openEditManufacturePage,
    openDeleteManufactureDialog: manufacturesUIEvents.openDeleteManufactureDialog,
    openDeleteManufacturesDialog: manufacturesUIEvents.openDeleteManufacturesDialog,
    openFetchManufacturesDialog: manufacturesUIEvents.openFetchManufacturesDialog,
    openUpdateManufacturesStatusDialog:
      manufacturesUIEvents.openUpdateManufacturesStatusDialog,
  };

  return (
    <ManufacturesUIContext.Provider value={value}>
      {children}
    </ManufacturesUIContext.Provider>
  );
}
