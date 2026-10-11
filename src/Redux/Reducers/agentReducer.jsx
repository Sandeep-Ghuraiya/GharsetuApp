/* eslint-disable prettier/prettier */
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import instance from '../../axios/apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  agentList: null,
  agentEditResponse: null,
  agentAddResponse: null,
  agentDeleteResponse: null,
  loading: false,
  error: null,
};

/**
 * 👉 Get all agent
 */
export const getAgentList = createAsyncThunk(
  'properties/getAgentList',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await instance.post('/api', payload);

      if (response?.data?.status === 1) {
        await AsyncStorage.setItem('agent_data', JSON.stringify(response.data));
        console.log('reinn', response?.data?.status);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error.message || 'Something went wrong',
      );
    }
  },
);

export const editAgentDetails = createAsyncThunk(
  'properties/editAgentDetails',
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

export const addAgentDetails = createAsyncThunk(
  'properties/addAgentDetails',
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

export const deleteAgentDetails = createAsyncThunk(
  'properties/deleteAgentDetails',
  async (payload, {rejectWithValue}) => {
    console.log('payload', payload);

    try {
      const response = await instance.post('/api', payload);
      console.log('deletedres', response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error.message || 'Something went wrong',
      );
    }
  },
);

const agentSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    clearAgentResponse: state => {
      state.agentEditResponse = null;
      state.agentAddResponse = null;
      state.agentDeleteResponse = null;
    },
  },
  extraReducers: builder => {
    builder
      /* ===================== GET AGENT ===================== */
      .addCase(getAgentList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAgentList.fulfilled, (state, action) => {
        state.loading = false;
        state.agentList = action.payload;
      })
      .addCase(getAgentList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(editAgentDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editAgentDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.agentEditResponse = action.payload;
      })
      .addCase(editAgentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addAgentDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAgentDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.agentAddResponse = action.payload;
      })
      .addCase(addAgentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteAgentDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAgentDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.agentDeleteResponse = action.payload;
      })
      .addCase(deleteAgentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {clearAgentResponse} = agentSlice.actions;
export default agentSlice.reducer;
