import React, { useMemo } from "react";
import { useManufacturesUIContext } from "../ManufacturesUIContext";

export function ManufacturesGrouping() {
  // Manufactures UI Context
  const manufacturesUIContext = useManufacturesUIContext();
  const manufacturesUIProps = useMemo(() => {
    return {
      ids: manufacturesUIContext.ids,
      setIds: manufacturesUIContext.setIds,
      openDeleteManufacturesDialog: manufacturesUIContext.openDeleteManufacturesDialog,
      openFetchManufacturesDialog: manufacturesUIContext.openFetchManufacturesDialog,
      openUpdateManufacturesStatusDialog:
        manufacturesUIContext.openUpdateManufacturesStatusDialog,
    };
  }, [manufacturesUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="-font-bold font-danger-">
                <span>
                  Selected records count: <b>{manufacturesUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={manufacturesUIProps.openDeleteManufacturesDialog}
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
