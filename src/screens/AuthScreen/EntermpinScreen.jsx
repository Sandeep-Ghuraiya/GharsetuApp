/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
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
import {userEntermpin} from '../../Redux/Reducers/authReducer';
import useDeviceDetails from '../../hooks/useDeviceDetails';
import {showError, showSuccess} from '../../utils/flashMessage';
import useMobileNoDetails from '../../hooks/useMobileNoDetails';

/* ✅ VALIDATION SCHEMA */
const schema = yup.object({
  mpin: yup
    .string()
    .required('MPIN is required')
    .length(4, 'MPIN must be 4 digits'),
});

const EntermpinScreen = ({navigation}) => {
  const {entermpinData} = useSelector(state => state.agentDetails);

  const {deviceId, deviceToken} = useDeviceDetails();
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
    },
  });

  const onSubmit = data => {
    setLoading(true);
    Keyboard.dismiss();

    const payload = JSON.stringify({
      mobile_no: mobileNoData,
      action: 'login_mpin',
      mpin: data.mpin,
      device_id: 'exynos9611',
      device_token:
        'denZka1cRtSXLQa4utgp5c:APA91bH1X_GkBwZ1MrF2GKqiwtfsg13GUl2RNUY_KUI6Ze9PQnDefBkrXUzaKpj0xJC7k7_OcRbK7augteH0A2borDCZrT-rur-SmkcITj-EVzdNF1iSAdI',
    });
    // console.log('MPIN Payload:', payload);
    dispatch(userEntermpin(payload));
  };

  useEffect(() => {
    if (entermpinData?.status === 1) {
      setLoading(false);
      showSuccess({
        message: 'Login',
        description: entermpinData?.message,
      });
      navigation.replace('AppTab');
      reset();
      setOtpKey(prev => prev + 1); // ✅ force reset
    } else if (entermpinData?.status === 0) {
      showError({
        message: 'Error',
        description: entermpinData?.message,
        duration: 3000,
      });
      setLoading(false);
      reset();
      setOtpKey(prev => prev + 1); // ✅ force reset
    }
  }, [entermpinData]);

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

            <View style={{paddingHorizontal: 20}}>
              {/* Title */}
              <Text style={styles.title}>Enter MPIN</Text>
              <Text style={styles.subtitle}>
                Enter your 4-digit MPIN to continue
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
                      autoFocus={false}
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

              <TouchableOpacity
                style={styles.forgotBtn}
                onPress={() => navigation.navigate('Forgotpin')}>
                <Text style={styles.forgotText}>Forgot MPIN?</Text>
              </TouchableOpacity>
            </View>

            {/* Button */}
            <View style={{marginTop: 20, paddingHorizontal: 20}}>
              <AccountButton
                label="Enter MPIN"
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

export default EntermpinScreen;

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
  forgotBtn: {
    alignItems: 'flex-end',
  },
  forgotText: {
    fontWeight: '600',
  },
});
