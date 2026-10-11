/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import useLoginData from '../hooks/useLoginData';
import {set} from 'react-hook-form';

const AccountScreen = () => {
  const {loginData} = useSelector(state => state.agentDetails);

  const [userData, setUserData] = useState([]);
  const {loginDetails} = useLoginData();

  useEffect(() => {
    if (loginData) {
      setUserData(loginData?.data);
    } else if (loginDetails) {
      setUserData(loginDetails?.data);
    }
  }, [loginData, loginDetails]);

  console.log('us', userData);

  // const user = {
  //   first_name: "Aniket",
  //   last_name: "Soanwat",
  //   email: "aniketsonawat12.wdt@gmail.com",
  //   mobile_no: "9575165889",
  //   zipcode: "458667",
  //   country: "India",
  //   state: "Madhya Pradesh",
  //   city: "Mandsour",
  //   broker_comapny: "BrightPath Technologies",
  // };

  return (
    <ScrollView style={styles.container}>
      {/* PROFILE CARD */}
      <View style={styles.profileCard}>
        <View style={{alignItems: 'center', marginBottom: 15}}>
          <Image
            source={require('../assets/images/profileIcon.png')}
            style={styles.avatar}
          />

          <Text style={styles.name}>
            {userData.first_name} {userData.last_name}
          </Text>

          <Text style={styles.company}>{userData.broker_comapny}</Text>
        </View>

        {/* DETAILS CARD */}
        <View style={styles.card}>
          <InfoRow label="Email" value={userData.email} />
          <InfoRow label="Phone" value={userData.mobile_no} />
        </View>

        <View style={styles.card}>
          <InfoRow label="City" value={userData.city} />
          <InfoRow label="State" value={userData.state} />
          <InfoRow label="Zip Code" value={userData.zipcode} />
        </View>
      </View>
    </ScrollView>
  );
};

const InfoRow = ({label, value}) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value || '-'}</Text>
  </View>
);

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
  },

  /* PROFILE CARD */
  profileCard: {
    // backgroundColor: '#fff',
    margin: 20,
    borderRadius: 20,
    // alignItems: 'center',
    paddingVertical: 25,
    // elevation: 4,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginBottom: 10,
  },

  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
  },

  company: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },

  /* INFO CARDS */
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 10,
    // paddingBottom: 15,
    paddingHorizontal: 30,
    elevation: 2,
    marginBottom: 20,
  },

  row: {
    marginBottom: 12,
  },

  label: {
    fontSize: 12,
    color: '#888',
  },

  value: {
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
});
