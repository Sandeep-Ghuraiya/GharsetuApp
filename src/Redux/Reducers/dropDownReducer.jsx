/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import instance from '../../axios/apis';

/* -------------------- */
/* Initial State */
/* -------------------- */
const initialState = {
  dropdownData: null,
  loading: false,
  error: null,
};

export const getDropdownList = createAsyncThunk(
  'user/getDropdownList',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await instance.post('/api', payload);
      if (response?.data?.status === 1) {
        await AsyncStorage.setItem(
          'dropdown_list',
          JSON.stringify(response.data),
        );
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error.message || 'Something went wrong',
      );
    }
  },
);

// export const userGetLead = createAsyncThunk(
//   'leads/userGetLead',
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await instance.post('/api', payload);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error?.response?.data || error.message || 'Something went wrong',
//       );
//     }
//   },
// );

/* -------------------- */
/* Slice */
/* -------------------- */
const dropDownSlice = createSlice({
  name: 'dropDown',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getDropdownList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDropdownList.fulfilled, (state, action) => {
        state.loading = false;
        state.dropdownData = action.payload;
      })
      .addCase(getDropdownList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/* -------------------- */
/* Exports */
/* -------------------- */
export const {} = dropDownSlice.actions;

export default dropDownSlice.reducer;
