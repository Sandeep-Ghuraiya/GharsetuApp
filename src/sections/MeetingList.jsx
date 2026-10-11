/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, {useCallback, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {ExpandableCalendar, CalendarProvider} from 'react-native-calendars';
import {SelectColors} from '../constant/Colors';
import AgendaListView from '../components/AgendaListView';

const MeetingList = ({meetingData, navigation}) => {
  // ✅ current visible date (controls calendar)
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  // ✅ selected date (for marking + agenda)
  const [selectedDate, setSelectedDate] = useState(currentDate);

  // Dummy agenda data

  // ✅ When user taps a day
  const onDayPress = day => {
    setSelectedDate(day.dateString);
    setCurrentDate(day.dateString); // 🔥 keep calendar in sync
  };

  return (
    <CalendarProvider
      date={currentDate} // ✅ dynamic (IMPORTANT FIX)
      onDateChanged={date => {
        setCurrentDate(date); // 🔥 sync on scroll/swipe
        console.log('Date changed:', date);
      }}
      // showTodayButton
    >
      <ExpandableCalendar
        initialPosition="closed"
        onDayPress={onDayPress}
        // renderHeader={renderHeader}
        markingType="custom"
        markedDates={{
          [selectedDate]: {
            customStyles: {
              container: {
                backgroundColor: SelectColors.accentBlueColor,
                // borderRadius: 5,
              },
              text: {
                color: '#fff',
                fontWeight: 'bold',
              },
            },
          },
        }}
        theme={{
          todayTextColor: SelectColors.accentBlueColor,
          selectedDayBackgroundColor: SelectColors.accentBlueColor,
          monthTextColor: '#000',
          indicatorColor: 'yellow',
          arrowColor: '#000',
          textDisabledColor: '#d9e1e8',
          textMonthFontWeight: 'bold',
          textSectionTitleColor: '#000',
          textDayHeaderFontSize: 14,
          textDayHeaderFontWeight: '600',
        }}
        firstDay={0} // optional: week starts Monday
      />
      <AgendaListView
        agendaListData={meetingData}
        navigation={navigation}
        selectedDate={selectedDate}
      />
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
});

export default MeetingList;
