/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAgentList = () => {
  const {agentList} = useSelector(state => state.agentsData);
  // console.log('aa', agentList);

  const [agentDataList, setAgentDataList] = useState([]);

  useEffect(() => {
    const handleAgent = async () => {
      if (agentList) {
        setAgentDataList(agentList?.data);
      } else {
        const agentValue = await AsyncStorage.getItem('agent_data');
        if (agentValue) {
          setAgentDataList(agentValue?.data);
        }
      }
    };

    handleAgent();
  }, [agentList]);

  return {agentDataList};
};

export default useAgentList;

const styles = StyleSheet.create({});
