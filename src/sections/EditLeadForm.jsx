/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import CommonInput from '../components/commonFields/CommonInput';
import CommonButton from '../components/common/CommonButton';
import {userEditLead} from '../Redux/Reducers/leadReducer';
import {useDispatch} from 'react-redux';
import CommonDropdown from '../components/commonFields/CommonDropdown';
import CommonDatePicker from '../components/commonFields/CommonDatePicker';
import CommonTimePicker from '../components/commonFields/CommonTimePicker';
import useDropDownData from '../hooks/useDropDownData';
import useMobileNoDetails from '../hooks/useMobileNoDetails';

// -------------------- VALIDATION SCHEMA --------------------
const leadSchema = Yup.object().shape({
  status: Yup.string()
    .required('Status is required')
    .min(1, 'Status is required'),

  visit_date: Yup.string().when('status', {
    is: val => val === 'site_visit_scheduled',
    then: schema => schema.required('Visit date is required'),
    otherwise: schema => schema.notRequired(),
  }),

  visit_time: Yup.string().when('status', {
    is: val => val === 'site_visit_scheduled',
    then: schema => schema.required('Visit time is required'),
    otherwise: schema => schema.notRequired(),
  }),

  comment: Yup.string(),
});

export default function EditLeadForm({navigation, leadItem}) {
  const {statusList} = useDropDownData();

  const {mobileNoData} = useMobileNoDetails();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [dateTimeShow, setDateTimeShow] = useState(false);

  // console.log('Edittime', time);

  useEffect(() => {
    if (status === 'site_visit_scheduled') {
      setDateTimeShow(true);
    } else {
      setDateTimeShow(false);
    }
  }, [status]);

  // ----------- REACT HOOK FORM SETUP WITH DEFAULT VALUES -----------
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(leadSchema),

    // ---- PREFILL VALUES FROM leadItem ----
    defaultValues: {
      visit_date: '',
      visit_time: '',
      status: '',
      comment: '',
    },
  });

  // console.log('error',errors);

  const onSubmit = data => {
    setLoading(true);
    setTimeout(() => {
      const leadFormData = JSON.stringify({
        owner_mobile_no: mobileNoData,
        mobile_no: leadItem.mobile_no,
        lead_id: leadItem.id,
        action: 'lead_update',
        first_name: leadItem.first_name,
        last_name: leadItem.last_name,
        email: leadItem.email,

        comment: data.comment,
        status: data.status,
        //[new,contacted,interested,site_visit_scheduled,site_visit_done,negotiation,converted,lost,spam]
        visit_date: data.visit_date,
        visit_time: data.visit_time,
        visit_comment: data.comment,
        property_ids: [leadItem.property_ids],
      });

      console.log('update Lead Data: ', leadFormData);

      dispatch(userEditLead(leadFormData));

      setTimeout(() => {
        setLoading(false);
      }, 4000);
    }, 1500);
  };

  const handleOpenTimePicker = useCallback(() => {
    setShowTime(true);
  }, [setShowTime]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollLayout}>
          {/* Status */}
          <Controller
            control={control}
            name="status"
            render={({field: {onChange, value}}) => (
              <CommonDropdown
                label="Status"
                placeholder={'Select Status'}
                required={false}
                data={statusList}
                value={value}
                onChange={selectedValue => {
                  onChange(selectedValue);
                  setStatus(selectedValue);
                }}
                error={errors.status?.message}
              />
            )}
          />
          {/* Visiting Date & Time */}
          {dateTimeShow && (
            <View style={[styles.row]}>
              <View style={[styles.half]}>
                <Controller
                  control={control}
                  name="visit_date"
                  render={({field: {onChange, value}, fieldState: {error}}) => (
                    <>
                      <View style={[styles.bottomSpace]}>
                        <Text style={styles.label}>Select Visit Date</Text>

                        <TouchableOpacity
                          onPress={() => setShowDate(true)}
                          style={[
                            styles.picker,
                            {borderColor: error ? 'red' : '#ccc'},
                          ]}>
                          {value ? (
                            <Text style={{fontSize: 14, color: '#000'}}>
                              {value}
                            </Text>
                          ) : (
                            <Text style={{fontSize: 14, color: '#777'}}>
                              Enter Visit Date
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
                  name="visit_time"
                  render={({field: {onChange, value}, fieldState: {error}}) => (
                    <>
                      <View style={[styles.bottomSpace]}>
                        <Text style={styles.label}>Select Visit Time</Text>

                        <TouchableOpacity
                          onPress={handleOpenTimePicker}
                          style={[
                            styles.picker,
                            {borderColor: error ? 'red' : '#ccc'},
                          ]}>
                          {value ? (
                            <Text style={{fontSize: 14, color: '#000'}}>
                              {value}
                            </Text>
                          ) : (
                            <Text style={{fontSize: 14, color: '#777'}}>
                              Enter Visit Time
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
          )}

          {/* Comment */}
          <Controller
            control={control}
            name="comment"
            render={({field: {onChange, value}}) => (
              <CommonInput
                label="Comment"
                multilines={true}
                numberOfLines={3}
                placeholder={'Enter your comment...'}
                required={false}
                style={[styles.textArea]}
                value={value}
                onChangeText={onChange}
                error={errors.comment?.message}
              />
            )}
          />

          <View>
            <CommonButton
              title="Update Lead"
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
    marginTop: 3,
    fontSize: 12,
  },
});
