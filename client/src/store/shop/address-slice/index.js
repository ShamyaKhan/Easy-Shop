import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addNewAddress = createAsyncThunk(
  "address/addNewAddress",
  async (formData) => {
    const response = await axios.post(
      `http://localhost:3000/api/shop/address/add-address`,
      formData,
    );
    return response.data;
  },
);

export const fetchAllAddress = createAsyncThunk(
  "address/fetchAllAddress",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:3000/api/shop/address/get-address/${userId}`,
    );
    return response.data;
  },
);

export const editAddress = createAsyncThunk(
  "address/editAddress",
  async ({ userId, addressId, formData }) => {
    const response = await axios.put(
      `http://localhost:3000/api/shop/address/update-address/${userId}/${addressId}`,
      formData,
    );
    return response.data;
  },
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `http://localhost:3000/api/shop/address/delete-address/${userId}/${addressId}`,
    );
    return response.data;
  },
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    isLoading: false,
    addressList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addNewAddress.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchAllAddress.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default addressSlice.reducer;
