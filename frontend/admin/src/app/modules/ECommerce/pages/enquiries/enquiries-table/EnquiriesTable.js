// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/enquiries/enquiriesActions";
import * as uiHelpers from "../EnquiriesUIHelpers";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../_metronic/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useEnquiriesUIContext } from "../EnquiriesUIContext";

export function EnquiriesTable() {
  // Enquiries UI Context
  const enquiriesUIContext = useEnquiriesUIContext();
  const enquiriesUIProps = useMemo(() => {
    return {
      ids: enquiriesUIContext.ids,
      setIds: enquiriesUIContext.setIds,
      queryParams: enquiriesUIContext.queryParams,
      setQueryParams: enquiriesUIContext.setQueryParams,
      openViewEnquiryPage:enquiriesUIContext.openViewEnquiryPage,
      openDeleteEnquiryDialog: enquiriesUIContext.openDeleteEnquiryDialog,
    };
  }, [enquiriesUIContext]);

  // Getting curret state of enquiries list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.enquiries }),
    shallowEqual
  );
  const { totalCount, entities, listLoading, pageNumber } = currentState;
  // Enquiries Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    enquiriesUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchEnquiries(enquiriesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enquiriesUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "email_address",
      text: "Email",
      sort: true,
      sortCaret: sortCaret,
      formatter: columnFormatters.EmailFormatter,
    },
    {
      dataField: "phone_number",
      text: "Phone Number",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      sortCaret: sortCaret,
      formatter: columnFormatters.StatusColumnFormatter,
    },
    {
      dataField: "company.company_name",
      text: "Company",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "country.name",
      text: "Country",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "created_at",
      text: "Date",
      sort: true,
      sortCaret: sortCaret,
      formatter: columnFormatters.DateFormatter,

    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openViewEnquiryPage:enquiriesUIProps.openViewEnquiryPage,
        openDeleteEnquiryDialog: enquiriesUIProps.openDeleteEnquiryDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: enquiriesUIProps.queryParams.pageSize,
    page: enquiriesUIProps.queryParams.pageNumber,
    
  };
  let data = [];
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                bordered={false}
                remote
                keyField="id"
                data= {entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  enquiriesUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: enquiriesUIProps.ids,
                  setIds: enquiriesUIProps.setIds,
                })}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
