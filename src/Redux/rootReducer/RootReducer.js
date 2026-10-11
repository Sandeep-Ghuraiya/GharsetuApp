import {combineReducers} from '@reduxjs/toolkit';
import loginSlice from '../Reducers/authReducer';
import leadSlice from '../Reducers/leadReducer';
import propertySlice from '../Reducers/propertyReducer';
import locationSlice from '../Reducers/locationReducer';
import dropdownSlice from '../Reducers/dropDownReducer';
import agentSlice from '../Reducers/agentReducer';
import meetingSlice from '../Reducers/meetingReducer';
import notificationSlice from '../Reducers/notificationReducer';
import paymentSlice from '../Reducers/paymetReducer';

const rootReducer = combineReducers({
  agentDetails: loginSlice,
  agentLeads: leadSlice,
  agentsData: agentSlice,
  dropdownDetails: dropdownSlice,
  locationData: locationSlice,
  meetingData: meetingSlice,
  notificationData: notificationSlice,
  propertiesData: propertySlice,
  paymentInfo: paymentSlice,
});

export default rootReducer;
