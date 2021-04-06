/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/enquiries/enquiriesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { EnquiryEditForm } from "./EnquiryEditForm";
import { Specifications } from "../enquiry-specifications/Specifications";
import { SpecificationsUIProvider } from "../enquiry-specifications/SpecificationsUIContext";
import { useSubheader } from "../../../../../../_metronic/layout";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { RemarksUIProvider } from "../enquiry-remarks/RemarksUIContext";
import { Remarks } from "../enquiry-remarks/Remarks";
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


const initEnquiry = {
  id: undefined,
  condition: "",
  enquiry_manufacturer: "",
  supplier: "",
  enquiry_category: "",
  part_number: "",
  alt_part_number: "",
  description: "",
  tag_date: "2021-12-12",
  status: 0,
  hazmat: "",
  unit_price: 0,
  unit_of_measure:"",
  quantity:0,
  turn_around_time:"",
  hot_sale_item:"",
  certification:""
};

export function EnquiryEdit({
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
  const { actionsLoading, enquiryForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.enquiries.actionsLoading,
      enquiryForEdit: state.enquiries.enquiryForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchEnquiry(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : "New Enquiry";
    if (enquiryForEdit && id) {
      _title = `Edit enquiry - ${enquiryForEdit.part_number}`;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enquiryForEdit, id]);

  const saveEnquiry = (values) => {
    
    if (!id) {
      dispatch(actions.createEnquiry(values)).then((response) => {
        if(response){
          setOpen(true)
          setMessage("Can't create order")
          setMessageType('error')
        }else{
          backToEnquiriesList()
        }
      });
    } else {

      dispatch(actions.updateEnquiry(values)).then((response) => {
        if(response){
          setOpen(true)
          setMessage("Can't update order")
          setMessageType('error')
        }else{
          backToEnquiriesList()
        }
      });;
    }
  };

  const btnRef = useRef();  
  const saveEnquiryClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToEnquiriesList = () => {
    history.push(`/${ADMIN_ROUTE}/orders`);
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
            onClick={backToEnquiriesList}
            className="btn btn-light"
          >
            <i className="fa fa-arrow-left"></i>
            Back
          </button>
          {`  `}
          <button className="btn btn-light ml-2">
            <i className="fa fa-redo"></i>
            Reset
          </button>
          {`  `}
          <button
            type="submit"
            className="btn btn-info ml-2"
            onClick={saveEnquiryClick}
          >
            Save
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <div className="mt-5">
            <EnquiryEditForm
              actionsLoading={actionsLoading}
              enquiry={enquiryForEdit || initEnquiry}
              btnRef={btnRef}
              saveEnquiry={saveEnquiry}
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
