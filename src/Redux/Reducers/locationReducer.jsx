import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import instance from '../../axios/apis';

const initialState = {
  locationList: [],
  facilitiesList: [],

  locationLoading: false,
  facilitiesLoading: false,

  locationError: null,
  facilitiesError: null,
};

/* ===================== GET ZIP LOCATION ===================== */
export const getZipLocationList = createAsyncThunk(
  'location/getZipLocationList',
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

/* ===================== GET FACILITIES ===================== */
export const getFacilitiesList = createAsyncThunk(
  'location/getFacilitiesList',
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

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    resetLocationState: () => initialState,
  },
  extraReducers: builder => {
    builder
      /* ===================== ZIP LOCATION ===================== */
      .addCase(getZipLocationList.pending, state => {
        state.locationLoading = true;
        state.locationError = null;
      })
      .addCase(getZipLocationList.fulfilled, (state, action) => {
        state.locationLoading = false;
        state.locationList = action.payload?.data ?? action.payload;
      })
      .addCase(getZipLocationList.rejected, (state, action) => {
        state.locationLoading = false;
        state.locationError = action.payload;
      })

      /* ===================== FACILITIES ===================== */
      .addCase(getFacilitiesList.pending, state => {
        state.facilitiesLoading = true;
        state.facilitiesError = null;
      })
      .addCase(getFacilitiesList.fulfilled, (state, action) => {
        state.facilitiesLoading = false;
        state.facilitiesList = action.payload?.data ?? action.payload;
      })
      .addCase(getFacilitiesList.rejected, (state, action) => {
        state.facilitiesLoading = false;
        state.facilitiesError = action.payload;
      });
  },
});

export const {resetLocationState} = locationSlice.actions;
export default locationSlice.reducer;
