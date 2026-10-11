/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
// App.js (or wherever)
import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import LeadCard from '../components/Cards/LeadCard';

export default function LeadDetailsScreen(props) {
  const {navigation, route} = props;
  const {leadItem, from, limit, planType} = route.params || {};
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{paddingTop: 8, paddingBottom: 20}}>
        <LeadCard
          lead={leadItem}
          navigation={navigation}
          from={from}
          planType={planType}
          limit={limit}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
