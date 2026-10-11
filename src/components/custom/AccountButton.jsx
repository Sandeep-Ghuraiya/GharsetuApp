/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  View,
  ActivityIndicator,
} from 'react-native';

const AccountButton = ({onPress, label, loading, disabled}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      // disabled={disabled}
      style={[{paddingVertical: 5}]}>
      <ImageBackground
        source={require('../../assets/images/button_1.png')}
        style={[styles.imageContainer, styles.button]}
        resizeMode="cover">
        <View>
          {loading ? (
            <ActivityIndicator size={20} color={'#fff'} />
          ) : (
            <Text style={styles.text}>{label}</Text>
          )}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default AccountButton;

const styles = StyleSheet.create({
  button: {
    // Outer glow
    shadowColor: '#8A8AFF',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 12,

    justifyContent: 'center',
    alignItems: 'center',
  },

  innerGlow: {
    height: '92%',
    width: '96%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageContainer: {
    width: '100%',
    height: 60,
    overflow: 'hidden',
    borderRadius: 20,
  },

  text: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
