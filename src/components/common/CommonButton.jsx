/* eslint-disable prettier/prettier */
// components/CommonButton.js
import React from 'react';
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {SelectColors} from '../../constant/Colors';

export default function CommonButton({
  title = 'Button',
  onPress = () => {},
  loading = false,
  disabled = false,
  variant = 'primary', // primary | outline | danger
  style,
  width = 100,
  textStyle,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        styles[variant],
        (disabled || loading) && styles.disabled,
        {width: width},
        style,
      ]}>
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? SelectColors.primaryBlueColor : '#FFF'}
        />
      ) : (
        <Text
          style={[
            styles.text,
            variant === 'outline' && {color: SelectColors.primaryBlueColor},
            textStyle,
          ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primary: {
    backgroundColor: '#6C63FF',
  },

  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3D5AFE',
  },

  danger: {
    backgroundColor: '#F62217',
  },

  text: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  disabled: {
    opacity: 0.5,
  },
});
