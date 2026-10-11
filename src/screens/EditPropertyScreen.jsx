/* eslint-disable prettier/prettier */
/* eslint-disable curly */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {showError, showSuccess, showWarning} from '../utils/flashMessage';
import {
  clearPropertyResponse,
  getPropertiesList,
} from '../Redux/Reducers/propertyReducer';
import EditPropertyForm from '../sections/EditPropertyForm';
import {showMessage} from 'react-native-flash-message';
import useMobileNoDetails from '../hooks/useMobileNoDetails';

const EditPropertyScreen = props => {
  const {navigation, route} = props;
  const {propertyItem, name} = route.params;
  const {propertyEditResponse} = useSelector(state => state.propertiesData);
  const {propertyAddResponse} = useSelector(state => state.propertiesData);

  // console.log('select: ', propertyEditResponse);

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
      if (!propertyEditResponse || hasHandledResponse.current) return;

      hasHandledResponse.current = true;

      const {status, message, errors} = propertyEditResponse;

      console.log('message:', message);

      if (status === 1) {
        showSuccess({
          message: 'Success',
          description: 'Property added successfully!',
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
        navigation.navigate('PropertyDetails', {
          propertyItem: propertyEditResponse?.property,
          from: 'Property Details',
        });
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
  }, [propertyEditResponse, navigation, dispatch]);

  useEffect(() => {
    const handlePropertyResponse = async () => {
      if (!propertyAddResponse || hasHandledResponse.current) return;

      hasHandledResponse.current = true;

      const {status, message, errors} = propertyAddResponse;

      console.log('message:', message);

      if (status === 1) {
        showSuccess({
          message: 'Success',
          description: 'Property added successfully!',
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
        navigation.navigate('PropertiesList');
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

  return (
    <>
      <EditPropertyForm
        navigation={navigation}
        propertyItem={propertyItem}
        name={name}
      />
    </>
  );
};

export default EditPropertyScreen;

const styles = StyleSheet.create({});
