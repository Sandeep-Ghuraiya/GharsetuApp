/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable curly */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

/** ICONS **/
import {FontAwesome} from '@react-native-vector-icons/fontawesome';

/** COMPONENTS **/
import CommonButton from '../components/common/CommonButton';
import LeadList from '../sections/LeadLists';
import {SelectColors} from '../constant/Colors';
import MeetingList from '../sections/MeetingList';
import {
  clearMeetingResponse,
  getMeetingList,
} from '../Redux/Reducers/meetingReducer';
import {showError, showSuccess, showWarning} from '../utils/flashMessage';
import useMobileNoDetails from '../hooks/useMobileNoDetails';

const MeetingListScreen = ({navigation}) => {
  const {meetingList, meetingDeleteResponse} = useSelector(
    state => state.meetingData,
  );

  console.log('response delete', meetingDeleteResponse);

  const dispatch = useDispatch();

  const {mobileNoData} = useMobileNoDetails();

  const hasHandledResponse = useRef(false);

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    const handleMeetingResponse = async () => {
      if (!meetingDeleteResponse || hasHandledResponse.current) return;

      hasHandledResponse.current = true;

      const {status, message, errors} = meetingDeleteResponse;

      if (status === '1') {
        console.log('ss', status);

        showSuccess({
          message: 'Success',
          description: 'Meeting Deleted successfully!',
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
    // setTimeout(() => {
    //     console.log('time out');
    //     navigation.navigate('AgentList');

    // }, 2000);
  }, [meetingDeleteResponse, navigation, dispatch]);

  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState();

  // console.log('screen', meetingList?.data?.length);

  /** FAKE LOADING ON SCREEN FOCUS */
  useFocusEffect(
    React.useCallback(() => {
      setLoadingPage(true);

      const timer = setTimeout(() => {
        setLoadingPage(false);
      }, 3000);

      return () => clearTimeout(timer);
    }, [meetingList]),
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      {loadingPage ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={40} color={SelectColors.primaryBlueColor} />
        </View>
      ) : (
        <>
          <MeetingList
            meetingData={meetingList?.data}
            navigation={navigation}
          />
        </>
      )}
    </View>
  );
};

export default MeetingListScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
