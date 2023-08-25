import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commitmentService from "../commitment/commitmentService";

const initialState = {
  commitments: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getCommitments = createAsyncThunk(
  "commitment/fetchCommitments",
  async (token, thunkAPI) => {
    try {
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const commitmentSlice = createSlice({
  name: "commitment",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {},
});

export const { reset } = commitmentSlice.actions;

export default commitmentSlice.reducer;
