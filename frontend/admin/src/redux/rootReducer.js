import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import {customersSlice} from "../app/modules/ECommerce/_redux/customers/customersSlice";
import {productsSlice} from "../app/modules/ECommerce/_redux/products/productsSlice";
import {manufacturesSlice} from "../app/modules/ECommerce/_redux/manufactures/manufacturesSlice";
import {categoriesSlice} from "../app/modules/ECommerce/_redux/categories/categoriesSlice";
import {suppliersSlice} from "../app/modules/ECommerce/_redux/suppliers/suppliersSlice";
import {enquiriesSlice} from "../app/modules/ECommerce/_redux/enquiries/enquiriesSlice";
import {remarksSlice} from "../app/modules/ECommerce/_redux/remarks/remarksSlice";
import {specificationsSlice} from "../app/modules/ECommerce/_redux/specifications/specificationsSlice";
import {shopSettingSlice} from "../app/modules/ECommerce/_redux/shopSetting/shopSettingSlice";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  customers: customersSlice.reducer,
  products: productsSlice.reducer,
  manufactures: manufacturesSlice.reducer,
  categories: categoriesSlice.reducer,
  suppliers: suppliersSlice.reducer,
  enquiries: enquiriesSlice.reducer,
  remarks: remarksSlice.reducer,
  specifications: specificationsSlice.reducer,
  shop_setting: shopSettingSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
