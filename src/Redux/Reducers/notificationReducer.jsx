/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import instance from '../../axios/apis';

/* -------------------- */
/* Initial State */
/* -------------------- */
const initialState = {
  notificationListData: null,
  loading: false,
  error: null,
};

export const getNotificationList = createAsyncThunk(
  'user/getNotificationList',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await instance.post('/api', payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error.message || 'Something went wrong',
      );
    }
  },
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getNotificationList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNotificationList.fulfilled, (state, action) => {
        state.loading = false;
        state.notificationListData = action.payload;
      })
      .addCase(getNotificationList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/* -------------------- */
/* Exports */
/* -------------------- */
export const {} = notificationSlice.actions;

export default notificationSlice.reducer;
