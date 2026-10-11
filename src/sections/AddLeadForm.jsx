/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
// screens/AddLeadForm.js
import React, {useEffect, useState} from 'react';
import {
  View,
  Button,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Controller} from 'react-hook-form';
//Redux
import {useDispatch, useSelector} from 'react-redux';
import {userLeadAdd} from '../Redux/Reducers/leadReducer';
//Hooks
import useLeadForm from '../hooks/useLeadForm';
//Utils
import {
  getStateOptions,
  getDistrictOptions,
  getStatusOptions,
} from '../utils/dropdownUtils';
import {getSinglePincodeByStateDistrict} from '../utils/pincode';
//Components
import CommonDropdown from '../components/commonFields/CommonDropdown';
import CommonDatePicker from '../components/commonFields/CommonDatePicker';
import CommonTimePicker from '../components/commonFields/CommonTimePicker';
import CommonButton from '../components/common/CommonButton';
//import CommonRadioGroup from '../components/commonFields/RadioButton';
import CommonInput from '../components/commonFields/CommonInput';
import useMobileNoDetails from '../hooks/useMobileNoDetails';

export default function AddLeadForm(props) {
  const {propertiesList} = useSelector(state => state.propertiesData);

  const dispatch = useDispatch();

  const {mobileNoData} = useMobileNoDetails();

  //STATE
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(null);
  const [dropdownArray, setDropdownArray] = useState([]);

  useEffect(() => {
    if (propertiesList?.properties?.length > 0) {
      let dropdownList = propertiesList?.properties?.map(item => ({
        label: item.property_name,
        value: item.id,
      }));
      setDropdownArray(dropdownList);
    }
  }, [propertiesList]);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useLeadForm();

  const onSubmit = data => {
    setLoading(true);
    setTimeout(() => {
      const leadFormData = {
        action: 'lead_create',
        owner_mobile_no: mobileNoData,
        first_name: data.firstName,
        last_name: data.lastName,
        mobile_no: data.phone,
        email: data.email.toLowerCase(),
        comment: '',
        property_ids: [data.propertyName],
      };

      dispatch(userLeadAdd(leadFormData));

      setTimeout(() => {
        setLoading(false);
      }, 4000);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollLayout}>
          <View style={[styles.row]}>
            {/* Full Name */}
            <View style={[styles.half]}>
              <Controller
                control={control}
                name="firstName"
                render={({field: {onChange, value}}) => (
                  <CommonInput
                    label="Client First Name"
                    value={value}
                    placeholder={'Enter client first name'}
                    required={true}
                    onChangeText={onChange}
                    error={errors.firstName?.message}
                  />
                )}
              />
            </View>

            {/* Last Name */}
            <View style={[styles.half]}>
              <Controller
                control={control}
                name="lastName"
                render={({field: {onChange, value}}) => (
                  <CommonInput
                    label="Client Last Name"
                    value={value}
                    placeholder={'Enter client last name'}
                    required={false}
                    onChangeText={onChange}
                    error={errors.lastName?.message}
                  />
                )}
              />
            </View>
          </View>

          {/* Phone */}
          <Controller
            control={control}
            name="phone"
            render={({field: {onChange, value}}) => (
              <CommonInput
                label="Client Phone Number"
                keyboardType="number-pad"
                value={value}
                placeholder={'Enter client phone number'}
                required={true}
                onChangeText={onChange}
                error={errors.phone?.message}
              />
            )}
          />

          {/* Email */}
          <Controller
            control={control}
            name="email"
            render={({field: {onChange, value}}) => (
              <CommonInput
                label="Client Email"
                keyboardType="email-address"
                value={value}
                placeholder={'Enter client email address'}
                required={true}
                onChangeText={onChange}
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="propertyName"
            render={({field: {onChange, value}}) => (
              <CommonDropdown
                label="Property Name"
                placeholder={'Select property name'}
                required={true}
                data={dropdownArray}
                value={value}
                onChange={selectedValue => {
                  onChange(selectedValue);
                }}
                error={errors.propertyName?.message}
              />
            )}
          />

          {/* Status */}
          {/* <Controller
            control={control}
            name="status"
            render={({field: {onChange, value}}) => (
              <CommonDropdown
                label="Status"
                placeholder={'Select Status'}
                required={false}
                data={getStatusOptions(state)}
                value={value}
                onChange={selectedValue => {
                  onChange(selectedValue);
                  setStatus(selectedValue);
                }}
                error={
                  errors.pincode?.message ||
                  (pincodeError
                    ? 'Invalid pincode for selected state & district'
                    : null)
                }
              />
            )}
          /> */}

          <View>
            <CommonButton
              title="Submit Lead"
              loading={loading}
              onPress={handleSubmit(onSubmit)}
              width={'100%'}
              style={{paddingVertical: 15, marginTop: 5}}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollLayout: {paddingVertical: 20, paddingHorizontal: 10},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  half: {width: '49%'},
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#000',
  },
  textArea: {
    paddingTop: 10,
    textAlignVertical: 'top',
    paddingBottom: 10,
    height: 100,
  },
  picker: {
    height: 55,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  bottomSpace: {marginBottom: 15},
  error: {
    color: 'red',
    marginTop: 4,
  },
});
