/* eslint-disable prettier/prettier */
import React from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

const FullScreenLoader = ({visible = false, text = 'Loading...'}) => {
  return (
    <Modal
      isVisible={visible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropOpacity={0.6}
      style={styles.modal}
      useNativeDriver
      hideModalContentWhileAnimating>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
        {text ? <Text style={styles.text}>{text}</Text> : null}
      </View>
    </Modal>
  );
};

export default FullScreenLoader;

const styles = StyleSheet.create({
  modal: {
    margin: 0, // IMPORTANT: full screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0.85)',
    padding: 25,
    borderRadius: 12,
    alignItems: 'center',
  },
  text: {
    marginTop: 12,
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});
