import React, { useMemo } from "react";
import { useEnquiriesUIContext } from "../EnquiriesUIContext";

export function EnquiriesGrouping() {
  // Enquiries UI Context
  const enquiriesUIContext = useEnquiriesUIContext();
  const enquiriesUIProps = useMemo(() => {
    return {
      ids: enquiriesUIContext.ids,
      setIds: enquiriesUIContext.setIds,
      openDeleteEnquiriesDialog: enquiriesUIContext.openDeleteEnquiriesDialog,
      openFetchEnquiriesDialog: enquiriesUIContext.openFetchEnquiriesDialog,
      openUpdateEnquiriesStatusDialog:
        enquiriesUIContext.openUpdateEnquiriesStatusDialog,
    };
  }, [enquiriesUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="-font-bold font-danger-">
                <span>
                  Selected records count: <b>{enquiriesUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={enquiriesUIProps.openDeleteEnquiriesDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
