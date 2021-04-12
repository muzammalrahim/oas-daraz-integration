/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/products/productsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { ProductEditForm } from "./ProductEditForm";
import { Specifications } from "../product-specifications/Specifications";
import { SpecificationsUIProvider } from "../product-specifications/SpecificationsUIContext";
import { useSubheader } from "../../../../../../_metronic/layout";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { RemarksUIProvider } from "../product-remarks/RemarksUIContext";
import { Remarks } from "../product-remarks/Remarks";
import { ADMIN_ROUTE } from "../../../../../pages/helper/api";
import { Snackbar, SnackbarContent, IconButton } from "@material-ui/core"
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { amber, green } from '@material-ui/core/colors';
import clsx from 'clsx';
import {
  Delete as DeleteIcon, Close as CloseIcon, CheckCircle as CheckCircleIcon, Error as ErrorIcon, Info as InfoIcon,
  Warning as WarningIcon
} from '@material-ui/icons'


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
          {/* <Icon className={clsx(classes.icon, classes.iconVariant)} /> */}
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
// import moment from "moment";

const initProduct = {
  id: undefined,
  condition: "",
  product_manufacturer: "",
  supplier: "",
  product_category: "",
  part_number: "",
  alt_part_number: "",
  description: "",
  tag_date: null,
  status: 1,
  hazmat: "No",
  unit_price: 0,
  unit_of_measure: "",
  quantity: 1,
  turn_around_time: "",
  // hot_sale_item: "No",
  certification: "",
  // product_image_name: "",
  un_code: "",
  stock_location: "",
  short_description: "",
  product_title: "",
  best_seller: false,
  featured_product: false,
};

export function ProductEdit({
  history,
  match: {
    params: { id },
  },
}) {
  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, productForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.products.actionsLoading,
      productForEdit: state.products.productForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchProduct(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : "New Product";
    if (productForEdit && id) {
      _title = `Edit product - ${productForEdit.part_number}`;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productForEdit, id]);

  const saveProduct = (values) => {

    if (!id) {
      dispatch(actions.createProduct(values)).then((response) => {
        if (response) {
          setOpen(true)
          setMessage("Can't create Product")
          setMessageType('error')
        } else {
          backToProductsList()
        }
      });
    } else {

      dispatch(actions.updateProduct(values)).then((response) => {
        if (response) {
          setOpen(true)
          setMessage("Can't update Product")
          setMessageType('error')
        } else {
          backToProductsList()
        }
      });
    }
  };

  const btnRef = useRef();
  const saveProductClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToProductsList = () => {
    history.push(`/${ADMIN_ROUTE}/products`);
  };

  const handleCloseSnackbar = (event, reason) => {
    setOpen(false);
  }

  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToProductsList}
            className="btn btn-light"
          >
            <i className="fa fa-arrow-left"></i>
            Back
          </button>
          {`  `}
          <button
            type="submit"
            className="btn btn-info ml-2"
            onClick={saveProductClick}
          >
            Save
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <div className="mt-5">
          <ProductEditForm
            actionsLoading={actionsLoading}
            product={productForEdit || initProduct}
            btnRef={btnRef}
            saveProduct={saveProduct}
          />
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
        </div>
      </CardBody>
    </Card>
  );
}
