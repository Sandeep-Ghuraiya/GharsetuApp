/* eslint-disable prettier/prettier */
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';

export const useSelectFilterForm = (defaultValues = {}, validationState) => {
  const schema = React.useMemo(() => {
    return yup.object().shape(validationState || {});
  }, [validationState]);

  return useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
};
