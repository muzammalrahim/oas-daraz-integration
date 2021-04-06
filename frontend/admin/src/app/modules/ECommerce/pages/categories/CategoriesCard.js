import React, {useMemo} from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { CategoriesFilter } from "./categories-filter/CategoriesFilter";
import { CategoriesTable } from "./categories-table/CategoriesTable";
import { CategoriesGrouping } from "./categories-grouping/CategoriesGrouping";
import { useCategoriesUIContext } from "./CategoriesUIContext";

export function CategoriesCard() {
  const categoriesUIContext = useCategoriesUIContext();
  const categoriesUIProps = useMemo(() => {
    return {
      ids: categoriesUIContext.ids,
      queryParams: categoriesUIContext.queryParams,
      setQueryParams: categoriesUIContext.setQueryParams,
      newCategoryButtonClick: categoriesUIContext.newCategoryButtonClick,
      openDeleteCategoriesDialog: categoriesUIContext.openDeleteCategoriesDialog,
      openEditCategoryPage: categoriesUIContext.openEditCategoryPage,
      openUpdateCategoriesStatusDialog:
        categoriesUIContext.openUpdateCategoriesStatusDialog,
      openFetchCategoriesDialog: categoriesUIContext.openFetchCategoriesDialog,
    };
  }, [categoriesUIContext]);

  return (
    <Card>
      <CardHeader title="Categories">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-info"
            onClick={categoriesUIProps.newCategoryButtonClick}
          >
            Add Category
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {/* <CategoriesFilter /> */}
        {categoriesUIProps.ids.length > 0 && (
          <>
            <CategoriesGrouping />
          </>
        )}
        <CategoriesTable />
      </CardBody>
    </Card>
  );
}
