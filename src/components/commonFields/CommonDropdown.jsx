/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {useThemeColors} from '../../hooks/useThemeColors';
import {useInputColors} from '../../hooks/useInputColors';

const CommonDropdown = ({
  label,
  data,
  value,
  onChange,
  placeholder = 'Select',
  required = false,
  disabled = false,
  error,
}) => {
  const {isDark, text} = useThemeColors();
  const {card, placeholderText, activeBorder} = useInputColors();

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
        {label && <Text style={[styles.label]}>{label}</Text>}
        {required && <Text style={{color: 'red', marginLeft: 4}}>*</Text>}
      </View>

      <Dropdown
        style={[
          styles.dropdown,
          disabled && styles.disabled,
          error && styles.errorBorder,
        ]}
        placeholderStyle={[styles.placeholderStyle, {color: placeholderText}]}
        selectedTextStyle={[styles.selectedTextStyle]}
        inputSearchStyle={[styles.inputSearchStyle]}
        itemTextStyle={styles.itemTextStyle}
        itemContainerStyle={styles.itemContainerStyle}
        data={data}
        search
        maxHeight={450}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          onChange(item.value);
        }}
        disable={disabled}
      />

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default CommonDropdown;

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  dropdown: {
    height: 55,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  disabled: {
    backgroundColor: '#f2f2f2',
  },
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#000',
  },
  inputSearchStyle: {
    height: 50,
    fontSize: 14,
    color: '#000',
  },
  itemTextStyle: {
    color: '#000',
  },
  errorBorder: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    marginTop: 3,
    fontSize: 12,
  },
});
