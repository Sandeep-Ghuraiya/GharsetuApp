/* eslint-disable prettier/prettier */
import {logout} from '../Redux/Reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const useLoginData = () => {
  const {updatedProfileData, isLoggedIn} = useSelector(
    state => state.agentDetails,
  );

  const dispatch = useDispatch();

  const [loginDetails, setLoginDetails] = useState(null);
  const [loginLoading, setLoginLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [mpinDetails, setMpinDetails] = useState(null); // ✅ NEW STATE

  useEffect(() => {
    const getLoginData = async () => {
      try {
        const value = await AsyncStorage.getItem('login_data');
        const userValue = await AsyncStorage.getItem('user_data');
        const mpinValue = await AsyncStorage.getItem('setmpin_data');

        // Login data
        if (value) {
          const parsedData = JSON.parse(value);
          setLoginDetails(parsedData);
        } else {
          setLoginDetails(null);
        }

        // User data
        if (userValue) {
          const parsedUser = JSON.parse(userValue);
          setUserDetails(parsedUser);
        } else {
          setUserDetails(null);
        }

        // ✅ MPIN data
        if (mpinValue) {
          const parsedMpin = JSON.parse(mpinValue);
          setMpinDetails(parsedMpin);
        } else {
          setMpinDetails(null);
        }
      } catch (error) {
        console.error('Login data error:', error);
        setLoginDetails(null);
        setUserDetails(null);
        setMpinDetails(null); // ✅ reset on error
      } finally {
        setLoginLoading(false);
      }
    };

    getLoginData();
  }, [updatedProfileData]);

  return {
    loginDetails,
    loginLoading,
    isLoggedIn,
    userDetails,
    mpinDetails, // ✅ RETURN IT
  };
};

export default useLoginData;
