/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable curly */
import {useCallback, useEffect, useRef, useState} from 'react';

import {Alert} from 'react-native';

import {launchImageLibrary} from 'react-native-image-picker';

import {Image as ImageCompressor} from 'react-native-compressor';

import RNFS from 'react-native-fs';

export const useImageUpload = (maxImages = 4, imageValue = []) => {
  const [images, setImages] = useState([]);

  const [imagesArray, setImagesArray] = useState(imageValue);

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current && imageValue?.length) {
      setImagesArray(imageValue);

      hasInitialized.current = true;
    }
  }, [imageValue]);

  const MAX_SIZE = 500 * 1024; // 500 KB

  const STEPS = [
    {quality: 0.7, maxWidth: 1600},

    {quality: 0.6, maxWidth: 1400},

    {quality: 0.5, maxWidth: 1200},

    {quality: 0.4, maxWidth: 1000},

    {quality: 0.3, maxWidth: 800},

    {quality: 0.25, maxWidth: 700},
  ];

  const getFileSize = async uri => {
    const stat = await RNFS.stat(uri.replace('file://', ''));

    return stat.size;
  };

  const convertToBase64 = async (uri, type) => {
    const base64 = await RNFS.readFile(uri.replace('file://', ''), 'base64');

    return `data:${type};base64,${base64}`;
  };

  const compressImage = async asset => {
    let uri = asset.uri;

    for (let step of STEPS) {
      uri = await ImageCompressor.compress(uri, {
        quality: step.quality,

        maxWidth: step.maxWidth,
      });

      const size = await getFileSize(uri);

      console.log(
        `Compressed → ${step.quality}, ${step.maxWidth}px = ${(
          size / 1024
        ).toFixed(1)} KB`,
      );

      if (size <= MAX_SIZE) {
        const base64 = await convertToBase64(asset.uri, asset.type);

        return {
          ...asset,

          uri: base64,

          fileSize: size,
        };
      }
    }

    return null;
  };

  const pickImage = () => {
    // ✅ FIX: check total images

    if (imagesArray.length >= maxImages) {
      Alert.alert('Limit reached', `Max ${maxImages} images allowed`);

      return;
    }

    launchImageLibrary({mediaType: 'photo'}, async res => {
      if (res.didCancel || res.errorCode) return;

      const asset = res.assets[0];

      try {
        const originalSize = await getFileSize(asset.uri);

        console.log(
          'Original size:',

          (originalSize / 1024 / 1024).toFixed(2),

          'MB',
        );

        if (originalSize <= MAX_SIZE) {
          const base64 = await convertToBase64(asset.uri, asset.type);

          setImages(prev => [
            ...prev,

            {
              ...asset,

              uri: base64,

              fileSize: originalSize,
            },
          ]);

          setImagesArray(prev => {
            if (prev.length >= maxImages) return prev;

            return [...prev, base64];
          });

          return;
        }

        const compressed = await compressImage(asset);

        if (!compressed) {
          Alert.alert(
            'Image Too Large',

            'Unable to compress image under 500KB. Please select another image.',
          );

          return;
        }

        setImages(prev => [...prev, compressed]);

        setImagesArray(prev => {
          if (prev.length >= maxImages) return prev;

          return [...prev, compressed.uri];
        });
      } catch (err) {
        Alert.alert('Error', 'Image processing failed');

        console.log(err);
      }
    });
  };

  const removeImage = index => {
    setImages(prev => prev.filter((_, i) => i !== index));

    setImagesArray(prev => prev.filter((_, i) => i !== index));
  };

  return {
    images,

    imagesArray,

    pickImage,

    removeImage,

    // ✅ FIX: use imagesArray length

    isMax: imagesArray.length >= maxImages,
  };
};
