import { configureStore } from "@reduxjs/toolkit";

import settingsReducer from "../state-slice/settingsSlice";

export default configureStore({
  reducer: {
    settings: settingsReducer,
  },
});
