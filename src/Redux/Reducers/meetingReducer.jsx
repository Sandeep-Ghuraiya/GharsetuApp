/* eslint-disable prettier/prettier */
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import instance from '../../axios/apis';

const initialState = {
  meetingList: null,
  meetingEditResponse: null,
  meetingAddResponse: null,
  meetingDeleteResponse: null,
  loading: false,
  error: null,
};

/**
 * 👉 Get all agent
 */
export const getMeetingList = createAsyncThunk(
  'properties/getMeetingList',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await instance.post('/api', payload);
      //   console.log('response',response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error.message || 'Something went wrong',
      );
    }
  },
);

export const editMeetingDetails = createAsyncThunk(
  'properties/editMeetingDetails',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await instance.post('/api', payload);
      // console.log('edit', response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error.message || 'Something went wrong',
      );
    }
  },
);

export const addMeetingDetails = createAsyncThunk(
  'properties/addMeetingDetails',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await instance.post('/api', payload);
      // console.log('res', response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error.message || 'Something went wrong',
      );
    }
  },
);

export const deleteMeetingDetails = createAsyncThunk(
  'properties/deleteMeetingDetails',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await instance.post('/api', payload);
      // console.log('res', response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error.message || 'Something went wrong',
      );
    }
  },
);

const meetingSlice = createSlice({
  name: 'meetings',
  initialState,
  reducers: {
    clearMeetingResponse: state => {
      state.meetingEditResponse = null;
      state.meetingAddResponse = null;
      state.meetingDeleteResponse = null;
    },
  },
  extraReducers: builder => {
    builder
      /* ===================== GET AGENT ===================== */
      .addCase(getMeetingList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMeetingList.fulfilled, (state, action) => {
        state.loading = false;
        state.meetingList = action.payload;
      })
      .addCase(getMeetingList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(editMeetingDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editMeetingDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.meetingEditResponse = action.payload;
      })
      .addCase(editMeetingDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addMeetingDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMeetingDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.meetingAddResponse = action.payload;
      })
      .addCase(addMeetingDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteMeetingDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMeetingDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.meetingDeleteResponse = action.payload;
      })
      .addCase(deleteMeetingDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {clearMeetingResponse} = meetingSlice.actions;
export default meetingSlice.reducer;
