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
  "commitment/getCommitments",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await commitmentService.fetchCommitments(token);
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

export const createCommitment = createAsyncThunk(
  "commitment/createCommitment",
  async (commitmentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await commitmentService.createCommitment(commitmentData, token);
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
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCommitment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCommitment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.commitments.push(action.payload);
      })
      .addCase(createCommitment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCommitments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCommitments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.commitments = action.payload;
      })
      .addCase(getCommitments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = commitmentSlice.actions;

export default commitmentSlice.reducer;
