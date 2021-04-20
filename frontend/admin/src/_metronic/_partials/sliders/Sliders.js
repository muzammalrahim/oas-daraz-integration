import React, { useState, useEffect} from "react";
import AsyncSelect from "react-select/async";
import clsx from "clsx";
import { CloudUpload as CloudUploadIcon } from "@material-ui/icons";
import { Button as ButtonCore,  } from "@material-ui/core";
import { FormHelperText, Switch } from "@material-ui/core";
import { post, list, put, destory } from "../../../app/pages/helper/api";
import { STATIC_URL } from './../../../app/pages/helper/api';
import { Snackbar, SnackbarContent, IconButton } from "@material-ui/core"
import {
    Delete as DeleteIcon, Close as CloseIcon, CheckCircle as CheckCircleIcon, Error as ErrorIcon, Info as InfoIcon,
    Warning as WarningIcon
  } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { amber, green } from '@material-ui/core/colors';


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
  

export function Sliders(){

    const initialValue = {
        id:"",
        title:"",
        btn_title: "",
        product: null,
        external_link: "",
        description: "",
        isImage: false,
        imageFile: null,
        mode: false,

    };
    const [inputValue, setValue] = useState('');
    const [inputList, setInputList] = useState([]);
    const [slidersList, setSlidersList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('success');
    const [open, setOpen] = useState(false);

    useEffect(()=>{
        list("sliders").then(response=>{
            setSlidersList(response.data.results)
        }).catch(error=>{
            setOpen(true);
            setMessage("Server Error");
            setMessageType('error');
            // console.log("error ", error)
        })
    }, [])

    useEffect(()=>{
        for(let i=0; i< slidersList.length; i++){
            let obj = {};
            let slider = slidersList[i]
            obj = {...slider}

            if(slider.product){
                obj['product'] = slider['product'][0]
            }

            if(slider.image){
                let filename_pieces = slider.image.split('/');
                let img_name = filename_pieces[filename_pieces.length - 1];
                let path = STATIC_URL + "sliders_img/" + img_name;
                obj['imageFile'] = {
                    name: img_name,
                    path: path
                }
                obj.isImage = true;
            }
           
            if(slider.external_link){
                obj.mode= true
            }else{
                obj.mode = false
            }
            setInputList(prevState=> [...prevState, obj])
        }
    }, [slidersList])

    const handleSelectChange = value => {
        setValue(value);
      };
     
      // handle selection
      const handleChange = (value, index) => {
        // setSelectedValue(value);
        const list = [...inputList];
        list[index]['product'] = value;
        setInputList(list);
      }
     
      // load options using API call
      const loadOptions = (inputValue) => {
        return fetch(`http://127.0.0.1:8000/api/v1/products/?search=${inputValue}`).then(res => res.json());
      };

    const logFileChangedHandler = (event, index) => {
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
                // setLogoFile({...obj});
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
                    // setLogoFile({...obj})
                    // setProductImage(reader.result);
                    // setSelectFile(file);
                };
            }

            const list = [...inputList];
            list[index]["isImage"] = true;
            list[index]['imageFile'] = obj;
            setInputList(list);
            // setIsLogoImg(true);
        }
    }

    const handleLogoRemove = (event, index) => {
        const list = [...inputList];
        list[index]["isImage"] = false;
        list[index]['imageFile'] = null;
        setInputList(list);
        // setLogoFile({});
        // setIsLogoImg(false);
        document.getElementById(index).value = '';
    }

    const handleAddClick = () => {
        setInputList([...inputList, initialValue]);
    }

    const handleRemoveClick = index => {
        const list = [...inputList];
        const obj = inputList[index];
        
        if(obj.id === ""){
            list.splice(index, 1);
            setInputList(list);
        }
        else{
            setIsLoading(true)
            destory(`sliders/${obj.id}/`).then(response=>{
                // console.log("response ", response)
                setIsLoading(false)

                setOpen(true);
                setMessage("Successfully Deleted");
                setMessageType('success');

                list.splice(index, 1);
                setInputList(list);
            }).catch(error=>{
                setIsLoading(false)

                setOpen(true);
                setMessage("Can't delete slider");
                setMessageType('error');

                console.log("error while deleting ", error.response)
            })
        }
        
    };

    const handleSetMode = (index) => {
        const list = [...inputList];
        list[index]['mode'] = !list[index]['mode'];
        setInputList(list);
    }

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    }

    const handleCloseSnackbar = (event, reason) => {
        setOpen(false);
    }

    function validate(list){
        const errors = {};
        if(list['title'] === "")
            errors['title'] = "This field is required."

        if(list['btn_title'] === "")
            errors['btn_title'] = "This field is required."
        
        if(list['isImage'] === false)
            errors['image'] = "Image is required."
        
        return errors;
    }

    const handleSaveClick = (index) => {
        const list = inputList[index];
        const errors = validate(list);
        
        if(Object.keys(errors).length !== 0){
            const inputs = [...inputList];
            inputs[index]['errors'] = errors;
            setInputList(inputs);
            return ;
        }

        let data = {};
        data['title'] = list['title']
        data['btn_title'] = list['btn_title']
        data['description'] = list['description']
        
        if(!list.mode){
            if(list['product'])
                data['product'] = list['product']['id']
            data['external_link'] = ""
        }else{
            data['external_link'] = list['external_link']
            data['product'] = null
        }
        if(list['isImage']){
            if(list['imageFile']['_path']){
                data['image'] = list['imageFile']['_path'] 
            }
        }

        // console.log("data ", data)

        if(list.id === ""){
            setIsLoading(true);
            post("sliders/create", data).then(response=>{
                // console.log("data created ", response.data);
                setIsLoading(false);

                setOpen(true);
                setMessageType('success');
                setMessage("created successfully");
            }).catch(error=>{
                console.log("error ", error.response);
                
                let errors = error.response.data;
                const inputs = [...inputList];
                inputs[index]['errors'] = errors;
                setInputList(inputs);

                setIsLoading(false);

                setOpen(true);
                setMessageType('error');
                setMessage("Can't create  slider");
            })
        }else{
            setIsLoading(true);
            put(`sliders/${list.id}/`, data).then(response=>{
                // console.log("data updated ", response.data);
                setIsLoading(false);

                setOpen(true);
                setMessageType('success');
                setMessage("updated successfully");
            }).catch(error=>{
                // console.log("error ", error.response);
                setIsLoading(false);
                
                let errors = error.response.data;
                const inputs = [...inputList];
                inputs[index]['errors'] = errors;
                setInputList(inputs);

                setOpen(true);
                setMessageType('error');
                setMessage("Can't update slider");
        })
    }
}

   

    return(
        <>
        {console.log("slider list ", inputList)}
            <div className="card card-custom">
                <div className="card-header">
                    <div className="card-title">
                        <h3 className="card-label">Sliders</h3>
                    </div>
                </div>                
                <div className="card-body">
                    {inputList.map((x, i)=>
                    
                    <form  key={i} className="form form-label-right mt-10 border-bottom">
                        <input type="hidden" value={x.id} />
                        <div className="row">
                            <div className="form-group col-lg-4">
                                <label>Title</label>
                                    <input type="text" name="title"  className="form-control" 
                                    placeholder="Title" value={x.title} onChange={e=>handleInputChange(e, i)} />
                                    {x.errors && <div className="invalid-feedback" style={{display:'block'}} >{x.errors.title}</div>}
                            </div>
                            <div className="form-group col-lg-4">
                                <label>Button Title</label>
                                    <input type="text" name="btn_title" className="form-control "  
                                    placeholder="Button Title" value={x.btn_title} onChange={e=>handleInputChange(e, i)} />
                                    {x.errors && <div className="invalid-feedback" style={{display:'block'}}>{x.errors.btn_title}</div>}
                            </div>
                            <div className="form-group col-lg-4">
                                <label>Description</label>
                                    <input type="text" name="description" className="form-control" 
                                    placeholder="Description" value={x.description} onChange={e=>handleInputChange(e, i)} />
                            </div>
                            
                        </div>
                        <div className="row">
                           {!x.mode &&  <div className="form-group col-lg-4">
                                <label>Select Product</label>
                                <AsyncSelect
                                    name="product"
                                    cacheOptions
                                    defaultOptions
                                    value={x.product}
                                    getOptionLabel={e => e.product_title}
                                    getOptionValue={e => e.id}
                                    loadOptions={loadOptions}
                                    onInputChange={handleSelectChange}
                                    onChange={(e)=> handleChange(e, i)}
                                />
                            </div>
                            }
                            {x.mode && <div className="form-group col-lg-4">
                                <label>External Link</label>
                                    <input type="text" name="external_link" className="form-control" 
                                    placeholder="External Link" value={x.external_link} onChange={e=>handleInputChange(e, i)} />
                                </div>
                            }
                            <div className="form-group col-lg-4 mt-5">
                                <Switch
                                    onChange={()=>handleSetMode(i)}
                                    name="mode"
                                    checked={x.mode}
                                />
                                <FormHelperText>
                                    or use the External link
                                </FormHelperText>
                            </div>
                        </div>
                       
                          {/* Slider Image */}
                        <div className="row ml-1">
                            <div className="form-group col-log-4">
                                <input
                                accept="image/*" style={{ display: 'none' }} type="file" id={i} name="image" 
                                onChange={e=>logFileChangedHandler(e, i)}
                                />
                                <br />
                                <label htmlFor={i}>
                                    <ButtonCore variant="outlined" color="inherit" component="span">
                                        Select Image
                                            <CloudUploadIcon style={{ marginLeft: '5px' }} />
                                    </ButtonCore>
                                </label>
                                {x.errors && <div className="invalid-feedback" style={{display:'block'}} >{x.errors.image}</div>}
                            </div>
                            {x.isImage && <div className="form-group ml-3">
                                <div className="dropzone dropzone-multi" id="kt_dropzone_5">
                                    <div className="dropzone-items" style={{display: x.imageFile ? 'block' : 'none'}}>
                                        <div className="dropzone-item">
                                            <div className="dropzone-file">
                                                <div style={{'maxWidth': '250px'}}>
                                                    <img style={{width: "100%"}} src={x.imageFile.path}/>
                                                </div>
                                                <div className="dropzone-filename" title="some_image_file_name.jpg">
                                                    <span
                                                        data-dz-name>{x.imageFile ? x.imageFile.name : 'No file selected'}</span>
                                                    <strong>(<span
                                                        data-dz-size>{x.imageFile && x.imageFile.size_c ? x.imageFile.size_c : ''}</span>)</strong>
                                                </div>
                                                <div className="dropzone-error"
                                                        data-dz-errormessage>{x.imageFile && x.imageFile.error ? x.imageFile.error : ''}</div>
                                            </div>
                                            <div className="dropzone-toolbar">
                                                <span onClick={(e) => handleLogoRemove(e, i)}
                                                        className="dropzone-delete" data-dz-remove><i
                                                    className="flaticon2-cross"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <span className="form-text text-muted">Max file size is 2MB.</span>
                            </div> }
                        </div>
                       
                        <div className="row">
                            <div className="form-group">
                                <button type="button" onClick={()=> handleRemoveClick(i)} className="btn btn-danger ml-2">
                                    Remove
                                </button>
                            </div>
                            <div className="form-group">
                                <button type="button" onClick={()=> handleSaveClick(i)} disabled={isLoading} className="btn btn-info ml-3">
                                   {x.id === "" ? "Save" : "Update"} 
                                </button>
                            </div>
                            <span
                                className={`ml-3 mb-5 ${clsx({
                                  spinner: isLoading,
                                })}`}
                            />
                        </div>
                    </form>
                    )}
                    <div className="row mt-5">
                     <button type="button" onClick={handleAddClick} className="btn btn-info ml-2">
                        {inputList.length == 0 ? "Add Slider" : "Add more slider" }
                     </button>
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