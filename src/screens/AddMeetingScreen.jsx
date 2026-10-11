/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable curly */
/* eslint-disable no-unused-vars */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import AddMeetingForm from '../sections/AddMeetingForm';
import {useDispatch, useSelector} from 'react-redux';
import {showError, showSuccess, showWarning} from '../utils/flashMessage';
import {
  clearMeetingResponse,
  getMeetingList,
} from '../Redux/Reducers/meetingReducer';
import useMobileNoDetails from '../hooks/useMobileNoDetails';

const AddMeetingScreen = ({navigation}) => {
  const {meetingAddResponse} = useSelector(state => state.meetingData);

  console.log('respobd', meetingAddResponse);

  const {mobileNoData} = useMobileNoDetails();

  const dispatch = useDispatch();

  const hasHandledResponse = useRef(false);

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    const handleMeetingResponse = async () => {
      if (!meetingAddResponse || hasHandledResponse.current) return;

      hasHandledResponse.current = true;

      const {status, message, errors} = meetingAddResponse;

      if (status === '1') {
        showSuccess({
          message: 'Success',
          description: 'Meeting add successfully!',
        });

        const meetingList = JSON.stringify({
          owner_mobile_no: mobileNoData,
          action: 'meetings',
        });

        dispatch(getMeetingList(meetingList));

        // wait so user can see success toast
        await sleep(2000);

        dispatch(clearMeetingResponse());
        navigation.navigate('MeetingList', {from: 'Meeting List'});
      } else if (status === 0) {
        showError({
          message: 'Error',
          description: message,
          duration: 3000,
        });

        dispatch(clearMeetingResponse());
      } else if (status === 'error') {
        showError({
          message: 'Error',
          description: formatErrors(errors),
          duration: 4000,
        });

        dispatch(clearMeetingResponse());
      } else {
        showWarning({
          message: 'Warning',
          description: 'Something went wrong!',
          duration: 3000,
        });

        dispatch(clearMeetingResponse());
      }

      hasHandledResponse.current = false;
    };

    handleMeetingResponse();
  }, [meetingAddResponse, navigation, dispatch]);

  return (
    <View style={{flex: 1}}>
      <AddMeetingForm title={'Add'} />
    </View>
  );
};

export default AddMeetingScreen;

const styles = StyleSheet.create({});
