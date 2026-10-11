/* eslint-disable prettier/prettier */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';
import Feather from '@react-native-vector-icons/feather';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import {SelectColors} from '../../constant/Colors';
import {useDispatch} from 'react-redux';
import {deleteAgentDetails} from '../../Redux/Reducers/agentReducer';
import DeleteMessageModal from '../../models/DeleteMessageModal';
import useMobileNoDetails from '../../hooks/useMobileNoDetails';

const AgentCard = ({
  name = 'John Doe',
  mobileNo = '',
  navigation,
  agentData,
}) => {
  const {mobileNoData} = useMobileNoDetails();

  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);

  const onPressEdit = () => {
    navigation.navigate('EditAgent', {
      agentData: agentData,
      from: 'Edit Agent',
    });
  };

  const onPressDelete = () => {
    const agentDelete = JSON.stringify({
      owner_mobile_no: mobileNoData,
      action: 'associated_agent_delete',
      agent_id: agentData.id,
    });
    dispatch(deleteAgentDetails(agentDelete));
  };

  return (
    <View>
      <View style={styles.card}>
        {/* Left Icon */}
        <View style={styles.iconContainer}>
          <Ionicons name="person" size={24} color="#333" />
        </View>

        {/* Text Section */}
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.mobile}>{mobileNo}</Text>
        </View>

        {/* Right Side Icons */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={onPressEdit}
            // activeOpacity={0.7}
          >
            <Feather
              name="edit"
              size={24}
              color={SelectColors?.accentBlueColor || '#007bff'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => setModalVisible(true)}
            // activeOpacity={0.7}
          >
            <MaterialDesignIcons name="delete" size={24} color="#ff4d4d" />
          </TouchableOpacity>
        </View>
      </View>

      <DeleteMessageModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onPressDelete={onPressDelete}
        subtitle={
          ' Are you sure you want to delete this agent? This action cannot be undone.'
        }
      />
    </View>
  );
};

export default AgentCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,

    // Shadow (iOS)
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 3,

    // Shadow (Android)
    elevation: 4,
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textContainer: {
    flex: 1,
    marginLeft: 10,
  },

  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },

  mobile: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  actionBtn: {
    marginLeft: 8,
    padding: 4,
  },
});
