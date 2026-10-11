/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import {useImageUpload} from '../../hooks/useImageUpload';
import {Feather} from '@react-native-vector-icons/feather';
import {SelectColors} from '../../constant/Colors';
import useEditImageUpload from '../../hooks/useEditImageUpload';

const ImageUploadField = ({label, onChange, allPropertyImage = []}) => {
  const {base64Images} = useEditImageUpload(allPropertyImage);

  const {images, imagesArray, pickImage, removeImage, isMax} = useImageUpload(
    4,
    base64Images,
  );

  // send images to parent form (React Hook Form / Yup)
  React.useEffect(() => {
    // const allImageData = [...allPropertyImage, ...imagesArray];
    onChange(imagesArray);
  }, [imagesArray]);

  return (
    <View>
      {/* Pick Button */}
      <TouchableOpacity
        onPress={pickImage}
        style={[styles.btn, isMax && {backgroundColor: '#777'}]}
        disabled={isMax}>
        {/* <Text style={styles.btnText}>
          {isMax ? 'Limit Reached (4)' : 'Pick Image'}
        </Text>  */}
        {isMax ? (
          <Feather name="x-circle" size={24} color="#fff" />
        ) : (
          <Feather name="upload-cloud" size={24} color="#fff" />
        )}
      </TouchableOpacity>

      {/* Preview */}
      {imagesArray.length > 0 ? (
        <FlatList
          horizontal
          data={imagesArray}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({item, index}) => (
            <View style={{marginRight: 12}}>
              <Image source={{uri: item}} style={styles.img} />

              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => removeImage(index)}>
                <Feather name="x" size={16} color="#fff" />
              </TouchableOpacity>
              {/* <Text style={{color: '#000'}}>{item.uri}</Text> */}
            </View>
          )}
        />
      ) : null}
    </View>
  );
};

export default ImageUploadField;

const styles = StyleSheet.create({
  btn: {
    padding: 12,
    backgroundColor: SelectColors.secondaryBlueColor,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  btnText: {color: '#fff'},
  img: {width: 80, height: 80, borderRadius: 10},
  removeBtn: {
    position: 'absolute',
    right: 4,
    top: 5,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 50,
    padding: 3,
  },
});
