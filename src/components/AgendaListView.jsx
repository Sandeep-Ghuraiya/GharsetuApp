/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {AgendaList} from 'react-native-calendars';
import MeetingDetailsModal from '../models/MeetingDetailsModal';
import {SelectColors} from '../constant/Colors';
import Entypo from '@react-native-vector-icons/entypo';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import DeleteMessageModal from '../models/DeleteMessageModal';
import {useDispatch} from 'react-redux';
import {deleteMeetingDetails} from '../Redux/Reducers/meetingReducer';
import useMobileNoDetails from '../hooks/useMobileNoDetails';

const AgendaListView = ({agendaListData, selectedDate, navigation}) => {
  const {mobileNoData} = useMobileNoDetails();

  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // ✅ new state
  const [deleteId, setDeleteId] = useState(0);

  const dispatch = useDispatch();

  const getAgendaSections = date => {
    const filteredMeetings = agendaListData.filter(
      m => m.meeting_date === date,
    );

    return [
      {
        title: date,
        data: filteredMeetings.length
          ? filteredMeetings
          : [{id: 0, meeting_with: 'No meetings'}],
      },
    ];
  };

  // Group meetings by date
  // const groupedData = agendaListData.reduce((acc, item) => {
  //   if (!acc[item.date]) acc[item.date] = [];
  //   acc[item.date].push(item);
  //   return acc;
  // }, {});

  // // Convert to sections format for AgendaList
  // const dataToRender = Object.keys(groupedData).map((date) => ({
  //   title: date,
  //   data: groupedData[date],
  // }));

  const handleMeetingModal = (item, id) => {
    if (id !== 0) {
      setSelectedItem(item);
      setModalVisible(true);
    }
  };

  const onPressDelete = () => {
    const deleteData = JSON.stringify({
      action: 'meetings_delete',
      owner_mobile_no: mobileNoData,
      meeting_id: deleteId,
    });
    dispatch(deleteMeetingDetails(deleteData));
    setDeleteModalVisible(false);
  };

  return (
    <View>
      <AgendaList
        sections={getAgendaSections(selectedDate)}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.meetingCard}
            onPress={() => handleMeetingModal(item, item.id)}>
            <View style={styles.meetingHeader}>
              <Text style={styles.meetingWith}>{item.meeting_with}</Text>
              <Text style={styles.meetingTime}>{item.meeting_time}</Text>
            </View>
            {item.id !== 0 && (
              <View style={styles.meetingHeader}>
                <Text style={styles.meetingDetails}>
                  Meeting Address: {item.meeting_location}
                </Text>
                <View style={{flexDirection: 'row', gap: 15}}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('EditMeeting', {meetingData: item})
                    }>
                    <Entypo
                      name="pencil"
                      size={20}
                      color={SelectColors.accentBlueColor}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => {
                      setDeleteModalVisible(true);
                      setDeleteId(item.id);
                    }}
                    // activeOpacity={0.7}
                  >
                    <MaterialDesignIcons
                      name="delete"
                      size={24}
                      color="#ff4d4d"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </TouchableOpacity>
        )}
      />
      <MeetingDetailsModal
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        item={selectedItem}
      />

      <DeleteMessageModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onPressDelete={onPressDelete}
        subtitle={
          ' Are you sure you want to delete this meeting? This action cannot be undone.'
        }
      />
    </View>
  );
};

export default AgendaListView;

const styles = StyleSheet.create({
  meetingCard: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    elevation: 3, // for android shadow
  },
  meetingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  meetingWith: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  meetingTime: {
    fontSize: 14,
    fontWeight: '500',
    color: SelectColors.accentBlueColor,
  },
  meetingDetails: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
});
