/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AddMoreAgentModal from '../models/AddMoreAgentModal';
import {SelectColors} from '../constant/Colors';
import Entypo from '@react-native-vector-icons/entypo';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import PrimaryAgetModal from '../models/PrimaryAgentModal';
import {useDispatch, useSelector} from 'react-redux';
import {getAgentList} from '../Redux/Reducers/agentReducer';
import CheckBox from 'react-native-check-box';
import DeleteMessageModal from '../models/DeleteMessageModal';
import {deleteBrokerageDetails} from '../Redux/Reducers/propertyReducer';
import useMobileNoDetails from '../hooks/useMobileNoDetails';

const AgentDetails = ({
  price,
  commisionData,
  propertyId,
  onMessage,
  deleteData,
}) => {
  const dispatch = useDispatch();

  const {mobileNoData} = useMobileNoDetails();

  // useEffect(() => {
  //   dispatch(getAgentList({
  //     "owner_mobile_no": mobileNoData,
  //     "action": "associated_agents"
  //   }))
  // }, [mobileNoData])

  const [primaryAgent, setPrimaryAgent] = useState(commisionData.main_broker);
  const [modalVisible, setModalVisible] = useState(false);
  const [primaryModalVisible, setPrimaryModalVisible] = useState(false);
  const [allAgent, setAllAgent] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedPrimaryAgent, setSelectedPrimaryAgent] = useState(null);
  const [pageName, setPageName] = useState('');
  const [associatedAgents, setAssociatedAgents] = useState([]);
  const [checkBoxShow, setCheckBoxShow] = useState(false);
  const [clickId, setClickId] = useState([]);
  const [deleteModalVisible, setDeleteModalVisble] = useState(false);

  useEffect(() => {
    if (commisionData?.associated_agents?.length > 0) {
      const data = commisionData?.associated_agents.map(agent => ({
        id: agent.id,
        percentage: agent.percentage,
      }));
      setAssociatedAgents(data);
    }
    if (commisionData) {
      setPrimaryAgent(commisionData.main_broker);
    }
  }, [commisionData]);

  useEffect(() => {
    if (deleteData?.length > 0) {
      const filteredAgents = commisionData.associated_agents?.filter(
        item => !deleteData.some(del => del.agent_id === item.id),
      );

      setAllAgent(filteredAgents);
    } else {
      setAllAgent(commisionData?.associated_agents);
    }
  }, [deleteData, commisionData]);

  // ✅ Edit handler (with index)
  const handleEditAgent = (agent, index, type, name) => {
    setPageName(name);
    if (type === 'primary') {
      setPrimaryModalVisible(true);
      setSelectedPrimaryAgent(agent);
    } else {
      setSelectedAgent({...agent, index});
      setModalVisible(true);
    }
  };

  const onPressDelete = () => {
    onMessage();
    const deleteData = JSON.stringify({
      owner_mobile_no: mobileNoData,
      action: 'commission_delete',
      property_id: propertyId,
      agent_ids: clickId,
    });
    dispatch(deleteBrokerageDetails(deleteData));
    setDeleteModalVisble(false);
    setCheckBoxShow(false);
  };

  const renderAgentCard = (agent, type, index) => {
    const initials = agent?.name
      ? agent.name
          .trim()
          .split(' ')
          .filter(Boolean)
          .map(word => word[0])
          .join('')
          .toUpperCase()
      : '';

    const handleClick = id => {
      setClickId(prev => {
        if (prev.includes(id)) {
          // ❌ remove if already selected
          return prev.filter(item => item !== id);
        } else {
          // ✅ add if not selected
          return [...prev, id];
        }
      });
    };

    // console.log("asso: ", primaryAgent);

    return (
      <View
        style={styles.card}
        key={index}
        activeOpacity={0.8}
        onPress={() => handleEditAgent(agent, index, type, 'edit')}>
        {type !== 'primary' && checkBoxShow && (
          <CheckBox
            style={styles.checkBoxStyle}
            onClick={() => handleClick(agent.id)}
            isChecked={clickId.includes(agent.id)}
            checkBoxColor={SelectColors.accentBlueColor}
          />
        )}
        <TouchableOpacity
          style={styles.innerCard}
          onLongPress={() => setCheckBoxShow(true)}>
          <LinearGradient colors={['#6A11CB', '#2575FC']} style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </LinearGradient>

          <View style={{marginLeft: 12}}>
            <Text style={styles.agentName}>{agent.name}</Text>
            <Text style={styles.agentInfo}>📞 {agent.mobile}</Text>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>💰 {agent.percentage}%</Text>
              <MaterialDesignIcons
                name="approximately-equal"
                size={18}
                color={'#2575FC'}
              />
              <Text style={styles.badgeText}>₹ {agent.amount}</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleEditAgent(agent, index, type, 'edit')}>
          <Entypo
            name="pencil"
            size={20}
            color={SelectColors.accentBlueColor}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, {marginBottom: 16}]}>Primary Agent</Text>

      {/* ✅ Primary Agent */}
      {primaryAgent && renderAgentCard(primaryAgent, 'primary')}

      {/* ✅ Secondary Agents */}
      {allAgent?.length > 0 && (
        <>
          <View style={styles.innerBox}>
            <Text style={styles.title}>Associate Agents</Text>
            {checkBoxShow && (
              <TouchableOpacity onPress={() => setDeleteModalVisble(true)}>
                <MaterialDesignIcons name="delete" size={24} color="#ff4d4d" />
              </TouchableOpacity>
            )}
          </View>

          <FlatList
            data={allAgent}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({item, index}) =>
              renderAgentCard(item, 'secondary', index)
            }
          />
        </>
      )}

      {/* ✅ Add Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setSelectedAgent(null);
            setModalVisible(true);
            setPageName('add');
          }}>
          <Entypo name="plus" size={35} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* ✅ Modal */}
      <AddMoreAgentModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedAgent(null);
        }}
        selectedAgent={selectedAgent}
        primaryAgent={primaryAgent}
        pageName={pageName}
        propertyId={propertyId}
        associatedAgents={associatedAgents}
        onMessage={onMessage}
      />

      <PrimaryAgetModal
        visible={primaryModalVisible}
        onClose={() => {
          setPrimaryModalVisible(false);
        }}
        selectedAgent={selectedPrimaryAgent}
        associatedAgents={associatedAgents}
        propertyId={propertyId}
        onMessage={onMessage}
      />

      <DeleteMessageModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisble(false)}
        onPressDelete={onPressDelete}
        subtitle={
          ' Are you sure you want to delete this agent? This action cannot be undone.'
        }
      />
    </View>
  );
};

export default AgentDetails;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F2F4F8', padding: 16},
  innerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {fontSize: 24, fontWeight: '700', color: '#111'},

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 4},
    elevation: 4,
  },
  innerCard: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // marginRight:20
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  agentName: {fontSize: 17, fontWeight: '600', color: '#111'},
  agentInfo: {fontSize: 14, color: '#555', marginTop: 2},

  badge: {
    marginTop: 6,
    backgroundColor: '#E1F0FF',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },

  badgeText: {fontSize: 12, color: '#2575FC', fontWeight: '600'},

  bottomBar: {
    width: '100%',
    paddingBottom: 16,
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 20,
  },

  addButton: {
    width: 50,
    height: 50,
    backgroundColor: SelectColors.accentBlueColor,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBoxStyle: {
    // backgroundColor:'red',
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
