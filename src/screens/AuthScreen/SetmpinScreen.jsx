/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable curly */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
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
import {userSetmpin} from '../../Redux/Reducers/authReducer';
import {showError, showSuccess} from '../../utils/flashMessage';
import useLoginData from '../../hooks/useLoginData';
import useMobileNoDetails from '../../hooks/useMobileNoDetails';

/* ✅ VALIDATION SCHEMA */
const schema = yup.object({
  mpin: yup
    .string()
    .required('MPIN is required')
    .length(4, 'MPIN must be 4 digits'),

  // confirmMpin: yup
  //     .string()
  //     .oneOf([yup.ref('mpin')], 'MPIN does not match')
  //     .required('Confirm MPIN is required'),
  confirmMpin: yup
    .string()
    .required('Confirm MPIN is required') // ✅ FIRST
    .test('match', 'MPIN does not match', function (value) {
      const {mpin} = this.parent;

      // ✅ If empty → let "required" handle it
      if (!value) return true;

      // ✅ If filled → check match
      return value === mpin;
    }),
});

const SetmpinScreen = ({navigation}) => {
  const {setmpinData} = useSelector(state => state.agentDetails);

  const {mobileNoData} = useMobileNoDetails();

  const [loading, setLoading] = useState(false);
  const [otpKey, setOtpKey] = useState(0);

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      mpin: '',
      confirmMpin: '',
    },
  });

  const onSubmit = data => {
    setLoading(true);
    Keyboard.dismiss();

    const payload = JSON.stringify({
      mobile_no: mobileNoData,
      action: 'set_mpin',
      mpin: data.mpin,
    });
    console.log('MPIN Payload:', payload);
    dispatch(userSetmpin(payload));
  };

  useEffect(() => {
    if (setmpinData?.status === 1) {
      setLoading(false);
      showSuccess({
        message: 'Success',
        description: setmpinData?.message,
      });
      reset();
      setOtpKey(prev => prev + 1); // ✅ force reset

      navigation.navigate('Enterpin');
    } else if (setmpinData?.status === 0) {
      showError({
        message: 'Error',
        description: setmpinData?.message,
        duration: 3000,
      });
      setLoading(false);
      reset();
      setOtpKey(prev => prev + 1); // ✅ force reset
    }
  }, [setmpinData]);

  return (
    <ImageBackground
      source={require('../../assets/images/gradient_1.png')}
      style={styles.container}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <SafeAreaView style={styles.overlay}>
          <View>
            {/* 🔐 Icon */}
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Ionicons name="lock-closed-outline" size={28} color="#000" />
              </View>
            </View>

            <View style={{paddingHorizontal: 15}}>
              {/* Title */}
              <Text style={styles.title}>Set Your MPIN</Text>
              <Text style={styles.subtitle}>
                Create a secure 4-digit MPIN for quick access
              </Text>

              {/* MPIN */}
              <Controller
                control={control}
                name="mpin"
                render={({field: {onChange, value}}) => (
                  <View style={{marginBottom: 15}}>
                    <Text style={styles.label}>Enter MPIN</Text>
                    <OtpInput
                      key={otpKey}
                      numberOfDigits={4}
                      secureTextEntry
                      value={value}
                      onTextChange={onChange}
                      focusColor="#fff"
                      theme={{
                        pinCodeContainerStyle: styles.pinBox,
                        pinCodeTextStyle: styles.pinText,
                        focusedPinCodeContainerStyle: styles.activePinBox,
                      }}
                    />
                    {errors.mpin && (
                      <Text style={styles.errorText}>
                        {errors.mpin.message}
                      </Text>
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
                      onTextChange={onChange}
                      focusColor="#fff"
                      autoFocus={false}
                      theme={{
                        pinCodeContainerStyle: styles.pinBox,
                        pinCodeTextStyle: styles.pinText,
                        focusedPinCodeContainerStyle: styles.activePinBox,
                      }}
                    />
                    {errors.confirmMpin && (
                      <Text style={styles.errorText}>
                        {errors.confirmMpin.message}
                      </Text>
                    )}
                  </View>
                )}
              />
            </View>

            {/* Button */}
            <View style={{marginTop: 20, paddingHorizontal: 15}}>
              <AccountButton
                label="Set MPIN"
                loading={loading}
                onPress={handleSubmit(onSubmit)}
                disabled={loading}
              />
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default SetmpinScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  overlay: {
    height: '100%',
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
    marginBottom: 35,
  },

  label: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 2,
    marginTop: 10,
  },

  pinBox: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },

  activePinBox: {
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },

  pinText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },

  errorText: {
    color: '#FFD2D2',
    marginTop: 2,
    fontSize: 13,
  },
});
