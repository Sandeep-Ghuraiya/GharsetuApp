/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
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
  resetForgotmpin,
  resetVerifyForgotmpin,
  verifyForgotMpinRequest,
} from '../../Redux/Reducers/authReducer';
import {showError, showSuccess} from '../../utils/flashMessage';
import useMobileNoDetails from '../../hooks/useMobileNoDetails';

/* ✅ VALIDATION */
const schema = yup.object({
  otp: yup.string().required('OTP is required').length(6, 'Enter valid OTP'),
  mpin: yup
    .string()
    .required('MPIN required')
    .length(4, 'MPIN must be 4 digits'),
  confirmMpin: yup
    .string()
    .oneOf([yup.ref('mpin')], 'MPIN does not match')
    .required('Confirm MPIN'),
});

const VerifyForgotmpinScreen = ({navigation}) => {
  const {verifyForgotmpinData, forgotmpinData} = useSelector(
    state => state.agentDetails,
  );

  const {mobileNoData} = useMobileNoDetails();

  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [otpKey, setOtpKey] = useState(0);

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      otp: '',
      mpin: '',
      confirmMpin: '',
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
    if (verifyForgotmpinData?.status === 1) {
      setLoading(false);
      showSuccess({
        message: 'Success',
        description: verifyForgotmpinData?.message,
      });
      setTimeout(() => {
        dispatch(resetVerifyForgotmpin());
        navigation.navigate('Enterpin');
      }, 2000);
      reset();
      setOtpKey(prev => prev + 1);
    } else if (verifyForgotmpinData?.status === 0) {
      showError({
        message: 'Error',
        description: verifyForgotmpinData?.message,
        duration: 3000,
      });
      setTimeout(() => {
        dispatch(resetVerifyForgotmpin());
      }, 2000);
      setLoading(false);
      reset();
      setOtpKey(prev => prev + 1);
    }
  }, [verifyForgotmpinData]);

  useEffect(() => {
    if (forgotmpinData?.status === 1) {
      showSuccess({
        message: 'Success',
        description: forgotmpinData?.message,
      });
      setTimeout(() => {
        dispatch(resetForgotmpin());
      }, 2000);
    } else if (forgotmpinData?.status === 0) {
      showError({
        message: 'Error',
        description: forgotmpinData?.message,
        duration: 3000,
      });
      setTimeout(() => {
        dispatch(resetForgotmpin());
      }, 2000);
    }
  }, [forgotmpinData]);

  const onSubmit = data => {
    Keyboard.dismiss();
    setLoading(true);

    const payload = JSON.stringify({
      mobile_no: mobileNoData,
      action: 'verify_reset_mpin',
      otp: data.otp,
      new_mpin: data.mpin,
    });

    console.log('RESET MPIN:', payload);

    dispatch(verifyForgotMpinRequest(payload));
  };

  const handleResendOtp = () => {
    setTimer(30);
    const payload = JSON.stringify({
      mobile_no: mobileNoData,
      action: 'reset_mpin',
    });

    console.log('Forgot MPIN Payload:', payload);
    dispatch(forgotMpinRequest(payload));
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
            <Text style={styles.title}>Reset MPIN</Text>
            <Text style={styles.subtitle}>
              Enter OTP and create your new MPIN
            </Text>

            {/* OTP */}
            <Controller
              control={control}
              name="otp"
              render={({field: {onChange, value}}) => (
                <View style={{marginBottom: 15}}>
                  <Text style={styles.label}>Enter OTP</Text>
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
                  {errors.otp && (
                    <Text style={styles.error}>{errors.otp.message}</Text>
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
              name="mpin"
              render={({field: {onChange, value}}) => (
                <View style={{marginBottom: 15}}>
                  <Text style={styles.label}>New MPIN</Text>
                  <OtpInput
                    key={otpKey}
                    numberOfDigits={4}
                    autoFocus={false}
                    focusColor="#fff"
                    secureTextEntry
                    value={value}
                    onTextChange={onChange}
                    theme={{
                      pinCodeContainerStyle: styles.pinBox,
                      pinCodeTextStyle: styles.pinText,
                      focusedPinCodeContainerStyle: styles.activeBox,
                    }}
                  />
                  {errors.mpin && (
                    <Text style={styles.error}>{errors.mpin.message}</Text>
                  )}
                </View>
              )}
            />

            {/* Confirm MPIN */}
            <Controller
              control={control}
              name="confirmMpin"
              render={({field: {onChange, value}}) => (
                <View style={{marginBottom: 15}}>
                  <Text style={styles.label}>Confirm MPIN</Text>
                  <OtpInput
                    key={otpKey}
                    numberOfDigits={4}
                    secureTextEntry
                    value={value}
                    autoFocus={false}
                    focusColor="#fff"
                    onTextChange={onChange}
                    theme={{
                      pinCodeContainerStyle: styles.pinBox,
                      pinCodeTextStyle: styles.pinText,
                      focusedPinCodeContainerStyle: styles.activeBox,
                    }}
                  />
                  {errors.confirmMpin && (
                    <Text style={styles.error}>
                      {errors.confirmMpin.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <View style={{paddingVertical: 20}}>
              {/* Button */}
              <AccountButton
                label="Reset MPIN"
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
