/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
// components/CommonInput.js
import React, {useState} from 'react';
import {TextInput, View, Text, StyleSheet} from 'react-native';
import {useInputColors} from '../../hooks/useInputColors';

export default function CommonInput({
  label,
  error,
  placeholder,
  required = false,
  multilines = false,
  numberOfLines = 1,
  style,
  value,
  ...props
}) {
  const {card, placeholderText, activeBorder} = useInputColors();
  const [isFocused, setIsFocused] = useState(false);

  // console.log('eror',error);

  return (
    <View style={styles.inputContainer}>
      <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
        {label && <Text style={[styles.label]}>{label}</Text>}
        {required && <Text style={{color: 'red', marginLeft: 4}}>*</Text>}
      </View>

      <TextInput
        {...props}
        multiline={multilines}
        numberOfLines={numberOfLines}
        placeholder={placeholder}
        placeholderTextColor={placeholderText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
        style={[
          styles.input,
          {
            backgroundColor: card,
            borderColor: isFocused ? activeBorder : '#555',
          },
          error && styles.errorBorder,
          style,
        ]}
      />

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {marginBottom: 15},
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 55,
    borderColor: '#ccc',
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
