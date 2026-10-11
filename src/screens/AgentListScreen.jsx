/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable curly */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AgentList from '../sections/AgentList';
import {useDispatch, useSelector} from 'react-redux';
import {clearAgentResponse, getAgentList} from '../Redux/Reducers/agentReducer';
import {showError, showSuccess, showWarning} from '../utils/flashMessage';
import FullScreenLoader from '../models/FullScreenLoader';
import {SelectColors} from '../constant/Colors';
import useMobileNoDetails from '../hooks/useMobileNoDetails';
import useAgentList from '../hooks/useAgentList';
import PropertiesListLoader from '../loader/ListLoader';
import ListLoader from '../loader/ListLoader';

const AgentListScreen = ({navigation}) => {
  const {agentDeleteResponse} = useSelector(state => state.agentsData);

  const {agentDataList} = useAgentList();
  const {mobileNoData} = useMobileNoDetails();

  const [allAgentList, setAllAgentList] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const hasHandledResponse = useRef(false);

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    const handleAgentResponse = async () => {
      if (!agentDeleteResponse || hasHandledResponse.current) return;

      hasHandledResponse.current = true;

      const {status, message, errors} = agentDeleteResponse;

      if (status === 1) {
        showSuccess({
          message: 'Success',
          description: 'Agent deleted successfully!',
        });

        const agentList = JSON.stringify({
          owner_mobile_no: mobileNoData,
          action: 'associated_agents',
        });

        dispatch(getAgentList(agentList));

        // wait so user can see success toast
        await sleep(2000);

        dispatch(clearAgentResponse());
        // navigation.navigate('AgentList');
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
  }, [agentDeleteResponse, navigation, dispatch]);

  useEffect(() => {
    setLoading(true);
    if (agentDataList?.length > 0) {
      setAllAgentList(agentDataList);
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [agentDataList]);

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <View style={{paddingHorizontal: 10}}>
          <ListLoader />
        </View>
      ) : allAgentList?.length > 0 ? (
        <AgentList allAgentList={allAgentList} navigation={navigation} />
      ) : (
        <View>
          <Text>No agent found</Text>
        </View>
      )}
    </View>
  );
};

export default AgentListScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
