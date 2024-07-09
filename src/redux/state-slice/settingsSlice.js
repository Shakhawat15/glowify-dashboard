import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    loader: "d-none",
  },
  reducers: {
    showLoader: (state) => {
      state.loader = "";
    },
    hideLoader: (state) => {
      state.loader = "d-none";
    },
  },
});

export const { showLoader, hideLoader } = settingsSlice.actions;
export default settingsSlice.reducer;
