// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, DatePickerField, Select as MSelect, Checkbox } from "../../../../../../_metronic/_partials/controls";
import Creatable from "react-select/creatable";
import { withAsyncPaginate, AsyncPaginate } from "react-select-async-paginate";

import Select from 'react-select';
import {
  AVAILABLE_COLORS,
  AVAILABLE_MANUFACTURES,
  ProductStatusTitles,
  YES_NO_OPTIONS,
  UOM_CHOICES,
  ProductConditionTitles,
} from "../ProductsUIHelpers";
import { list, loadOptions, DROPDOWN_WAIT, post } from "../../../../../pages/helper/api";
import { CloudUpload as CloudUploadIcon } from "@material-ui/icons";
import {
  Button as ButtonCore,
} from "@material-ui/core";
import { STATIC_URL } from "../../../../../pages/helper/api";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { cond } from "lodash";

const CreatableAsyncPaginate = withAsyncPaginate(Creatable);
// Validation schema
const ProductEditSchema = Yup.object().shape({
  part_number: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Part number is required"),
  // alt_part_number: Yup.string()
  //   .min(2, "Minimum 2 symbols")
  //   .max(50, "Maximum 50 symbols")
  //   .required("Alt part number is required"),
  // product_category: Yup.string(),
  // supplier: Yup.string(),
  // product_manufacturer: Yup.string(),
  // unit_price: Yup.number(),
  // condition: Yup.string()
  //   .min(2, "Minimum 2 symbols")
  //   .max(50, "Maximum 2 symbols"),
  // quantity: Yup.number()
  //   .min(0, "Quantity can'be negative"),
  // tag_date: Yup.date(),
  // turn_around_time: Yup.string(),
  // hazmat: Yup.string(),
  // certification: Yup.string(),
  // unit_of_measure: Yup.string(),
  // hot_sale_item: Yup.string(),
  // status: Yup.string(),
});

