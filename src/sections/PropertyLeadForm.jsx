/* eslint-disable prettier/prettier */
/* eslint-disable curly */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
  Keyboard,
  StyleSheet,
  Text,
} from 'react-native';
import {useSelectFilterForm} from '../hooks/useSelectFilterForm';
import CommonField from '../components/common/CommonField';
import CommonButton from '../components/common/CommonButton';
import {useDispatch, useSelector} from 'react-redux';
import FullScreenLoader from '../models/FullScreenLoader';
import {
  getPropertFacilitiesOptions,
  getPropertyAreaOptions,
} from '../utils/dropdownUtils';
import {
  addDraftProperty,
  addNewProperty,
} from '../Redux/Reducers/propertyReducer';
import CommonHeading from '../components/common/CommonHeading';
import useFloorNumber from '../hooks/useFloorNumber';
import usePropertyConfiguration from '../hooks/usePropertyConfiguration';
import useDropDownData from '../hooks/useDropDownData';
import {conditionalValidation} from '../utils/conditionalValidation';
import MultiDrop from '../MultiDrop';
import useMobileNoDetails from '../hooks/useMobileNoDetails';

const PropertyLeadForm = () => {
  const zipLocationData = useSelector(state => state.locationData.locationList);
  const {propertyAddResponse, propertyDraftResponse} = useSelector(
    state => state.propertiesData,
  );

  const dispatch = useDispatch();

  const {mobileNoData} = useMobileNoDetails();

  const newLocationList = useMemo(() => {
    return zipLocationData || [];
  }, [zipLocationData]);

  const draftState = {
    ownerFirstName: '',
    ownerLastName: '',
    mobileNo: '',
    propertyName: '',
    ownerStatus: '',
    propertyPurpose: '',
    propertyType: '',
    totalFloor: '',
    propertyFloor: '',
    propertySize: '',
    bedrooms: '',
    bathrooms: '',
    propertyFacing: '',
    propertyAreaSquare: '',
    propertyUnitWidth: '',
    propertyUnitDepth: '',
    propertyAge: '',
    propertyFurnishingTypes: '',
    // propertyUnitType: '',
    popertyFacilitiesId: [],
    parkingType: '',
    propertySellingPrice: '',
    propertyActualPrice: '',
    transactionType: '',
    zipcode: '',
    propertyArea: [],
    propertyLocation: '',
    stateId: '',
    cityId: '',
    propertyMapLocation: '',
    propertyVideo: '',
    propertyImages: [],
    propertyRating: '',
    propertyFeatured: '',
  };

  const {
    propertyFacingList,
    propertyPurposeList,
    propertyTypeList,
    parkingTypeList,
    propertyAgeList,
    transactionTypeList,
    furnishingTypeList,
    propertyFeaturesList,
  } = useDropDownData();

  const [loading, setLoading] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationList, setLocationList] = useState([]);
  const [propertyTypeValue, setPropertyTypeValue] = useState('');
  const [houseDisable, setHouseDisable] = useState(true);
  const [totalFloorDisabled, setTotalFloorDisabled] = useState(true);
  const [bhkDisabled, setBhkDisabled] = useState(true);
  const [disableState, setDisableState] = useState(true);
  const [totalFloorValue, setTotalFloorValue] = useState(0);
  const [fieldValidationState, setFieldValidationState] = useState('default');
  const [validationState, setValidationState] = useState(
    conditionalValidation[0].shape,
  );
  const [draftField, setDraftField] = useState(draftState);

  const {totalFloorNumber, floorNumber} = useFloorNumber(15, totalFloorValue);
  const {propertyConfiguration} = usePropertyConfiguration();

  useEffect(() => {
    if (newLocationList.length > 0) {
      setLocationLoading(true);
      setTimeout(() => {
        setLocationList(newLocationList);
        // 🔥 UPDATE FORM VALUES
        setValue('stateId', newLocationList[0]?.state || '');
        setValue('cityId', newLocationList[0]?.city || '');
        setLocationLoading(false);
      }, 2000);
    }
  }, [newLocationList, locationList, setValue]);

  useEffect(() => {
    if (!conditionalValidation || !fieldValidationState) return;

    const getRequiredState = conditionalValidation.find(
      item => item.type === fieldValidationState,
    );

    setValidationState(getRequiredState?.shape || {});
    // console.log('Required:', getRequiredState?.shape);
  }, [fieldValidationState]);

  useEffect(() => {
    // Define the property types for better readability
    const officeShopTypes = ['Office', 'Shop'];
    const houseTypes = ['Row House', 'Bungalow', 'Individual House'];
    const flatTypes = ['Flat'];
    const plotTypes = ['Plot'];

    // Check if either the current value or the item type matches the categories
    const isOfficeShop = officeShopTypes.includes(propertyTypeValue);
    const isHouse = houseTypes.includes(propertyTypeValue);
    const isFlat = flatTypes.includes(propertyTypeValue);
    const isPlot = plotTypes.includes(propertyTypeValue);

    // Ensure only one condition is true at a time
    if (isFlat) {
      // "Flat" should disable both
      setDisableState(true);
      setHouseDisable(true);
      setBhkDisabled(true);
      setTotalFloorDisabled(true);
    } else if (isPlot) {
      setHouseDisable(false);
      setDisableState(false);
      setBhkDisabled(false);
      setTotalFloorDisabled(false);
    } else if (isOfficeShop) {
      // Plot, Office, Shop disable house related state
      setDisableState(false);
      setHouseDisable(true);
      setBhkDisabled(false);
      setTotalFloorDisabled(true);
    } else if (isHouse) {
      // Row House, Bungalow, Individual House disable state
      setHouseDisable(false);
      setDisableState(true);
      setBhkDisabled(true);
      setTotalFloorDisabled(true);
    } else {
      // Default case: disable both
      setDisableState(true);
      setHouseDisable(true);
      setBhkDisabled(true);
      setTotalFloorDisabled(true);
    }
  }, [propertyTypeValue]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useSelectFilterForm(
    {
      ownerFirstName: '',
      ownerLastName: '',
      mobileNo: '',
      propertyName: '',
      // ownerStatus: '',
      propertyPurpose: '',
      propertyType: '',
      totalFloor: '',
      propertyFloor: '',
      propertySize: '',
      bedrooms: '',
      bathrooms: '',
      propertyFacing: '',
      propertyAreaSquare: '',
      propertyUnitWidth: '',
      propertyUnitDepth: '',
      propertyAge: '',
      propertyFurnishingTypes: '',
      // propertyUnitType: '',
      popertyFacilitiesId: [],
      parkingType: '',
      propertySellingPrice: '',
      propertyActualPrice: '',
      transactionType: '',
      zipcode: '',
      propertyArea: [],
      propertyLocation: '',
      stateId: '',
      cityId: '',
      propertyMapLocation: '',
      propertyVideo: '',
      propertyImages: [],
      propertyRating: '',
      propertyFeatured: '',
    },
    validationState,
    (formType = 'AddForm'),
  );

  const handleDraftFields = (name, value) => {
    setDraftField(prev => ({
      ...prev,
      [name]: value ?? '',
    }));
  };

  useEffect(() => {
    setTimeout(() => {
      setDraftLoading(false);
    }, 1000);
  }, [propertyDraftResponse]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [propertyAddResponse]);

  // console.log('draf', draftField);

  const handleDraft = async data => {
    let loadingTimeout;

    try {
      setDraftLoading(true);

      // ⏱ Force stop loader after 30 seconds
      loadingTimeout = setTimeout(() => {
        setDraftLoading(false);
      }, 30000); // 30 seconds

      const formProperty = JSON.stringify({
        owner_mobile_no: mobileNoData,
        action: 'property_draft',

        Contact_Display: 'owner', // owner,support
        property_name: draftField.propertyName,
        property_type: draftField.propertyType, //Individual,Row House,Bungalow,Flat,Shop,Office
        property_facing: draftField.propertyFacing,
        property_age: draftField.propertyAge, //1 Years,2 Years......50 Years
        property_location: draftField.propertyLocation,
        state: draftField.stateId,
        city: draftField.cityId,
        zipcode: draftField.zipcode,
        area: draftField.propertyArea,
        property_area_square: draftField.propertyAreaSquare,
        property_unit_type: '', //plot,flat
        property_configuration_bhk: bhkDisabled ? draftField.propertySize : '', //1 BHK to 10 BHK, 1 RK to 6 RK
        total_floors: totalFloorDisabled ? draftField.totalFloor : '',
        flat_floor: houseDisable ? draftField.propertyFloor : '',
        property_rating: draftField.propertyRating, // 1 to 5
        is_featured: draftField.propertyFeatured, // 1,0
        features: draftField.popertyFacilitiesId,
        parking_type: draftField.parkingType, //Allotted,Covered
        property_purpose: draftField.propertyPurpose, //Sell,Rent
        transaction_type: draftField.transactionType, //Resale,New,Rent,Lease
        owner_first_name: draftField.ownerFirstName,
        owner_last_name: draftField.ownerLastName,
        mobile_no: draftField.mobileNo,
        selling_price: draftField.propertySellingPrice,
        actual_price: draftField.propertyActualPrice,
        map_location_url: draftField.propertyMapLocation,
        bedrooms: disableState ? draftField.bedrooms : '',
        bathrooms: disableState ? draftField.bathrooms : '',
        unit_width: draftField.propertyUnitWidth,
        unit_depth: draftField.propertyUnitDepth,
        Property_furnishing_types: draftField.propertyFurnishingTypes, //[Unfurnished,Semi_Furnished,Fully_Furnished,Luxury_Furnished,Bare_Shell]
        property_images: draftField.propertyImages,
        property_video: draftField.propertyVideo,
      });

      await dispatch(addDraftProperty(formProperty)).unwrap();
    } catch (error) {
      console.error('Add Property Error:', error);
    } finally {
      // ✅ If API finishes before 30s, clear timeout and stop loader
      clearTimeout(loadingTimeout);
      setDraftLoading(false);
    }
  };

  const onSubmit = async data => {
    let loadingTimeout;

    // console.log('feat',data.popertyFacilitiesId);

    try {
      setLoading(true);

      // ⏱ Force stop loader after 30 seconds
      loadingTimeout = setTimeout(() => {
        setLoading(false);
      }, 30000); // 30 seconds

      const formProperty = JSON.stringify({
        owner_mobile_no: mobileNoData,
        action: 'property_add',

        draft_id: '',
        Contact_Display: 'owner', // owner,support
        property_name: data.propertyName,
        property_type: data.propertyType, //Individual,Row House,Bungalow,Flat,Shop,Office
        property_facing: data.propertyFacing,
        property_age: data.propertyAge, //1 Years,2 Years......50 Years
        property_location: data.propertyLocation,
        state: data.stateId,
        city: data.cityId,
        zipcode: data.zipcode,
        area: data.propertyArea,
        property_area_square: data.propertyAreaSquare,
        property_unit_type: '', //plot,flat
        property_configuration_bhk: bhkDisabled ? data.propertySize : '', //1 BHK to 10 BHK, 1 RK to 6 RK
        total_floors: totalFloorDisabled ? data.totalFloor : '',
        flat_floor: houseDisable ? data.propertyFloor : '',
        property_rating: data.propertyRating, // 1 to 5
        is_featured: data.propertyFeatured, // 1,0
        features: data.popertyFacilitiesId,
        parking_type: data.parkingType, //Allotted,Covered
        property_purpose: data.propertyPurpose, //Sell,Rent
        transaction_type: data.transactionType, //Resale,New,Rent,Lease
        owner_first_name: data.ownerFirstName,
        owner_last_name: data.ownerLastName,
        mobile_no: data.mobileNo,
        selling_price: data.propertySellingPrice,
        actual_price: data.propertyActualPrice,
        map_location_url: data.propertyMapLocation,
        bedrooms: disableState ? data.bedrooms : '',
        bathrooms: disableState ? data.bathrooms : '',
        unit_width: data.propertyUnitWidth,
        unit_depth: data.propertyUnitDepth,
        Property_furnishing_types: data.propertyFurnishingTypes, //[Unfurnished,Semi_Furnished,Fully_Furnished,Luxury_Furnished,Bare_Shell]
        property_images: data.propertyImages,
        property_video: data.propertyVideo,
      });

      await dispatch(addNewProperty(formProperty)).unwrap();
    } catch (error) {
      console.error('Add Property Error:', error);
    } finally {
      // ✅ If API finishes before 30s, clear timeout and stop loader
      clearTimeout(loadingTimeout);
      setLoading(false);
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{
              paddingVertical: 20,
              paddingHorizontal: 10,
            }}>
            <View
              style={{
                backgroundColor: '#f4f4f4',
                borderRadius: 20,
              }}>
              <View style={styles.card}>
                <CommonHeading name={'Owner Details'} />
                <View style={[styles.row]}>
                  <View style={[styles.half]}>
                    <CommonField
                      control={control}
                      name="ownerFirstName"
                      label="Owner First Name"
                      placeholderText={'Enter First Name'}
                      type="input"
                      errors={errors}
                      required={true}
                      handleDraftFields={(name, val) =>
                        handleDraftFields(name, val)
                      }
                    />
                  </View>
                  <View style={[styles.half]}>
                    <CommonField
                      control={control}
                      name="ownerLastName"
                      label="Owner Last Name"
                      placeholderText={'Enter Last Name'}
                      type="input"
                      errors={errors}
                      handleDraftFields={(name, val) =>
                        handleDraftFields(name, val)
                      }
                    />
                  </View>
                </View>

                <CommonField
                  control={control}
                  name="mobileNo"
                  label="Owner Mobile No."
                  placeholderText={'Enter Mobile no.'}
                  type="number"
                  errors={errors}
                  required={true}
                  handleDraftFields={(name, val) =>
                    handleDraftFields(name, val)
                  }
                />

                {/* <CommonField
                  control={control}
                  name="contactSupport"
                  label="Contact Display"
                  placeholderText={'Select contact display'}
                  type="select"
                  errors={errors}
                  options={[
                    { label: 'Owner', value: 'Owner' },
                    { label: 'Support', value: 'Support' },
                  ]}
                  // required={true}
                /> */}
              </View>

              <View style={styles.card}>
                <CommonHeading name={'Property Details'} />

                <CommonField
                  control={control}
                  name="propertyName"
                  label="Property Name"
                  placeholderText={'Enter property name'}
                  type="input"
                  errors={errors}
                  required={true}
                  handleDraftFields={(name, val) =>
                    handleDraftFields(name, val)
                  }
                />

                {/* <CommonField
                  control={control}
                  name="ownerStatus"
                  label="Property Status"
                  placeholderText={'Select status'}
                  type="select"
                  errors={errors}
                  options={[
                    { label: 'Old', value: 'Old' },
                    { label: 'Open', value: 'Open' },
                    { label: 'Sold', value: 'Sold' },
                  ]}
                  handleDraftFields={(name, val) => handleDraftFields(name, val)}
                /> */}

                <CommonField
                  control={control}
                  name="propertyPurpose"
                  label="Property Purpose"
                  placeholderText={'Select property purpose'}
                  type="select"
                  errors={errors}
                  options={propertyPurposeList}
                  required={true}
                  handleDraftFields={(name, val) =>
                    handleDraftFields(name, val)
                  }
                />

                <CommonField
                  control={control}
                  name="propertyType"
                  label="Property Type"
                  placeholderText={'Select type'}
                  type="select"
                  errors={errors}
                  options={propertyTypeList}
                  setPropertyValue={value => {
                    setPropertyTypeValue(value);
                    setFieldValidationState(value);
                  }}
                  required={true}
                  handleDraftFields={(name, val) =>
                    handleDraftFields(name, val)
                  }
                />

                <View style={[styles.row]}>
                  <View style={[styles.half]}>
                    <CommonField
                      control={control}
                      name="totalFloor"
                      label="Total Floor"
                      placeholderText={'Select total floor'}
                      type="select"
                      options={totalFloorNumber}
                      errors={errors}
                      setPropertyValue={value => setTotalFloorValue(value)}
                      disableState={totalFloorDisabled}
                      required={true}
                      handleDraftFields={(name, val) =>
                        handleDraftFields(name, val)
                      }
                    />
                  </View>
                  <View style={[styles.half]}>
                    <CommonField
                      control={control}
                      name="propertyFloor"
                      label="Property on Floor"
                      placeholderText={'Select property on floor'}
                      type="select"
                      options={floorNumber}
                      errors={errors}
                      disableState={houseDisable}
                      required={true}
                      handleDraftFields={(name, val) =>
                        handleDraftFields(name, val)
                      }
                    />
                  </View>
                </View>

                <CommonField
                  control={control}
                  name="propertySize"
                  label="Property Configuration"
                  placeholderText={'Select property configuration'}
                  type="select"
                  errors={errors}
                  options={propertyConfiguration}
                  disableState={bhkDisabled}
                  required={true}
                  handleDraftFields={(name, val) =>
                    handleDraftFields(name, val)
                  }
                />

                <View style={[styles.row]}>
                  <View style={[styles.half]}>
                    <CommonField
                      control={control}
                      name="bedrooms"
                      label="Bedrooms"
                      placeholderText={'Select bedrooms'}
                      type="number"
                      errors={errors}
                      disableState={disableState}
                      required={true}
                      handleDraftFields={(name, val) =>
                        handleDraftFields(name, val)
                      }
                    />
                  </View>
                  <View style={[styles.half]}>
                    <CommonField
                      control={control}
                      name="bathrooms"
                      label="Bathrooms"
                      placeholderText={'Select bathrooms'}
                      type="number"
                      disableState={disableState}
                      required={true}
                      errors={errors}
                      handleDraftFields={(name, val) =>
                        handleDraftFields(name, val)
                      }
                    />
                  </View>
                </View>

                <View style={[styles.row]}>
                  <View style={[styles.half]}>
                    <CommonField
                      control={control}
                      name="propertyFacing"
                      label="Property Face Direction"
                      placeholderText={'Select facing'}
                      type="select"
                      errors={errors}
                      options={propertyFacingList}
                      required={true}
                      handleDraftFields={(name, val) =>
                        handleDraftFields(name, val)
                      }
                    />
                  </View>
                  <View style={[styles.half]}>
                    <CommonField
                      control={control}
                      name="propertyAreaSquare"
                      label="Property Square Feet"
                      placeholderText={'eg. 1000'}
                      type="number"
                      errors={errors}
                      required={true}
                      handleDraftFields={(name, val) =>
                        handleDraftFields(name, val)
                      }
                    />
                  </View>
                </View>

                <View style={[styles.row]}>
                  <View style={[styles.half]}>
                    <CommonField
                      control={control}
                      name="propertyUnitWidth"
                      label="Property Unit Width"
                      placeholderText={'Enter property width'}
                      type="number"
                      errors={errors}
                      required={true}
                      handleDraftFields={(name, val) =>
                        handleDraftFields(name, val)
                      }
                    />
                  </View>
                  <View style={[styles.half]}>
                    <CommonField
                      control={control}
                      name="propertyUnitDepth"
                      label="Property Unit Depth"
                      placeholderText={'Enter property depth'}
                      type="number"
                      errors={errors}
                      required={true}
                      handleDraftFields={(name, val) =>
                        handleDraftFields(name, val)
                      }
                    />
                  </View>
                </View>

                <View style={[styles.row]}>
                  <View style={[styles.half]}>
                    <CommonField
                      control={control}
                      name="propertyAge"
                      label="Property Age"
                      placeholderText={'Enter property age'}
                      type="select"
                      errors={errors}
                      options={propertyAgeList}
                      required={true}
                      handleDraftFields={(name, val) =>
                        handleDraftFields(name, val)
                      }
                    />
                  </View>
                  <View style={[styles.half]}>
                    <CommonField
                      control={control}
                      name="propertyFurnishingTypes"
                      label="Property Furnishing Types"
                      placeholderText={'Enter property furnishing types'}
                      type="select"
                      errors={errors}
                      options={furnishingTypeList}
                      handleDraftFields={(name, val) =>
                        handleDraftFields(name, val)
                      }
                    />
                  </View>
                </View>

                <CommonField
                  control={control}
                  name="popertyFacilitiesId"
                  label="Property Facilities"
                  placeholderText={'Select facilities'}
                  type="customselect"
                  errors={errors}
                  options={propertyFeaturesList}
                  handleDraftFields={(name, val) =>
                    handleDraftFields(name, val)
                  }
                />

                <CommonField
                  control={control}
                  name="parkingType"
                  label="Property Parking Type"
                  placeholderText={'Enter parking type'}
                  type="select"
                  errors={errors}
                  options={parkingTypeList}
                  required={true}
                  handleDraftFields={(name, val) =>
                    handleDraftFields(name, val)
                  }
                />

                <View style={[styles.row]}>
                  <View style={[styles.half]}>
                    <CommonField
                      control={control}
                      name="propertySellingPrice"
                      label="Selling Price"
                      placeholderText={'eg: 500000'}
                      type="number"
                      errors={errors}
                      required={true}
                      handleDraftFields={(name, val) =>
                        handleDraftFields(name, val)
                      }
                    />
                  </View>
                  <View style={[styles.half]}>
                    <CommonField
                      control={control}
                      name="propertyActualPrice"
                      label="Actual Selling Price"
                      placeholderText={'eg: 500000'}
                      type="number"
                      errors={errors}
                      required={true}
                      handleDraftFields={(name, val) =>
                        handleDraftFields(name, val)
                      }
                    />
                  </View>
                </View>

                <CommonField
                  control={control}
                  name="transactionType"
                  label="Transaction Type"
                  placeholderText={'Enter Transaction Type'}
                  type="select"
                  options={transactionTypeList}
                  errors={errors}
                  required={true}
                  handleDraftFields={(name, val) =>
                    handleDraftFields(name, val)
                  }
                />

                {/* <View style={[styles.row]}>
                  <View style={[styles.half]}>
                    <CommonField
                      control={control}
                      name="propertyRating"
                      label="Property Rating"
                      placeholderText={'Enter property rating'}
                      type="number"
                      errors={errors}
                      required={false}
                      handleDraftFields={(name, val) => handleDraftFields(name, val)}
                    />
                  </View>
                  <View style={[styles.half]}>
                    <CommonField
                      control={control}
                      name="propertyFeatured"
                      label="Property Featured"
                      placeholderText={'Enter property featured'}
                      type="number"
                      errors={errors}
                      required={false}
                      handleDraftFields={(name, val) => handleDraftFields(name, val)}
                    />
                  </View>
                </View> */}

                <CommonField
                  control={control}
                  name="propertyFeatured"
                  label="Is Property Featured?"
                  placeholderText={''}
                  type="radio"
                  errors={errors}
                  handleDraftFields={(name, val) =>
                    handleDraftFields(name, val)
                  }
                />
              </View>

              <View style={styles.card}>
                <CommonHeading name={'Location'} />
                <Text
                  style={[
                    {
                      color: '#FF2E2E',
                      fontSize: 13,
                      fontWeight: '400',
                      marginBottom: 10,
                    },
                  ]}>
                  Note: Enter valid pincode to get property area dropdown, state
                  and city.
                </Text>

                <CommonField
                  control={control}
                  name="zipcode"
                  label="Pincode"
                  placeholderText={'Enter pincode'}
                  type="number"
                  errors={errors}
                  required={true}
                  handleDraftFields={(name, val) =>
                    handleDraftFields(name, val)
                  }
                />

                <CommonField
                  control={control}
                  name="propertyArea"
                  label="Property Area"
                  placeholderText={'Select Property Area'}
                  type="multiselect"
                  options={getPropertyAreaOptions(locationList)}
                  errors={errors}
                  required={true}
                  handleDraftFields={(name, val) =>
                    handleDraftFields(name, val)
                  }
                />

                <CommonField
                  control={control}
                  name="propertyLocation"
                  label="Property Location"
                  placeholderText={'Enter property location'}
                  type="textarea"
                  errors={errors}
                  required={true}
                  handleDraftFields={(name, val) =>
                    handleDraftFields(name, val)
                  }
                />

                <View style={[styles.row]}>
                  <View style={[styles.half]}>
                    <CommonField
                      control={control}
                      name="stateId"
                      label="State"
                      placeholderText={'Enter State'}
                      type="input"
                      errors={errors}
                      required={true}
                      handleDraftFields={(name, val) =>
                        handleDraftFields(name, val)
                      }
                    />
                  </View>
                  <View style={[styles.half]}>
                    <CommonField
                      control={control}
                      name="cityId"
                      label="City"
                      placeholderText={'Enter City'}
                      type="input"
                      errors={errors}
                      required={true}
                      handleDraftFields={(name, val) =>
                        handleDraftFields(name, val)
                      }
                    />
                  </View>
                </View>
              </View>

              <View style={styles.card}>
                <CommonHeading name={'Property Media'} />
                <CommonField
                  control={control}
                  name="propertyMapLocation"
                  label="Share your google-map link"
                  placeholderText={'Enter google map location link'}
                  type="input"
                  errors={errors}
                  handleDraftFields={(name, val) =>
                    handleDraftFields(name, val)
                  }
                />

                <CommonField
                  control={control}
                  name="propertyVideo"
                  label="Property video link"
                  placeholderText={'Enter youtube video link or instagram link'}
                  type="input"
                  errors={errors}
                  handleDraftFields={(name, val) =>
                    handleDraftFields(name, val)
                  }
                />

                <CommonField
                  control={control}
                  name="propertyImages"
                  label="Upload Property Images"
                  placeholderText={''}
                  type="image"
                  errors={errors}
                  required={true}
                  handleDraftFields={(name, val) =>
                    handleDraftFields(name, val)
                  }
                />
              </View>

              <View
                style={{
                  marginTop: -4,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <CommonButton
                  title="Save Draft Property"
                  loading={draftLoading}
                  onPress={handleDraft}
                  width={'48%'}
                  style={{paddingVertical: 15, marginTop: 0}}
                />

                <CommonButton
                  title="Submit Property"
                  loading={loading}
                  onPress={handleSubmit(onSubmit)}
                  width={'48%'}
                  style={{paddingVertical: 15, marginTop: 0}}
                />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {locationLoading > 0 ? (
        <FullScreenLoader visible={locationLoading} text="Please wait..." />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  half: {width: '49%'},
  card: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    marginBottom: 20,
  },
});

export default PropertyLeadForm;
