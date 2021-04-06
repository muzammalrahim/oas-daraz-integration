import React, {useMemo} from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { EnquiriesFilter } from "./enquiries-filter/EnquiriesFilter";
import { EnquiriesTable } from "./enquiries-table/EnquiriesTable";
import { EnquiriesGrouping } from "./enquiries-grouping/EnquiriesGrouping";
import { useEnquiriesUIContext } from "./EnquiriesUIContext";

export function EnquiriesCard() {
  const enquiriesUIContext = useEnquiriesUIContext();
  const enquiriesUIProps = useMemo(() => {
    return {
      ids: enquiriesUIContext.ids,
      queryParams: enquiriesUIContext.queryParams,
      setQueryParams: enquiriesUIContext.setQueryParams,
      newEnquiryButtonClick: enquiriesUIContext.newEnquiryButtonClick,
      openDeleteEnquiriesDialog: enquiriesUIContext.openDeleteEnquiriesDialog,
      openEditEnquiryPage: enquiriesUIContext.openEditEnquiryPage,
      openViewEnquiryPage: enquiriesUIContext.openViewEnquiryPage,
      openUpdateEnquiriesStatusDialog:
        enquiriesUIContext.openUpdateEnquiriesStatusDialog,
      openFetchEnquiriesDialog: enquiriesUIContext.openFetchEnquiriesDialog,
    };
  }, [enquiriesUIContext]);

  return (
    <Card>
      <CardHeader title="Orders">
      </CardHeader>
      <CardBody>
        <EnquiriesFilter />
        {enquiriesUIProps.ids.length > 0 && (
          <>
            <EnquiriesGrouping />
          </>
        )}
        <EnquiriesTable />
      </CardBody>
    </Card>
  );
}
