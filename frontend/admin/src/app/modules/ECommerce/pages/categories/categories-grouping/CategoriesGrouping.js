import React, { useMemo } from "react";
import { useCategoriesUIContext } from "../CategoriesUIContext";

export function CategoriesGrouping() {
  // Categories UI Context
  const categoriesUIContext = useCategoriesUIContext();
  const categoriesUIProps = useMemo(() => {
    return {
      ids: categoriesUIContext.ids,
      setIds: categoriesUIContext.setIds,
      openDeleteCategoriesDialog: categoriesUIContext.openDeleteCategoriesDialog,
      openFetchCategoriesDialog: categoriesUIContext.openFetchCategoriesDialog,
      openUpdateCategoriesStatusDialog:
        categoriesUIContext.openUpdateCategoriesStatusDialog,
    };
  }, [categoriesUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="-font-bold font-danger-">
                <span>
                  Selected records count: <b>{categoriesUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={categoriesUIProps.openDeleteCategoriesDialog}
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
