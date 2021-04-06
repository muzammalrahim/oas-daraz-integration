import React, {useMemo, createRef, useState} from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { ProductsFilter } from "./products-filter/ProductsFilter";
import { ProductsTable } from "./products-table/ProductsTable";
import { ProductsGrouping } from "./products-grouping/ProductsGrouping";
import { useProductsUIContext } from "./ProductsUIContext";
import CSVReader from 'react-csv-reader';
import {post} from '../../../../pages/helper/api';
import { CsvToHtmlTable } from 'react-csv-to-table';
import Modal from "react-bootstrap/Modal";
import { Importer, ImporterField } from 'react-csv-importer';
import CsvViewer from "react-csv-viewer";
import DataTable from 'react-data-table-component';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { amber, green } from '@material-ui/core/colors';
import {
    IconButton, Paper, FormControlLabel, Switch, Snackbar, Checkbox, Toolbar, Tooltip, Typography, SnackbarContent
} from '@material-ui/core';
import clsx from 'clsx';
import {
    Delete as DeleteIcon, Close as CloseIcon, CheckCircle as CheckCircleIcon, Error as ErrorIcon, Info as InfoIcon,
    Warning as WarningIcon
} from '@material-ui/icons';


const columns = [
  {selector: 'part_number'          , name: 'Part Number'          },
  {selector: 'alt_part_number'      , name: 'Alt Part Number'      },
  {selector: 'short_description'    , name: 'Short Description'    },
  {selector: 'condition'            , name: 'Condition'            },
  {selector: 'product_title'        , name: 'Product Title'        },
  {selector: 'quantity'             , name: 'Quantity'             },
  {selector: 'unit_price'           , name: 'unit_price'           },
  {selector: 'product_category'     , name: 'Product Category'     },
  {selector: 'tag_date'             , name: 'Tag Date'             },
  {selector: 'hazmat'               , name: 'Hazmat'               },
  {selector: 'un_code'              , name: 'Un Code'              },
  {selector: 'certification'        , name: 'Certification'        },
  {selector: 'unit_of_measure'      , name: 'Measure Unit'      },
  {selector: 'stock_location'       , name: 'Stock Location'       },
  {selector: 'turn_around_time'     , name: 'Turn Around Time'     },
  {selector: 'product_manufacturer' , name: 'Product Manufacturer' },
  {selector: 'supplier'             , name: 'Supplier'             },
  {selector: 'hot_sale_item'        , name: 'Hot Sale Item'        },
  {selector: 'description'          , name: 'Description'          }
];

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStylesSnackbarContent = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function SnackbarContentWrapper(props) {
  const classes = useStylesSnackbarContent();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

SnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};

export function ProductsCard() {
  const [csvData, setCsvData] = useState([]);
  const [csvModal, setCsvModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [importData, setImportData] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = React.useState('success');
  const [open, setOpen] = React.useState(false); // show/hide Snackbar
  const productsUIContext = useProductsUIContext();
  const productsUIProps = useMemo(() => {
    return {
      ids: productsUIContext.ids,
      queryParams: productsUIContext.queryParams,
      setQueryParams: productsUIContext.setQueryParams,
      newProductButtonClick: productsUIContext.newProductButtonClick,
      openDeleteProductsDialog: productsUIContext.openDeleteProductsDialog,
      openEditProductPage: productsUIContext.openEditProductPage,
      openViewProductPage: productsUIContext.openViewProductPage,
      openUpdateProductsStatusDialog:
        productsUIContext.openUpdateProductsStatusDialog,
      openFetchProductsDialog: productsUIContext.openFetchProductsDialog,
    };
  }, [productsUIContext]);

  const inputFile = createRef();

  const handleCloseSnackbar = (event, reason) => {
    setOpen(false);
  };

  return (
    <Card>
      <CardHeader title="Products">
        <CardHeaderToolbar>
          <a
            href="/static/Product_Sample.csv"
            ref={inputFile}
            download
            style={{display:'none'}}
          >
          </a>
    
          <button
            type="button"
            className="btn btn-danger mr-2"
            onClick={() => setCsvModal(true)}
          >
            Import Products
          </button>

          <button
            type="button"
            className="btn btn-info"
            onClick={productsUIProps.newProductButtonClick}
          >
            Add Product
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <Modal
          backdrop={processing ? "static":true}
          size="xl"
          show={csvModal}
          onHide={() => {setCsvModal(false);setCsvData([])}}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton className="pr-0">
              <div className="row" style={{width:'100%'}}>
                <div className="col-md-4">
                  <Modal.Title id="example-modal-sizes-title-lg">
                    Import Data
                  </Modal.Title>
                </div>
                <div className="col-md-8 text-right">
                  {csvData.length ?
                  <button
                    type="button"
                    className="btn btn-danger mr-2 float-right"
                    onClick={() => {
                      if(!processing) {
                        setProcessing(true);
                        post("import", {data:importData, model:"Inventory"}).then((response) => {
                          setProcessing(false);
                          setImportData([]);
                          setCsvData([]);
                          setOpen(true);
                          setCsvModal(false);
                          setMessage('Product imported successfully');
                          setMessageType('success')
                        }).catch((error) => {
                          setProcessing(false);
                          setImportData([]);
                          setCsvData([]);
                          setOpen(true);
                          setMessage('Error occur! Try again');
                          setMessageType('error')
                        });
                      }
                    }}
                  > {processing ? 'Importing...' : 'Confirm Import'}
                  </button> :
                  <CSVReader
                    cssClass="float-right"
                    cssInputClass="d-none"
                    label={<span className=" btn btn-info mr-2">Choose CSV File</span>}
                    onFileLoaded={(data) => {
                      setImportData(data);
                      let csvDataTemp = data.map((row, i) => {
                        let obj_dt = {}
                        row.map((col, k) => {
                          obj_dt[data[0][k]] = col;
                        });
                        return obj_dt;
                      });

                      csvDataTemp.shift();

                      setCsvData(csvDataTemp);

                    }}
                  />}
                  <button
                    type="button"
                    className="btn btn-success mr-2"
                    onClick={() => inputFile.current.click()}
                  >
                    Download Template
                  </button>
                </div>
              </div>
          </Modal.Header>
          <Modal.Body>

          <DataTable
            data={csvData}
            columns={columns}
            pagination
            noHeader={true}
            dense={true}
          />

          </Modal.Body>
        </Modal>
        <ProductsFilter />
        {productsUIProps.ids.length > 0 && (
          <>
            <ProductsGrouping />
          </>
        )}
        <ProductsTable />
      <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <SnackbarContentWrapper
            onClose={handleCloseSnackbar}
            variant={messageType}
            message={message}
          />
      </Snackbar>
      </CardBody>
    </Card>
  );
}
