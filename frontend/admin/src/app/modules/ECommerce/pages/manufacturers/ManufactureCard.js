import React, {useMemo} from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { ManufacturesFilter } from "./manufactures-filter/ManufacturesFilter";
import { ManufacturesTable } from "./manufactures-table/ManufacturesTable";
import { ManufacturesGrouping } from "./manufactures-grouping/ManufacturesGrouping";
import { useManufacturesUIContext } from "./ManufacturesUIContext";

export function ManufacturesCard() {
  const manufacturesUIContext = useManufacturesUIContext();
  const manufacturesUIProps = useMemo(() => {
    return {
      ids: manufacturesUIContext.ids,
      queryParams: manufacturesUIContext.queryParams,
      setQueryParams: manufacturesUIContext.setQueryParams,
      newManufactureButtonClick: manufacturesUIContext.newManufactureButtonClick,
      openDeleteManufacturesDialog: manufacturesUIContext.openDeleteManufacturesDialog,
      openEditManufacturePage: manufacturesUIContext.openEditManufacturePage,
      openUpdateManufacturesStatusDialog:
        manufacturesUIContext.openUpdateManufacturesStatusDialog,
      openFetchManufacturesDialog: manufacturesUIContext.openFetchManufacturesDialog,
    };
  }, [manufacturesUIContext]);

  return (
    <Card>
      <CardHeader title="Manufactures">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-info"
            onClick={manufacturesUIProps.newManufactureButtonClick}
          >
            Add Manufacture
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ManufacturesFilter />
        {manufacturesUIProps.ids.length > 0 && (
          <>
            <ManufacturesGrouping />
          </>
        )}
        <ManufacturesTable />
      </CardBody>
    </Card>
  );
}
