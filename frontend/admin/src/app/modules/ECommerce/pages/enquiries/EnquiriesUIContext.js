import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./EnquiriesUIHelpers";

const EnquiriesUIContext = createContext();

export function useEnquiriesUIContext() {
  return useContext(EnquiriesUIContext);
}

export const EnquiriesUIConsumer = EnquiriesUIContext.Consumer;

export function EnquiriesUIProvider({ enquiriesUIEvents, children }) {
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
    newEnquiryButtonClick: enquiriesUIEvents.newEnquiryButtonClick,
    openViewEnquiryPage:enquiriesUIEvents.openViewEnquiryPage,
    openEditEnquiryPage: enquiriesUIEvents.openEditEnquiryPage,
    openDeleteEnquiryDialog: enquiriesUIEvents.openDeleteEnquiryDialog,
    openDeleteEnquiriesDialog: enquiriesUIEvents.openDeleteEnquiriesDialog,
    openFetchEnquiriesDialog: enquiriesUIEvents.openFetchEnquiriesDialog,
    openUpdateEnquiriesStatusDialog:
      enquiriesUIEvents.openUpdateEnquiriesStatusDialog,
  };

  return (
    <EnquiriesUIContext.Provider value={value}>
      {children}
    </EnquiriesUIContext.Provider>
  );
}
