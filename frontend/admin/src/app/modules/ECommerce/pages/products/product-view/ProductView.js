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
import { Specifications } from "../product-specifications/Specifications";
import { SpecificationsUIProvider } from "../product-specifications/SpecificationsUIContext";
import { useSubheader } from "../../../../../../_metronic/layout";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { RemarksUIProvider } from "../product-remarks/RemarksUIContext";
import { Remarks } from "../product-remarks/Remarks";
import { ADMIN_ROUTE, STATIC_URL, getDateFormat } from "../../../../../pages/helper/api";
import {Paper, Grid} from "@material-ui/core";
// import moment from "moment";


export function ProductView({
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
  const dispatch = useDispatch();
  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, product } = useSelector(
    (state) => ({
      actionsLoading: state.products.actionsLoading,
      product: state.products.productForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchProduct(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : "View Product";
    if (product && id) {
      _title = `View product - ${product.product_title || product.part_number}`;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, id]);


  const editProductClick = () => {
    history.push(`/${ADMIN_ROUTE}/products/${product.id}/edit`);
  };

  const backToProductsList = () => {
    history.push(`/${ADMIN_ROUTE}/products`);
  };

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
            onClick={editProductClick}
          >
            Edit
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <div className="mt-5">
          <Grid container spacing={3}>
                <Grid item xs={12} md={9}>
                    <div className="kt_section__detail">
                        <div className="row mb-4">
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Part Number</div>
                                <div>{product?.part_number ? product.part_number : '---'}</div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Alt Part Number</div>
                                <div>{product?.alt_part_number ? product.alt_part_number : '---'}</div>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Product Title</div>
                                <div>{product?.alt_part_number ? product.alt_part_number : '---'}</div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Condition</div>
                                <div>{product?.condition ? product.condition : '---'}</div>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Quantity</div>
                                <div>{product?.quantity ? product.quantity : '---'}</div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Stock Location</div>
                                <div>{product?.stock_location ? product.stock_location : '---'}</div>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Tag date</div>
                                <div>{product?.tag_date ? product.tag_date : '---'}</div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Turn Around Time</div>
                                <div>{product?.turn_around_time ? product.turn_around_time : '---'}</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12 mb-4">
                                <div className="kt_detail__item_title">Certification</div>
                                <div>{product?.certification ? product.certification : '---'}</div>
                            </div>
                            <div className="col-md-6 col-12 mb-4">
                                <div className="kt_detail__item_title">Hazmat</div>
                                <div>{product?.hazmat ? product.hazmat : '---'}</div>
                            </div>
                            {product?.hazmat &&
                            <div className="col-md-6 col-12 mb-4">
                                <div className="kt_detail__item_title">UN Code</div>
                                <div>{product?.un_code ? product.un_code : '---'}</div>
                            </div>}
                            <div className="col-md-6 col-12 mb-4">
                                <div className="kt_detail__item_title">Unit Price</div>
                                <div>{product?.unit_price ? product.unit_price : '---'}</div>
                            </div>
                            <div className="col-md-6 col-12 mb-4">
                                <div className="kt_detail__item_title">Discounts</div>
                                <div>{product?.discounts ? product.discounts : '---'}</div>
                            </div>
                            <div className="col-md-6 col-12 mb-4">
                                <div className="kt_detail__item_title">Unit of measure</div>
                                <div>{product?.unit_of_measure ? product.unit_of_measure : '---'}</div>
                            </div>
                            <div className="col-md-6 col-12 mb-4">
                                <div className="kt_detail__item_title">Hot Sale Item</div>
                                <div>{product?.hot_sale_item ? product.hot_sale_item : '---'}</div>
                            </div>
                            <div className="col-md-6 col-12 mb-4">
                                <div className="kt_detail__item_title">Supplier</div>
                                <div>{product?.supplier_company_name ? product.supplier_company_name : '---'}</div>
                            </div>
                            <div className="col-md-6 col-12 mb-4">
                                <div className="kt_detail__item_title">Product Category</div>
                                <div>{product?.product_category_name ? product.product_category_name : '---'}</div>
                            </div>
                            <div className="col-md-6 col-12 mb-4">
                                <div className="kt_detail__item_title">Product Manufacturer</div>
                                <div>{product?.product_manufacturer_name ? product.product_manufacturer_name : '---'}</div>
                            </div>
                            <div className="col-md-6 col-12 mb-4">
                                <div className="kt_detail__item_title">Short Description</div>
                                <div>{product?.short_description }</div>
                            </div>
                            <div className="col-md-6 col-12 mb-4">
                                <div className="kt_detail__item_title">Status</div>
                                <div>{product?.status === 1 ? 'Active' : 'Inactive'}</div>
                            </div>
                        </div>

                        <div className="row mb-4">
                            <div className="col-md-6 col-12 mb-4">
                                <div className="kt_detail__item_title">Description</div>
                                <div dangerouslySetInnerHTML={{__html: product?.description }}></div>
                            </div>
                        </div>
                        <hr/>
                        <div className="row mb-4">
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Date Created</div>
                                <div>{getDateFormat(product?.created_at)}</div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Date Modified</div>
                                <div>{getDateFormat(product?.updated_at)}</div>
                            </div>
                        </div>
                    </div>
                </Grid>
                {product?.product_image &&
                <Grid item xs={12} md={3}>
                    <img style={{maxHeight:'220px', maxWidth:'200px'}} src={ STATIC_URL+product?.product_image_name } />
                </Grid>
              }
          </Grid>
        </div>
      </CardBody>
    </Card>
  );
}
