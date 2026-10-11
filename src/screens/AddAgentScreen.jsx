/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import AddAgentForm from '../sections/AddAgentForm';
import {useDispatch, useSelector} from 'react-redux';
import {clearAgentResponse, getAgentList} from '../Redux/Reducers/agentReducer';
import {showError, showSuccess, showWarning} from '../utils/flashMessage';
import useMobileNoDetails from '../hooks/useMobileNoDetails';

const AddAgentScreen = ({navigation, route}) => {
  const {agentAddResponse} = useSelector(state => state.agentsData);

  const {mobileNoData} = useMobileNoDetails();

  const dispatch = useDispatch();

  const hasHandledResponse = useRef(false);

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    const handleAgentResponse = async () => {
      if (!agentAddResponse || hasHandledResponse.current) return;

      hasHandledResponse.current = true;

      const {status, message, errors} = agentAddResponse;

      if (status === 'success') {
        showSuccess({
          message: 'Success',
          description: 'Agent add successfully!',
        });

        const agentList = JSON.stringify({
          owner_mobile_no: mobileNoData,
          action: 'associated_agents',
        });

        dispatch(getAgentList(agentList));

        // wait so user can see success toast
        await sleep(2000);

        dispatch(clearAgentResponse());
        navigation.navigate('AgentList', {from: 'AgentList'});
      } else if (status === 0) {
        showError({
          message: 'Error',
          description: message,
          duration: 3000,
        });

        dispatch(clearAgentResponse());
      } else if (status === 'error') {
        showError({
          message: 'Error',
          description: formatErrors(errors),
          duration: 4000,
        });

        dispatch(clearAgentResponse());
      } else {
        showWarning({
          message: 'Warning',
          description: 'Something went wrong!',
          duration: 3000,
        });

        dispatch(clearAgentResponse());
      }

      hasHandledResponse.current = false;
    };

    handleAgentResponse();
  }, [agentAddResponse, navigation, dispatch]);

  return (
    <View style={{flex: 1}}>
      <AddAgentForm title="Add" />
    </View>
  );
};

export default AddAgentScreen;

const styles = StyleSheet.create({});
