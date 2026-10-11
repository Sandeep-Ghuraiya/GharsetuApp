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
import {useDispatch} from 'react-redux';

import CommonInput from '../components/commonFields/CommonInput';

import CommonButton from '../components/common/CommonButton';
import {
  addAgentDetails,
  editAgentDetails,
} from '../Redux/Reducers/agentReducer';
import useAgentForm from '../hooks/useAgentForm';
import useMobileNoDetails from '../hooks/useMobileNoDetails';

export default function AddAgentForm({agentData, title}) {
  const dispatch = useDispatch();

  const {mobileNoData} = useMobileNoDetails();

  //STATE
  const [loading, setLoading] = useState(false);

  const nameParts = agentData?.agent_name?.split(' ') || [];

  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useAgentForm({
    firstName: firstName || '',
    lastName: lastName || '',
    phone: agentData?.agent_mobile_no || '',
  });

  const onSubmit = data => {
    setLoading(true);
    setTimeout(() => {
      const name = data.firstName + ' ' + data.lastName;

      if (title === 'Add') {
        const addAgent = JSON.stringify({
          owner_mobile_no: mobileNoData,
          action: 'associated_agent_store',
          agent_name: name,
          agent_mobile_no: data.phone,
        });
        dispatch(addAgentDetails(addAgent));
      } else {
        const editAgent = JSON.stringify({
          owner_mobile_no: mobileNoData,
          action: 'associated_agent_update',
          agent_id: agentData.id,
          agent_name: name,
          agent_mobile_no: data.phone,
        });
        dispatch(editAgentDetails(editAgent));
      }
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
                    label="Agent First Name"
                    value={value}
                    placeholder={'Enter agent first name'}
                    onChangeText={onChange}
                    error={errors.firstName?.message}
                    required={true}
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
                    label="Agent Last Name"
                    value={value}
                    placeholder={'Enter agent last name'}
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
                label="Agent Phone Number"
                keyboardType="number-pad"
                value={value}
                placeholder={'Enter agent phone number'}
                onChangeText={onChange}
                error={errors.phone?.message}
                required={true}
              />
            )}
          />

          <View>
            <CommonButton
              title={title === 'Add' ? 'Add Agent' : 'Update Agent'}
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
