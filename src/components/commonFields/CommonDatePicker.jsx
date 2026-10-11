/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const CommonDatePicker = ({visible, onClose, onSelectDate}) => {
  const [tempDate, setTempDate] = useState(new Date());

  const handleDateChange = date => {
    if (date) {
      setTempDate(date);

      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // month is 0-based
      const year = date.getFullYear();

      const formattedDate = `${day}-${month}-${year}`; // DD-MM-YYYY

      onSelectDate(formattedDate);
    }
    onClose();
  };

  return (
    <DateTimePickerModal
      isVisible={visible}
      date={tempDate}
      mode="date"
      minimumDate={new Date()}
      onConfirm={handleDateChange}
      onCancel={onClose}
    />
  );
};

export default CommonDatePicker;
