/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable curly */
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  ScrollView,
} from 'react-native';
import React from 'react';
import AntDesign from '@react-native-vector-icons/ant-design';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

const MeetingDetailsModal = ({modalVisible, onClose, item}) => {
  if (!item) return null;

  const formatDate = dateString => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTime = time => {
    if (!time) return '-';
    const [hour, minute] = time.split(':');
    const date = new Date();
    date.setHours(hour, minute);
    return date.toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const handleCall = number => {
    if (!number) return;
    Linking.openURL(`tel:${number}`);
  };

  const DetailRow = ({label, value}) => (
    <View style={styles.section}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || '-'}</Text>
    </View>
  );

  return (
    <Modal transparent visible={modalVisible} animationType="fade">
      <View style={styles.container}>
        <View style={styles.card}>
          {/* Close Button */}
          <TouchableOpacity style={styles.close} onPress={onClose}>
            <AntDesign name="close-circle" size={25} color="#666" />
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {item.meeting_with?.charAt(0) || '?'}
                </Text>
              </View>

              <View>
                <Text style={styles.name}>
                  {item.meeting_with || 'Unknown'}
                </Text>
                <Text style={styles.subtitle}>
                  {item.meeting_title || 'No Title'}
                </Text>
              </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Details */}
            <DetailRow label="📅 Date" value={formatDate(item.meeting_date)} />
            <DetailRow label="⏰ Time" value={formatTime(item.meeting_time)} />
            <DetailRow label="📍 Location" value={item.meeting_location} />

            {/* <DetailRow
              label="📞 Mobile"
              value={item.owner_mobile_no}
            /> */}

            <DetailRow label="📝 Notes" value={item.meeting_comment} />

            <DetailRow label="🗓 Created" value={formatDate(item.created_at)} />

            <DetailRow label="📞 Contact" value={item.contact_number} />
            {/* Action Buttons */}
            {item.contact_number && (
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.callBtn}
                  onPress={() => handleCall(item.owner_mobile_no)}>
                  <MaterialDesignIcons name="phone" size={18} color="#fff" />
                  <Text style={styles.btnText}>Call</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity> */}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default MeetingDetailsModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  card: {
    width: '100%',
    maxHeight: '85%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
  },

  close: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },

  avatar: {
    width: 65,
    height: 65,
    borderRadius: 32,
    backgroundColor: '#eef2ff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4f46e5',
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },

  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },

  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },

  section: {
    marginBottom: 14,
  },

  label: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },

  value: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },

  actions: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 10,
  },

  callBtn: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#4f46e5',
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },

  btnText: {
    color: '#fff',
    fontWeight: '600',
  },

  closeBtn: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  closeText: {
    color: '#333',
    fontWeight: '600',
  },
});
