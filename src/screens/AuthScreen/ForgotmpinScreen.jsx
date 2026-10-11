/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';

import {Ionicons} from '@react-native-vector-icons/ionicons';
import AccountButton from '../../components/custom/AccountButton';

import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import useDeviceDetails from '../../hooks/useDeviceDetails';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import useLoginData from '../../hooks/useLoginData';
import useMobileNoDetails from '../../hooks/useMobileNoDetails';
import {
  forgotMpinRequest,
  resetForgotmpin,
} from '../../Redux/Reducers/authReducer';
import {showError, showSuccess} from '../../utils/flashMessage';

/* ✅ VALIDATION SCHEMA */
const schema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Enter a valid email'),
});

const ForgotMpinScreen = ({navigation}) => {
  const {forgotmpinData} = useSelector(state => state.agentDetails);

  const {userDetails} = useLoginData();
  const {mobileNoData} = useMobileNoDetails();

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // console.log('login',userDetails.data.email);

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  /* ✅ Set email after data loads */
  useEffect(() => {
    if (userDetails?.data?.email) {
      setValue('email', userDetails.data.email);
    }
  }, [userDetails]);

  const onSubmit = data => {
    Keyboard.dismiss();
    setLoading(true);

    const payload = JSON.stringify({
      mobile_no: mobileNoData,
      action: 'reset_mpin',
    });

    console.log('Forgot MPIN Payload:', payload);
    dispatch(forgotMpinRequest(payload));
  };

  useEffect(() => {
    if (forgotmpinData?.status === 1) {
      setLoading(false);
      showSuccess({
        message: 'Success',
        description: forgotmpinData?.message,
      });
      setTimeout(() => {
        navigation.navigate('Verifyforgotpin');
        dispatch(resetForgotmpin());
      }, 2000);
    } else if (forgotmpinData?.status === 0) {
      showError({
        message: 'Error',
        description: forgotmpinData?.message,
        duration: 3000,
      });
      setLoading(false);
      setTimeout(() => {
        dispatch(resetForgotmpin());
      }, 2000);
    }
  }, [forgotmpinData]);

  return (
    <ImageBackground
      source={require('../../assets/images/gradient_1.png')}
      style={styles.container}>
      <SafeAreaView style={styles.overlay}>
        <View>
          {/* 🔐 Icon */}
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Ionicons name="key-outline" size={28} color="#000" />
            </View>
          </View>

          <View style={{paddingHorizontal: 15}}>
            {/* Title */}
            <Text style={styles.title}>Forgot MPIN?</Text>
            <Text style={styles.subtitle}>
              Don’t worry! We’ll send an OTP to your registered email to reset
              your MPIN.
            </Text>

            {/* Email Input */}
            <Controller
              control={control}
              name="email"
              render={({field: {onChange, value}}) => (
                <View style={{marginBottom: 15}}>
                  <View style={styles.inputBox}>
                    <Ionicons name="mail-outline" size={20} color="#fff" />
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      placeholder="Email"
                      keyboardType="email-address"
                      placeholderTextColor="rgba(255,255,255,0.7)"
                      style={styles.input}
                      editable={false}
                    />
                  </View>

                  {errors.email && (
                    <Text style={styles.errorText}>{errors.email.message}</Text>
                  )}
                </View>
              )}
            />

            {/* Back to Login */}
            {/* <TouchableOpacity
                            style={styles.forgotBtn}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles.forgotText}>Back to Login</Text>
                        </TouchableOpacity> */}
          </View>

          {/* Button */}
          <View style={{marginTop: 10, paddingHorizontal: 15}}>
            <AccountButton
              label="Send"
              loading={loading}
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid || loading}
            />
          </View>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.footerText}>
              Back to <Text style={styles.signup}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ForgotMpinScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 15,
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
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginTop: 15,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
    marginTop: 10,
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
  color: '#fff',
  errorText: {
    color: '#FFD2D2',
    marginTop: 5,
    fontSize: 13,
  },
  forgotBtn: {
    alignItems: 'flex-end',
    marginTop: 5,
  },
  forgotText: {
    fontWeight: '600',
    color: '#fff',
  },
  // footerBtn:{
  //     flexDirection:'row',
  //     alignItems:"center"
  // },
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
});
