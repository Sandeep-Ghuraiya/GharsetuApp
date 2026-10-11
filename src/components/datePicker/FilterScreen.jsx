/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
// components/DateFilter.js
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import useDateFilter from '../../hooks/useDateFilter';

const DateFilter = ({label = 'Select Date', onDateChange}) => {
  const {
    date,
    formattedDate,
    isPickerVisible,
    showPicker,
    hidePicker,
    onConfirm,
    resetDate,
  } = useDateFilter();

  const handleConfirm = selectedDate => {
    onConfirm(selectedDate);
    if (onDateChange) {
      onDateChange(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity style={styles.input} onPress={showPicker}>
        <Text style={formattedDate ? styles.text : styles.placeholder}>
          {formattedDate || 'Choose date'}
        </Text>
      </TouchableOpacity>

      {date && (
        <TouchableOpacity onPress={resetDate}>
          <Text style={styles.clear}>Clear</Text>
        </TouchableOpacity>
      )}

      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hidePicker}
      />
    </View>
  );
};

export default DateFilter;

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    color: '#333',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  placeholder: {
    color: '#999',
  },
  text: {
    color: '#000',
  },
  clear: {
    marginTop: 6,
    color: '#d00',
    fontSize: 12,
  },
});
