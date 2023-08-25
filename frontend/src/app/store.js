import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import commitmentReducer from "../features/commitment/commitmentSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    commitments: commitmentReducer,
  },
});
