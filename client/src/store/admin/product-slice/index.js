import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addNewProduct = createAsyncThunk(
  "/products/addNewProduct",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:3000/api/admin/products/add-product",
      formData,
      { headers: { "Content-Type": "application/json" } },
    );
    return result?.data;
  },
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const result = await axios.get(
      "http://localhost:3000/api/admin/products/get-products",
    );
    return result?.data;
  },
);

export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }) => {
    const result = await axios.put(
      `http://localhost:3000/api/admin/products/edit-product/${id}`,
      formData,
      { headers: { "Content-Type": "application/json" } },
    );
    return result?.data;
  },
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:3000/api/admin/products/delete-product/${id}`,
    );
    return result?.data;
  },
);

const AdminProductSlice = createSlice({
  name: "adminProducts",
  initialState: {
    isLoading: false,
    productList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductSlice.reducer;
