import { API_URL } from "@/utils/constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getFeatureImages = createAsyncThunk(
  "feature/getFeatureImages",
  async () => {
    const response = await axios.get(
      `${API_URL}/api/common/feature/get-features`,
    );
    return response.data;
  },
);

export const addFeatureImage = createAsyncThunk(
  "feature/addFeatureImage",
  async (image) => {
    const response = await axios.post(
      `${API_URL}/api/common/feature/add-feature`,
      { image },
    );
    return response.data;
  },
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState: {
    isLoading: false,
    featureImageList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state, action) => {
        state.isLoading = false;
        state.featureImageList = [];
      });
  },
});

export default commonSlice.reducer;
