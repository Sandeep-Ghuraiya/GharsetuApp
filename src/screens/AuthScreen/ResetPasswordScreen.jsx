/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable curly */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';

import {Ionicons} from '@react-native-vector-icons/ionicons';
import {OtpInput} from 'react-native-otp-entry';
import AccountButton from '../../components/custom/AccountButton';

import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {
  forgotPasswordDetails,
  resetforgotPasswordState,
  resetPasswordDetails,
  resetPasswordState,
  verifyForgotMpinRequest,
} from '../../Redux/Reducers/authReducer';
import {showError, showSuccess} from '../../utils/flashMessage';
import useDeviceDetails from '../../hooks/useDeviceDetails';

/* ✅ VALIDATION */
const schema = yup.object({
  verifyCode: yup
    .string()
    .required('OTP is required')
    .length(6, 'Enter valid OTP'),
  password: yup
    .string()
    .required('Password is required')
    .length(6, 'Password must be 6 digits'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Confirm Password does not match')
    .required('Confirm Password is required'),
});

const VerifyForgotmpinScreen = ({navigation, route}) => {
  const {forgotPasswordData, resetPasswordData} = useSelector(
    state => state.agentDetails,
  );

  const {deviceId, deviceToken} = useDeviceDetails();

  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [otpKey, setOtpKey] = useState(0);

  const mobileNo = route?.params?.mobileNo;

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      verifyCode: '',
      password: '',
      confirmPassword: '',
    },
  });

  /* ⏱ Timer */
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (forgotPasswordData?.status === 1) {
      console.log('log', forgotPasswordData.status);
      showSuccess({
        message: 'Success',
        description: forgotPasswordData?.message,
      });
      setTimeout(() => {
        dispatch(resetforgotPasswordState());
      }, 2000);
    } else if (forgotPasswordData?.status === 0) {
      showError({
        message: 'Error',
        description: forgotPasswordData?.message,
        duration: 3000,
      });
      setTimeout(() => {
        dispatch(resetforgotPasswordState());
      }, 2000);
    }
  }, [forgotPasswordData]);

  useEffect(() => {
    if (resetPasswordData?.status === 1) {
      setLoading(false);
      showSuccess({
        message: 'Success',
        description: resetPasswordData?.message,
      });
      setTimeout(() => {
        navigation.navigate('Login');
        dispatch(resetPasswordState());
      }, 2000);
      reset();
      setOtpKey(prev => prev + 1);
    } else if (resetPasswordData?.status === 0) {
      showError({
        message: 'Error',
        description: resetPasswordData?.message,
        duration: 3000,
      });
      setTimeout(() => {
        dispatch(resetPasswordState());
      }, 2000);
      setLoading(false);
      reset();
      setOtpKey(prev => prev + 1);
    }
  }, [resetPasswordData]);

  const onSubmit = data => {
    Keyboard.dismiss();
    setLoading(true);

    const payload = JSON.stringify({
      action: 'reset_password',
      mobile_no: mobileNo,
      token: data.verifyCode,
      password: data.password,
      confirm_password: data.confirmPassword,
    });

    console.log('RESET MPIN:', payload);

    dispatch(resetPasswordDetails(payload));
  };

  const handleResendOtp = () => {
    setTimer(30);
    const payload = JSON.stringify({
      mobile_no: mobileNo,
      action: 'forgot_password',
      device_id: deviceId,
      device_token: deviceToken,
    });

    console.log('Send OTP:', payload);
    dispatch(forgotPasswordDetails(payload));
  };

  return (
    <ImageBackground
      source={require('../../assets/images/gradient_1.png')}
      style={styles.container}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <SafeAreaView style={styles.overlay}>
          <View style={{paddingHorizontal: 20}}>
            {/* 🔐 Icon */}
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={28}
                  color="#000"
                />
              </View>
            </View>

            {/* Title */}
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>
              Enter verify code and create your new password
            </Text>

            {/* OTP */}
            <Controller
              control={control}
              name="verifyCode"
              render={({field: {onChange, value}}) => (
                <View style={{marginBottom: 15}}>
                  <Text style={styles.label}>Enter Verify Code</Text>
                  <OtpInput
                    key={otpKey}
                    numberOfDigits={6}
                    autoFocus={true}
                    focusColor="#fff"
                    value={value}
                    onTextChange={onChange}
                    theme={{
                      pinCodeContainerStyle: styles.otpBox,
                      pinCodeTextStyle: styles.pinText,
                      focusedPinCodeContainerStyle: styles.activeBox,
                    }}
                  />
                  {errors.verifyCode && (
                    <Text style={styles.error}>
                      {errors.verifyCode.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <View style={styles.resendWrap}>
              {timer > 0 ? (
                <Text style={styles.timerText}>Resend OTP in {timer}s</Text>
              ) : (
                <TouchableOpacity onPress={handleResendOtp}>
                  <Text style={styles.resendText}>Resend OTP</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* MPIN */}
            <Controller
              control={control}
              name="password"
              render={({field: {onChange, value}}) => (
                <View style={{marginBottom: 15}}>
                  <Text style={styles.label}>New Password</Text>
                  <OtpInput
                    key={otpKey}
                    numberOfDigits={6}
                    autoFocus={false}
                    focusColor="#fff"
                    // secureTextEntry
                    value={value}
                    onTextChange={onChange}
                    theme={{
                      pinCodeContainerStyle: styles.otpBox,
                      pinCodeTextStyle: styles.pinText,
                      focusedPinCodeContainerStyle: styles.activeBox,
                    }}
                  />
                  {errors.password && (
                    <Text style={styles.error}>{errors.password.message}</Text>
                  )}
                </View>
              )}
            />

            {/* Confirm MPIN */}
            <Controller
              control={control}
              name="confirmPassword"
              render={({field: {onChange, value}}) => (
                <View style={{marginBottom: 15}}>
                  <Text style={styles.label}>Confirm Password</Text>
                  <OtpInput
                    key={otpKey}
                    numberOfDigits={6}
                    autoFocus={false}
                    focusColor="#fff"
                    // secureTextEntry
                    value={value}
                    onTextChange={onChange}
                    theme={{
                      pinCodeContainerStyle: styles.otpBox,
                      pinCodeTextStyle: styles.pinText,
                      focusedPinCodeContainerStyle: styles.activeBox,
                    }}
                  />
                  {errors.confirmPassword && (
                    <Text style={styles.error}>
                      {errors.confirmPassword.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <View style={{paddingVertical: 20}}>
              {/* Button */}
              <AccountButton
                label="Reset Password"
                loading={loading}
                onPress={handleSubmit(onSubmit)}
              />
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default VerifyForgotmpinScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  overlay: {height: '100%', justifyContent: 'center', paddingHorizontal: 24},

  logoContainer: {alignItems: 'center', marginBottom: 15},
  logoCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    marginBottom: 25,
    marginTop: 10,
  },

  label: {
    color: '#fff',
    marginTop: 15,
    marginBottom: 3,
  },

  otpBox: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  pinBox: {
    width: 55,
    height: 55,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  activeBox: {
    borderColor: '#fff',
    borderWidth: 1,
  },
  pinText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  error: {
    color: '#FFD2D2',
    fontSize: 12,
    marginTop: 4,
  },

  resendWrap: {
    alignItems: 'center',
    marginVertical: 20,
  },
  timerText: {
    color: 'rgba(255,255,255,0.7)',
  },
  resendText: {
    color: '#fff',
    fontWeight: '600',
  },
});
