/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';

import {Ionicons} from '@react-native-vector-icons/ionicons';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import AccountButton from '../../components/custom/AccountButton';

import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {
  forgotPasswordDetails,
  resetforgotPasswordState,
} from '../../Redux/Reducers/authReducer';
import {showError, showSuccess} from '../../utils/flashMessage';
import useDeviceDetails from '../../hooks/useDeviceDetails';

/* ---------------- VALIDATION ---------------- */
const schema = yup.object({
  mobileNo: yup
    .string()
    .required('Mobile number is required')
    .min(10, 'Enter valid mobile number'),
});

const ForgotPasswordScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const {forgotPasswordData} = useSelector(state => state.agentDetails);

  const {deviceId, deviceToken} = useDeviceDetails();

  const dispatch = useDispatch();

  const [mobileNo, setMobileNo] = useState(null);

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  console.log('ss', forgotPasswordData);

  useEffect(() => {
    if (forgotPasswordData?.status === 1) {
      setLoading(false);
      console.log('log', forgotPasswordData.status);
      showSuccess({
        message: 'Success',
        description: forgotPasswordData?.message,
      });
      setTimeout(() => {
        navigation.navigate('ResetPassword', {mobileNo: mobileNo});
        dispatch(resetforgotPasswordState());
      }, 2000);
      reset();
    } else if (forgotPasswordData?.status === 0) {
      showError({
        message: 'Error',
        description: forgotPasswordData?.message,
        duration: 3000,
      });
      setLoading(false);
      setTimeout(() => {
        dispatch(resetforgotPasswordState());
      }, 2000);
      reset();
    }
  }, [forgotPasswordData]);

  const onSendOtp = data => {
    Keyboard.dismiss();
    setLoading(true);

    const payload = JSON.stringify({
      mobile_no: data.mobileNo,
      action: 'forgot_password',
      device_id: deviceId,
      device_token: deviceToken,
    });

    console.log('Send OTP:', payload);
    // navigation.navigate('ResetPassword',{mobileNo:mobileNo})

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
          <View>
            {/* Icon */}
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Ionicons name="key-outline" size={30} color="#000" />
              </View>
            </View>

            {/* Title */}
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.subtitle}>
              Enter your mobile number to receive OTP
            </Text>

            <View style={{paddingHorizontal: 20, marginBottom: 15}}>
              {/* Mobile Input */}
              <Controller
                control={control}
                name="mobileNo"
                render={({field: {onChange, value}}) => (
                  <View style={{}}>
                    <View style={styles.inputBox}>
                      <MaterialDesignIcons
                        name="phone"
                        size={20}
                        color="#fff"
                      />
                      <TextInput
                        value={value}
                        onChangeText={text => {
                          onChange(text);
                          setMobileNo(text);
                        }}
                        placeholder="Mobile Number"
                        keyboardType="number-pad"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        style={styles.input}
                      />
                    </View>

                    {errors.mobileNo && (
                      <Text style={styles.errorText}>
                        {errors.mobileNo.message}
                      </Text>
                    )}
                  </View>
                )}
              />
            </View>

            {/* Button */}
            <View style={{paddingHorizontal: 20}}>
              <AccountButton
                label="Send OTP"
                loading={loading}
                onPress={handleSubmit(onSendOtp)}
                disabled={!isValid || loading}
              />
            </View>

            {/* Back to Login */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.footerText}>
                Back to <Text style={styles.signup}>Login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default ForgotPasswordScreen;

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  overlay: {
    height: '100%',
    justifyContent: 'center',
  },

  logoContainer: {
    alignItems: 'center',
  },

  logoCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginTop: 30,
  },

  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 40,
  },

  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.20)',
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 56,
  },

  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },

  errorText: {
    color: '#FFD2D2',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 10,
  },

  forgot: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },

  loginButton: {
    height: 56,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  footerText: {
    marginTop: 10,
    textAlign: 'center',
    color: 'rgba(255,255,255,0.85)',
  },

  signup: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  orText: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 10,
  },
});
