import React, { useState, useEffect} from "react";
import { shallowEqual, useSelector } from "react-redux";
import { CloudUpload as CloudUploadIcon } from "@material-ui/icons";
import { Button as ButtonCore,  } from "@material-ui/core";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useDispatch } from "react-redux";

import { Snackbar, SnackbarContent, IconButton } from "@material-ui/core"
import {
    Delete as DeleteIcon, Close as CloseIcon, CheckCircle as CheckCircleIcon, Error as ErrorIcon, Info as InfoIcon,
    Warning as WarningIcon
  } from '@material-ui/icons';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { lighten, makeStyles } from '@material-ui/core/styles';
import { amber, green } from '@material-ui/core/colors';
import * as actions from './../../../app/modules/ECommerce/_redux/shopSetting/shopSettingActions';
import { STATIC_URL } from './../../../app/pages/helper/api';
// import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";


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
  

export function ShopSettings(){

    const initialValue = {
        logo:"",
        featured_product:"",
    }

    const [logoFile, setLogoFile] = useState({});
    const [isLogoImg, setIsLogoImg] = useState(false);
    const [settings, setSettings] = useState(initialValue);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('success');
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const { loading, error, setting } = useSelector(
        (state) => ({
          loading: state.shop_setting.loading,
          setting: state.shop_setting.setting,
          error: state.shop_setting.error,
        }),
        shallowEqual
      );
    
    useEffect(()=>{
        dispatch(actions.fetchSetting())
    }, [dispatch]);

    useEffect(()=>{
        if(setting.id){
            setSettings({...setting})

            if(setting.logo){
                let filename_pieces = setting.logo.split('/');
                let img_name = filename_pieces[filename_pieces.length - 1];
                setLogoFile({name:img_name, path: STATIC_URL+"logo/" + img_name})
                setIsLogoImg(true);
            }
        }
    }, [setting])

    function logFileChangedHandler(event)  {
        let file = event.target.files[0];
        let obj = {};
        obj.name = file.name;
        obj.path = URL.createObjectURL(file)
        // setLogoFile(URL.createObjectURL(file));
        if (file != undefined) {
            file.size_c = file.size / 1024;

            if ((file.size_c) / 1024 > 2) {
                file.size_c = (file.size_c / 1024).toFixed(2) + ' MB';
                file.error = "Error: File is too big";
                obj.error = file.error;
                obj.size_c = file.size_c;
                setLogoFile({...obj});
                // setSelectFile(file);
            } else {
                file.error = null;
                file.size_c = file.size_c.toFixed(2) + ' KB';
                obj.size_c = file.size_c;
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    let result = reader.result
                    obj._path = result
                    setLogoFile({...obj})
                    // setProductImage(reader.result);
                    // setSelectFile(file);
                };
            }
            setIsLogoImg(true);
        }
    }

    function handleLogoRemove(event) {
        setLogoFile({});
        setIsLogoImg(false);
        document.getElementById('news-image-upload').value = '';
    }

    const onChange = (e) => {
        setSettings({...settings, [e.currentTarget.name]: e.currentTarget.value});
    }

    const handleCloseSnackbar = (event, reason) => {
        setOpen(false);
    }

    const saveSetting = (event) => {
        event.preventDefault();
        if(isLogoImg){
            settings['logo'] = logoFile._path;
        }
        if(!isLogoImg && setting.logo && Object.keys(logoFile).length === 0 && logoFile.constructor === Object){
            settings['logo'] = null;
        }

        if(setting.id){
            dispatch(actions.updateSetting(settings)).then(response=>{
               if(response){
                    setOpen(true);
                    setMessage("Can't update settings");
                    setMessageType('error');
               }else{
                    setOpen(true);
                    setMessageType('success');
                    setMessage("updated successfully");
               }              
            })
        }else{
            dispatch(actions.createSetting(settings)).then((response)=>{
                if(response){
                    setOpen(true);
                    setMessage("Can't create settings");
                    setMessageType('error');
                }
                else{
                    setOpen(true);
                    setMessageType('success');
                    setMessage("created successfully");
                }
            })
        }
    }

    return (
        <>
        <div className="card card-custom">
            <div className="card-header">
                <div className="card-title">
                    <h3 className="card-label">Shop Settings</h3>
                </div>
                <div className="card-toolbar">
                    <button type="submit" disabled={loading} onClick={saveSetting} className="btn btn-info ml-2">Save</button>
                </div>
            </div>
            <div className="card-body">
               <div className="">
                 <form className="form form-label-right">
                     {/* Loo Image */}
                    <div className="row ml-5">
                        <div className="form-group col-log-4">
                            <input
                            accept="image/*" style={{ display: 'none' }} type="file" id="news-image-upload" name="slider_logo" 
                            onChange={logFileChangedHandler}
                            />
                            <br />
                            <label htmlFor="news-image-upload">
                                <ButtonCore variant="outlined" color="inherit" component="span">
                                    Select Logo
                                        <CloudUploadIcon style={{ marginLeft: '5px' }} />
                                </ButtonCore>
                            </label>
                        </div>
                        {isLogoImg && <div className="form-group ml-5">
                            <div className="dropzone dropzone-multi" id="kt_dropzone_5">
                                <div className="dropzone-items" style={{display: logoFile ? 'block' : 'none'}}>
                                    <div className="dropzone-item">
                                        <div className="dropzone-file">
                                            <div style={{'maxWidth': '250px'}}>
                                                <img style={{width: "100%"}} src={logoFile.path}/>
                                            </div>
                                            <div className="dropzone-filename" title="some_image_file_name.jpg">
                                                <span
                                                    data-dz-name>{logoFile ? logoFile.name : 'No file selected'}</span>
                                                <strong>(<span
                                                    data-dz-size>{logoFile && logoFile.size_c ? logoFile.size_c : ''}</span>)</strong>
                                            </div>
                                            <div className="dropzone-error"
                                                    data-dz-errormessage>{logoFile && logoFile.error ? logoFile.error : ''}</div>
                                        </div>
                                        <div className="dropzone-toolbar">
                                            <span onClick={(e) => handleLogoRemove(e)}
                                                    className="dropzone-delete" data-dz-remove><i
                                                className="flaticon2-cross"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span className="form-text text-muted">Max file size is 2MB.</span>
                        </div> }
                       </div>
                    
                    <hr/>
                    <div className="row">
                        <div className="form-group col-lg-4">
                            <label>No. of featured Products</label>
                            <input type="number" name="featured_product" value={settings.featured_product} className="form-control" 
                            placeholder="No. of featured products on homepage default 8" onChange={onChange} />
                        </div>
                    </div>
                 
                 </form>
               </div>
            </div>
        </div>
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
    )
}