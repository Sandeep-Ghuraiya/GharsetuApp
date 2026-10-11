/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {StatusBar, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = props => {
  const navigation = useNavigation();

  return (
    <View style={styles.video}>
      {/* <StatusBar backgroundColor='orange' barStyle='dark-content' /> */}
      <Video
        source={require('../assets/videos/splashscreen.mp4')}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        muted={true}
        repeat={false}
        resizeMode="cover"
        // onEnd={handleVideoEnd}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  video: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
