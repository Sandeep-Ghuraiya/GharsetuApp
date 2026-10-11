/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const CommonTimePicker = ({
  visible,
  onClose,
  onSelectTime,
  selectedTime = '',
}) => {
  const [tempTime, setTempTime] = useState(new Date());

  const handleChange = date => {
    console.warn('A date has been picked: ', date);
    if (date) {
      setTempTime(date);
      let hours = date.getHours();
      const minutes = String(date.getMinutes()).padStart(2, '0');

      // Determine AM/PM
      const ampm = hours >= 12 ? 'PM' : 'AM';

      // Convert to 12-hour format
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'

      const time = `${hours}:${minutes} ${ampm}`; // e.g., 12:11 PM
      onSelectTime(time);
    }
    // setTimeout(() => {
    onClose();
    // }, 400);
  };

  return (
    <DateTimePickerModal
      isVisible={visible}
      date={tempTime}
      mode="time"
      onConfirm={handleChange}
      onCancel={onClose}
    />
  );
};

export default CommonTimePicker;
