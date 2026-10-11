/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable curly */
/* eslint-disable no-unused-vars */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AddLeadForm from '../sections/AddLeadForm';
import {clearLeadResponse, userGetLead} from '../Redux/Reducers/leadReducer';
import {showError, showSuccess, showWarning} from '../utils/flashMessage';
import useMobileNoDetails from '../hooks/useMobileNoDetails';

const AddLeadScreen = props => {
  const {navigation, route} = props;

  const {leadAddResponse} = useSelector(state => state.agentLeads);

  const {mobileNoData} = useMobileNoDetails();

  const dispatch = useDispatch();

  const hasHandledResponse = useRef(false);

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const formatErrors = errors => {
    if (!errors || typeof errors !== 'object') return '';
    return Object.values(errors)
      .map((item, index) => `${index + 1}. ${item}`)
      .join('\n');
  };

  useEffect(() => {
    const handleLeadResponse = async () => {
      if (!leadAddResponse || hasHandledResponse.current) return;

      hasHandledResponse.current = true;

      const {status, message, errors} = leadAddResponse;

      if (status === 'success') {
        showSuccess({
          message: 'Success',
          description: 'Lead added successfully!',
        });

        const leadListData = JSON.stringify({
          owner_mobile_no: mobileNoData,
          action: 'lead_list',
          status: '',
          page: 1,
        });

        dispatch(userGetLead(leadListData));

        // wait so user can see success toast
        await sleep(2000);

        dispatch(clearLeadResponse());
        navigation.navigate('Leads');
      } else if (status === 0) {
        showError({
          message: 'Error',
          description: message,
          duration: 3000,
        });

        dispatch(clearLeadResponse());
      } else if (status === 'error') {
        showError({
          message: 'Error',
          description: formatErrors(errors),
          duration: 4000,
        });

        dispatch(clearLeadResponse());
      } else {
        showWarning({
          message: 'Warning',
          description: 'Something went wrong!',
          duration: 3000,
        });

        dispatch(clearLeadResponse());
      }

      hasHandledResponse.current = false;
    };

    handleLeadResponse();
  }, [leadAddResponse, navigation, dispatch]);

  return (
    <>
      <AddLeadForm props={props} />
    </>
  );
};

export default AddLeadScreen;

const styles = StyleSheet.create({});
