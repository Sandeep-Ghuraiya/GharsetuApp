/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import PropertyCard from '../components/Cards/PropertyCard';

export default function PropertyDetailsScreen(props) {
  const {navigation, route} = props;
  const {propertyItem, from,name} = route.params || {};

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{paddingTop: 8, paddingBottom: 20}}>
        <PropertyCard
          property={propertyItem}
          navigation={navigation}
          from={from}
          name={name}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
