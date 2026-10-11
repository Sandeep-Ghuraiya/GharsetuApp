/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MaterialDesignIcons} from '@react-native-vector-icons/material-design-icons';
import CommonText from '../common/CommonText';
import {SelectColors} from '../../constant/Colors';

const RectangleBox = ({
  icon = 'home-outline',
  headerTitle = 'Leads',
  infoText = 'hello',
  width = '100%',
  goToPage,
  navigation,
  from,
}) => {
  const handleToTouch = useCallback(() => {
    if (navigation && goToPage) {
      navigation.navigate(goToPage, {from: from});
    }
  }, [navigation, goToPage]);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.card, {width}]}
      onPress={handleToTouch}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>{headerTitle}</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <CommonText
            variant="title"
            size={20}
            weight="700"
            style={styles.title}>
            {infoText}
          </CommonText>

          <MaterialDesignIcons
            name={icon}
            color="#FF8A5C"
            size={40}
            style={styles.icon}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(RectangleBox);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F2E9FF',
    borderRadius: 10,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  container: {
    borderRadius: 10,
    overflow: 'hidden',
  },

  header: {
    backgroundColor: SelectColors.thirdBlueColor,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },

  title: {
    fontSize: 14,
    fontWeight: '600',
  },

  icon: {
    marginTop: -2,
  },
});
