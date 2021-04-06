// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/manufactures/manufacturesActions";
import * as uiHelpers from "../ManufacturesUIHelpers";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../_metronic/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useManufacturesUIContext } from "../ManufacturesUIContext";

export function ManufacturesTable() {
  // Manufactures UI Context
  const manufacturesUIContext = useManufacturesUIContext();
  const manufacturesUIProps = useMemo(() => {
    return {
      ids: manufacturesUIContext.ids,
      setIds: manufacturesUIContext.setIds,
      queryParams: manufacturesUIContext.queryParams,
      setQueryParams: manufacturesUIContext.setQueryParams,
      openEditManufacturePage: manufacturesUIContext.openEditManufacturePage,
      openDeleteManufactureDialog: manufacturesUIContext.openDeleteManufactureDialog,
    };
  }, [manufacturesUIContext]);

  // Getting curret state of manufactures list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.manufactures }),
    shallowEqual
  );
  const { totalCount, entities, listLoading, pageNumber } = currentState;
  // Manufactures Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    manufacturesUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchManufactures(manufacturesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manufacturesUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
   
    {
      dataField: "name",
      text: "Name",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditManufacturePage: manufacturesUIProps.openEditManufacturePage,
        openDeleteManufactureDialog: manufacturesUIProps.openDeleteManufactureDialog,
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
    sizePerPage: manufacturesUIProps.queryParams.pageSize,
    page: manufacturesUIProps.queryParams.pageNumber,
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
                  manufacturesUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: manufacturesUIProps.ids,
                  setIds: manufacturesUIProps.setIds,
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
