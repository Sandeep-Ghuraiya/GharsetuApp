/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CommonHeading = ({name}) => {
  return (
    <View>
      <Text style={styles.headingText}>{name}</Text>
    </View>
  );
};

export default CommonHeading;

const styles = StyleSheet.create({
  headingText: {
    color: '#000',
    fontWeight: '800',
    fontSize: 20,
    paddingVertical: 10,
  },
});
