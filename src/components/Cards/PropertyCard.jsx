/* eslint-disable prettier/prettier */
/* eslint-disable curly */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// ICONS
import {Feather} from '@react-native-vector-icons/feather';
import {Ionicons} from '@react-native-vector-icons/ionicons';
import Row from '../custom/Row';

const PropertyCard = ({property = {}, navigation, from, style, name}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageVisible, setImageVisible] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);

  return (
    <View style={styles.cardWrapper}>
      {/* HEADER GRADIENT */}
      <LinearGradient colors={['#6C63FF', '#8A80FF']} style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.headerName}>
            {property.property_name ? property.property_name : 'No Name'}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AgentDetails', {
                  price: property.property_selling_price,
                  commisionData: property.commission,
                  propertyId: property.id,
                  from: 'Agent List',
                })
              }>
              <Ionicons name="people" size={24} color={'#ffffff'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditProperty', {
                  propertyItem: property,
                  from: 'Edit Property',
                  name: name,
                })
              }>
              <Feather name={'edit'} size={24} color={'#FFFFFF'} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* BODY CONTENT */}
      <View style={styles.cardBody}>
        <Row icon="badge" label="Property ID" value={property.id?.toString()} />
        {/* <Row
          icon="supervised-user-circle"
          label="Property Status"
          value={property.owner_status}
        /> */}
        <Row
          icon="person"
          label="Property Owner Name"
          value={`${property.owner_first_name} ${property.owner_last_name}`}
        />
        <Row
          icon="phone"
          label="Property Owner Phone No."
          value={property.mobile_no}
        />
        <Row
          icon="bungalow"
          label="Property Type"
          value={property.property_type}
        />
        <Row
          icon="assistant-direction"
          label="Property Facing"
          value={property.property_facing}
        />
        <Row
          icon="date-range"
          label="Property Age"
          value={`${property.property_age} years`}
        />
        {property.villages ? (
          <Row
            icon="holiday-village"
            label="Village"
            value={property.village}
          />
        ) : null}
        <Row
          icon="real-estate-agent"
          label="Area / Locality"
          value={property.area}
        />
        <Row
          icon="location-on"
          label="Property Location"
          value={property.property_location}
        />
        <Row icon="location-city" label="City" value={property.city} />
        <Row icon="account-balance" label="State" value={property.state} />
        <Row
          icon="confirmation-number"
          label="Pincode"
          value={property.zipcode}
        />
        {/* <Row
          icon="ac-unit"
          label="Property Unit Type"
          value={property.property_unit_type}
        /> */}
        <Row
          icon="area-chart"
          label="Property Area Square"
          value={`${property.property_area_square} sqft`}
        />
        <Row
          icon="local-parking"
          label="Property Parking Type"
          value={property.parking_type}
        />
        <Row
          icon="point-of-sale"
          label="Property Transaction Type"
          value={property.transaction_type}
        />
        <Row
          icon="currency-rupee"
          label="Property Actual Selling Price"
          value={`Rs. ${property.property_actual_price}/-`}
        />
        <Row
          icon="currency-rupee"
          label="Property Selling Price"
          value={`Rs. ${property.property_selling_price}/-`}
        />
        <Row
          icon="image"
          selectedIndex={selectedIndex}
          imageVisible={imageVisible}
          showImageVisible={setImageVisible}
          getSelectedIndex={setSelectedIndex}
          label="Property Images"
          value={property.property_images}
        />

        <Row
          icon="ondemand-video"
          videoTag={'video'}
          showVideo={true}
          videoVisible={videoVisible}
          showVideoVisible={setVideoVisible}
          label="Property Video"
          value={property.property_video_url}
          featuredImage={property.featured_image}
        />
        {/* <Row icon="currency-rupee" label="Budget" value={`₹ 10 lac`} /> */}
        {/* LOOKING FOR CHIP */}
        {/* <View style={styles.chip}>
          <Text style={styles.chipText}>Buy</Text>
        </View> */}
      </View>
    </View>
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

  image: {
    width: 50,
    height: 50,
    overflow: 'hidden',
    borderRadius: 5,
  },
});

export default PropertyCard;
