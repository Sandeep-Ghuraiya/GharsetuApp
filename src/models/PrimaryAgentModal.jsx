/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonField from '../components/common/CommonField';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CommonButton from '../components/common/CommonButton';
import AntDesign from '@react-native-vector-icons/ant-design';
import {saveBrokerageDetails} from '../Redux/Reducers/propertyReducer';
import {useDispatch} from 'react-redux';
import useMobileNoDetails from '../hooks/useMobileNoDetails';

const loginSchema = yup.object({
  agentName: yup.string().required('Agent Name is required'),
  agentMobileNo: yup
    .string()
    .required('Phone number is required')
    .matches(/^[6-9]\d{9}$/, 'Enter a valid phone number'),
  agentBrokerage: yup.string().required('Brokerage is required'),
});

const EMPTY_FORM = {
  agentName: '',
  agentMobileNo: '',
  agentBrokerage: '',
};

const PrimaryAgetModal = ({
  visible,
  onClose,
  associatedAgents,
  selectedAgent,
  propertyId,
  onMessage,
}) => {
  const {mobileNoData} = useMobileNoDetails();

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
    defaultValues: EMPTY_FORM,
  });

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  // console.log('sel', selectedAgent);

  // ✅ Populate form when editing
  useEffect(() => {
    if (visible && selectedAgent) {
      reset({
        agentName: selectedAgent?.name || '',
        agentMobileNo: selectedAgent?.mobile || '',
        agentBrokerage: selectedAgent?.percentage || '',
      });
    } else if (visible) {
      reset(EMPTY_FORM);
    }
  }, [selectedAgent, visible, reset]);

  const handleAdd = data => {
    console.log('dat', data);
    setLoading(true);
    onMessage();

    const saveCommission = JSON.stringify({
      owner_mobile_no: mobileNoData,
      action: 'commission_update',
      property_id: propertyId,
      main_broker: {
        name: selectedAgent.name,
        mobile: selectedAgent.mobile,
        percentage: data.agentBrokerage,
      },
      associated_agents: associatedAgents,
    });
    console.log('save', saveCommission);

    dispatch(saveBrokerageDetails(saveCommission));
    setTimeout(() => {
      setLoading(false);
      onClose();
      reset(EMPTY_FORM); // ✅ instant reset, no timeout
    }, 3000);
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalCard}>
          {/* Close Button */}
          <TouchableOpacity style={styles.close} onPress={onClose}>
            <AntDesign name="close-circle" size={25} color="#666" />
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.modalTitle}>{'Edit Agent'}</Text>

          {/* Agent Name */}
          <CommonField
            control={control}
            name="agentName"
            label="Agent Name"
            placeholderText="Enter Agent Name"
            type="input"
            errors={errors}
            handleDraftFields={() => {}}
            disableState={false}
          />

          {/* Mobile Number */}
          <CommonField
            control={control}
            name="agentMobileNo"
            label="Agent Mobile No"
            placeholderText="Enter Agent Mobile No"
            type="number"
            errors={errors}
            handleDraftFields={() => {}}
            disableState={false}
          />

          {/* Brokerage */}
          <CommonField
            control={control}
            name="agentBrokerage"
            label="Agent Brokerage"
            placeholderText="Enter agent brokerage"
            type="number"
            errors={errors}
            handleDraftFields={() => {}}
          />

          {/* Submit Button */}
          <View style={{marginTop: 16}}>
            <CommonButton
              title={'Update Agent'}
              loading={loading}
              onPress={handleSubmit(handleAdd)}
              width="100%"
              style={{paddingVertical: 15}}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PrimaryAgetModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
    elevation: 5,
  },
  close: {
    alignItems: 'flex-end',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
    marginBottom: 20,
    textAlign: 'center',
  },
});
