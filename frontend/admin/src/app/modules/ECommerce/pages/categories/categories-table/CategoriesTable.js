// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/categories/categoriesActions";
import * as uiHelpers from "../CategoriesUIHelpers";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../_metronic/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useCategoriesUIContext } from "../CategoriesUIContext";

export function CategoriesTable() {
  // Categories UI Context
  const categoriesUIContext = useCategoriesUIContext();
  const categoriesUIProps = useMemo(() => {
    return {
      ids: categoriesUIContext.ids,
      setIds: categoriesUIContext.setIds,
      queryParams: categoriesUIContext.queryParams,
      setQueryParams: categoriesUIContext.setQueryParams,
      openEditCategoryPage: categoriesUIContext.openEditCategoryPage,
      openDeleteCategoryDialog: categoriesUIContext.openDeleteCategoryDialog,
    };
  }, [categoriesUIContext]);

  // Getting curret state of categories list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.categories }),
    shallowEqual
  );
  const { totalCount, entities, listLoading, pageNumber } = currentState;
  // Categories Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    categoriesUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchCategories(categoriesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesUIProps.queryParams, dispatch]);
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
        openEditCategoryPage: categoriesUIProps.openEditCategoryPage,
        openDeleteCategoryDialog: categoriesUIProps.openDeleteCategoryDialog,
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
    sizePerPage: categoriesUIProps.queryParams.pageSize,
    page: categoriesUIProps.queryParams.pageNumber,
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
                  categoriesUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: categoriesUIProps.ids,
                  setIds: categoriesUIProps.setIds,
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
