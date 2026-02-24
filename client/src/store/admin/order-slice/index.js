import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllOrders = createAsyncThunk("order/getAllOrders", async () => {
  const response = await axios.get(
    `http://localhost:3000/api/admin/orders/all-orders`,
  );
  return response.data;
});

export const getOrderDetailsForAdmin = createAsyncThunk(
  "order/getOrderDetails",
  async (id) => {
    const response = await axios.get(
      `http://localhost:3000/api/admin/orders/order-details/${id}`,
    );
    return response.data;
  },
);

export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ id, orderStatus }) => {
    const response = await axios.put(
      `http://localhost:3000/api/admin/orders/update-order/${id}`,
      { orderStatus },
    );
    return response.data;
  },
);

const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState: {
    orderList: [],
    orderDetails: null,
  },
  reducers: {
    resetOrderDetails: (state, action) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetailsForAdmin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
