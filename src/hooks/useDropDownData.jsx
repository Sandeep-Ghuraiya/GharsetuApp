/* eslint-disable prettier/prettier */
import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useDropDownData = () => {
  const {dropdownData} = useSelector(state => state.dropdownDetails); // Get data from Redux

  // console.log('dro',dropdownData?.data?.property_features);

  const [propertyFacingList, setPropertyFacingList] = useState([]);
  const [propertyPurposeList, setPropertyPurposeList] = useState([]);
  const [transactionTypeList, setTransactionTypeList] = useState([]);
  const [propertyTypeList, setPropertyTypeList] = useState([]);
  const [parkingTypeList, setParkingTypeList] = useState([]);
  const [furnishingTypeList, setFurnishingTypeList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [propertyAgeList, setPropertyAgeList] = useState([]);
  const [propertyFeaturesList, setPropertyFeaturesList] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      if (dropdownData?.status) {
        setDropdownState(dropdownData.data);
      } else {
        // If no data in Redux store, load from AsyncStorage
        const savedData = await AsyncStorage.getItem('dropdown_list');

        if (savedData) {
          // Parse and set the data from AsyncStorage
          const parsedData = JSON.parse(savedData);
          setDropdownState(parsedData);
        }
      }
    };

    loadData();
  }, [dropdownData]); // Dependency on dropdownData

  // Function to set dropdown state from the provided data
  const setDropdownState = data => {
    if (data?.property_facing) {
      setPropertyFacingList(
        Object.keys(data.property_facing).map(key => ({
          label: data.property_facing[key],
          value: key,
        })),
      );
    }
    if (data?.property_purpose) {
      setPropertyPurposeList(
        Object.keys(data.property_purpose).map(key => ({
          label: data.property_purpose[key],
          value: key,
        })),
      );
    }
    if (data?.property_type) {
      setPropertyTypeList(
        Object.keys(data.property_type).map(key => ({
          label: data.property_type[key],
          value: key,
        })),
      );
    }
    if (data?.Status) {
      setStatusList(
        Object.keys(data.Status).map(key => ({
          label: data.Status[key],
          value: key,
        })),
      );
    }
    if (data?.parking_type) {
      setParkingTypeList(
        Object.keys(data.parking_type).map(key => ({
          label: data.parking_type[key],
          value: key,
        })),
      );
    }
    if (data?.property_age) {
      setPropertyAgeList(
        Object.keys(data.property_age).map(key => ({
          label: data.property_age[key],
          value: key,
        })),
      );
    }
    if (data?.transaction_type) {
      setTransactionTypeList(
        Object.keys(data.transaction_type).map(key => ({
          label: data.transaction_type[key],
          value: key,
        })),
      );
    }
    if (data?.Property_furnishing_types) {
      setFurnishingTypeList(
        Object.keys(data.Property_furnishing_types).map(key => ({
          label: data.Property_furnishing_types[key],
          value: key,
        })),
      );
    }

    if (data?.property_features) {
      const formattedData = Object.entries(data?.property_features).map(
        ([category, features]) => ({
          category,
          features,
        }),
      );
      setPropertyFeaturesList(formattedData);
    }
  };

  return {
    propertyFacingList,
    propertyPurposeList,
    propertyTypeList,
    statusList,
    parkingTypeList,
    propertyAgeList,
    transactionTypeList,
    furnishingTypeList,
    propertyFeaturesList,
  };
};

export default useDropDownData;
