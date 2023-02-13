import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: [],
  loggedIn: false,
  isFetching: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loggedIn = true;
      state.isFetching = false;
      state.error = false;
    },
    loginFailure: (state) => {
      state.error = true;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;
export default userSlice.reducer;
