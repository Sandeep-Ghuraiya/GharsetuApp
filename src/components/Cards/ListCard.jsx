/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable curly */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Ionicons} from '@react-native-vector-icons/ionicons';
import {Feather} from '@react-native-vector-icons/feather';
import {SelectColors} from '../../constant/Colors';
import useTimeAgo from '../../hooks/useDateFormat';

export default function ListCard({
  title = 'User Name',
  subtitle = '',
  createdAt = '',
  onPress = () => {},
  icon = 'person-circle-outline',
  secondaryIcon = false,
  iconName = 'chevron-forward-outline',
}) {
  const { getTimeAgo } = useTimeAgo();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, {backgroundColor: '#FFF'}]}>
      <View style={styles.leftRow}>
        <Ionicons
          name={icon}
          size={40}
          color={SelectColors.secondaryOrangeColor}
        />

        <View style={{marginLeft: 12}}>
          <Text style={[styles.title, {color: '#333'}]}>{title}</Text>
          {subtitle ? (
            <Text style={[styles.subtitle, {color: '#666'}]}>{subtitle}</Text>
          ) : null}
          {createdAt ? (
            <Text style={[styles.subtitle, {color: '#666'}]}>
              {getTimeAgo(createdAt)}
            </Text>
          ) : null}
        </View>
      </View>
      {secondaryIcon ? (
        <View style={{marginLeft: 'auto'}}>
          <Feather
            name={iconName}
            size={24}
            color={SelectColors.thirdBlueColor}
          />
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginVertical: 8,

    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 3,

    // Android Shadow
    elevation: 4,
  },

  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
  },

  subtitle: {
    marginTop: 3,
    fontSize: 13,
  },
});
