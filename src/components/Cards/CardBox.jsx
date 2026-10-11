/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {FontAwesome} from '@react-native-vector-icons/fontawesome';
import CommonText from '../common/CommonText';

const CardBox = ({
  icon = 'home-outline',
  title = 'Card Title',
  goToPage,
  props,
  from,
}) => {
  const handleToTouch = () => {
    // Handle card touch event
    props.navigation.navigate(goToPage, {from: from});
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleToTouch}>
      <FontAwesome
        name={icon}
        size={32}
        color="#5C5CFF"
        style={{marginBottom: 8}}
      />
      <CommonText variant="title" size={30} weight="600" style={styles.title}>
        {title}
      </CommonText>
    </TouchableOpacity>
  );
};

export default CardBox;

const styles = StyleSheet.create({
  card: {
    width: '30%',
    height: 114,
    backgroundColor: '#F2E9FF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 4,

    // Android shadow
    elevation: 6,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
