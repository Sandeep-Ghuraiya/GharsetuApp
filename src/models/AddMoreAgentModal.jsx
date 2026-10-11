/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import CommonField from '../components/common/CommonField';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CommonButton from '../components/common/CommonButton';
import AntDesign from '@react-native-vector-icons/ant-design';
import {useDispatch, useSelector} from 'react-redux';
import {saveBrokerageDetails} from '../Redux/Reducers/propertyReducer';
import useMobileNoDetails from '../hooks/useMobileNoDetails';
import useAgentList from '../hooks/useAgentList';

const agentSchema = yup.object({
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

const AddMoreAgentModal = ({
  visible,
  onClose,
  selectedAgent,
  propertyId,
  primaryAgent,
  associatedAgents,
  onMessage,
}) => {
  // const { agentList } = useSelector(state => state.agentsData);
  const {saveBrokerageResponse} = useSelector(state => state.propertiesData);

  const {mobileNoData} = useMobileNoDetails();
  const {agentDataList} = useAgentList();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(agentSchema),
    mode: 'onChange',
    defaultValues: EMPTY_FORM,
  });

  const [allAgentList, setAllAgentList] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const selectedAgentId = watch('agentName');

  // useEffect(() => {
  //   if (agentList?.data?.length > 0) {
  //     setAllAgentList(agentList.data);
  //   }
  // }, [agentList]);

  const formattedAgents = agentDataList.map(item => ({
    label: item.agent_name,
    value: item.id, // or item.id if needed
  }));

  console.log('ff', formattedAgents);

  // ✅ Memoized form values (clean + fast)
  const formValues = useMemo(() => {
    return selectedAgent
      ? {
          agentName: selectedAgent.name,
          agentMobileNo: selectedAgent.mobile,
          agentBrokerage: selectedAgent.percentage,
        }
      : EMPTY_FORM;
  }, [selectedAgent]);

  // ✅ Single clean reset
  useEffect(() => {
    if (visible) {
      reset(formValues);
    }
  }, [formValues, visible, reset]);

  useEffect(() => {
    if (selectedAgentId && agentDataList.length > 0) {
      const selected = agentDataList.find(item => item.id === selectedAgentId);
      if (selected) {
        setValue('agentMobileNo', selected.agent_mobile_no);
      }
    }
  }, [selectedAgentId, agentDataList, setValue]);

  const handleAdd = data => {
    setLoading(true);
    onMessage();

    const associatedAgentArray = associatedAgents.map(item => {
      return parseFloat(item.id) === parseFloat(selectedAgent?.id)
        ? {...item, percentage: data.agentBrokerage}
        : item;
    });

    if (selectedAgent) {
      const saveCommission = JSON.stringify({
        owner_mobile_no: mobileNoData,
        action: 'commission_update',
        property_id: propertyId,
        main_broker: {
          name: primaryAgent.name,
          mobile: primaryAgent.mobile,
          percentage: primaryAgent.percentage,
        },
        associated_agents: associatedAgentArray,
      });
      dispatch(saveBrokerageDetails(saveCommission));
    } else {
      const saveCommission = JSON.stringify({
        owner_mobile_no: mobileNoData,
        action: 'commission_add',
        property_id: propertyId,
        main_broker: {
          name: primaryAgent.name,
          mobile: primaryAgent.mobile,
          percentage: primaryAgent.percentage,
        },
        associated_agents: [
          {
            id: data.agentName,
            percentage: data.agentBrokerage,
          },
        ],
      });
      dispatch(saveBrokerageDetails(saveCommission));
    }
  };

  useEffect(() => {
    if (saveBrokerageResponse) {
      setTimeout(() => {
        setLoading(false);
        onClose();
        reset(EMPTY_FORM); // ✅ instant reset, no timeout
      }, 500);
    }
  }, [saveBrokerageResponse]);

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalCard}>
          <TouchableOpacity style={styles.close} onPress={onClose}>
            <AntDesign name="close-circle" size={25} color="#666" />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>
            {selectedAgent ? 'Edit Associate Agent' : 'Add Associate Agent'}
          </Text>

          {formattedAgents.length === 0 && (
            <Text style={{color: 'red', marginBottom: 5}}>
              Note: No agents available. Please add an agent to continue.
            </Text>
          )}

          {/* Agent Name */}
          <CommonField
            control={control}
            name="agentName"
            label="Agent Name"
            placeholderText="Enter Agent Name"
            type={selectedAgent ? 'input' : 'select'}
            errors={errors}
            handleDraftFields={() => {}}
            disableState={selectedAgent ? false : true}
            options={
              selectedAgent ? undefined : formattedAgents
              // [
              //   { label: 'John Doe', value: 'john doe' },
              //   { label: 'Jane Smith', value: 'jane smith' },
              //   { label: 'Michael Brown', value: 'michael brown' },
              //   { label: 'Emily Davis', value: 'emily davis' },
              // ]
            }
          />

          <CommonField
            control={control}
            name="agentMobileNo"
            label="Agent Mobile No"
            placeholderText="Enter Agent Mobile No"
            type="number"
            errors={errors}
            handleDraftFields={() => {}}
            disableState={selectedAgent ? false : true}
          />

          <CommonField
            control={control}
            name="agentBrokerage"
            label="Agent Brokerage(%)"
            placeholderText="Enter agent brokerage(%)"
            type="number"
            errors={errors}
            handleDraftFields={() => {}}
          />

          <View style={{marginTop: 16}}>
            <CommonButton
              title={
                selectedAgent ? 'Update Associate Agent' : 'Add Associate Agent'
              }
              loading={loading}
              onPress={handleSubmit(handleAdd)}
              width="100%"
              style={{paddingVertical: 15, marginTop: 0}}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddMoreAgentModal;

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
