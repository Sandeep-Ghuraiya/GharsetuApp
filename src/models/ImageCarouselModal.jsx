/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import {MaterialIcons} from '@react-native-vector-icons/material-icons';
import Carousel from 'react-native-reanimated-carousel';
import {BlurView} from '@react-native-community/blur';

const {width, height} = Dimensions.get('window');

const ImageCarouselModal = ({
  visible,
  images = [],
  initialIndex = 0,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  return (
    <Modal
      isVisible={visible}
      style={styles.modal}
      backdropOpacity={0.85}
      animationIn="fadeIn"
      animationOut="fadeOut"
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      useNativeDriver>
      <View style={styles.container}>
        {/* 🔹 Blur Header with Close */}
        <View style={styles.header}>
          {Platform.OS === 'ios' ? (
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType="dark"
              blurAmount={12}
            />
          ) : (
            <View style={styles.androidBlurFallback} />
          )}

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <MaterialIcons name="close" color="#ffffff" size={40} />
          </TouchableOpacity>
        </View>

        {/* 🔹 Carousel */}
        <Carousel
          width={width}
          height={height * 0.75}
          data={images}
          defaultIndex={initialIndex}
          loop={false}
          pagingEnabled
          onSnapToItem={index => setCurrentIndex(index)}
          renderItem={({item}) => (
            <View style={styles.imageWrapper}>
              <Image
                source={{uri: item}}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          )}
        />

        {/* 🔹 Pagination */}
        <View style={styles.pagination}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentIndex === index && styles.activeDot]}
            />
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default ImageCarouselModal;

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  /* Header Blur */
  header: {
    height: 80,
    justifyContent: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  androidBlurFallback: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  closeBtn: {
    width: '100%',
    position: 'absolute',
    top: 40,
    right: 0,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  closeText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '600',
  },

  /* Carousel */
  imageWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },

  /* Pagination */
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#666',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 10,
    height: 10,
  },
});
