import React, {useMemo} from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { SuppliersFilter } from "./suppliers-filter/SuppliersFilter";
import { SuppliersTable } from "./suppliers-table/SuppliersTable";
import { SuppliersGrouping } from "./suppliers-grouping/SuppliersGrouping";
import { useSuppliersUIContext } from "./SuppliersUIContext";
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
export function SuppliersCard() {
  const suppliersUIContext = useSuppliersUIContext();
  
  
  const [message, setMessage] = React.useState('');
  const [messageType, setMessageType] = React.useState('success');
  const [open, setOpen] = React.useState(false); // show/hide Snackbar
  const suppliersUIProps = useMemo(() => {
    return {
      ids: suppliersUIContext.ids,
      queryParams: suppliersUIContext.queryParams,
      setQueryParams: suppliersUIContext.setQueryParams,
      newSupplierButtonClick: suppliersUIContext.newSupplierButtonClick,
      openDeleteSuppliersDialog: suppliersUIContext.openDeleteSuppliersDialog,
      openEditSupplierPage: suppliersUIContext.openEditSupplierPage,
      openUpdateSuppliersStatusDialog:
        suppliersUIContext.openUpdateSuppliersStatusDialog,
      openFetchSuppliersDialog: suppliersUIContext.openFetchSuppliersDialog,
    };
  }, [suppliersUIContext]);
  const handleCloseSnackbar = (event, reason) => {
    setOpen(false);
  };
  return (
    <Card>
      <CardHeader title="Suppliers">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-info"
            onClick={suppliersUIProps.newSupplierButtonClick}
          >
            Add Supplier
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <SuppliersFilter />
        {suppliersUIProps.ids.length > 0 && (
          <>
            <SuppliersGrouping />
          </>
        )}
        <SuppliersTable />
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
