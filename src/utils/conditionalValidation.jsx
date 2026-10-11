/* eslint-disable prettier/prettier */
import * as yup from 'yup';

export const conditionalValidation = [
  {
    type: 'default',
    shape: {
      ownerStatus: yup.string(),

      ownerFirstName: yup.string().required('Owner first name is required'),

      ownerLastName: yup.string(),

      mobileNo: yup
        .string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
        .required('Mobile number is required'),

      propertyName: yup.string().required('Property name is required'),

      propertyPurpose: yup.string().required('Property Purpose is required'),

      propertyType: yup.string().required('Property type is required'),

      bedrooms: yup.string().required('Bedrooms is required'),

      bathrooms: yup.string().required('Bathrooms is required'),

      totalFloor: yup.string().required('Total Floor is required'),

      propertyFloor: yup.string().required('Flat Floor is required'),

      propertySize: yup.string().required('Property Configuration is required'), //1 BHK to 10 BHK, 1 RK to 6 RK

      propertyFurnishingTypes: yup.string(),

      propertyFacing: yup.string().required('Property facing is required'),

      propertyAge: yup.string().required('Property Age is required'),

      propertyAreaSquare: yup
        .string()
        .required('Property area (sq ft) is required'),

      // propertyUnitType: yup.string().required('Unit type is required'),

      parkingType: yup.string().required('Parking type is required'),

      propertyLocation: yup.string().required('Property location is required'),

      // ✅ ARRAY
      propertyArea: yup
        .array()
        .of(yup.string())
        .required('Property area is required')
        .min(1, 'Property area  is required'),

      stateId: yup.string().required('State is required'),

      cityId: yup.string().required('City is required'),

      zipcode: yup
        .string()
        .required('Zipcode is required')
        .matches(/^[0-9]{5,6}$/, 'Invalid zipcode'),

      popertyFacilitiesId: yup.array(),

      transactionType: yup.string().required('Transaction type is required'),

      propertySellingPrice: yup
        .string()
        .required('Selling price is required')
        .matches(/^[0-9]+$/, 'Only numbers allowed'),

      propertyActualPrice: yup
        .string()
        .required('Actual price is required')
        .matches(/^[0-9]+$/, 'Only numbers allowed'),

      propertyMapLocation: yup.string(),

      propertyUnitWidth: yup
        .string()
        .required('Property Unit Width is required'),

      propertyUnitDepth: yup
        .string()
        .required('Property Unit Depth is required'),

      propertyVideo: yup.string().url('Invalid video URL'),

      // ✅ ARRAY
      propertyImages: yup
        .array()
        .of(yup.string())
        .required('Image is required')
        .min(1, 'Image is required'),

      propertyFeatured: yup.string(),

      propertyIsSold: yup.string(),
    },
  },

  {
    type: 'Flat',
    shape: {
      ownerStatus: yup.string(),

      ownerFirstName: yup.string().required('Owner first name is required'),

      ownerLastName: yup.string(),

      mobileNo: yup
        .string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
        .required('Mobile number is required'),

      propertyName: yup.string().required('Property name is required'),

      propertyType: yup.string().required('Property type is required'),

      bedrooms: yup.string().required('Bedrooms is required'),

      bathrooms: yup.string().required('Bathrooms is required'),

      totalFloor: yup.string().required('Total Floor is required'),

      propertyFloor: yup.string().required('Flat Floor is required'),

      propertyFurnishingTypes: yup.string(),

      propertySize: yup.string().required('Property Configuration is required'), //1 BHK to 10 BHK, 1 RK to 6 RK

      propertyFacing: yup.string().required('Property facing is required'),

      propertyAge: yup.string().required('Property Age is required'),

      propertyAreaSquare: yup
        .string()
        .required('Property area (sq ft) is required'),

      parkingType: yup.string().required('Parking type is required'),

      propertyLocation: yup.string().required('Property location is required'),

      // ✅ ARRAY
      propertyArea: yup
        .array()
        .of(yup.string())
        .min(1, 'Property area is required')
        .required('Property area is required'),

      stateId: yup.string().required('State is required'),

      cityId: yup.string().required('City is required'),

      zipcode: yup
        .string()
        .required('Zipcode is required')
        .matches(/^[0-9]{5,6}$/, 'Invalid zipcode'),

      propertyPurpose: yup.string().required('Property Purpose is required'),

      popertyFacilitiesId: yup.array(),

      transactionType: yup.string().required('Transaction type is required'),

      propertySellingPrice: yup
        .string()
        .required('Selling price is required')
        .matches(/^[0-9]+$/, 'Only numbers allowed'),

      propertyActualPrice: yup
        .string()
        .required('Actual price is required')
        .matches(/^[0-9]+$/, 'Only numbers allowed'),

      propertyMapLocation: yup.string(),

      propertyUnitWidth: yup
        .string()
        .required('Property Unit Width is required'),

      propertyUnitDepth: yup
        .string()
        .required('Property Unit Depth is required'),

      propertyVideo: yup.string().url('Invalid video URL'),

      // ✅ ARRAY
      propertyImages: yup
        .array()
        .of(yup.string())
        .required('Image is required')
        .min(1, 'Image is required'),

      propertyFeatured: yup.string(),
    },
  },

  {
    type: 'Row House',
    shape: {
      ownerStatus: yup.string(),

      ownerFirstName: yup.string().required('Owner first name is required'),

      ownerLastName: yup.string(),

      mobileNo: yup
        .string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
        .required('Mobile number is required'),

      propertyName: yup.string().required('Property name is required'),

      propertyType: yup.string().required('Property type is required'),

      bedrooms: yup.string().required('Bedrooms is required'),

      bathrooms: yup.string().required('Bathrooms is required'),

      totalFloor: yup.string().required('Total Floor is required'),

      propertyFloor: yup.string(),

      propertySize: yup.string().required('Property Configuration is required'), //1 BHK to 10 BHK, 1 RK to 6 RK

      propertyFurnishingTypes: yup.string(),

      propertyFacing: yup.string().required('Property facing is required'),

      propertyAge: yup.string().required('Property Age is required'),
      propertyAreaSquare: yup
        .string()
        .required('Property area (sq ft) is required'),

      // propertyUnitType: yup.string().required('Unit type is required'),

      parkingType: yup.string().required('Parking type is required'),

      propertyLocation: yup.string().required('Property location is required'),

      // ✅ ARRAY
      propertyArea: yup
        .array()
        .of(yup.string())
        .min(1, 'Property area is required')
        .required('Property area is required'),

      stateId: yup.string().required('State is required'),

      cityId: yup.string().required('City is required'),

      zipcode: yup
        .string()
        .required('Zipcode is required')
        .matches(/^[0-9]{5,6}$/, 'Invalid zipcode'),

      propertyPurpose: yup.string().required('Property Purpose is required'),

      popertyFacilitiesId: yup.array(),

      transactionType: yup.string().required('Transaction type is required'),

      propertySellingPrice: yup
        .string()
        .required('Selling price is required')
        .matches(/^[0-9]+$/, 'Only numbers allowed'),

      propertyActualPrice: yup
        .string()
        .required('Actual price is required')
        .matches(/^[0-9]+$/, 'Only numbers allowed'),

      propertyMapLocation: yup.string(),

      propertyUnitWidth: yup
        .string()
        .required('Property Unit Width is required'),

      propertyUnitDepth: yup
        .string()
        .required('Property Unit Depth is required'),

      propertyVideo: yup.string().url('Invalid video URL'),

      // ✅ ARRAY
      propertyImages: yup
        .array()
        .of(yup.string())
        .min(1, 'Image is required')
        .required('Image is required'),

      propertyFeatured: yup.string(),

      propertyIsSold: yup.string(),
    },
  },

  {
    type: 'Bungalow',
    shape: {
      ownerStatus: yup.string(),

      ownerFirstName: yup.string().required('Owner first name is required'),

      ownerLastName: yup.string(),

      mobileNo: yup
        .string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
        .required('Mobile number is required'),

      propertyName: yup.string().required('Property name is required'),

      propertyType: yup.string().required('Property type is required'),

      bedrooms: yup.string().required('Bedrooms is required'),

      bathrooms: yup.string().required('Bathrooms is required'),

      totalFloor: yup.string().required('Total Floor is required'),

      propertyFloor: yup.string(),

      propertyFurnishingTypes: yup.string(),

      propertySize: yup.string().required('Property Configuration is required'), //1 BHK to 10 BHK, 1 RK to 6 RK

      propertyFacing: yup.string().required('Property facing is required'),

      propertyAge: yup.string().required('Property Age is required'),
      propertyAreaSquare: yup
        .string()
        .required('Property area (sq ft) is required'),

      // propertyUnitType: yup.string().required('Unit type is required'),

      parkingType: yup.string().required('Parking type is required'),

      propertyLocation: yup.string().required('Property location is required'),

      // ✅ ARRAY
      propertyArea: yup
        .array()
        .of(yup.string())
        .min(1, 'Property area is required')
        .required('Property area is required'),

      stateId: yup.string().required('State is required'),

      cityId: yup.string().required('City is required'),

      zipcode: yup
        .string()
        .required('Zipcode is required')
        .matches(/^[0-9]{5,6}$/, 'Invalid zipcode'),

      propertyPurpose: yup.string().required('Property Purpose is required'),

      popertyFacilitiesId: yup.array(),

      transactionType: yup.string().required('Transaction type is required'),

      propertySellingPrice: yup
        .string()
        .required('Selling price is required')
        .matches(/^[0-9]+$/, 'Only numbers allowed'),

      propertyActualPrice: yup
        .string()
        .required('Actual price is required')
        .matches(/^[0-9]+$/, 'Only numbers allowed'),

      propertyMapLocation: yup.string(),

      propertyUnitWidth: yup
        .string()
        .required('Property Unit Width is required'),

      propertyUnitDepth: yup
        .string()
        .required('Property Unit Depth is required'),

      propertyVideo: yup.string().url('Invalid video URL'),

      // ✅ ARRAY
      propertyImages: yup
        .array()
        .of(yup.string())
        .required('Image is required')
        .min(1, 'Image is required'),

      propertyFeatured: yup.string(),

      propertyIsSold: yup.string(),
    },
  },

  {
    type: 'Shop',
    shape: {
      ownerStatus: yup.string(),

      ownerFirstName: yup.string().required('Owner first name is required'),

      ownerLastName: yup.string(),

      mobileNo: yup
        .string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
        .required('Mobile number is required'),

      propertyName: yup.string().required('Property name is required'),

      propertyType: yup.string().required('Property type is required'),

      bedrooms: yup.string(),

      bathrooms: yup.string(),

      totalFloor: yup.string().required('Total Floor is required'),

      propertyFloor: yup.string().required('Flat Floor is required'),

      propertySize: yup.string(), //1 BHK to 10 BHK, 1 RK to 6 RK

      propertyFurnishingTypes: yup.string(),

      propertyFacing: yup.string().required('Property facing is required'),

      propertyAge: yup.string().required('Property Age is required'),
      propertyAreaSquare: yup
        .string()
        .required('Property area (sq ft) is required'),

      // propertyUnitType: yup.string().required('Unit type is required'),

      parkingType: yup.string().required('Parking type is required'),

      propertyLocation: yup.string().required('Property location is required'),

      // ✅ ARRAY
      propertyArea: yup
        .array()
        .of(yup.string())
        .min(1, 'Property area is required')
        .required('Property area is required'),
      stateId: yup.string().required('State is required'),

      cityId: yup.string().required('City is required'),

      zipcode: yup
        .string()
        .required('Zipcode is required')
        .matches(/^[0-9]{5,6}$/, 'Invalid zipcode'),

      propertyPurpose: yup.string().required('Property Purpose is required'),

      popertyFacilitiesId: yup.array(),

      transactionType: yup.string().required('Transaction type is required'),

      propertySellingPrice: yup
        .string()
        .required('Selling price is required')
        .matches(/^[0-9]+$/, 'Only numbers allowed'),

      propertyActualPrice: yup
        .string()
        .required('Actual price is required')
        .matches(/^[0-9]+$/, 'Only numbers allowed'),

      propertyMapLocation: yup.string(),

      propertyUnitWidth: yup
        .string()
        .required('Property Unit Width is required'),

      propertyUnitDepth: yup
        .string()
        .required('Property Unit Depth is required'),

      propertyVideo: yup.string().url('Invalid video URL'),

      // ✅ ARRAY
      propertyImages: yup
        .array()
        .of(yup.string())
        .required('Image is required')
        .min(1, 'Image is required'),

      propertyFeatured: yup.string(),

      propertyIsSold: yup.string(),
    },
  },

  {
    type: 'Office',
    shape: {
      ownerStatus: yup.string(),

      ownerFirstName: yup.string().required('Owner first name is required'),

      ownerLastName: yup.string(),

      mobileNo: yup
        .string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
        .required('Mobile number is required'),

      propertyName: yup.string().required('Property name is required'),

      propertyType: yup.string().required('Property type is required'),

      bedrooms: yup.string(),

      bathrooms: yup.string(),

      totalFloor: yup.string().required('Total Floor is required'),

      propertyFloor: yup.string().required('Flat Floor is required'),

      propertySize: yup.string(), //1 BHK to 10 BHK, 1 RK to 6 RK

      propertyFurnishingTypes: yup.string(),

      propertyFacing: yup.string().required('Property facing is required'),

      propertyAge: yup.string().required('Property Age is required'),
      propertyAreaSquare: yup
        .string()
        .required('Property area (sq ft) is required'),

      // propertyUnitType: yup.string().required('Unit type is required'),

      parkingType: yup.string().required('Parking type is required'),

      propertyLocation: yup.string().required('Property location is required'),

      // ✅ ARRAY
      propertyArea: yup
        .array()
        .of(yup.string())
        .min(1, 'Property area is required')
        .required('Property area is required'),
      stateId: yup.string().required('State is required'),

      cityId: yup.string().required('City is required'),

      zipcode: yup
        .string()
        .required('Zipcode is required')
        .matches(/^[0-9]{5,6}$/, 'Invalid zipcode'),

      propertyPurpose: yup.string().required('Property Purpose is required'),

      popertyFacilitiesId: yup.array(),

      transactionType: yup.string().required('Transaction type is required'),

      propertySellingPrice: yup
        .string()
        .required('Selling price is required')
        .matches(/^[0-9]+$/, 'Only numbers allowed'),

      propertyActualPrice: yup
        .string()
        .required('Actual price is required')
        .matches(/^[0-9]+$/, 'Only numbers allowed'),

      propertyMapLocation: yup.string(),

      propertyUnitWidth: yup
        .string()
        .required('Property Unit Width is required'),

      propertyUnitDepth: yup
        .string()
        .required('Property Unit Depth is required'),

      propertyVideo: yup.string().url('Invalid video URL'),

      // ✅ ARRAY
      propertyImages: yup
        .array()
        .of(yup.string())
        .required('Image is required')
        .min(1, 'Image is required'),

      propertyFeatured: yup.string(),

      propertyIsSold: yup.string(),
    },
  },

  {
    type: 'Plot',
    shape: {
      ownerStatus: yup.string(),

      ownerFirstName: yup.string().required('Owner first name is required'),

      ownerLastName: yup.string(),

      mobileNo: yup
        .string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
        .required('Mobile number is required'),

      propertyName: yup.string().required('Property name is required'),

      propertyType: yup.string().required('Property type is required'),

      bedrooms: yup.string(),

      bathrooms: yup.string(),

      totalFloor: yup.string(),

      propertyFloor: yup.string(),

      propertySize: yup.string(), //1 BHK to 10 BHK, 1 RK to 6 RK

      propertyFurnishingTypes: yup.string(),

      propertyFacing: yup.string().required('Property facing is required'),

      propertyAge: yup.string().required('Property Age is required'),
      propertyAreaSquare: yup
        .string()
        .required('Property area (sq ft) is required'),

      // propertyUnitType: yup.string().required('Unit type is required'),

      parkingType: yup.string().required('Parking type is required'),

      propertyLocation: yup.string().required('Property location is required'),

      // ✅ ARRAY
      propertyArea: yup
        .array()
        .of(yup.string())
        .min(1, 'Property area is required')
        .required('Property area is required'),

      stateId: yup.string().required('State is required'),

      cityId: yup.string().required('City is required'),

      zipcode: yup
        .string()
        .required('Zipcode is required')
        .matches(/^[0-9]{5,6}$/, 'Invalid zipcode'),

      propertyPurpose: yup.string().required('Property Purpose is required'),

      popertyFacilitiesId: yup.array(),

      transactionType: yup.string().required('Transaction type is required'),

      propertySellingPrice: yup
        .string()
        .required('Selling price is required')
        .matches(/^[0-9]+$/, 'Only numbers allowed'),

      propertyActualPrice: yup
        .string()
        .required('Actual price is required')
        .matches(/^[0-9]+$/, 'Only numbers allowed'),

      propertyMapLocation: yup.string(),

      propertyUnitWidth: yup
        .string()
        .required('Property Unit Width is required'),

      propertyUnitDepth: yup
        .string()
        .required('Property Unit Depth is required'),

      propertyVideo: yup.string().url('Invalid video URL'),

      // ✅ ARRAY
      propertyImages: yup
        .array()
        .of(yup.string())
        .required('Image is required')
        .min(1, 'Image is required'),

      propertyFeatured: yup.string(),

      propertyIsSold: yup.string(),
    },
  },
];
