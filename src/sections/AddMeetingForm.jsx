/* eslint-disable curly */
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
import CommonTimePicker from '../components/commonFields/CommonTimePicker';
import CommonDatePicker from '../components/commonFields/CommonDatePicker';
import {
  addMeetingDetails,
  editMeetingDetails,
} from '../Redux/Reducers/meetingReducer';
import useMeetingForm from '../hooks/useMeetingForm';
import useMobileNoDetails from '../hooks/useMobileNoDetails';

export default function AddMeetingForm({meetingData, title}) {
  const dispatch = useDispatch();

  const {mobileNoData} = useMobileNoDetails();

  //STATE
  const [loading, setLoading] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const nameParts = meetingData?.meeting_with?.split(' ') || [];

  const firstName = nameParts[0] || '';
  const lastName = nameParts[1] || '';

  const formattedDate = dateStr => {
    if (!dateStr) return;
    const [year, month, day] = dateStr?.split('-');
    return `${day}-${month}-${year}`;
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useMeetingForm({
    firstName: firstName || '',
    lastName: lastName || '',
    mobileNo: meetingData?.contact_number || '',
    meetingTitle: meetingData?.meeting_title || '',
    meetingLocation: meetingData?.meeting_location || '',
    meetingDate: formattedDate(meetingData?.meeting_date) || '',
    meetingTime: meetingData?.meeting_time || '',
    meetingComment: meetingData?.meeting_comment || '',
  });

  const onSubmit = data => {
    setLoading(true);
    console.log('meetingData:', data);

    setTimeout(() => {
      const name = data.firstName + ' ' + data.lastName;

      const formatDate = dateStr => {
        const [day, month, year] = dateStr.split('-');
        return `${year}-${month}-${day}`;
      };

      if (title === 'Add') {
        const addMeetings = JSON.stringify({
          owner_mobile_no: mobileNoData,
          action: 'meetings_add',
          meeting_title: data.meetingTitle,
          meeting_with: name,
          contact_number: data.mobileNo,
          meeting_location: data.meetingLocation,
          meeting_date: formatDate(data.meetingDate),
          meeting_time: data.meetingTime,
          meeting_comment: data.meetingComment,
        });
        dispatch(addMeetingDetails(addMeetings));
      } else {
        const addMeetings = JSON.stringify({
          owner_mobile_no: mobileNoData,
          meeting_id: meetingData.id,
          action: 'meetings_update',
          meeting_title: data.meetingTitle,
          meeting_with: name,
          contact_number: data.mobileNo,
          meeting_location: data.meetingLocation,
          meeting_date: formatDate(data.meetingDate),
          meeting_time: data.meetingTime,
          meeting_comment: data.meetingComment,
        });
        dispatch(editMeetingDetails(addMeetings));
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
                    label="First Name"
                    value={value}
                    placeholder={'Enter first name'}
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
                    label="Last Name"
                    value={value}
                    placeholder={'Enter last name'}
                    onChangeText={onChange}
                    error={errors.lastName?.message}
                  />
                )}
              />
            </View>
          </View>

          <Controller
            control={control}
            name="mobileNo"
            render={({field: {onChange, value}}) => (
              <CommonInput
                label="Meeting Mobile No."
                keyboardType="number-pad"
                value={value}
                placeholder={'Enter mobile no.'}
                onChangeText={onChange}
                error={errors.mobileNo?.message}
                required={true}
              />
            )}
          />

          <Controller
            control={control}
            name="meetingTitle"
            render={({field: {onChange, value}}) => (
              <CommonInput
                label="Meeting Title"
                value={value}
                placeholder={'Enter meeting title'}
                onChangeText={onChange}
                error={errors.meetingTitle?.message}
                required={true}
              />
            )}
          />

          {/* Phone */}
          <Controller
            control={control}
            name="meetingLocation"
            render={({field: {onChange, value}}) => (
              <CommonInput
                label="Meeting Location"
                value={value}
                placeholder={'Enter meeting location'}
                onChangeText={onChange}
                error={errors.meetingLocation?.message}
                required={true}
              />
            )}
          />

          <View style={[styles.row]}>
            <View style={[styles.half]}>
              <Controller
                control={control}
                name="meetingDate"
                render={({field: {onChange, value}, fieldState: {error}}) => (
                  <>
                    <View style={[styles.bottomSpace]}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.label}>Select Meeting Date </Text>
                        <Text style={{color: 'red', marginLeft: 4}}>*</Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => setShowDate(true)}
                        style={[
                          styles.picker,
                          {borderColor: error ? 'red' : '#555'},
                        ]}>
                        {value ? (
                          <Text style={{fontSize: 14, color: '#000'}}>
                            {value}
                          </Text>
                        ) : (
                          <Text style={{fontSize: 14, color: '#777'}}>
                            Enter Meeting Date
                          </Text>
                        )}
                      </TouchableOpacity>

                      {error && (
                        <Text style={[styles.error]}>{error.message}</Text>
                      )}
                    </View>

                    <CommonDatePicker
                      visible={showDate}
                      selectedDate={date}
                      onSelectDate={selectedDate => {
                        onChange(selectedDate);
                        setDate(selectedDate);
                      }}
                      onClose={() => setShowDate(false)}
                    />
                  </>
                )}
              />
            </View>

            <View style={[styles.half]}>
              <Controller
                control={control}
                name="meetingTime"
                render={({field: {onChange, value}, fieldState: {error}}) => (
                  <>
                    <View style={[styles.bottomSpace]}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.label}>Select Meeting Time</Text>
                        <Text style={{color: 'red', marginLeft: 4}}>*</Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => setShowTime(true)}
                        style={[
                          styles.picker,
                          {borderColor: error ? 'red' : '#555'},
                        ]}>
                        {value ? (
                          <Text style={{fontSize: 14, color: '#000'}}>
                            {value}
                          </Text>
                        ) : (
                          <Text style={{fontSize: 14, color: '#777'}}>
                            Enter Meeting Time
                          </Text>
                        )}
                      </TouchableOpacity>

                      {error && (
                        <Text style={[styles.error]}>{error.message}</Text>
                      )}
                    </View>

                    <CommonTimePicker
                      visible={showTime}
                      selectedTime={time}
                      onSelectTime={selectedTime => {
                        onChange(selectedTime);
                        setTime(selectedTime);
                      }}
                      onClose={() => setShowTime(false)}
                    />
                  </>
                )}
              />
            </View>
          </View>

          {/* Phone */}
          <Controller
            control={control}
            name="meetingComment"
            render={({field: {onChange, value}}) => (
              <CommonInput
                label="Meeting Comment"
                value={value}
                placeholder={'Enter meting comment'}
                onChangeText={onChange}
                error={errors.meetingComment?.message}
                required={true}
              />
            )}
          />

          <View>
            <CommonButton
              title={title === 'Add' ? 'Add Meeting' : 'Update Meeting'}
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
