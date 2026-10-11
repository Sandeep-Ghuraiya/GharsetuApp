/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
// import {getMessaging, getToken} from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';

const useDeviceDetails = () => {
  // const messaging = getMessaging();

  const [deviceId, setDeviceId] = useState('');
  const [deviceToken, setDeviceToken] = useState('');

  // useEffect(() => {
  //   const id = DeviceInfo.getDeviceId();
  //   setDeviceId(id);
  //   getToken(messaging) // Get the device token after permission is granted
  //     .then(token => {
  //       // Optionally log the token if you need it for debugging
  //       setDeviceToken(token);
  //     });
  // }, []);

  return {deviceId, deviceToken};
};

export default useDeviceDetails;
