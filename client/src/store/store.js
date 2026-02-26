import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index";
import adminProductSlice from "./admin/product-slice";
import adminOrderSlice from "./admin/order-slice";
import shoppingProductSlice from "./shop/product-slice";
import shoppingCartSlice from "./shop/cart-slice";
import shoppingAddressSlice from "./shop/address-slice";
import shoppingOrderSlice from "./shop/order-slice";
import shoppingSearchSlice from "./shop/search-slice";
import shoppingReviewSlice from "./shop/review-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductSlice,
    adminOrders: adminOrderSlice,
    shoppingProducts: shoppingProductSlice,
    shoppingCart: shoppingCartSlice,
    shoppingAddress: shoppingAddressSlice,
    shoppingOrder: shoppingOrderSlice,
    shoppingSearch: shoppingSearchSlice,
    shoppingReview: shoppingReviewSlice,
  },
});

export default store;
