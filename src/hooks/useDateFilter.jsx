/* eslint-disable prettier/prettier */
// hooks/useDateFilter.js
import {useState} from 'react';
import dayjs from 'dayjs';

const useDateFilter = (initialDate = null) => {
  const [date, setDate] = useState(initialDate);
  const [isPickerVisible, setPickerVisible] = useState(false);

  const showPicker = () => setPickerVisible(true);
  const hidePicker = () => setPickerVisible(false);

  const onConfirm = selectedDate => {
    setDate(selectedDate);
    hidePicker();
  };

  const resetDate = () => setDate(null);

  const formattedDate = date ? dayjs(date).format('DD MMM YYYY') : '';

  return {
    date,
    formattedDate,
    isPickerVisible,
    showPicker,
    hidePicker,
    onConfirm,
    resetDate,
  };
};

export default useDateFilter;
