/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import useMobileNoDetails from '../hooks/useMobileNoDetails';
import {getNotificationList} from '../Redux/Reducers/notificationReducer';
import NotificationList from '../sections/NotificationList';

const NotificationScreen = () => {
  const {notificationListData} = useSelector(state => state.notificationData);

  console.log('nn', notificationListData);

  const dispatch = useDispatch();

  const {mobileNoData} = useMobileNoDetails();

  const [notificationList, setNotificationList] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const notificationPayload = JSON.stringify({
        action: 'getNotifications',
        owner_mobile_no: mobileNoData,
      });
      dispatch(getNotificationList(notificationPayload));
    }, [mobileNoData]),
  );

  useEffect(() => {
    if (notificationListData?.data?.length > 0) {
      setNotificationList(notificationListData?.data);
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      <NotificationList notificationList={notificationList} />
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({});
