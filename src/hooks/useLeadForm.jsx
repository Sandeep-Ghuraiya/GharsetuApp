/* eslint-disable prettier/prettier */
// hooks/useLeadForm.js
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';

export default function useLeadForm() {
  const schema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string(),
    phone: yup
      .string()
      .required('Phone number is required')
      .matches(/^[6-9]\d{9}$/, 'Enter a valid Indian phone number'),
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    propertyName: yup.string().required('Property name is required'),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      propertyName: '',
    },
  });

  return methods;
}
