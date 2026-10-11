/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
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
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import AccountButton from '../../components/custom/AccountButton';

import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {
  createUserAccount,
  resetNewAccount,
} from '../../Redux/Reducers/authReducer';
import useDeviceDetails from '../../hooks/useDeviceDetails';
import {Dropdown} from 'react-native-element-dropdown';
import {SelectColors} from '../../constant/Colors';
import {showError, showSuccess} from '../../utils/flashMessage';
import {getZipLocationList} from '../../Redux/Reducers/locationReducer';

/* ---------------- VALIDATION SCHEMA ---------------- */
const registerSchema = yup.object({
  firstName: yup.string().required('First name is required'),

  lastName: yup.string().required('Last name is required'),

  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),

  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Enter a valid 10-digit phone number')
    .required('Phone number is required'),

  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),

  city: yup.string().required('City is required'),

  state: yup.string().required('State is required'),

  pincode: yup
    .string()
    .matches(/^[0-9]{6}$/, 'Enter a valid 6-digit pincode')
    .required('Pincode is required'),

  roleType: yup
    .string()
    // .oneOf(['broker', 'seller'], 'Select a valid role')
    .required('Role type is required'),

  brokerCompany: yup.string().when('roleType', {
    is: 'Broker/Company',
    then: schema => schema.required('Broker Company is required'),
    otherwise: schema => schema.notRequired(),
  }),
});

const RegistrationScreen = props => {
  const {newAccountData} = useSelector(state => state.agentDetails);
  const {locationList} = useSelector(state => state.locationData);

  const {deviceId, deviceToken} = useDeviceDetails();

  const {navigation} = props;
  const [secure, setSecure] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [accountType, setAccountType] = useState(null);

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      city: '',
      state: '',
      pincode: '',
      roleType: '', // broker, seller
      brokerCompany: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (locationList?.length > 0) {
      setValue('state', locationList[0]?.state || '');
      setValue('city', locationList[0]?.city || '');
    }
  }, [locationList]);

  const onRegister = data => {
    Keyboard.dismiss();
    setLoading(true);

    const signup = JSON.stringify({
      action: 'signup',
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      mobile_no: data.phone,
      password: data.password,
      passconf: data.confirmPassword,
      zipcode: data.pincode,
      state: data.state,
      city: data.city,
      role_type: data.roleType, // broker, seller
      broker_company: data.brokerCompany,
      device_id: 'exynos9611',
      device_token:
        'denZka1cRtSXLQa4utgp5c:APA91bH1X_GkBwZ1MrF2GKqiwtfsg13GUl2RNUY_KUI6Ze9PQnDefBkrXUzaKpj0xJC7k7_OcRbK7augteH0A2borDCZrT-rur-SmkcITj-EVzdNF1iSAdI',
    });
    // console.log('data,',signup);

    dispatch(createUserAccount(signup));
  };

  useEffect(() => {
    if (newAccountData?.status === 1) {
      setLoading(false);
      showSuccess({
        message: 'Registration',
        description: newAccountData?.message,
      });
      navigation.replace('Login');
      dispatch(resetNewAccount());
    } else if (newAccountData?.status === 0) {
      showError({
        message: 'Error',
        description: newAccountData?.message || 'User already register',
        duration: 3000,
      });
      setLoading(false);
      dispatch(resetNewAccount());
      reset();
    }
  }, [newAccountData]);

  return (
    <ImageBackground
      source={require('../../assets/images/gradient_1.png')}
      style={styles.container}
      resizeMode="cover">
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <SafeAreaView style={styles.overlay}>
          <ScrollView>
            <View>
              {/* Logo */}
              <View style={styles.logoContainer}>
                <View style={styles.logoCircle}>
                  <Ionicons name="key-outline" size={30} color="#fff" />
                </View>
              </View>

              <Text style={styles.title}>Create Your Account</Text>
              <Text style={styles.subtitle}>
                Set up your account in seconds
              </Text>

              <View style={{paddingHorizontal: 25}}>
                {/* FirstName */}
                <Controller
                  control={control}
                  name="firstName"
                  render={({field: {onChange, value}}) => (
                    <>
                      <View style={styles.inputBox}>
                        <Ionicons name="person" size={20} color="#fff" />
                        <TextInput
                          value={value}
                          onChangeText={onChange}
                          placeholder="Enter First Name"
                          placeholderTextColor="#fff"
                          style={styles.input}
                        />
                      </View>
                      {errors.firstName && (
                        <Text style={styles.errorText}>
                          {errors.firstName.message}
                        </Text>
                      )}
                    </>
                  )}
                />
                {/* Lastname */}
                <Controller
                  control={control}
                  name="lastName"
                  render={({field: {onChange, value}}) => (
                    <>
                      <View style={styles.inputBox}>
                        <Ionicons name="person" size={20} color="#fff" />
                        <TextInput
                          value={value}
                          onChangeText={onChange}
                          placeholder="Enter Last Name"
                          placeholderTextColor="#fff"
                          style={styles.input}
                        />
                      </View>
                      {errors.lastName && (
                        <Text style={styles.errorText}>
                          {errors.lastName.message}
                        </Text>
                      )}
                    </>
                  )}
                />

                {/* Phone */}
                <Controller
                  control={control}
                  name="phone"
                  render={({field: {onChange, value}}) => (
                    <>
                      <View style={styles.inputBox}>
                        <Ionicons name="call-sharp" size={20} color="#fff" />
                        <TextInput
                          value={value}
                          onChangeText={onChange}
                          placeholder="Enter Phone Number"
                          keyboardType="phone-pad"
                          placeholderTextColor="#fff"
                          style={styles.input}
                        />
                      </View>
                      {errors.phone && (
                        <Text style={styles.errorText}>
                          {errors.phone.message}
                        </Text>
                      )}
                    </>
                  )}
                />
                {/* Email */}
                <Controller
                  control={control}
                  name="email"
                  render={({field: {onChange, value}}) => (
                    <>
                      <View style={styles.inputBox}>
                        <Ionicons name="mail-outline" size={20} color="#fff" />
                        <TextInput
                          value={value}
                          onChangeText={onChange}
                          placeholder="Email"
                          keyboardType="email-address"
                          autoCapitalize="none"
                          placeholderTextColor="#fff"
                          style={styles.input}
                        />
                      </View>
                      {errors.email && (
                        <Text style={styles.errorText}>
                          {errors.email.message}
                        </Text>
                      )}
                    </>
                  )}
                />

                {/* Password */}
                <Controller
                  control={control}
                  name="password"
                  render={({field: {onChange, value}}) => (
                    <>
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
                          placeholderTextColor="#fff"
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
                    </>
                  )}
                />

                {/* Confirm Password */}
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({field: {onChange, value}}) => (
                    <>
                      <View style={styles.inputBox}>
                        <Ionicons
                          name="lock-closed-outline"
                          size={20}
                          color="#fff"
                        />
                        <TextInput
                          value={value}
                          onChangeText={onChange}
                          placeholder="Enter Confirm Password"
                          secureTextEntry={secureConfirm}
                          placeholderTextColor="#fff"
                          style={styles.input}
                        />
                        <TouchableOpacity
                          onPress={() => setSecureConfirm(!secureConfirm)}>
                          <Ionicons
                            name={
                              secureConfirm ? 'eye-outline' : 'eye-off-outline'
                            }
                            size={20}
                            color="#fff"
                          />
                        </TouchableOpacity>
                      </View>
                      {errors.confirmPassword && (
                        <Text style={styles.errorText}>
                          {errors.confirmPassword.message}
                        </Text>
                      )}
                    </>
                  )}
                />

                {/* pincode */}
                <Controller
                  control={control}
                  name="pincode"
                  render={({field: {onChange, value}}) => (
                    <>
                      <View style={styles.inputBox}>
                        <Ionicons
                          name="location-outline"
                          size={20}
                          color="#fff"
                        />
                        <TextInput
                          value={value}
                          onChangeText={value => {
                            onChange(value);
                            const action = JSON.stringify({
                              action: 'resolve_pincode',
                              pincode: value,
                            });
                            dispatch(getZipLocationList(action));
                          }}
                          placeholder="Pincode"
                          keyboardType="number-pad"
                          placeholderTextColor="#fff"
                          style={styles.input}
                        />
                      </View>
                      {errors.pincode && (
                        <Text style={styles.errorText}>
                          {errors.pincode.message}
                        </Text>
                      )}
                    </>
                  )}
                />

                {/* state */}
                <Controller
                  control={control}
                  name="state"
                  render={({field: {onChange, value}}) => (
                    <>
                      <View style={styles.inputBox}>
                        <Ionicons
                          name="location-outline"
                          size={20}
                          color="#fff"
                        />
                        <TextInput
                          value={value}
                          onChangeText={onChange}
                          placeholder="State"
                          placeholderTextColor="#fff"
                          style={styles.input}
                        />
                      </View>
                      {errors.state && (
                        <Text style={styles.errorText}>
                          {errors.state.message}
                        </Text>
                      )}
                    </>
                  )}
                />

                {/* city */}
                <Controller
                  control={control}
                  name="city"
                  render={({field: {onChange, value}}) => (
                    <>
                      <View style={styles.inputBox}>
                        <Ionicons
                          name="location-outline"
                          size={20}
                          color="#fff"
                        />
                        <TextInput
                          value={value}
                          onChangeText={onChange}
                          placeholder="City"
                          placeholderTextColor="#fff"
                          style={styles.input}
                        />
                      </View>
                      {errors.city && (
                        <Text style={styles.errorText}>
                          {errors.city.message}
                        </Text>
                      )}
                    </>
                  )}
                />

                <Controller
                  control={control}
                  name="roleType"
                  render={({field: {onChange, value}}) => (
                    <>
                      <View style={styles.inputBox}>
                        <Ionicons
                          name="person-outline"
                          size={20}
                          color="#fff"
                        />

                        <Dropdown
                          style={styles.dropdown}
                          containerStyle={{backgroundColor: '#c583fe'}}
                          data={[
                            {label: 'Broker/Company', value: 'Broker/Company'},
                            {
                              label: 'Owner/Individual',
                              value: 'Owner/Individual',
                            },
                          ]}
                          labelField="label"
                          valueField="value"
                          placeholder="Select Account type"
                          placeholderStyle={{color: '#fff'}}
                          selectedTextStyle={{color: '#fff'}}
                          itemTextStyle={{color: '#fff'}}
                          itemContainerStyle={{backgroundColor: '#c583fe'}}
                          // activeColor={SelectColors.accentBlueColor}
                          activeColor="rgba(255,255,255,0.2)"
                          value={value}
                          onChange={item => {
                            onChange(item.value);
                            setAccountType(item.value);
                          }}
                        />
                      </View>

                      {errors.roleType && (
                        <Text style={styles.errorText}>
                          {errors.roleType.message}
                        </Text>
                      )}
                    </>
                  )}
                />

                {accountType === 'Broker/Company' && (
                  <Controller
                    control={control}
                    name="brokerCompany"
                    render={({field: {onChange, value}}) => (
                      <>
                        <View style={styles.inputBox}>
                          <Ionicons
                            name="business-outline" // 👈 changed icon
                            size={20}
                            color="#fff"
                          />
                          <TextInput
                            value={value}
                            onChangeText={onChange}
                            placeholder="Company Name"
                            placeholderTextColor="#fff"
                            style={styles.input}
                          />
                        </View>
                        {errors.brokerCompany && (
                          <Text style={styles.errorText}>
                            {errors.brokerCompany.message}
                          </Text>
                        )}
                      </>
                    )}
                  />
                )}
              </View>

              {/* Button */}
              <View style={{paddingHorizontal: 20, marginTop: 20}}>
                <AccountButton
                  loading={loading}
                  label={'Create Account'}
                  onPress={handleSubmit(onRegister)}
                  disabled={!isValid || loading}
                />
              </View>

              {/* Footer */}
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.footerText}>
                  Already have an account?{' '}
                  <Text style={styles.signup}>Login</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default RegistrationScreen;

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  overlay: {
    height: '100%',
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 50,
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
    // marginBottom: 18,
    marginTop: 18,
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
    // marginBottom: 10,
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
    marginBottom: 40,
  },

  signup: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  dropdown: {
    flex: 1,
    marginLeft: 10,
  },
});
