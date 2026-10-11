/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FontAwesome} from '@react-native-vector-icons/fontawesome';
import {SelectColors} from '../constant/Colors';
import Divider from '../components/common/Divider';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import MeetingDetailsModal from '../models/MeetingDetailsModal';
import useTimeAgo from '../hooks/useDateFormat';

const LEADS = Array.from({length: 5});

const MeetingList = memo(({name, createdAt, navigation, item}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const {getTimeAgo} = useTimeAgo();

  const handleMeetingModal = () => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  return (
    <View style={styles.itemWrapper}>
      <TouchableOpacity
        style={styles.tableListItem}
        activeOpacity={0.8}
        onPress={handleMeetingModal}>
        <View style={styles.tableItemRow}>
          <View style={[styles.iconBox, {width: '7%'}]}>
            <FontAwesome name="user" size={25} color="#5C5CFF" />
          </View>

          <View style={[{width: '33%'}]}>
            <Text style={styles.leadText}>{name}</Text>
          </View>
          <View style={[{width: '33%'}]}>
            <Text style={[styles.time]}>{getTimeAgo(createdAt)}</Text>
          </View>
          <View style={{justifyContent: "center", alignItems: "flex-end", width: "18%"}}>
            <Text style={styles.viewText}>View</Text>
          </View>
        </View>
      </TouchableOpacity>

      <Divider
        height={0.5}
        color="#999"
        marginVertical={10}
        width="100%"
        marginHorizontal={16}
      />
      <MeetingDetailsModal
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        item={selectedItem}
      />
    </View>
  );
});

const SecondRoute = () => {
  const {meetingList} = useSelector(state => state.meetingData);

  const navigation = useNavigation();

  const [allMeetngList, setAllMeetingList] = useState([]);

  useEffect(() => {
    if (meetingList?.data?.length > 0) {
      setAllMeetingList(meetingList.data.slice(0, 5));
    }
  }, [meetingList]);

  return (
    <View style={styles.scene}>
      <View style={styles.tableList}>
        {allMeetngList.map((item, index) => (
          <MeetingList
            key={`meeting-${index}`}
            index={index}
            id={item.id}
            name={`${item.meeting_with}`}
            createdAt={item.meeting_date}
            navigation={navigation}
            item={item}
          />
        ))}
      </View>
    </View>
  );
};

export default SecondRoute;

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: '#F2E9FF',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 6,
    shadowColor: '#555555',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 5,
  },

  tableList: {
    width: '100%',
    marginVertical: 10,
  },

  itemWrapper: {
    padding: 4,
  },

  tableListItem: {
    backgroundColor: '#F2E9FF',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  tableItemRow: {
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    gap: 12,
  },

  iconBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  center: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  leadText: {
    fontWeight: '600',
    fontSize: 15,
    // textAlign: 'center',
    color: '#555555',
  },

  viewText: {
    fontWeight: '600',
    fontSize: 15,
    color: SelectColors.thirdBlueColor,
    textDecorationLine: 'underline',
  },
  time: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
    paddingHorizontal: 10,
  },
});
