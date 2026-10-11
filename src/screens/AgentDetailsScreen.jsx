/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable curly */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {clearAgentResponse, getAgentList} from '../Redux/Reducers/agentReducer';
import {showError, showSuccess, showWarning} from '../utils/flashMessage';
import {
  clearPropertyResponse,
  getPropertiesList,
} from '../Redux/Reducers/propertyReducer';
import AgentDetails from '../sections/AgentDetails';
import useMobileNoDetails from '../hooks/useMobileNoDetails';

const AgentDetailsScreen = ({route, navigation}) => {
  const {saveBrokerageResponse, deleteBrokerageResponse} = useSelector(
    state => state.propertiesData,
  );

  console.log('save', saveBrokerageResponse);

  const {mobileNoData} = useMobileNoDetails();

  const {price, propertyId, commisionData} = route.params;

  const [commisionNewData, setCommisionNewData] = useState([]);
  const [messageShow, setMessageShow] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const hasHandledResponse = useRef(false);

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    const handleAgentResponse = async () => {
      if (!saveBrokerageResponse || hasHandledResponse.current) return;

      hasHandledResponse.current = true;

      const {status, message, errors} = saveBrokerageResponse;

      console.log('ss', status);

      if (status === 'success' && messageShow === 1) {
        console.log('success');

        showSuccess({
          message: 'Success',
          description: 'Agent updated successfully!',
        });
        const propertyList = JSON.stringify({
          owner_mobile_no: mobileNoData,
          action: 'property_list',
          page: 1,
        });

        dispatch(getPropertiesList(propertyList));

        // wait so user can see success toast
        await sleep(2000);

        // dispatch(clearPropertyResponse());
        // navigation.navigate('AgentList');
      } else if (status === 'error' && messageShow === 1) {
        console.log('ji');

        showError({
          message: 'Error',
          description: message,
          duration: 3000,
        });

        // dispatch(clearPropertyResponse());
      } else if (status === 'error' && messageShow === 1) {
        showError({
          message: 'Error',
          description: formatErrors(errors),
          duration: 4000,
        });

        // dispatch(clearPropertyResponse());
      } else if (messageShow === 1) {
        showWarning({
          message: 'Warning',
          description: 'Something went wrong!',
          duration: 3000,
        });

        // dispatch(clearPropertyResponse());
      }

      hasHandledResponse.current = false;
    };

    handleAgentResponse();
  }, [saveBrokerageResponse, navigation, dispatch]);

  useEffect(() => {
    const handleAgentDeleteResponse = async () => {
      if (!deleteBrokerageResponse || hasHandledResponse.current) return;

      hasHandledResponse.current = true;

      const {status, message, errors} = deleteBrokerageResponse;

      if (status === 'success' && messageShow === 1) {
        showSuccess({
          message: 'Success',
          description: 'Agent deleted successfully!',
        });
        const propertyList = JSON.stringify({
          owner_mobile_no: mobileNoData,
          action: 'property_list',
          page: 1,
        });

        dispatch(getPropertiesList(propertyList));

        // wait so user can see success toast
        await sleep(2000);

        // dispatch(clearPropertyResponse());
        // navigation.navigate('AgentList');
      } else if (status === 'error' && messageShow === 1) {
        showError({
          message: 'Error',
          description: message,
          duration: 3000,
        });

        // dispatch(clearPropertyResponse());
      } else if (status === 'error' && messageShow === 1) {
        showError({
          message: 'Error',
          description: formatErrors(errors),
          duration: 4000,
        });

        // dispatch(clearPropertyResponse());
      } else if (messageShow === 1) {
        showWarning({
          message: 'Warning',
          description: 'Something went wrong!',
          duration: 3000,
        });

        // dispatch(clearPropertyResponse());
      }

      hasHandledResponse.current = false;
    };

    handleAgentDeleteResponse();
  }, [deleteBrokerageResponse, navigation, dispatch]);

  useEffect(() => {
    if (commisionData) {
      setCommisionNewData(commisionData);
    }
    if (saveBrokerageResponse?.property) {
      setCommisionNewData(saveBrokerageResponse?.property?.commission);
    }
  }, [commisionData, saveBrokerageResponse]);

  console.log('Agent: ', commisionData);

  return (
    <View style={{flex: 1}}>
      <AgentDetails
        price={price}
        commisionData={commisionNewData}
        propertyId={propertyId}
        onMessage={() => setMessageShow(1)}
        deleteData={deleteBrokerageResponse?.deleted_data}
      />
    </View>
  );
};

export default AgentDetailsScreen;

const styles = StyleSheet.create({});
