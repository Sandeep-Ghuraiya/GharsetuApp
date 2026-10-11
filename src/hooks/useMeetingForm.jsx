// hooks/useLeadForm.js
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';

export default function useMeetingForm(defaultValues = {}) {
  const schema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string(),
    meetingTitle: yup.string().required('Meeting Title is required'),
    meetingLocation: yup.string().required('Meeting Location is required'),
    meetingDate: yup.string().required('Meeting Date is required'),
    meetingTime: yup.string().required('Meeting Time is required'),
    meetingComment: yup.string().required('Meeting Comment is required'),
    mobileNo: yup
      .string()
      .matches(/^[6-9]\d{9}$/, 'Enter a valid  phone number'),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  return methods;
}
