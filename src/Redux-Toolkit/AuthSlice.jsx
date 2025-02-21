import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  userID: null,
  showFcmNoticationStatus: false,
  fcmToken: "",
  fcmTokenReceived: null,
  fcmTokenSent: null,
  device_id: "",
  fcm_key_created_date: null,
  errLoggingIn: "",
  loginLoading: false,
  userAuthApproved: false,
  Token: null,
  userName :"",
  role: "",
  email: "",
  ForgotOTP: { forgototp: null },
  password: "",
  confirmresetpas: "",
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
  lastname: "",

};

export const AuthSlice = createSlice({
  name: "auth",
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
    setUserID: (state, action) => {
      state.userID = action.payload;
    },
    setFcmToken: (state, action) => {
      state.fcmToken = action.payload;
    },
    setFcmTokenReceived: (state, action) => {
      state.fcmTokenReceived = action.payload;
    },
    setFcmTokenSent: (state, action) => {
      state.fcmTokenSent = action.payload;
    },
    setDevice_Id: (state, action) => {
      state.device_id = action.payload;
    },
    setFcm_key_created_date: (state, action) => {
      state.fcm_key_created_date = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setuserToken: (state, action) => {
      state.Token = action.payload;
    },
    setUserAuthApproved: (state, action) => {
      state.userAuthApproved = action.payload;
    },
    setUserRole: (state, action) => {
      state.role = action.payload;
    },
    setUserEmail: (state, action) => {
      state.email = action.payload;
    },
    setErrLoggingIn: (state, action) => {
      state.errLoggingIn = action.payload;
    },
    // Add other reducers here
    setLoginLoading: (state, action) => {
      state.loginLoading = action.payload;
    },
    clearAuthToken: (state, action) => {
      state.Token = null;
      state.fcmToken = null;
      state.device_id = null;
      state.fcm_key_created_date = null;
      state.userName = {};
      state.user = {};
      state.userAuthApproved = false; 
    }
  },

});

export const {
  setUserID,
  setFcmToken,
  setFcmTokenReceived,
  setFcmTokenSent,
  setDevice_Id,
  setFcm_key_created_date,
  setUser,
  setuserToken,
  setUserRole,
  setUserEmail,
  setUserName,
  setErrLoggingIn,
  setLoginLoading,
  setUserAuthApproved,
  loadUser,
  clearAuthToken
} = AuthSlice.actions;

export default AuthSlice.reducer;
