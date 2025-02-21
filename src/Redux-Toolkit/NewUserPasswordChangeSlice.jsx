import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  errLoggingIn: "",
  loginLoading: false,
  total_users: "",
  userAuthApproved: false,
  Token: null,
  userName: "",
  role: "",
  email: "",
  getforgotpas: false,
  otpscreen: false,
  passchangedsuccesfull: false,
  verifybtn: false,
  ForgotOTP: { forgototp: null },
  password: "",
  confirmresetpas: "",
  otpTimeStatus: false,
  passwordConfirm: false,
  errSignup: "",
  passwordLoading: false,
  errPassword: "",
  Forgotpass: "",
  currentpassword: "",
  newpassword: "",
  confirmnewpassword: "",
  passwordpopup: false,
  notificationcount: "",
  addloadprofile: false,
  erraddprofile: "",
  firstName: "",
  firstnameapi: "",
  lastname: "",
  errloadprofile: "",
  loadprofile: false,
};

export const NewUserPasswordChangeSlice = createSlice({
  name: "newUserPasswordChange",
  initialState,
  reducers: {
    loadUser: (state) => {
      if (!localStorage.getItem("userAuthApproved")) {
        state.userAuthApproved = false;
        return;
      }
      state.Token = localStorage.getItem("Admintoken");
      state.user = localStorage.getItem("Admin");
      state.userAuthApproved = true;
    },
    setlocalUser: (state, action) => {
      state.user = action.payload;
    },
    setlocalUserName: (state, action) => {
      state.userName = action.payload;
    },
    setlocaluserToken: (state, action) => {
      state.Token = action.payload;
    },
    setlocalUserAuthApproved: (state, action) => {
      state.userAuthApproved = action.payload;
    },
    setlocalUserRole: (state, action) => {
      state.role = action.payload;
    },
    setlocalErrLoggingIn: (state, action) => {
      state.errLoggingIn = action.payload;
    },
    // Add other reducers here
    setlocalLoginLoading: (state, action) => {
      state.loginLoading = action.payload;
    },
    clearAuthToken: (state, action) => {
      state.Token = null;
      state.user = {};
      state.userAuthApproved = false;
    },
  },
});

export const {
  setlocalUser,
  setlocaluserToken,
  setlocalUserRole,
  setlocalUserName,
  setlocalErrLoggingIn,
  setlocalLoginLoading,
  setlocalUserAuthApproved,
  loadUser,
  clearAuthToken,
} = NewUserPasswordChangeSlice.actions;

export default NewUserPasswordChangeSlice.reducer;
