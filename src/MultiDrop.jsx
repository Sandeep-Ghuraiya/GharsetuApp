/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import AntDesign from '@react-native-vector-icons/ant-design';
import {Controller} from 'react-hook-form';

const MultiDrop = ({
  control,
  name,
  label,
  placeholderText,
  options = [],
  type = 'select',
  errors = {},
  disableState = true,
  setPropertyValue,
  required = false,
  getValue,
}) => {
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View>
      <Controller
        control={control}
        name={name}
        render={({field: {value, onChange}}) => (
          <Dropdown
            style={[
              styles.dropdown,
              isFocus && {borderColor: '#007AFF'},
              !disableState && {backgroundColor: '#f0f0f0'},
            ]}
            placeholderStyle={styles.placeholder}
            selectedTextStyle={styles.selectedText}
            itemTextStyle={styles.itemTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={options}
            search={false}
            labelField="label"
            valueField="value"
            placeholder={placeholderText}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              onChange(item.value);
              setIsFocus(false);
              // if (name === 'propertyType' ) {
              //   setPropertyValue(item.value);
              // }
            }}
            disable={!disableState}
          />
        )}
      />
    </View>
  );
};

export default MultiDrop;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  label: {
    marginBottom: 6,
    fontWeight: '600',
    color: '#000',
  },
  dropdown: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '#000',
  },
  textarea: {
    height: 100,
    paddingTop: 10,
  },
  placeholder: {
    color: '#666',
    fontSize: 15,
  },
  itemTextStyle: {
    color: '#000',
  },
  selectedText: {
    color: '#000',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 2,
  },
  inputSearchStyle: {
    height: 45,
    fontSize: 15,
    borderRadius: 10,
    color: '#000',
  },

  selectedStyle: {
    borderRadius: 10,
    backgroundColor: '#E9F3FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 8,
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconStyle: {
    width: 22,
    height: 22,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemText: {
    fontSize: 15,
    marginLeft: 10,
    color: '#333',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxChecked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },

  checkboxTick: {
    width: 10,
    height: 10,
    backgroundColor: '#000',
    borderRadius: 2,
  },
});
