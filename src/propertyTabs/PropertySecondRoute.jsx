/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {memo, useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FontAwesome} from '@react-native-vector-icons/fontawesome';
import {SelectColors} from '../constant/Colors';
import Divider from '../components/common/Divider';
import PropertiesList from '../sections/PropertiesList';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import DraftPropertiesList from '../sections/DraftPropertiesList';

const PropertySecondRoute = ({}) => {
  const propertiesListFromRedux = useSelector(
    state => state.propertiesData.propertiesList,
  );

  const newPropertiesList = useMemo(() => {
    return propertiesListFromRedux || [];
  }, [propertiesListFromRedux]);

  const navigation = useNavigation();

  const [propertyLists, setPropertyLists] = useState([]);

  useEffect(() => {
    setPropertyLists(newPropertiesList?.draftProperties);
  }, [newPropertiesList]);

  return (
    <View style={styles.scene}>
      <View style={styles.tableList}>
        {propertyLists?.length ? (
          <DraftPropertiesList
            propertiesData={propertyLists}
            navigation={navigation}
            pageName={'EditProperty'}
            pageTitle={'Edit Property'}
            name={'DraftProperty'}
          />
        ) : (
          <>
            <Text style={{color: '#000', textAlign: 'center'}}>
              No draft available
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

export default PropertySecondRoute;

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    marginTop: 10,
    // backgroundColor: '#fff',
  },
});
