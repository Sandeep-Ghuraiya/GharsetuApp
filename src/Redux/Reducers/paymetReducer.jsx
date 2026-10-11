/* eslint-disable no-unused-vars */
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import instance from '../../axios/apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  createOrderData: null,
  createPayment: null,
  loading: false,
  error: null,
};

/**
 * 👉 Get all agent
 */
export const createOrderDetails = createAsyncThunk(
  'payment/createOrderDetails',
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

export const createPaymentDetails = createAsyncThunk(
  'payment/createPaymentDetails',
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

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createOrderDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.createOrderData = action.payload;
      })
      .addCase(createOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createPaymentDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaymentDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.createPayment = action.payload;
      })
      .addCase(createPaymentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = paymentSlice.actions;
export default paymentSlice.reducer;
