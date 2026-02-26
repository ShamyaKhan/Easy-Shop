import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getSearchResults = createAsyncThunk(
  "shop/search",
  async (keyword) => {
    const response = await axios.get(
      `http://localhost:3000/api/shop/search/${keyword}`,
    );
    return response.data;
  },
);

const searchSlice = createSlice({
  name: "searchSlice",
  initialState: {
    isLoading: false,
    searchResults: [],
  },
  reducers: {
    resetSearchResults: (state, action) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResults.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.data;
      })
      .addCase(getSearchResults.rejected, (state, action) => {
        state.isLoading = false;
        state.searchResults = [];
      });
  },
});

export const { resetSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
