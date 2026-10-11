/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
// Routes
import {useDispatch} from 'react-redux';
import {userGetLead} from './Redux/Reducers/leadReducer';
import {getPropertiesList} from './Redux/Reducers/propertyReducer';
import AuthStack from './navigation/AuthNav/AuthStack';
import {getDropdownList} from './Redux/Reducers/dropDownReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAgentList} from './Redux/Reducers/agentReducer';
import {getMeetingList} from './Redux/Reducers/meetingReducer';
import useLoginData from './hooks/useLoginData';
import useMobileNoDetails from './hooks/useMobileNoDetails';

const AppLayout = () => {
  const dispatch = useDispatch();

  const {mobileNoData} = useMobileNoDetails();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        //console.log('appmobile', mobileNoData);

        if (mobileNoData) {
          const leadListData = {
            owner_mobile_no: mobileNoData,
            action: 'lead_list',
            status: '',
            page: 1,
          };

          const dropdownListData = {
            action: 'dropdown_list',
          };

          const agentList = {
            owner_mobile_no: mobileNoData,
            action: 'associated_agents',
          };

          const meetings = {
            owner_mobile_no: mobileNoData,
            action: 'meetings',
          };

          // Run both APIs in parallel (better performance)
          await Promise.all([
            dispatch(getAgentList(JSON.stringify(agentList))),
            dispatch(userGetLead(JSON.stringify(leadListData))),
            // dispatch(getPropertiesList(JSON.stringify(propertiesListData))),
            dispatch(getDropdownList(JSON.stringify(dropdownListData))),
            dispatch(getMeetingList(JSON.stringify(meetings))),
          ]);
        }

        const today = new Date().toDateString(); // e.g. "Thu Mar 19 2026"

        const storedDate = await AsyncStorage.getItem('last_date');

        if (storedDate !== today) {
          // ✅ Date changed → reset counter
          await AsyncStorage.setItem('counter', JSON.stringify(0));
          await AsyncStorage.setItem('last_date', today);
        } else {
          console.log('Date is Same');
        }
      } catch (error) {
        console.log('Error while fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, [dispatch, mobileNoData]);

  const renderStack = () => {
    return <AuthStack />;
  };

  return <NavigationContainer>{renderStack()}</NavigationContainer>;
};

export default React.memo(AppLayout);