export function ProductEditForm({
  product,
  btnRef,
  saveProduct,
}) {

  const [categories, setCategories] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [category, setCategory] = useState({});
  const [manfacturer, setManfacturer] = useState({});
  const [supplier, setSupplier] = useState({});
  const [selectedFile, setSelectFile] = useState([]);
  const [news, setNews] = useState(null);
  const [previewFile, setPreviewFile] = useState([]);
  const [productImage, setProductImage] = useState([]);
  const [condition, setCondition] = useState([])
  const [fileError, setFileError] = useState(null)
  const [deletedImg, setDeletedImg] = useState([]);

  useEffect(() => {
    loadModels();
    getCondition();
  }, []);
  const getCondition = () => {
    list('conditions').then(response => {
      setCondition(response.data.conditions)
    })
  }


  useEffect(() => {
    setPreviewFile([]);

    if (product.id) {
      categories.map(category => {
        if (category.id === product.product_category)
          setCategory(category);
      })
      manufacturers.map(manf => {
        if (manf.id === product.product_manufacturer)
          setManfacturer(manf);
      })
      suppliers.map(supplier => {
        if (supplier.id === product.supplier)
          setSupplier(supplier);
      })
    }

    if (product.id && product.images) {
      for(let i=0; i < product.images.length; i++){
        let obj = {};
        let img = product.images[i]['image'];
        let filename_pieces = img.split('/');
        let img_name = filename_pieces[filename_pieces.length - 1];
        obj.name=img_name;
        obj.path=STATIC_URL + img_name;
        obj.old_img = true;
        obj._path=product.images[i];
        // setProductImage(prevState => [...prevState, product.images[i]])
        setPreviewFile(prevState=>[...prevState, {...obj}])
      }
    }
    else{
      setPreviewFile([]);
    }
  }, [product])

  function loadModels() {
    let models = {
      'Manufacturer': {},
      'Supplier': {},
      'ProductCategory': {},
    }
    post('oas-models', { models: models }).then(function (response) {
      for (let opt in response.data) {
        response.data[opt].map((row, i) => {
          response.data[opt][i].label = row.name ? row.name : row.company_name;
          response.data[opt][i].value = row.id;

          if (opt === 'ProductCategory' && row.value === product.product_category)
            setCategory(row);

          if (opt === 'Manufacturer' && row.value === product.product_manufacturer)
            setManfacturer(row);

          if (opt === 'Supplier' && row.value === product.supplier)
            setSupplier(row);

        })
      }

      setCategories(response.data.ProductCategory);
      setManufacturers(response.data.Manufacturer);
      setSuppliers(response.data.Supplier);
      setModelsLoaded(true);
    })
  }

  function createCategory(option, setFieldValue) {
    post('product-category', { name: option }).then(function (response) {
      setCategory({ label: response.data.name, value: response.data.id });
      setFieldValue('product_category', response.data.id);
    })
  }

  function createManfacturer(option, setFieldValue) {
    post('manufacturer', { name: option }).then(function (response) {
      setManfacturer({ label: response.data.name, value: response.data.id });
      setFieldValue('product_manufacturer', response.data.id);
    })
  }

  function createSupplier(option, setFieldValue) {
    post('supplier', { company_name: option }).then(function (response) {
      setSupplier({ label: response.data.company_name, value: response.data.id });
      setFieldValue('supplier', response.data.id);
    })
  }


  function fileChangedHandler(event) {
    let files = event.target.files;
    let total_len = previewFile.length + files.length;
    // TODO: change the error location
    if(total_len > 8)  {setFileError("Each product have 8 images."); return;}

    for(let i=0; i < files.length; i++){
      let obj = {};
      obj.name=files[i].name;
      obj.path = URL.createObjectURL(files[i])
      let file = files[i];
      if (file != undefined) {
          file.size_c = file.size / 1024;
          if ((file.size_c) / 1024 > 2) {
            file.size_c = (file.size_c / 1024).toFixed(2) + ' MB';
            file.error = "Error: File is too big";
            // setSelectFile(file);
            obj.error = file.error;
            obj.size_c = file.size_c;
            setPreviewFile(prevState=>[...prevState, {...obj}])
          }
        else {
              file.error = null;
              file.size_c = file.size_c.toFixed(2) + ' KB';
              obj.size_c = file.size_c;
              let reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onloadend = () => {
                let result = reader.result
                setProductImage(prevState=>[...prevState, {"image": result}]);
                obj._path = {"image": result}
                setPreviewFile(prevState=>[...prevState, {...obj}])
                // setSelectFile(file);
              };
          }
      }
    }
  }


  function handleFileRemove(event, img_name) {
    let img_files = previewFile.filter(file => file.name != img_name);
    let index = previewFile.findIndex(x => x.name === img_name)
    let obj = previewFile[index];
    let filter_img = productImage.filter(img => img.image !== obj._path['image'])

    if(obj.old_img){
      setDeletedImg(prevState=>[...prevState, {...obj}])
    }

    setPreviewFile(img_files)
    setProductImage(filter_img);
    // add the delete login
    if(previewFile.length === 1){
      setPreviewFile([])
      setProductImage([])
      document.getElementById('news-image-upload').value = '';
    }
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={product}
        validationSchema={ProductEditSchema}
        onSubmit={(values) => {
          // values.product_images = productImage;
          // values.product_title = values.product_title ? values.product_title : values.part_number
          saveProduct(values, productImage, deletedImg);
        }}
      >
        {({ handleSubmit, setFieldValue, values, }) => (
          <>
            <Form className="form form-label-right">
              <div className="row">
                <div className="form-group col-lg-4">
                  <Field
                    name="part_number"
                    component={Input}
                    placeholder="e.g AB123"
                    label="Part Number"
                  />
                </div>
                <div className="form-group col-lg-4">
                  <Field
                    name="alt_part_number"
                    component={Input}
                    placeholder="e.g AB123"
                    label="Alternative Part Number"
                  />
                </div>
                <div className="form-group col-lg-4">
                  <Field
                    name="short_description"
                    component={Input}
                    placeholder='Short Descriptiion'
                    label="Short Description"
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-lg-4">
                  <MSelect name="condition" label="Condition">
                    <option value="">--None--</option>
                    {condition && condition.map((condition, index) => (
                      <option key={condition} value={condition}>
                        {condition}
                      </option>
                    ))}
                  </MSelect>
                </div>
                <div className="form-group col-lg-4">
                  <Field
                    name="product_title"
                    component={Input}
                    label="Product Title"
                  />
                </div>
                <div className="form-group col-lg-4">
                  <Field
                    name="quantity"
                    component={Input}
                    placeholder="Default 0"
                    label="Quantity"
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-lg-4">
                  <Field
                    name="unit_price"
                    component={Input}
                    placeholder=""
                    label="Unit price"
                  />
                </div>
                <div className="form-group col-lg-4">
                  <Field
                    name="discounts"
                    component={Input}
                    placeholder=""
                    label="Discounts"
                  />
                </div>
                <div className="form-group col-lg-4">
                  <label>Category</label>
                  <CreatableAsyncPaginate
                    name="product_category"
                    onChange={(value) => {
                      setFieldValue('product_category', value.value);
                      setCategory(value);
                    }}
                    value={category}
                    onCreateOption={(option) => createCategory(option, setFieldValue)}
                    isClearable={true}
                    loadOptions={(search, prevOptions) => loadOptions(search, prevOptions, categories, modelsLoaded)}
                  />
                </div>
              </div>
              <div className="row">
              <div className="form-group col-lg-4">
                  <Field
                    name="tag_date"
                    component={Input}
                    label="Tag Date"
                  />
                </div>
                <div className="form-group col-lg-4">
                  <MSelect name="hazmat" label="Hazmat">
                    {YES_NO_OPTIONS.map((status, index) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </MSelect>
                </div>
                <div className="form-group col-lg-4">
                  <Field
                    name="certification"
                    component={Input}
                    placeholder=""
                    label="Certification"
                  />
                </div>
              </div>
              <div className="row">
              <div className="form-group col-lg-4">
                  <MSelect name="unit_of_measure" label="Unit of measure">
                    <option value="">--None--</option>
                    {UOM_CHOICES.map((status, index) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </MSelect>
                </div>
                {values.hazmat === 'Yes' && <div className="form-group col-lg-4">
                  <Field
                    name="un_code"
                    component={Input}
                    placeholder=""
                    label="UN Code"
                  />
                </div>}
                <div className="form-group col-lg-4">
                  <Field
                    name="stock_location"
                    component={Input}
                    label="Stock Location"
                  />
                </div>
                <div className="form-group col-lg-4">
                  <Field
                    name="turn_around_time"
                    component={Input}
                    placeholder=""
                    label="Turn around time"
                  />
                </div>
                <div className="form-group col-lg-4">
                  <label>Manufacturer</label>
                  <CreatableAsyncPaginate
                    debounceTimeout={!modelsLoaded ? DROPDOWN_WAIT : 0}
                    isClearable={true}
                    onChange={(value) => {
                      setFieldValue('product_manufacturer', value.value);
                      setManfacturer(value);
                    }}
                    value={manfacturer}
                    name="product_manufacturer"
                    onCreateOption={(option) => createManfacturer(option, setFieldValue)}
                    loadOptions={(search, prevOptions) => loadOptions(search, prevOptions, manufacturers, modelsLoaded)}
                  />
                </div>
                <div className="form-group col-lg-4">
                  <label>Supplier</label>
                  <CreatableAsyncPaginate
                    debounceTimeout={!modelsLoaded ? DROPDOWN_WAIT : 0}
                    isClearable={true}
                    onChange={(value) => {
                      setFieldValue('supplier', value.value);
                      setSupplier(value);
                    }}
                    name="supplier"
                    value={supplier}
                    onCreateOption={(option) => createSupplier(option, setFieldValue)}
                    loadOptions={(search, prevOptions) => loadOptions(search, prevOptions, suppliers, modelsLoaded)}
                  />
                </div>
                {/* <div className="form-group col-lg-4">
                  <MSelect name="hot_sale_item" label="Hot sale item">
                    {YES_NO_OPTIONS.map((status, index) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </MSelect>
                </div> */}
                <div className="form-group col-lg-4">
                  <MSelect name="status" label="Status">
                    {ProductStatusTitles.map((status, index) => (
                      <option key={status} value={index}>
                        {status}
                      </option>
                    ))}
                  </MSelect>
                </div>
                {/* checkbox for Best seller */}
                <div className="form-group col-lg-4">
                  <label>Best Seller</label>
                  <Checkbox name="best_seller" isSelected={values['best_seller']} onChange={(event) => setFieldValue('best_seller', event.target.checked)} />
                </div>

                {/* checkbox for Best seller */}
                <div className="form-group col-lg-4">
                  <label>Featured product</label>
                  <Checkbox name="featured_product" isSelected={values['featured_product']} onChange={(event) => setFieldValue('featured_product', event.target.checked)} />
                </div>

              </div>
              <div className="form-group">
                <label>Description:</label>
                <CKEditor
                  name="description"
                  editor={ClassicEditor}
                  data={values?.description ? values?.description : ''}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setFieldValue('description', data);
                  }}
                />
              </div>
              <div className="form-group">
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  type="file"
                  id="news-image-upload"
                  name="image"
                  onChange={fileChangedHandler}
                  multiple
                />
                <br />
                <label htmlFor="news-image-upload">
                  <ButtonCore variant="outlined" color="inherit" component="span">
                    Select Image
                        <CloudUploadIcon style={{ marginLeft: '5px' }} />
                  </ButtonCore>
                </label>
              </div>
              <div className="form-group form-group-last row">
                {previewFile && previewFile.map(file => 
                  <div key={file.name} className="col-12 col-md-4">
                  <div className="dropzone dropzone-multi" id="kt_dropzone_5">
                    <div className="dropzone-items" style={{ display: file.name ? 'block' : 'none' }}>
                      <div className="dropzone-item">
                        <div className="dropzone-file">
                            <div style={{ 'maxWidth': '250px'}}><img style={{ width: "100%" }}
                              src={file.path} />
                            </div>
                          <div className="dropzone-filename" title="some_image_file_name.jpg">
                            <span
                              data-dz-name>{file.name ? file.name : 'No file selected'}</span>
                            <strong>(<span
                              data-dz-size>{file && file.size_c ? file.size_c : ''}</span>)</strong>
                          </div>
                          <div className="dropzone-error"
                            data-dz-errormessage>{fileError ? fileError: "" } {file && file.error ? file.error : ''}</div>
                        </div>
                        <div className="dropzone-toolbar">
                          <span onClick={(e) => handleFileRemove(e, file.name)}
                            className="dropzone-delete" data-dz-remove><i
                              className="flaticon2-cross"></i></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="form-text text-muted">Max file size is 2MB.</span>
                </div>
                )}
              </div>
              <button
                type="submit"
                style={{ display: "none" }}
                ref={btnRef}
                onSubmit={() => handleSubmit()}
              ></button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}
