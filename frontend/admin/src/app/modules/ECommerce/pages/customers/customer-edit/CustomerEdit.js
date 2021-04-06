/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/customers/customersActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { CustomerEditForm } from "./CustomerEditForm";
import CustomerBillingForm  from "./CustomerBillingForm";
import  CustomerShippingForm  from "./CustomerShippingForm";
import { Specifications } from "../customer-specifications/Specifications";
import { SpecificationsUIProvider } from "../customer-specifications/SpecificationsUIContext";
import { useSubheader } from "../../../../../../_metronic/layout";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { RemarksUIProvider } from "../customer-remarks/RemarksUIContext";
import { Remarks } from "../customer-remarks/Remarks";
import { ADMIN_ROUTE, post } from "../../../../../pages/helper/api";
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

const initCust = {
  id: undefined,
  user:{
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  },
  company_name: "",
  contact_person: "",
  country: "",
  landline_phone:"",
  mobile_Phone: "",
  billingcontact:{
    email: "",
    company_name: "",
    contact_person: "",
    bill_address_one: "",
    bill_address_two: "",
    zip_code : "",
    country: "",
  },
  shippingcontact:{
    email: "",
    company_name: "",
    contact_person: "",
    bill_address_one: "",
    bill_address_two: "",
    zip_code : "",
    country: "",
  },
};

export function CustomerEdit({
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
  const [initCustomer, setInitCustomer] = useState(initCust);
  const [saveClick, setSaveClick] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [countries, setCountries] = useState([]);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, customerForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.customers.actionsLoading,
      customerForEdit: state.customers.customerForEdit,
    }),
    shallowEqual
  );
  useEffect(() => {
    loadModels();
  }, []);

  function loadModels() {
    let models = {
      'Country': {},
    };
    post("oas-models", { models: models }).then(function(response) {
      for (let opt in response.data) {
        response.data[opt].map((row, i) => {
          response.data[opt][i].label = row.name ? row.name : row.company_name;
          response.data[opt][i].value = row.id;
        });
      }

      setCountries(response.data.Country);
      setModelsLoaded(true);
    });
  }

  useEffect(() => {
    dispatch(actions.fetchCustomer(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : "New Customer";
    if (customerForEdit && id) {
      
      setInitCustomer(customerForEdit);
      _title = `Edit customer - ${customerForEdit.user.email}`;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerForEdit, id]);

  const saveCustomer = (values) => {
      setInitCustomer(values);
      if(saveClick) {  
            
        if (!id) {
          dispatch(actions.createCustomer(values)).then((response) => {
            if(response.status === 201)
              backToCustomersList();
            else {
              setOpen(true)
              setMessage("Can't create customer")
              setMessageType('error')
            }
          });
        } else {

          dispatch(actions.updateCustomer(values)).then((response) => {
            if(response.status === 200)
              backToCustomersList();
            else {
              setOpen(true)
              setMessage("Can't update customer")
              setMessageType('error')
            }
          });
        }
      }
  };

  const btnRef = useRef();  
  const saveCustomerClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToCustomersList = () => {
    history.push(`/${ADMIN_ROUTE}/customers`);
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
            onClick={backToCustomersList}
            className="btn btn-light"
          >
            <i className="fa fa-arrow-left"></i>
            Back
          </button>
          {`  `}
          {/* <button className="btn btn-light ml-2">
            <i className="fa fa-redo"></i>
            Reset
          </button>
          {`  `} */}
          <button
            type="submit"
            className="btn btn-info ml-2"
            onClick={() => {setSaveClick(true); saveCustomerClick()}}
          >
            Save
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ul className="nav nav-tabs nav-tabs-line " role="tablist">
          <li className="nav-item" onClick={() => {
            setTab("basic"); setSaveClick(false); saveCustomerClick();
          }}>
            <a
              className={`nav-link ${tab === "basic" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "basic").toString()}
            >
              Basic info
            </a>
          </li>

              <li className="nav-item" onClick={() => {
                setTab("billing");  setSaveClick(false); saveCustomerClick();
                }}>
                <a
                  className={`nav-link ${tab === "billing" && "active"}`}
                  data-toggle="tab"
                  role="button"
                  aria-selected={(tab === "billing").toString()}
                >
                  Billing Contact
                </a>
              </li>
              <li className="nav-item" onClick={() => {setTab("shipping");  setSaveClick(false); saveCustomerClick();}}>
                <a
                  className={`nav-link ${tab === "shipping" && "active"}`}
                  data-toggle="tab"
                  role="tab"
                  aria-selected={(tab === "shipping").toString()}
                >
                  Shipping Contact
                </a>
              </li>
        </ul>
        <div className="mt-5">
          {tab === "basic" && (
            <CustomerEditForm
              actionsLoading={actionsLoading}
              customer={initCustomer}
              btnRef={btnRef}
              saveCustomer={saveCustomer}
              countries ={countries}
              modelsLoaded = {modelsLoaded}

            />
          )}
          {tab === "billing" &&  (
            <CustomerBillingForm
              actionsLoading={actionsLoading}
              customer={initCustomer}
              btnRef={btnRef}
              saveCustomer={saveCustomer}
              countries ={countries}
              modelsLoaded = {modelsLoaded}
            />
          )}
           {tab === "shipping" &&  (
            <CustomerShippingForm
              actionsLoading={actionsLoading}
              customer={initCustomer}
              btnRef={btnRef}
              saveCustomer={saveCustomer}
              countries ={countries}
              modelsLoaded = {modelsLoaded}
            />
          )}
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
