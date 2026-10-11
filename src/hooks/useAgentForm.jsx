/* eslint-disable prettier/prettier */
// hooks/useLeadForm.js
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';

export default function useAgentForm(defaultValues = {}) {
  const schema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string(),
    phone: yup
      .string()
      .required('Phone number is required')
      .matches(/^[6-9]\d{9}$/, 'Enter a valid Indian phone number'),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  return methods;
}
