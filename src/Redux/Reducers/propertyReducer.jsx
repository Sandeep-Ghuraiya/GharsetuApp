import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import instance from '../../axios/apis';

const initialState = {
  propertiesList: null,
  propertyAddResponse: null,
  propertyDraftResponse: null,
  propertyEditResponse: null,
  saveBrokerageResponse: null,
  deleteBrokerageResponse: null,
  deletePropertyResponse: null,
  loading: false,
  error: null,
};

/**
 * 👉 Get all leads
 */
export const getPropertiesList = createAsyncThunk(
  'properties/getPropertiesList',
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
export const addNewProperty = createAsyncThunk(
  'properties/addNewProperty',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await instance.post('/api', payload);
      console.log('Add_responnse: ', response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error.message || 'Something went wrong',
      );
    }
  },
);

export const addDraftProperty = createAsyncThunk(
  'properties/addDraftProperty',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await instance.post('/api', payload);
      console.log('Draft_responnse: ', response.data);

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
export const editExistingProperty = createAsyncThunk(
  'properties/editExistingProperty',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await instance.post('/api', payload);
      console.log('Edit response: ', response.data);
      return response.data;
    } catch (error) {
      console.log('====================================');
      console.log('errorresponse', error);
      console.log('====================================');
      // return rejectWithValue(
      //   error?.response?.data || error.message || 'Something went wrong',
      // );
    }
  },
);

export const saveBrokerageDetails = createAsyncThunk(
  'properties/saveBrokerageDetails',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await instance.post('/api', payload);
      console.log('saverespone', response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error.message || 'Something went wrong',
      );
    }
  },
);

export const deleteBrokerageDetails = createAsyncThunk(
  'properties/deleteBrokerageDetails',
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

export const deleteProperty = createAsyncThunk(
  'properties/deleteProperty',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await instance.post('/api', payload);
      console.log('deleterr', response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error.message || 'Something went wrong',
      );
    }
  },
);

const propertySlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    clearPropertyResponse(state) {
      state.propertyAddResponse = null;
      state.propertyEditResponse = null;
      state.propertyDraftResponse = null;
      state.saveBrokerageResponse = null;
      state.deletePropertyResponse = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      /* ===================== GET LEADS ===================== */
      .addCase(getPropertiesList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPropertiesList.fulfilled, (state, action) => {
        state.loading = false;
        state.propertiesList = action.payload?.data || action.payload;
      })
      .addCase(getPropertiesList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===================== ADD LEAD ===================== */
      .addCase(addNewProperty.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.propertyAddResponse = action.payload;

        // ✅ OPTIONAL: instantly add new lead to list
        if (action.payload?.data) {
          state.propertiesList.unshift(action.payload.data);
        }
      })
      .addCase(addNewProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addDraftProperty.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDraftProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.propertyDraftResponse = action.payload;
      })
      .addCase(addDraftProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===================== EDIT LEAD ===================== */
      .addCase(editExistingProperty.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editExistingProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.propertyEditResponse = action.payload;
      })
      .addCase(editExistingProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(saveBrokerageDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveBrokerageDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.saveBrokerageResponse = action.payload;
      })
      .addCase(saveBrokerageDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteBrokerageDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBrokerageDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteBrokerageResponse = action.payload;
      })
      .addCase(deleteBrokerageDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteProperty.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.deletePropertyResponse = action.payload;
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {clearPropertyResponse} = propertySlice.actions;
export default propertySlice.reducer;
