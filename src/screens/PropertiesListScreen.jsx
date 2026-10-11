/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

/** COMPONENTS **/

import {SelectColors} from '../constant/Colors';
import PropertyTabSection from '../propertyTabs/PropertyTabSection';
import {
  clearPropertyResponse,
  getPropertiesList,
} from '../Redux/Reducers/propertyReducer';
import useMobileNoDetails from '../hooks/useMobileNoDetails';
import {showError, showSuccess, showWarning} from '../utils/flashMessage';

const PropertyListScreen = ({navigation}) => {
  const {deletePropertyResponse} = useSelector(state => state.propertiesData);

  console.log('dd', deletePropertyResponse);

  const dispatch = useDispatch();

  const {mobileNoData} = useMobileNoDetails();

  const hasHandledResponse = useRef(false);

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  // const [propertyLists, setPropertyLists] = useState([]);

  /** FAKE LOADING ON SCREEN FOCUS */
  useFocusEffect(
    React.useCallback(() => {
      if (mobileNoData) {
        const propertiesListData = {
          owner_mobile_no: mobileNoData,
          action: 'property_list',
          page: 1,
        };
        dispatch(getPropertiesList(JSON.stringify(propertiesListData)));
        dispatch(clearPropertyResponse());
      }
    }, [mobileNoData]),
  );

  useEffect(() => {
    const handlePropertyResponse = async () => {
      if (!deletePropertyResponse || hasHandledResponse.current) return;

      hasHandledResponse.current = true;

      const {status, message, errors} = deletePropertyResponse;

      console.log('error:', status);

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
        // navigation.navigate('PropertiesList', { from: 'Properties List' });
      } else if (status === 0) {
        showError({
          message: 'Error',
          description: message,
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
  }, [deletePropertyResponse, navigation, dispatch]);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'flex-start',
        // paddingTop: 10,
        paddingBottom: 20,
        // backgroundColor: 'red'
      }}>
      <View style={{flex: 1, marginVertical: 10, paddingVertical: 10}}>
        <PropertyTabSection />
      </View>
    </View>
  );
};

export default PropertyListScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
