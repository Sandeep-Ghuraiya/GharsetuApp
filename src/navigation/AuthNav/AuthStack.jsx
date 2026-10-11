/* eslint-disable prettier/prettier */
/* eslint-disable curly */
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PermissionsAndroid, Platform} from 'react-native';
import SplashScreen from '../../screens/SplashScreen';
import LoginScreen from '../../screens/AuthScreen/LoginScreen';
import RegistrationScreen from '../../screens/AuthScreen/RegistrationScreen';
import ResetPasswordScreen from '../../screens/AuthScreen/ResetPasswordScreen';
import ForgotPasswordScreen from '../../screens/AuthScreen/ForgotPasswordScreen';
import SetmpinScreen from '../../screens/AuthScreen/SetmpinScreen';
import EntermpinScreen from '../../screens/AuthScreen/EntermpinScreen';
import ForgotmpinScreen from '../../screens/AuthScreen/ForgotmpinScreen';
import VerifyForgotmpinScreen from '../../screens/AuthScreen/VerifyForgotmpinScreen';

import useLoginData from '../../hooks/useLoginData';
import MainStack from '../MainNav/MainStack';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const {loginDetails, loginLoading, userDetails, mpinDetails} = useLoginData();

  const [permissionDone, setPermissionDone] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [initialRoute, setInitialRoute] = useState(null);

  // 🔐 Ask permission first
  useEffect(() => {
    const requestPermission = async () => {
      try {
        if (Platform.OS === 'android') {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
        }
      } catch (err) {
        console.log('Permission error:', err);
      } finally {
        setPermissionDone(true); // ✅ Move forward regardless
      }
    };

    requestPermission();
  }, []);

  // ⏳ Start splash AFTER permission
  useEffect(() => {
    if (!permissionDone) return;

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [permissionDone]);

  // 🚦 Decide route AFTER splash + login check
  useEffect(() => {
    if (showSplash || loginLoading) return;

    if (userDetails) {
      if (userDetails?.data?.mpin || mpinDetails?.data?.mpin) {
        setInitialRoute('Enterpin');
      } else {
        setInitialRoute('Setpin');
      }
    } else {
      setInitialRoute('Login');
    }
  }, [showSplash, loginLoading, loginDetails, userDetails, mpinDetails]);

  // 🟡 Show splash until everything is ready
  if (showSplash || loginLoading || !initialRoute) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Setpin" component={SetmpinScreen} />
      <Stack.Screen name="Enterpin" component={EntermpinScreen} />
      <Stack.Screen name="Forgotpin" component={ForgotmpinScreen} />
      <Stack.Screen name="Verifyforgotpin" component={VerifyForgotmpinScreen} />
      <Stack.Screen name="AppTab" component={MainStack} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
