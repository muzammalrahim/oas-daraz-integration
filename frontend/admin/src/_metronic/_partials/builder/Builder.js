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
import { Card, CardBody, CardHeader, Notice, Input } from "../controls";
import { post, list } from "../../../app/pages/helper/api";

const localStorageActiveTabKey = "builderActiveTab";

export function Builder() {
  const activeTab = localStorage.getItem(localStorageActiveTabKey);
  const [key, setKey] = useState(activeTab ? +activeTab : 0);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState(false)
  const [settings, setSettings] = useState([]);
  const [clientId, setClientId] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [darazMode, setDarazMode] = useState(false)
  const [darazObj, setDarazObj] = useState({userId:"", api_key:""})
  const htmlClassService = useHtmlClassService();
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

  const handleSubmitDarazIntegration = (event) =>{
    event.preventDefault();
    setIsLoading(true);
    post('daraz/login', {
      "daraz_active": darazMode,
      ...darazObj
    }).then(response=>{
      console.log(response.data);
      setIsLoading(false);
    }).catch(error=>{
      console.log(error.response)
      setIsLoading(false);
    })
  }

  const handleCancel = (event)=>{
    setDarazObj({userId:"", api_key:""})
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
                        <label className="col-lg-3 col-form-label text-lg-right">
                          Activate Daraz Integration
                        </label>
                        <div className="col-lg-9 col-xl-4">
                          <Switch
                            onBlur={handleBlur}
                            onChange={()=> setDarazMode(!darazMode)}
                            name="daraz.mode"
                            checked={darazMode}
                          />
                          <FormHelperText>
                            {darazMode ? "Activate": "Unactivae"} 
                          </FormHelperText>
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
                        
                        <div className="form-group row">
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
                        </div>

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
    </>
  );
}
