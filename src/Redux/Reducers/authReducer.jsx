/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice, isAnyOf} from '@reduxjs/toolkit';
import instance from '../../axios/apis';

/* -------------------- */
/* Initial State */
/* -------------------- */
const initialState = {
  loginData: null,
  setmpinData: null,
  entermpinData: null,
  forgotMpinData: null,
  verifyForgotmpinData: null,
  newAccountData: null,
  resetPasswordData: null,
  updatedProfileData: null,
  forgotPasswordData: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

/* -------------------- */
/* Common API Call */
/* -------------------- */
const postApi = async (payload, {rejectWithValue}) => {
  try {
    const response = await instance.post('/api', payload);
    // console.log('Auth Response: ', response?.data);
    return response.data;
  } catch (error) {
    console.log('error', error);

    return rejectWithValue(error?.response?.data || 'Something Went Wrong');
  }
};

/* -------------------- */
/* Thunks */
/* -------------------- */
export const userLoginDetails = createAsyncThunk(
  'user/login',
  async (payload, thunkAPI) => {
    const data = await postApi(payload, thunkAPI);
    //  console.log('loginres',data);

    if (data?.status === 1) {
      await AsyncStorage.setItem('user_data', JSON.stringify(data));
    }
    return data;
  },
);

export const userSetmpin = createAsyncThunk(
  'user/setmpin',
  async (payload, thunkAPI) => {
    const data = await postApi(payload, thunkAPI);

    if (data?.status === 1) {
      await AsyncStorage.setItem('setmpin_data', JSON.stringify(data));
    }
    return data;
  },
);

export const userEntermpin = createAsyncThunk(
  'user/entermpin',
  async (payload, thunkAPI) => {
    const data = await postApi(payload, thunkAPI);

    if (data?.status === 1) {
      await AsyncStorage.setItem('login_data', JSON.stringify(data));
    }
    return data;
  },
);

export const forgotMpinRequest = createAsyncThunk('user/forgotmpin', postApi);

export const verifyForgotMpinRequest = createAsyncThunk(
  'user/verifyForgotmpin',
  postApi,
);

export const createUserAccount = createAsyncThunk(
  'user/createAccount',
  postApi,
);

export const resetPasswordDetails = createAsyncThunk(
  'user/resetPassword',
  postApi,
);

export const userUpdatedProfile = createAsyncThunk(
  'user/updateProfile',
  async (payload, thunkAPI) => {
    const data = await postApi(payload, thunkAPI);
    if (data?.status === 1) {
      await AsyncStorage.setItem('login_data', JSON.stringify(data));
    }
    return data;
  },
);

export const forgotPasswordDetails = createAsyncThunk(
  'user/forgotPassword',
  postApi,
);

/* -------------------- */
/* Slice */
/* -------------------- */
const loginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: state => {
      state.entermpinData = null;
      state.isLoggedIn = false;
      AsyncStorage.removeItem('login_data');
    },
    resetNewAccount: state => {
      state.newAccountData = null;
    },
    resetPasswordState: state => {
      state.resetPasswordData = null;
    },
    resetforgotPasswordState: state => {
      state.forgotPasswordData = null;
    },
    resetForgotmpin: state => {
      state.forgotMpinData = null;
    },
    resetVerifyForgotmpin: state => {
      state.verifyForgotmpinData = null;
    },
  },
  extraReducers: builder => {
    builder
      /* -------- Fulfilled -------- */
      .addCase(userLoginDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.loginData = action.payload;
        state.isLoggedIn = action.payload?.status === 1;
      })
      .addCase(userSetmpin.fulfilled, (state, action) => {
        state.loading = false;
        state.setmpinData = action.payload;
      })
      .addCase(userEntermpin.fulfilled, (state, action) => {
        state.loading = false;
        state.entermpinData = action.payload;
      })
      .addCase(forgotMpinRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.forgotmpinData = action.payload;
      })
      .addCase(verifyForgotMpinRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.verifyForgotmpinData = action.payload;
      })
      .addCase(createUserAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.newAccountData = action.payload;
      })
      .addCase(resetPasswordDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.resetPasswordData = action.payload;
      })
      .addCase(userUpdatedProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.updatedProfileData = action.payload;
      })
      .addCase(forgotPasswordDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.forgotPasswordData = action.payload;
      })

      /* -------- Common Pending -------- */
      .addMatcher(
        isAnyOf(
          userLoginDetails.pending,
          userSetmpin.pending,
          userEntermpin.pending,
          forgotMpinRequest.pending,
          verifyForgotMpinRequest.pending,
          createUserAccount.pending,
          resetPasswordDetails.pending,
          userUpdatedProfile.pending,
          forgotPasswordDetails.pending,
        ),
        state => {
          state.loading = true;
          state.error = null;
        },
      )

      /* -------- Common Rejected -------- */
      .addMatcher(
        isAnyOf(
          userLoginDetails.rejected,
          userSetmpin.rejected,
          userEntermpin.rejected,
          forgotMpinRequest.rejected,
          verifyForgotMpinRequest.rejected,
          createUserAccount.rejected,
          resetPasswordDetails.rejected,
          userUpdatedProfile.rejected,
          forgotPasswordDetails.rejected,
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

/* -------------------- */
/* Exports */
/* -------------------- */
export const {
  logout,
  resetNewAccount,
  resetPasswordState,
  resetforgotPasswordState,
  resetForgotmpin,
  resetVerifyForgotmpin,
} = loginSlice.actions;

export default loginSlice.reducer;
