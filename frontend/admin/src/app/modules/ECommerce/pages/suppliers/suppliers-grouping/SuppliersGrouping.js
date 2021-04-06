import React, { useMemo } from "react";
import { useSuppliersUIContext } from "../SuppliersUIContext";

export function SuppliersGrouping() {
  // Suppliers UI Context
  const suppliersUIContext = useSuppliersUIContext();
  const suppliersUIProps = useMemo(() => {
    return {
      ids: suppliersUIContext.ids,
      setIds: suppliersUIContext.setIds,
      openDeleteSuppliersDialog: suppliersUIContext.openDeleteSuppliersDialog,
      openFetchSuppliersDialog: suppliersUIContext.openFetchSuppliersDialog,
      openUpdateSuppliersStatusDialog:
        suppliersUIContext.openUpdateSuppliersStatusDialog,
    };
  }, [suppliersUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="-font-bold font-danger-">
                <span>
                  Selected records count: <b>{suppliersUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={suppliersUIProps.openDeleteSuppliersDialog}
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
