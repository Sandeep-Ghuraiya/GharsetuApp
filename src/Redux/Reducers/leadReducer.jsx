import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import instance from '../../axios/apis';

const initialState = {
  leadsList: [],
  leadAddResponse: null,
  leadEditResponse: null,
  loading: false,
  error: null,
};

/**
 * 👉 Get all leads
 */
export const userGetLead = createAsyncThunk(
  'leads/userGetLead',
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

/**
 * 👉 Add new lead
 */
export const userLeadAdd = createAsyncThunk(
  'leads/userLeadAdd',
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

/**
 * 👉 Updated existing lead
 */
export const userEditLead = createAsyncThunk(
  'leads/userLeadEdit',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await instance.post('/api', payload);
      console.log('Edit response: ', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error.message || 'Something went wrong',
      );
    }
  },
);

const leadSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    clearLeadResponse(state) {
      state.leadAddResponse = null;
      state.leadEditResponse = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      /* ===================== GET LEADS ===================== */
      .addCase(userGetLead.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userGetLead.fulfilled, (state, action) => {
        state.loading = false;
        state.leadsList = action.payload;
      })
      .addCase(userGetLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===================== ADD LEAD ===================== */
      .addCase(userLeadAdd.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLeadAdd.fulfilled, (state, action) => {
        state.loading = false;
        state.leadAddResponse = action.payload;

        // ✅ OPTIONAL: instantly add new lead to list
        if (action.payload?.data) {
          state.leadsList.unshift(action.payload.data);
        }
      })
      .addCase(userLeadAdd.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===================== EDIT LEAD ===================== */
      .addCase(userEditLead.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userEditLead.fulfilled, (state, action) => {
        state.loading = false;
        state.leadEditResponse = action.payload;
      })
      .addCase(userEditLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {clearLeadResponse} = leadSlice.actions;
export default leadSlice.reducer;
