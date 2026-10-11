/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable curly */
import React, {memo, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Linking,
} from 'react-native';
import {MaterialIcons} from '@react-native-vector-icons/material-icons';
import {Fontisto} from '@react-native-vector-icons/fontisto';
//MODAL
import ImageCarouselModal from '../../models/ImageCarouselModal';

const ICON_COLOR = '#6C63FF';
const IMAGE_SIZE = 50;

const Row = ({
  icon,
  label,
  value,
  showVideo = false,
  selectedIndex = 0,
  imageVisible = false,
  videoVisible = false,
  showVideoVisible,
  showImageVisible,
  getSelectedIndex,
  featuredImage = null,
}) => {
  const isImageRow = icon === 'image';
  const hasImages = Array.isArray(value) && value.length > 0;
  const IconComponent = label === 'Village' ? Fontisto : MaterialIcons;

  const onImagePress = useCallback(
    index => {
      getSelectedIndex(index);
      showImageVisible(true);
    },
    [getSelectedIndex, showImageVisible],
  );

  const renderArrayText = () => {
    return (
      <View style={{flexDirection: 'row', gap: 5}}>
        {value?.map((item, index) => (
          <Text key={index} style={[styles.value]}>
            {item}
          </Text>
        ))}
      </View>
    );
  };

  const renderImages = () => {
    if (!hasImages) {
      return <Text style={styles.value}>-</Text>;
    }

    console.log('image');

    return (
      <View style={styles.imageContainer}>
        {value.map((item, index) => (
          <TouchableOpacity
            key={`${item}-${index}`}
            style={styles.imageWrapper}
            onPress={() => onImagePress(index)}>
            <Image source={{uri: item}} style={styles.image} />
          </TouchableOpacity>
        ))}

        <ImageCarouselModal
          visible={imageVisible}
          images={value}
          initialIndex={selectedIndex}
          onClose={() => showImageVisible(false)}
        />
      </View>
    );
  };

  const renderVideo = () => {
    console.log('ji');

    if (showVideo && !value) {
      return <Text style={styles.value}>-</Text>;
    }

    const handleVideo = () => {
      Linking.openURL(value);
    };

    return (
      <View style={{marginTop: 10}}>
        <TouchableOpacity onPress={handleVideo}>
          <Image source={{uri: featuredImage}} style={styles.image} />
        </TouchableOpacity>

        {/* <VideoModal
          visible={videoVisible}
          videoLink={value}
          onClose={() => showVideoVisible(false)}
        /> */}
      </View>
    );
  };

  const renderValue = () => {
    if (showVideo) return renderVideo();
    if (!isImageRow && hasImages) {
      return renderArrayText();
    }

    if (!isImageRow) {
      return <Text style={styles.value}>{value || '-'}</Text>;
    }
    return renderImages();
  };

  return (
    <View style={styles.row}>
      <IconComponent
        name={icon}
        size={22}
        color={ICON_COLOR}
        style={styles.icon}
      />

      <View style={{flex: 1}}>
        <Text style={styles.label}>{label}</Text>
        {renderValue()}
      </View>
    </View>
  );
};

Row.displayName = 'Row';

export default memo(Row);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.8,
    borderBottomColor: '#eee',
  },

  icon: {
    marginRight: 10,
  },

  label: {
    fontSize: 12,
    color: '#666',
  },

  value: {
    fontSize: 15,
    color: '#222',
    fontWeight: '600',
    marginTop: 2,
  },

  imageContainer: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  imageWrapper: {
    width: '16.66%',
  },

  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 6,
  },
});
