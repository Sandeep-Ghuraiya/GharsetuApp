/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
/** ICONS **/
import {Ionicons} from '@react-native-vector-icons/ionicons';

import AntDesign from '@react-native-vector-icons/ant-design';

const TabHeader = props => {
  const {navigation, route, icon, screenName, title} = props;
  const {name} = route;
  const {from} = route.params || {};

  return (
    <>
      <View
        style={[
          styles.headerContainer,
          {
            borderBottomColor: '#999',
            backgroundColor: '#8A8BFF',
          },
        ]}>
        {name === 'Home' ? null : (
          <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={'#fff'} />
          </TouchableOpacity>
        )}
        <View
          style={[
            {
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            },
          ]}>
          <Text
            style={{
              color: '#ffffff',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            {title}
          </Text>
        </View>
        {icon && (
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => navigation.navigate(screenName, {from: title})}>
            <AntDesign name="plus-circle" size={26} color={'#fff'} />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    // backgroundColor: 'pink',
    paddingTop: 45,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});

export default TabHeader;
