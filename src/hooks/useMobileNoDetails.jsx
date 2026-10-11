/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import {logout} from '../Redux/Reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const useMobileNoDetails = () => {
  const {loginData, entermpinData} = useSelector(
    state => state.agentDetails,
  );

  const [mobileNoData, setMobileNoData] = useState(null);

  useEffect(() => {
    const getLoginData = async () => {
      try {
        if (loginData) {
          setMobileNoData(loginData.data.mobile_no);
        } else {
          const value = await AsyncStorage.getItem('user_data');

          if (value) {
            const parsedData = JSON.parse(value);
            setMobileNoData(parsedData.data.mobile_no);
            // dispatch(logout(true)); // ✅ REDUX STATE
          } else {
            setMobileNoData(null);
            // dispatch(logout(false));
          }
        }
      } catch (error) {
        console.error('Login data error:', error);
        setMobileNoData(null);
        // dispatch(logout(false));
      } finally {
      }
    };

    getLoginData();
  }, [loginData, entermpinData]);

  return {mobileNoData};
};

export default useMobileNoDetails;
