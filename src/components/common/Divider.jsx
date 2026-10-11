/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View} from 'react-native';

const Divider = ({
  height = 1,
  color = '#E5E7EB',
  marginVertical = 10,
  marginHorizontal = 0,
  width = '100%',
  opacity = 1,
}) => {
  return (
    <View
      style={[
        styles.divider,
        {
          height,
          width,
          backgroundColor: color,
          marginVertical,
          marginHorizontal,
          opacity,
        },
      ]}
    />
  );
};

export default Divider;

const styles = StyleSheet.create({
  divider: {
    alignSelf: 'center',
  },
});
