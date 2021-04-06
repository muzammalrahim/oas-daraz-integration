/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/suppliers/suppliersActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { SupplierEditForm } from "./SupplierEditForm";
import { Specifications } from "../supplier-specifications/Specifications";
import { SpecificationsUIProvider } from "../supplier-specifications/SpecificationsUIContext";
import { useSubheader } from "../../../../../../_metronic/layout";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { RemarksUIProvider } from "../supplier-remarks/RemarksUIContext";
import { Remarks } from "../supplier-remarks/Remarks";
import { ADMIN_ROUTE } from "../../../../../pages/helper/api";
import { Snackbar, SnackbarContent, IconButton} from "@material-ui/core"
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

const initSupplier = {
  id: undefined,
  company_name: "",
  contact_person: "",
  country: "",
  landline_phone: "",
  mobile_Phone: "" ,
  email:"" 
};

export function SupplierEdit({
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
  const { actionsLoading, supplierForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.suppliers.actionsLoading,
      supplierForEdit: state.suppliers.supplierForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchSupplier(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : "New Supplier";
    if (supplierForEdit && id) {
      _title = `Edit supplier - ${supplierForEdit.company_name}`;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supplierForEdit, id]);

  const saveSupplier = (values) => {
    
    if (!id) {
      dispatch(actions.createSupplier(values))
      .then((response) => {
        if(response){
          setOpen(true)
          setMessage("Can't create Supplier")
          setMessageType('error')
        }else{
          backToSuppliersList()
        }
      })
      .catch(error=>console.log(error));
    } else {

      dispatch(actions.updateSupplier(values)).then((response) => {
        if(response){
          setOpen(true)
          setMessage("Can't update Supplier")
          setMessageType('error')
        }else{
          backToSuppliersList()
        }
      });
    }
  };

  const btnRef = useRef();  
  const saveSupplierClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToSuppliersList = () => {
    history.push(`/${ADMIN_ROUTE}/suppliers`);
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
            onClick={backToSuppliersList}
            className="btn btn-light"
          >
            <i className="fa fa-arrow-left"></i>
            Back
          </button>
          {`  `}
          <button
            type="submit"
            className="btn btn-info ml-2"
            onClick={saveSupplierClick}
          >
            Save
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <div className="mt-5">
            <SupplierEditForm
              actionsLoading={actionsLoading}
              supplier={supplierForEdit || initSupplier}
              btnRef={btnRef}
              saveSupplier={saveSupplier}
            />        <Snackbar
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
