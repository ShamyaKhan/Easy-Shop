import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createReview = createAsyncThunk(
  "review/createReview",
  async (data) => {
    const response = await axios.post(
      `http://localhost:3000/api/shop/review/create-review`,
      data,
    );
    return response.data;
  },
);

export const getReviews = createAsyncThunk("review/getReviews", async (id) => {
  const response = await axios.get(
    `http://localhost:3000/api/shop/review/get-reviews/${id}`,
  );
  return response.data;
});

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState: {
    isLoading: false,
    reviews: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default reviewSlice.reducer;
