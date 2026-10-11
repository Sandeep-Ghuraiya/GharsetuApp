// import {useForm} from 'react-hook-form';
// import * as yup from 'yup';
// import {yupResolver} from '@hookform/resolvers/yup';

// export const useSelectFilterForm = (defaultValues = {}) => {
//   const schema = yup.object().shape({
//     ownerStatus: yup.string().nullable(),

//     ownerFirstName: yup.string().min(2, 'First name is too short!').nullable(),

//     ownerLastName: yup.string().min(2, 'Last name is too short!').nullable(),

//     mobileNo: yup
//       .string()
//       .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
//       .nullable(),

//     propertyName: yup.string().min(3, 'Property name is too short!').nullable(),

//     propertyType: yup
//       .string()
//       .notOneOf(['any'], 'Please select Property Type!')
//       .nullable(),

//     bedrooms: yup
//       .string()
//       .notOneOf(['any'], 'Please select Bedrooms!')
//       .nullable(),

//     bathrooms: yup
//       .string()
//       .notOneOf(['any'], 'Please select Bathrooms!')
//       .nullable(),

//     propertyFacing: yup
//       .string()
//       .notOneOf(['any'], 'Please select Property Facing!')
//       .nullable(),

//     propertyAge: yup
//       .string()
//       .matches(/^[0-9]{1,2}$/, 'Please select property age')
//       .nullable(),

//     propertyAreaSquare: yup
//       .string()
//       .notOneOf(['any'], 'Please select Area (Sq Ft)!')
//       .nullable(),

//     propertyUnitType: yup
//       .string()
//       .notOneOf(['any'], 'Please select Unit Type!'),

//     parkingType: yup.string().notOneOf(['any'], 'Please select Parking Type!'),

//     propertyLocation: yup.string().min(3, 'Location is too short!').nullable(),

//     // ✅ ARRAY FIELD
//     propertyArea: yup.array().of(yup.string()).nullable(),

//     stateId: yup.string().notOneOf(['any'], 'Please select State!').nullable(),

//     cityId: yup.string().notOneOf(['any'], 'Please select City!').nullable(),

//     zipcode: yup
//       .string()
//       .matches(/^[0-9]{5,6}$/, 'Invalid Zipcode')
//       .nullable(),

//     transactionType: yup
//       .string()
//       .notOneOf(['any'], 'Please select Transaction Type!')
//       .nullable(),

//     propertySellingPrice: yup
//       .string()
//       .matches(/^[0-9]+$/, 'Only numbers allowed')
//       .nullable(),

//     propertyActualPrice: yup
//       .string()
//       .matches(/^[0-9]+$/, 'Only numbers allowed')
//       .nullable(),

//     propertyFeaturedImage: yup.string(),

//     propertyVideo: yup.string().url('Invalid video URL'),

//     // ✅ ARRAY FIELD
//     propertyImages: yup.array().of(yup.string()).nullable(),
//   });

//   const formMethods = useForm({
//     defaultValues,
//     resolver: yupResolver(schema),
//     mode: 'onChange',
//   });

//   return formMethods;
// };



  // const handlePayment = async amount => {
  //   try {
  //     const options = {
  //       description: 'Test Payment',
  //       image: 'https://picsum.photos/id/1/200/300',
  //       currency: 'INR',
  //       key: 'rzp_test_SAP2WC0HyIMBY4',
  //       amount: amount * 100,
  //       // order_id: order.order.id,
  //       name: 'Gharsetu',
  //       prefill: {
  //         email: userData?.email,
  //         contact: userData?.mobile_no,
  //         name: `${userData?.first_name} ${userData?.last_name}`,
  //       },
  //       theme: {color: SelectColors.accentBlueColor},
  //     };

  //     // 3. Open Razorpay
  //     RazorpayCheckout.open(options)
  //       .then(data => {
  //         console.log('Success:', data);
  //         // send to backend for verification
  //       })
  //       .catch(error => {
  //         console.log('Error:', error);
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };