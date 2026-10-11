/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Feather from '@react-native-vector-icons/feather';

const NotificationList = ({notificationList}) => {
  const getIcon = type => {
    switch (type) {
      case 'meeting':
        return 'calendar';
      case 'property_lead':
        return 'home';
      default:
        return 'bell';
    }
  };

  const formatTime = dateStr => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  };

  const renderItem = ({item}) => {
    const isUnread = item.is_read === 'no';

    return (
      <TouchableOpacity style={styles.item}>
        {/* Icon */}
        <View style={styles.iconWrap}>
          <Feather
            name={getIcon(item.notification_type)}
            size={18}
            color="#6C63FF"
          />
        </View>

        {/* Content */}
        <View style={styles.textWrap}>
          <View style={styles.rowTop}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.time}>{formatTime(item.created_at)}</Text>
          </View>

          <Text style={styles.message}>{item.message}</Text>
        </View>

        {/* Unread indicator */}
        {/* {isUnread && <View style={styles.unreadDot} />} */}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notificationList}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{paddingVertical: 10}}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default NotificationList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 14,
  },

  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1EEFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  textWrap: {
    flex: 1,
  },

  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
    flex: 1,
    marginRight: 10,
  },

  message: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
    lineHeight: 18,
  },

  time: {
    fontSize: 11,
    color: '#999',
  },

  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#6C63FF',
    marginLeft: 6,
    marginTop: 6,
  },

  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginLeft: 48,
  },
});
