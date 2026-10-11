/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */

import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {MaterialDesignIcons} from '@react-native-vector-icons/material-design-icons';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import {useDispatch} from 'react-redux';
import {deleteProperty} from '../../Redux/Reducers/propertyReducer';
import useMobileNoDetails from '../../hooks/useMobileNoDetails';
import DeleteMessageModal from '../../models/DeleteMessageModal';

export default function PropertyListCard({
  title = 'Property Name',
  onPress = () => {},
  image = '',
  bedroom = '0',
  bathroom = '0',
  area = '0',
  propertyId = 0,
  handleLoader,
}) {
  const dispatch = useDispatch();

  const {mobileNoData} = useMobileNoDetails();

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleDeleteProperty = () => {
    setDeleteModalVisible(true);
  };

  const onPressDelete = () => {
    handleLoader(true);
    if (mobileNoData) {
      const deletePayload = JSON.stringify({
        owner_mobile_no: mobileNoData,
        action: 'property_delete',
        property_id: propertyId,
      });
      dispatch(deleteProperty(deletePayload));
    }

    setTimeout(() => {
      setDeleteModalVisible(false);
      handleLoader(false);
    }, 1500);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, {backgroundColor: '#FFF', overflow: 'hidden'}]}>
      <View style={styles.leftRow}>
        <View style={styles.imgView}>
          {image[0] ? (
            <Image source={{uri: image[0]}} style={styles.img} />
          ) : (
            <Image
              source={{
                uri: 'https://gharsetu.in/uploads/properties/gallery/1769765505_ffd8cb81895a7f2c0a0d.jpg',
              }}
              style={styles.img}
            />
          )}
        </View>

        <View style={{marginHorizontal: 12, width: '68%'}}>
          <Text style={[styles.title, {color: '#333', marginBottom: 6}]}>
            {title ? title : 'Property1'}
          </Text>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.iconView}>
              <MaterialDesignIcons name="bed" size={18} color={'#000'} />
              <Text style={styles.label}>{bedroom}</Text>
            </View>
            <View style={styles.iconView}>
              <FontAwesome name="bath" size={18} color={'#000'} />
              <Text style={styles.label}>{bathroom}</Text>
            </View>
            <View style={styles.iconView}>
              <MaterialDesignIcons
                name="vector-square"
                size={18}
                color={'#000'}
              />
              <Text style={styles.label}>{area}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={handleDeleteProperty}
          style={{paddingVertical: 16}}>
          <MaterialDesignIcons name="delete" size={24} color="#ff4d4d" />
        </TouchableOpacity>

        <DeleteMessageModal
          visible={deleteModalVisible}
          onClose={() => setDeleteModalVisible(false)}
          onPressDelete={onPressDelete}
          subtitle={
            'Are you sure you want to delete this property? This action cannot be undone.'
          }
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    marginVertical: 8,
    height: 65,

    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 3,

    // Android Shadow
    elevation: 4,
  },
  imgView: {
    width: 70,
    height: '100%',
  },
  img: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },

  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  iconView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  label: {
    color: '#000',
    fontSize: 14,
  },

  subtitle: {
    marginTop: 3,
    fontSize: 13,
  },
});
