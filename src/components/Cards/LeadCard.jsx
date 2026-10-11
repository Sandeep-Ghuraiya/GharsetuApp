/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable curly */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// ICONS
import {Feather} from '@react-native-vector-icons/feather';
import {MaterialIcons} from '@react-native-vector-icons/material-icons';
import {Fontisto} from '@react-native-vector-icons/fontisto';
import {SelectColors} from '../../constant/Colors';
import CommonButton from '../common/CommonButton';
import CommentModal from '../../models/CommentModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@react-native-vector-icons/ant-design';
import Ionicons from '@react-native-vector-icons/ionicons';

const Row = ({icon, label, value, showIcon = false, navigation}) => (
  <View style={styles.row}>
    {label !== 'Village' ? (
      <MaterialIcons
        name={icon}
        size={22}
        color="#6C63FF"
        style={{marginRight: 10}}
      />
    ) : (
      <Fontisto
        name={icon}
        size={22}
        color="#6C63FF"
        style={{marginRight: 10}}
      />
    )}

    <View style={{flex: 1}}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || '-'}</Text>
    </View>
    {showIcon && (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Subscription', {from: 'Subscription'})
        }>
        <Ionicons name="eye" size={25} color={SelectColors.accentBlueColor} />
      </TouchableOpacity>
    )}
  </View>
);

const LeadCard = ({lead = {}, navigation, from, style, planType, limit}) => {
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [isMasked, setIsMasked] = useState(false);

  const handleModal = () => {
    if (lead.All_status?.length > 0) {
      setStatusModalOpen(true);
    } else {
      navigation.navigate('EditLead', {
        leadItem: lead,
        from: 'Add Comment',
      });
    }
  };

  const maskPhone = text => {
    if (!text) return '-';
    return isMasked ? text.replace(/\d/g, '*') : text;
  };

  const maskEmail = email => {
    if (!email) return '-';
    return isMasked
      ? email.replace(
          /(.{2})(.*)(?=@)/,
          (_, start, middle) => start + '*'.repeat(middle.length),
        )
      : email;
  };

  useEffect(() => {
    const handlePaymentType = async () => {
      if (planType === 'free') {
        const value = await AsyncStorage.getItem('counter');

        const parsedValue = JSON.parse(value);
        console.log('value', parsedValue);

        if (parsedValue > limit) {
          setIsMasked(true); // ✅ trigger masking
        }
      } else {
        setIsMasked(true);
      }
    };

    handlePaymentType();
  }, [planType]);

  return (
    <>
      <View style={styles.cardWrapper}>
        {/* HEADER GRADIENT */}
        <LinearGradient colors={['#6C63FF', '#8A80FF']} style={styles.header}>
          <TouchableOpacity>
            <Text style={styles.headerName}>
              {lead.first_name ? lead.first_name : 'No Name'}{' '}
              {lead.last_name || ''}
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* BODY CONTENT */}
        <View style={styles.cardBody}>
          <Row
            icon="phone"
            label="Mobile No."
            value={maskPhone(lead.mobile_no)}
            showIcon={true}
            navigation={navigation}
          />
          <Row
            icon="email"
            label="Email"
            value={maskEmail(lead.email)}
            showIcon={true}
            navigation={navigation}
          />
          <Row
            icon="home"
            label="Property Name"
            value={lead.property_name}
            navigation={navigation}
          />
          <Row
            icon="confirmation-number"
            label="Last Status"
            value={lead.status}
            navigation={navigation}
          />
          <View style={{marginTop: 10}}>
            <CommonButton
              title="Check Status & Comment"
              loading={false}
              onPress={handleModal}
              width={'100%'}
            />
            <CommentModal
              commentData={lead.All_status}
              statusModalOpen={statusModalOpen}
              onCloseModal={() => setStatusModalOpen(false)}
              navigation={navigation}
              allLeadData={lead}
            />
          </View>
        </View>
      </View>

      {/* <View style={styles.cardWrapper}>
        {/* HEADER GRADIENT */}
      {/* <LinearGradient colors={['#6C63FF', '#8A80FF']} style={styles.header}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.headerName}>Status & Comments</Text>
            <View>
              <Feather name={'edit'} size={24} color={'#FFFFFF'} />
            </View>
          </TouchableOpacity>
        </LinearGradient> */}

      {/* BODY CONTENT */}
      {/* <View style={styles.cardBody}>
          {lead.All_status.map((item, index) => (
            <View style={styles.row}>
              {/* Timeline */}
      {/* <View style={styles.timeline}>
                <View style={[styles.dot,]} />
                {!isLast && <View style={styles.line} />}
              </View> */}

      {/* Content */}
      {/* <View style={styles.card}>
                <Text style={[styles.status]}>
                  {item.status}
                </Text>
                <Text style={styles.comment}>{item.comment}</Text>
                <Text style={styles.date}>{formatDate(item.created_date)}</Text>
              </View>
            </View>
          ))}
        </View> */}
      {/* </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
  },

  header: {
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  headerName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },

  cardBody: {
    padding: 16,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.8,
    borderBottomColor: '#eee',
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

  chip: {
    alignSelf: 'flex-start',
    marginTop: 16,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: 'rgba(108, 99, 255, 0.15)',
    borderRadius: 12,
  },

  chipText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6C63FF',
  },
});

export default LeadCard;
