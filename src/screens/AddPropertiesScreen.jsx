/* eslint-disable prettier/prettier */
/* eslint-disable curly */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {showError, showSuccess, showWarning} from '../utils/flashMessage';
import PropertyLeadForm from '../sections/PropertyLeadForm';
import {
  clearPropertyResponse,
  getPropertiesList,
} from '../Redux/Reducers/propertyReducer';
import useMobileNoDetails from '../hooks/useMobileNoDetails';

const AddPropertiesScreen = props => {
  const {navigation, route} = props;

  const {propertyAddResponse} = useSelector(state => state.propertiesData);
  const {propertyDraftResponse} = useSelector(state => state.propertiesData);

  console.log('select: ', propertyAddResponse);

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
    const handlePropertyResponse = async () => {
      if (!propertyAddResponse || hasHandledResponse.current) return;

      hasHandledResponse.current = true;

      const {status, message, errors} = propertyAddResponse;

      //console.log('error:', errors);

      if (status === 1) {
        showSuccess({
          message: 'Success',
          description: message,
        });

        const propertyListData = JSON.stringify({
          owner_mobile_no: mobileNoData,
          action: 'property_list',
          page: 1,
        });

        dispatch(getPropertiesList(propertyListData));

        // wait so user can see success toast
        await sleep(2000);

        dispatch(clearPropertyResponse());
        navigation.navigate('PropertiesList', {from: 'Properties List'});
      } else if (status === 0) {
        showError({
          message: 'Error',
          description: formatErrors(errors),
          duration: 4000,
        });

        dispatch(clearPropertyResponse());
      } else {
        showWarning({
          message: 'Warning',
          description: 'Something went wrong!',
          duration: 3000,
        });

        dispatch(clearPropertyResponse());
      }

      hasHandledResponse.current = false;
    };

    handlePropertyResponse();
  }, [propertyAddResponse, navigation, dispatch]);

  useEffect(() => {
    const handlePropertyResponse = async () => {
      if (!propertyDraftResponse || hasHandledResponse.current) return;

      hasHandledResponse.current = true;

      const {status, message, errors} = propertyDraftResponse;

      //console.log('error:', errors);

      if (status === 1) {
        showSuccess({
          message: 'Success',
          description: message,
        });

        const propertyListData = JSON.stringify({
          owner_mobile_no: mobileNoData,
          action: 'property_list',
          page: 1,
        });

        dispatch(getPropertiesList(propertyListData));

        // wait so user can see success toast
        await sleep(2000);

        dispatch(clearPropertyResponse());
        navigation.navigate('PropertiesList', {from: 'Properties List'});
      } else if (status === 0) {
        showError({
          message: 'Error',
          description: formatErrors(errors),
          duration: 4000,
        });

        dispatch(clearPropertyResponse());
      } else {
        showWarning({
          message: 'Warning',
          description: 'Something went wrong!',
          duration: 3000,
        });

        dispatch(clearPropertyResponse());
      }

      hasHandledResponse.current = false;
    };

    handlePropertyResponse();
  }, [propertyDraftResponse, navigation, dispatch]);

  return (
    <>
      <PropertyLeadForm props={props} />
    </>
  );
};

export default AddPropertiesScreen;

const styles = StyleSheet.create({});
