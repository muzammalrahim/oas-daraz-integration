import React, {useMemo} from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { CustomersFilter } from "./customers-filter/CustomersFilter";
import { CustomersTable } from "./customers-table/CustomersTable";
import { CustomersGrouping } from "./customers-grouping/CustomersGrouping";
import { useCustomersUIContext } from "./CustomersUIContext";

export function CustomersCard() {
  const customersUIContext = useCustomersUIContext();
  const customersUIProps = useMemo(() => {
    return {
      ids: customersUIContext.ids,
      queryParams: customersUIContext.queryParams,
      setQueryParams: customersUIContext.setQueryParams,
      newCustomerButtonClick: customersUIContext.newCustomerButtonClick,
      openDeleteCustomersDialog: customersUIContext.openDeleteCustomersDialog,
      openEditCustomerPage: customersUIContext.openEditCustomerPage,
      openUpdateCustomersStatusDialog:
        customersUIContext.openUpdateCustomersStatusDialog,
      openFetchCustomersDialog: customersUIContext.openFetchCustomersDialog,
    };
  }, [customersUIContext]);

  return (
    <Card>
      <CardHeader title="Customers">
      </CardHeader>
      <CardBody>
        <CustomersFilter />
        {customersUIProps.ids.length > 0 && (
          <>
            <CustomersGrouping />
          </>
        )}
        <CustomersTable />
      </CardBody>
    </Card>
  );
}
