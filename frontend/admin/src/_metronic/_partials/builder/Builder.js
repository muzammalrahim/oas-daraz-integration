/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/img-redundant-alt */
import React, { useMemo, useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { get, merge } from "lodash";
import { FormHelperText, Switch } from "@material-ui/core";
import clsx from "clsx";
// https://github.com/conorhastings/react-syntax-highlighter#prism
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// See https://github.com/PrismJS/prism-themes
import { coy as highlightStyle } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  useHtmlClassService,
  setLayoutConfig,
  getInitLayoutConfig,
} from "../../layout";
import { Snackbar, SnackbarContent, IconButton } from "@material-ui/core"
import {
    Delete as DeleteIcon, Close as CloseIcon, CheckCircle as CheckCircleIcon, Error as ErrorIcon, Info as InfoIcon,
    Warning as WarningIcon
  } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { amber, green } from '@material-ui/core/colors';
import { Card, CardBody, CardHeader, Notice, Input } from "../controls";
import { post, list, put } from "../../../app/pages/helper/api";
import { EventAvailable } from "@material-ui/icons";

const localStorageActiveTabKey = "builderActiveTab";



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


export function Builder() {
  const activeTab = localStorage.getItem(localStorageActiveTabKey);
  const [key, setKey] = useState(activeTab ? +activeTab : 0);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState(false)
  const [settings, setSettings] = useState([]);
  // const [darazcredential, setDarazCredential] = useState({})
  const [clientId, setClientId] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [darazMode, setDarazMode] = useState(false)
  const [darazObj, setDarazObj] = useState({userId:"", api_key:""})
  const htmlClassService = useHtmlClassService();
  
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [open, setOpen] = useState(false);
  
  const initialValues = useMemo(
    () =>
      merge(
        // Fulfill changeable fields.
        getInitLayoutConfig(),
        htmlClassService.config
      ),
    [htmlClassService.config]
  );

  const saveCurrentTab = (_tab) => {
    localStorage.setItem(localStorageActiveTabKey, _tab);
  };

  useEffect(() => {
    
    list("setting").then(response=>{
      setSettings(response.data);
    }).catch(error=>{
      console.log(error)
    })
    // list('daraz/credentials').then(response=>{
    //   setDarazCredential(response.data)
    // }).catch(error=>{
    //   console.log(error)
    // })
  }, [])

  useEffect(() => {
    settings.map(setting => {
      if(setting.key === 'Paypal_Mode')
        setMode(setting.value);
      else if(setting.key === 'Paypal_Client_Id')
        setClientId(setting.value);
      else if(setting.key === 'Paypal_Client_Secret')
        setClientSecret(setting.value);
    })
  }, [settings])

  const handleSubmitPaypal = ()=>{
    post("setting", {
      Paypal_Mode: mode, 
      Paypal_Client_Id: clientId,
      Paypal_Client_Secret: clientSecret
    }).then(response=>{
      setSettings(response.data);
    }).catch(error=>{
      console.log(error)
    })
  }

  // useEffect(()=>{
  //   setDarazMode(darazcredential['active'])
  //   setDarazObj({userId: darazcredential['userId'], api_key: darazcredential['api_key']})
  // }, [darazcredential])

  // const handleSubmitDarazIntegration = (event) =>{
  //   event.preventDefault();
  //   setIsLoading(true);
  //   if(darazcredential['id'] === undefined ){
  //     // setup new daraz account
  //     post('daraz/login', {
  //     "active": darazMode,
  //     ...darazObj
  //   }).then(response=>{
  //     setDarazCredential(response.data)
  //     setIsLoading(false);
  //   }).catch(error=>{
  //     console.log(error.response)
  //     setIsLoading(false);
  //   })

  // }else{
  //   // update daraz account
  //   put('daraz/update/credentials/', {
  //     "active": darazMode,
  //     ...darazObj
  //   }).then(response=>{
  //     setDarazCredential(response.data)
  //     setIsLoading(false);
  //   }).catch(error=>{
  //     console.log(error.response)
  //     setIsLoading(false);
  //   })
  // }

  // }

  // const handleCancel = (event)=>{
  //   console.log("handle cancel call ", )
  //   setDarazCredential(darazcredential)
  // }

  const handleSyncDaraz = (event) =>{
    setIsLoading(true)
    post('daraz/products', {
      ...darazObj
    }).then(response=>{
      setOpen(true);
      setMessage("Product Added");
      setMessageType('success');
      
      setIsLoading(false)
    }).catch(error=>{
      setOpen(true);
      setMessage(error.response.data['ErrorMessage']);
      setMessageType('error');

      setIsLoading(false)
    })
  }
 
  const handleCloseSnackbar = (event, reason) => {
    setOpen(false);
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          setIsLoading(true);
          setLayoutConfig(values);
          setMode(values)
          setClientId(values)
          setClientSecret(values)
          
        }}
        onReset={() => {
          setIsLoading(true);
          setLayoutConfig(getInitLayoutConfig());
        }}
      >
        {({ values, handleReset, handleSubmit, handleChange, handleBlur }) => (
          <>
            <div className="card card-custom">
              {/*Header*/}
              <div className="card-header card-header-tabs-line">
                <ul
                  className="nav nav-dark nav-bold nav-tabs nav-tabs-line"
                  data-remember-tab="tab_id"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className={`nav-link ${key === 0 ? "active" : ""}`}
                      data-toggle="tab"
                      onClick={() => {
                        setKey(0);
                        saveCurrentTab(0);
                      }}
                    >
                      Mobile Header
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${key === 1 ? "active" : ""}`}
                      data-toggle="tab"
                      onClick={() => {
                        setKey(1);
                        saveCurrentTab(1);
                      }}
                    >
                      Subheader
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${key === 2 ? "active" : ""}`}
                      data-toggle="tab"
                      onClick={() => {
                        setKey(2);
                        saveCurrentTab(2);
                      }}
                    >
                      Content
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${key === 3 ? "active" : ""}`}
                      data-toggle="tab"
                      onClick={() => {
                        setKey(3);
                        saveCurrentTab(3);
                      }}
                    >
                      Aside
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${key === 4 ? "active" : ""}`}
                      data-toggle="tab"
                      onClick={() => {
                        setKey(4);
                        saveCurrentTab(4);
                      }}
                    >
                      Footer
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${key === 5 ? "active" : ""}`}
                      data-toggle="tab"
                      onClick={() => {
                        setKey(5);
                        saveCurrentTab(5);
                      }}
                    >
                      PayPal
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${key === 6 ? "active" : ""}`}
                      data-toggle="tab"
                      onClick={() => {
                        setKey(6);
                        saveCurrentTab(6);
                      }}
                    >
                      Daraz Integration
                    </a>
                  </li>
                </ul>
              </div>

              <div className="form">
                <div className="card-body">
                  <div className="tab-content pt-3">
                    <div className={`tab-pane ${key === 0 ? "active" : ""}`}>
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label text-lg-right">
                          Fixed Header:
                        </label>
                        <div className="col-lg-9 col-xl-4">
                          <Switch
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="header.self.fixed.mobile"
                            checked={!!get(values, "header.self.fixed.mobile")}
                          />
                          <FormHelperText>
                            Enable fixed header for mobile mode
                          </FormHelperText>
                        </div>
                      </div>
                    </div>
                    <div className={`tab-pane ${key === 1 ? "active" : ""}`}>
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label text-lg-right">
                          Display Subheader:
                        </label>
                        <div className="col-lg-9 col-xl-4">
                          <Switch
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="subheader.display"
                            checked={!!get(values, "subheader.display")}
                          />
                          <FormHelperText>Display subheader</FormHelperText>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label text-lg-right">
                          Fixed Subheader:
                        </label>
                        <div className="col-lg-9 col-xl-4">
                          <Switch
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="subheader.fixed"
                            checked={!!get(values, "subheader.fixed")}
                          />
                          <FormHelperText>
                            Enable fixed(sticky) subheader. Requires{" "}
                            <code>Solid</code> subheader style.
                          </FormHelperText>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label text-lg-right">
                          Width:
                        </label>
                        <div className="col-lg-9 col-xl-4">
                          <select
                            className="form-control"
                            name="subheader.width"
                            onBlur={handleBlur}
                            value={get(values, "subheader.width")}
                            onChange={handleChange}
                          >
                            <option value="fluid">Fluid</option>
                            <option value="fixed">Fixed</option>
                          </select>
                          <FormHelperText>
                            Select layout width type
                          </FormHelperText>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label text-lg-right">
                          Subheader Style:
                        </label>
                        <div className="col-lg-9 col-xl-4">
                          <select
                            className="form-control"
                            name="subheader.style"
                            onBlur={handleBlur}
                            value={get(values, "subheader.style")}
                            onChange={handleChange}
                          >
                            <option value="transparent">Transparent</option>
                            <option value="solid">Solid</option>
                          </select>
                          <FormHelperText>
                            Select subheader style
                          </FormHelperText>
                        </div>
                      </div>
                    </div>
                    <div className={`tab-pane ${key === 2 ? "active" : ""}`}>
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label text-lg-right">
                          Width:
                        </label>
                        <div className="col-lg-9 col-xl-4">
                          <select
                            className="form-control"
                            name="content.width"
                            onBlur={handleBlur}
                            value={get(values, "content.width")}
                            onChange={handleChange}
                          >
                            <option value="fluid">Fluid</option>
                            <option value="fixed">Fixed</option>
                          </select>
                          <FormHelperText>
                            Select layout width type
                          </FormHelperText>
                        </div>
                      </div>
                    </div>
                    <div className={`tab-pane ${key === 3 ? "active" : ""}`}>
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label text-lg-right">
                          Display Secondary Panel:
                        </label>
                        <div className="col-lg-9 col-xl-4">
                          <Switch
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="aside.secondary.display"
                            checked={!!get(values, "aside.secondary.display")}
                          />
                          <FormHelperText>
                            Display aside secondary panel
                          </FormHelperText>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label pt-4 text-lg-right">
                          Aside Minimize:
                        </label>
                        <div className="col-lg-9 col-xl-4">
                          <Switch
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="aside.self.minimize.toggle"
                            checked={
                              !!get(values, "aside.self.minimize.toggle")
                            }
                          />
                          <FormHelperText>
                            Allow aside minimizing
                          </FormHelperText>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label pt-4 text-lg-right">
                          Aside Default Minimized:
                        </label>
                        <div className="col-lg-9 col-xl-4">
                          <Switch
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="aside.self.minimize.default"
                            checked={
                              !!get(values, "aside.self.minimize.default")
                            }
                          />
                          <FormHelperText>
                            Set aside minimized by default
                          </FormHelperText>
                        </div>
                      </div>
                    </div>
                    <div className={`tab-pane ${key === 4 ? "active" : ""}`}>
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label pt-4 text-lg-right">
                          Fixed Footer:
                        </label>
                        <div className="col-lg-9 col-xl-4">
                          <Switch
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="footer.fixed"
                            checked={!!get(values, "footer.fixed")}
                          />
                          <FormHelperText>
                            Set fixed footer for desktop mode only
                          </FormHelperText>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label text-lg-right">
                          Width:
                        </label>
                        <div className="col-lg-9 col-xl-4">
                          <select
                            className="form-control form-control-solid"
                            name="footer.width"
                            onBlur={handleBlur}
                            value={get(values, "footer.width")}
                            onChange={handleChange}
                          >
                            <option value="fluid">Fluid</option>
                            <option value="fixed">Fixed</option>
                          </select>
                          <FormHelperText>
                            Select layout width type
                          </FormHelperText>
                        </div>
                      </div>
                    </div>
                    <div className={`tab-pane ${key === 5 ? "active" : ""}`}>
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label text-lg-right">
                          Live Mode:
                        </label>
                        <div className="col-lg-9 col-xl-4">
                          <Switch
                            onBlur={handleBlur}
                            onChange={()=>setMode(!mode)}
                            name="mode"
                            checked={mode}
                          />
                          <FormHelperText>
                            Test or Live mode
                          </FormHelperText>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label text-lg-right">
                          Client Id:
                        </label>
                        <div className="col-lg-9 col-xl-4">
                          <input
                            className="form-control form-control-solid"
                            name="client_id"
                            value={clientId}
                            onChange={e=>setClientId(e.target.value)}
                          />
                          <FormHelperText>
                            Paypal client id
                          </FormHelperText>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label text-lg-right">
                          Client Secret:
                        </label>
                        <div className="col-lg-9 col-xl-4">
                          <input
                            className="form-control form-control-solid"
                            name="client_secret"
                            value={clientSecret}
                            onChange={e=>setClientSecret(e.target.value)}
                          />
                          <FormHelperText>
                            Paypal client secret key
                          </FormHelperText>
                        </div>
                      </div>
                    </div>
                    <div className={`tab-pane ${key === 6 ? "active" : ""}`}>
                      <div className="form-group row">

                        {/* <div className="col-lg-9 col-xl-4">
                        <label className="col-lg-3 col-form-label text-lg-right">
                          Activate Daraz Integration
                        </label>
                          <Switch
                            onBlur={handleBlur}
                            onChange={()=> setDarazMode(!darazMode)}
                            name="daraz.mode"
                            checked={darazMode}
                          />
                          <FormHelperText>
                            {darazMode ? "Activate": "Unactivae"} 
                          </FormHelperText>
                        </div> */}
                          <div className="col-lg-9 col-xl-2"></div>
                          <div className="col-lg-9 col-xl-4">
                            <button
                                type="button"
                                onClick={handleSyncDaraz}
                                className={`btn btn-info font-weight-bold mr-2`}
                              >
                                Sync Daraz
                              </button>{" "}
                              <span
                                  className={`ml-3 ${clsx({
                                    spinner: isLoading,
                                  })}`}
                                />
                        </div>
                        </div>
                        
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label text-lg-right">
                            Daraz User Id:
                          </label>
                          <div className="col-lg-9 col-xl-4">
                            <input
                              className="form-control form-control-solid"
                              name="userId"
                              value={darazObj.userId}
                              onChange={e=>setDarazObj({ ...darazObj, [e.target.name]:e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                        <label className="col-lg-3 col-form-label text-lg-right">
                          Daraz API key:
                        </label>
                        <div className="col-lg-9 col-xl-4">
                          <input
                            className="form-control form-control-solid"
                            name="api_key"
                            value={darazObj.api_key}
                            onChange={e=>setDarazObj({ ...darazObj, [e.target.name]:e.target.value})}
                          />
                        </div>
                      </div>
                        
                        {/* <div className="form-group row">
                          <div className="col-lg-3"></div>
                            <div className="col-lg-9">
                              <button
                                type="button"
                                onClick={handleSubmitDarazIntegration}
                                className={`btn btn-info font-weight-bold mr-2`}
                              >
                                Submit
                              </button>{" "}
                              <button
                                type="button"
                                onClick={handleCancel}
                                className={`btn btn-clean btn-hover-info font-weight-bold mr-2`}
                              >
                                <i className="la la-recycle" /> Cancel
                              </button>{" "}
                              <span
                                className={`ml-3 ${clsx({
                                  spinner: isLoading,
                                })}`}
                              />
                            </div>
                        </div> */}

                    </div>

                  </div>
                </div>
                
                {key !==6 && 
                <div className="card-footer">
                  <div className="row">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-9">
                      <button
                        type="button"
                        onClick={key !== 5 ? handleSubmit : handleSubmitPaypal}
                        className={`btn btn-info font-weight-bold mr-2`}
                      >
                        {key !== 5 ? "Preview":"Save"}
                      </button>{" "}
                      <button
                        type="button"
                        onClick={handleReset}
                        className={`btn btn-clean btn-hover-info font-weight-bold mr-2`}
                      >
                        <i className="la la-recycle" /> Reset
                      </button>{" "}
                      <span
                        className={`ml-3 ${clsx({
                          spinner: isLoading,
                        })}`}
                      />
                    </div>
                  </div>
                </div>}
              </div>
            </div>
            {/*Config*/}
            {/* <Card className="mt-4">
              <CardHeader
                title={
                  <>
                    Generated Config{" "}
                    <small>
                      can be used for layout config in{" "}
                      <code>/src/_metronic/layout/LayoutConfig.js</code>
                    </small>
                  </>
                }
              />

              <CardBody>
                <SyntaxHighlighter
                  language="json"
                  style={highlightStyle}
                  customStyle={{
                    background: `none transparent !important`,
                  }}
                >
                  {JSON.stringify(values, null, 2)}
                </SyntaxHighlighter>
              </CardBody>
            </Card> */}
          </>
        )}
      </Formik>
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
    </>
  );
}
