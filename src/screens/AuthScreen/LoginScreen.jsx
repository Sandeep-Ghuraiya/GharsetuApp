/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useEffect} from 'react';
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
import AccountButton from '../../components/custom/AccountButton';

import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import {useDispatch, useSelector} from 'react-redux';
import {userLoginDetails} from '../../Redux/Reducers/authReducer';
import {showError, showSuccess} from '../../utils/flashMessage';
import useDeviceDetails from '../../hooks/useDeviceDetails';

/* ---------------- VALIDATION SCHEMA ---------------- */
const loginSchema = yup.object({
  mobileNo: yup.string().required('Mobile no. is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginScreen = props => {
  const {loginData} = useSelector(state => state.agentDetails);

  // console.log('ll',loginData);

  const {navigation} = props;

  const {deviceId, deviceToken} = useDeviceDetails();

  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const onLogin = data => {
    Keyboard.dismiss();
    setLoading(true);
    const login = JSON.stringify({
      action: 'login',
      mobile_no: data.mobileNo,
      password: data.password,
      device_id: 'exynos9611',
      device_token:
        'denZka1cRtSXLQa4utgp5c:APA91bH1X_GkBwZ1MrF2GKqiwtfsg13GUl2RNUY_KUI6Ze9PQnDefBkrXUzaKpj0xJC7k7_OcRbK7augteH0A2borDCZrT-rur-SmkcITj-EVzdNF1iSAdI',
    });

    dispatch(userLoginDetails(login));
  };

  useEffect(() => {
    if (loginData?.status === 1) {
      setLoading(false);
      console.log('log', loginData.status);
      showSuccess({
        message: 'Login',
        description: loginData?.message,
      });
      reset();
      if (loginData?.data?.mpin) {
        navigation.navigate('Enterpin');
      } else {
        navigation.navigate('Setpin');
      }
    } else if (loginData?.status === 0) {
      showError({
        message: 'Error',
        description: loginData?.message,
        duration: 3000,
      });
      setLoading(false);
      reset();
    }
  }, [loginData]);

  return (
    <ImageBackground
      source={require('../../assets/images/gradient_1.png')}
      style={styles.container}
      resizeMode="cover">
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <SafeAreaView style={styles.overlay}>
          <View>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Ionicons name="key-outline" size={30} color="#000" />
              </View>
            </View>

            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Login to your account</Text>

            <View style={{paddingHorizontal: 25}}>
              {/* Email */}
              <Controller
                control={control}
                name="mobileNo"
                render={({field: {onChange, value}}) => (
                  <View style={{marginBottom: 15}}>
                    <View style={styles.inputBox}>
                      <MaterialDesignIcons
                        name="phone"
                        size={20}
                        color="#fff"
                      />
                      <TextInput
                        value={value}
                        onChangeText={onChange}
                        placeholder="Mobile No."
                        keyboardType="decimal-pad"
                        // autoCapitalize="none"
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

              {/* Password */}
              <Controller
                control={control}
                name="password"
                render={({field: {onChange, value}}) => (
                  <View style={{marginBottom: 15}}>
                    <View style={styles.inputBox}>
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color="#fff"
                      />
                      <TextInput
                        value={value}
                        onChangeText={onChange}
                        placeholder="Password"
                        secureTextEntry={secure}
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        style={styles.input}
                      />
                      <TouchableOpacity onPress={() => setSecure(!secure)}>
                        <Ionicons
                          name={secure ? 'eye-outline' : 'eye-off-outline'}
                          size={20}
                          color="#fff"
                        />
                      </TouchableOpacity>
                    </View>
                    {errors.password && (
                      <Text style={styles.errorText}>
                        {errors.password.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              {/* Forgot */}
              <TouchableOpacity
                style={{alignSelf: 'flex-end', marginBottom: 20}}
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgot}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            {/* Button */}
            <View style={{paddingHorizontal: 20}}>
              <AccountButton
                loading={loading}
                label={'Log In'}
                onPress={handleSubmit(onLogin)}
                disabled={!isValid || loading}
              />
            </View>

            {/* Footer */}
            <TouchableOpacity
              onPress={() => navigation.navigate('Registration')}>
              <Text style={styles.footerText}>
                Don’t have an account?{' '}
                <Text style={styles.signup}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default LoginScreen;

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
});
