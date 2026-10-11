/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
// components/CommonText.js
import React from 'react';
import {Text, StyleSheet, useColorScheme} from 'react-native';

export default function CommonText({
  children,
  variant = 'body',
  size = 16,
  weight = '400',
  style,
  ...props
}) {
  // Dark/Light color mapping
  const colorStyles = {
    title: {color: '#000000'},
    subtitle: {color: '#333333'},
    label: {color: '#555555'},
    body: {color: '#444444'},
    description: {color: '#666666'},
    small: {color: '#777777'},
    error: {color: 'red'},
  };

  return (
    <Text
      style={[
        styles[variant],
        colorStyles[variant],
        size && {fontSize: size},
        weight && {fontWeight: weight},
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
  },
  small: {
    fontSize: 12,
  },
  error: {
    fontSize: 14,
    fontWeight: '500',
  },
});
