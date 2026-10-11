/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable curly */
/* eslint-disable no-unused-vars */
import React, {useCallback, useEffect, useMemo, useState} from 'react';
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
import CommonAlertModel from '../models/CommonAlertModel';
import {useDispatch, useSelector} from 'react-redux';
import FullScreenLoader from '../models/FullScreenLoader';
import {getPropertyAreaOptions} from '../utils/dropdownUtils';
import {
  addNewProperty,
  editExistingProperty,
} from '../Redux/Reducers/propertyReducer';
import {getZipLocationList} from '../Redux/Reducers/locationReducer';
import CommonHeading from '../components/common/CommonHeading';
import useDropDownData from '../hooks/useDropDownData';
import useFloorNumber from '../hooks/useFloorNumber';
import usePropertyConfiguration from '../hooks/usePropertyConfiguration';
import {conditionalValidation} from '../utils/conditionalValidation';
import useMobileNoDetails from '../hooks/useMobileNoDetails';

const EditPropertyForm = ({navigation, propertyItem, name}) => {
  const zipLocationData = useSelector(state => state.locationData.locationList);
  const {propertyEditResponse, propertyAddResponse} = useSelector(
    state => state.propertiesData,
  );

  const {mobileNoData} = useMobileNoDetails();

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

  const dispatch = useDispatch();

  const newLocationList = useMemo(() => {
    return zipLocationData || [];
  }, [zipLocationData]);

  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationList, setLocationList] = useState([]);
  const [propertyTypeValue, setPropertyTypeValue] = useState(
    propertyItem?.property_type,
  );
  const [houseDisable, setHouseDisable] = useState(true);
  const [disableState, setDisableState] = useState(true);
  const [totalFloorDisabled, setTotalFloorDisabled] = useState(true);
  const [bhkDisabled, setBhkDisabled] = useState(true);
  const [totalFloorValue, setTotalFloorValue] = useState(
    propertyItem?.total_floors,
  );
  const [fieldValidationState, setFieldValidationState] = useState(
    propertyItem?.property_type,
  );
  const [validationState, setValidationState] = useState(
    conditionalValidation[0].shape,
  );

  const {totalFloorNumber, floorNumber} = useFloorNumber(15, totalFloorValue);
  const {propertyConfiguration} = usePropertyConfiguration();

  useEffect(() => {
    if (!conditionalValidation || !fieldValidationState) return;

    const getRequiredState = conditionalValidation.find(
      item => item.type === fieldValidationState,
    );

    setValidationState(getRequiredState?.shape || {});
    // console.log('Required:', getRequiredState);
  }, [fieldValidationState]);

  useEffect(() => {
    if (propertyItem?.zipcode) {
      const action = {
        action: 'resolve_pincode',
        pincode: Number(propertyItem?.zipcode),
      };
      dispatch(getZipLocationList(action));
    }
  }, [propertyItem, dispatch]);

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
  }, [propertyTypeValue, propertyItem]);

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

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors},
  } = useSelectFilterForm(
    {
      ownerFirstName: propertyItem?.owner_first_name || '',
      ownerLastName: propertyItem?.owner_last_name || '',
      mobileNo: propertyItem?.mobile_no || '',
      propertyName: propertyItem?.property_name || '',
      propertyPurpose: propertyItem?.property_purpose || '',
      propertyType: propertyItem?.property_type || '',
      totalFloor: propertyItem?.total_floors || '',
      propertyFloor: propertyItem?.flat_floor || '',
      propertySize: propertyItem?.property_size_bhk || '', //1 BHK to 10 BHK, 1 RK to 6 RK
      bedrooms: propertyItem?.bedrooms || '',
      bathrooms: propertyItem?.bathrooms || '',
      propertyFacing: propertyItem?.property_facing || '',
      propertyAreaSquare: propertyItem?.property_area_square || '',
      propertyUnitWidth: propertyItem?.unit_width || '',
      propertyUnitDepth: propertyItem?.unit_depth || '',
      propertyAge: propertyItem?.property_age || '',
      propertyFurnishingTypes: propertyItem?.Property_furnishing_types || '',
      // propertyUnitType: propertyItem?.property_unit_type || '',
      popertyFacilitiesId: propertyItem?.features || [],
      parkingType: propertyItem?.parking_type || '',
      propertySellingPrice: propertyItem?.property_selling_price || '',
      propertyActualPrice: propertyItem?.property_actual_price || '',
      transactionType: propertyItem?.transaction_type || '',
      zipcode: propertyItem?.zipcode || '',
      propertyArea: propertyItem?.area || [],
      propertyLocation: propertyItem?.property_location || '',
      stateId: propertyItem?.state || '',
      cityId: propertyItem?.city || '',
      propertyMapLocation: propertyItem?.map_location_url || '',
      propertyVideo: propertyItem?.property_video_url || '',
      propertyImages: propertyItem?.property_images || [],
      propertyRating: propertyItem?.property_rating || '',
      propertyFeatured: propertyItem?.is_featured || '',
      propertyIsSold: propertyItem?.is_sold || '',
    },
    validationState,
  );

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [propertyAddResponse, propertyEditResponse]);

  const onSubmit = data => {
    setLoading(true);

    const type = name === 'PublishProperty' ? 'publish' : 'draft';

    const formProperty = JSON.stringify({
      owner_mobile_no: mobileNoData,
      action: type === 'publish' ? 'property_update' : 'property_add',
      ...(type === 'draft' && {draft_id: propertyItem?.id}),
      ...(type === 'publish' && {property_id: propertyItem?.id}),
      Contact_Display: 'owner',
      property_name: data.propertyName,
      property_slug: '',
      property_type: data.propertyType,
      property_facing: data.propertyFacing,
      property_age: data.propertyAge,
      property_location: data.propertyLocation,
      state: data.stateId,
      city: data.cityId,
      zipcode: data.zipcode,
      area: data.propertyArea,
      property_area_square: data.propertyAreaSquare,
      property_unit_type: '',
      property_configuration_bhk: bhkDisabled ? data.propertySize : '',
      total_floors: totalFloorDisabled ? data.totalFloor : '',
      flat_floor: houseDisable ? data.propertyFloor : '',
      property_rating: data.propertyRating,
      is_featured: data.propertyFeatured,
      ...(type === 'publish' && {is_sold: data.propertyIsSold}),
      features: data.popertyFacilitiesId,
      parking_type: data.parkingType,
      property_purpose: data.propertyPurpose,
      transaction_type: data.transactionType,
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
      Property_furnishing_types: '',
      featured_image: '',
      property_images: data.propertyImages,
      property_video: data.propertyVideo,
    });

    // console.log("payload", formProperty);

    setTimeout(() => {
      dispatch(
        type === 'publish'
          ? editExistingProperty(formProperty)
          : addNewProperty(formProperty),
      );
    }, 1000);
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
                      handleDraftFields={() => {}}
                    />
                  </View>
                  <View style={[styles.half]}>
                    <CommonField
                      control={control}
                      name="ownerLastName"
                      label="Owner Last Name"
                      placeholderText={'Enter last Name'}
                      type="input"
                      errors={errors}
                      // required={true}
                      handleDraftFields={() => {}}
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
                  handleDraftFields={() => {}}
                />
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
                  handleDraftFields={() => {}}
                />

                {/* <CommonField
                  control={control}
                  name="ownerStatus"
                  label="Property Status"
                  placeholderText={'Select status'}
                  type="select"
                  errors={errors}
                  options={[
                    {label: 'Old', value: 'Old'},
                    {label: 'Open', value: 'Open'},
                    {label: 'Sold', value: 'Sold'},
                  ]}
                  handleDraftFields={() => {}}
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
                  handleDraftFields={() => {}}
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
                  handleDraftFields={() => {}}
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
                      handleDraftFields={() => {}}
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
                      handleDraftFields={() => {}}
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
                  handleDraftFields={() => {}}
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
                      handleDraftFields={() => {}}
                    />
                  </View>
                  <View style={[styles.half]}>
                    <CommonField
                      control={control}
                      name="bathrooms"
                      label="Bathrooms"
                      placeholderText={'Select bathrooms'}
                      type="number"
                      errors={errors}
                      disableState={disableState}
                      required={true}
                      handleDraftFields={() => {}}
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
                      handleDraftFields={() => {}}
                    />
                  </View>
                  <View style={[styles.half]}>
                    <CommonField
                      control={control}
                      name="propertyAreaSquare"
                      label="Property Square Feet"
                      placeholderText={'Eg: 1000'}
                      type="number"
                      errors={errors}
                      required={true}
                      handleDraftFields={() => {}}
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
                      handleDraftFields={() => {}}
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
                      handleDraftFields={() => {}}
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
                      handleDraftFields={() => {}}
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
                      handleDraftFields={() => {}}
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
                  handleDraftFields={() => {}}
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
                  handleDraftFields={() => {}}
                />

                <View style={[styles.row]}>
                  <View style={[styles.half]}>
                    <CommonField
                      control={control}
                      name="propertySellingPrice"
                      label="Selling Price"
                      placeholderText={'Eg: 500000'}
                      type="number"
                      errors={errors}
                      required={true}
                      handleDraftFields={() => {}}
                    />
                  </View>
                  <View style={[styles.half]}>
                    <CommonField
                      control={control}
                      name="propertyActualPrice"
                      label="Actual Selling Price"
                      placeholderText={'Eg: 500000'}
                      type="number"
                      errors={errors}
                      required={true}
                      handleDraftFields={() => {}}
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
                  handleDraftFields={() => {}}
                />

                <CommonField
                  control={control}
                  name="propertyFeatured"
                  label="Is Property Featured?"
                  placeholderText={''}
                  type="radio"
                  errors={errors}
                  handleDraftFields={() => {}}
                />

                {name === 'PublishProperty' && (
                  <CommonField
                    control={control}
                    name="propertyIsSold"
                    label="Is Property Sold?"
                    placeholderText={''}
                    type="radio"
                    errors={errors}
                    handleDraftFields={() => {}}
                  />
                )}
              </View>

              <View style={styles.card}>
                <CommonHeading name={'Location'} />
                <Text style={[styles.noteText]}>
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
                  handleDraftFields={() => {}}
                />

                <CommonField
                  control={control}
                  name="propertyArea"
                  label="Property Area"
                  placeholderText={'Select Property Area'}
                  type="multiselect"
                  options={getPropertyAreaOptions(locationList)}
                  required={true}
                  errors={errors}
                  handleDraftFields={() => {}}
                />

                <CommonField
                  control={control}
                  name="propertyLocation"
                  label="Property Location"
                  placeholderText={'Enter property location'}
                  type="textarea"
                  errors={errors}
                  required={true}
                  handleDraftFields={() => {}}
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
                      handleDraftFields={() => {}}
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
                      handleDraftFields={() => {}}
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
                  handleDraftFields={() => {}}
                />

                <CommonField
                  control={control}
                  name="propertyVideo"
                  label="Property video link"
                  placeholderText={'Enter youtube video link or instagram link'}
                  type="input"
                  errors={errors}
                  handleDraftFields={() => {}}
                />

                <CommonField
                  control={control}
                  name="propertyImages"
                  label="Upload Property Images"
                  placeholderText={''}
                  type="image"
                  errors={errors}
                  required={true}
                  allPropertyImage={propertyItem?.property_images}
                  handleDraftFields={() => {}}
                />

                <Text style={styles.noteText}>Note:Save the change.</Text>
              </View>

              <View style={{marginTop: -4}}>
                <CommonButton
                  title={
                    name === 'PublishProperty'
                      ? 'Save Property'
                      : 'Submit Property'
                  }
                  loading={loading}
                  onPress={handleSubmit(onSubmit)}
                  width={'100%'}
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
  noteText: {
    color: '#FF2E2E',
    fontSize: 13,
    fontWeight: '400',
    marginBottom: 10,
  },
});

export default EditPropertyForm;
