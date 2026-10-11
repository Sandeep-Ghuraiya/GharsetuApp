/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
import React, {memo, useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FontAwesome} from '@react-native-vector-icons/fontawesome';
import {SelectColors} from '../constant/Colors';
import Divider from '../components/common/Divider';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useMobileNoDetails from '../hooks/useMobileNoDetails';
import {userGetLead} from '../Redux/Reducers/leadReducer';
import useCurrentDate from '../hooks/useCurrentDate.jsx';
import useTimeAgo from '../hooks/useDateFormat.jsx';

const LeadItem = memo(
  ({planType, limit, name, createdAt, navigation, item}) => {
    const {getTimeAgo} = useTimeAgo();

    const handleNavigate = async () => {
      const value = await AsyncStorage.getItem('counter');
      const parsedValue = JSON.parse(value);
      const nextValue = parsedValue + 1;
      console.log('nex', nextValue);

      await AsyncStorage.setItem('counter', JSON.stringify(nextValue));
      setTimeout(() => {
        navigation.navigate('LeadDetails', {
          leadItem: item,
          limit: limit,
          planType: planType,
          from: 'Lead Details',
        });
      }, 500);
    };

    return (
      <View style={styles.itemWrapper}>
        <TouchableOpacity
          style={styles.tableListItem}
          activeOpacity={0.8}
          onPress={handleNavigate}>
          <View style={styles.tableItemRow}>
            <View style={styles.iconBox}>
              <FontAwesome name="user" size={25} color="#5C5CFF" />
            </View>

            <View style={[{width: '32%'}]}>
              <Text style={styles.leadText} numberOfLines={1}>
                {name}
              </Text>
            </View>
            <View style={{width: "33%"}}>
              <Text style={styles.time}>{getTimeAgo(createdAt)}</Text>
            </View>
            <View style={{justifyContent: "center", alignItems: "flex-end", width: "16%"}}>
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
      </View>
    );
  },
);

const FirstRoute = () => {
  const {leadsList} = useSelector(state => state.agentLeads);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {mobileNoData} = useMobileNoDetails();

  const newLeadsList = useMemo(() => {
    return leadsList || [];
  }, [leadsList]);

  const {timeAgo} = useCurrentDate();

  const [allLeadList, setAllLeadList] = useState([]);
  const [limit, setLimit] = useState(0);
  const [planType, setPlanType] = useState('');

  useEffect(() => {
    if (newLeadsList?.data?.length > 0) {
      setAllLeadList(newLeadsList.data.slice(0, 5));
      setLimit(newLeadsList?.free_plan_lead_limit);
      setPlanType(newLeadsList?.plan_type);
    }
  }, [newLeadsList]);

  const handleRefresh = async () => {
    if (mobileNoData) {
      const leadListData = {
        owner_mobile_no: mobileNoData,
        action: 'lead_list',
        status: '',
        page: 1,
      };
      dispatch(userGetLead(JSON.stringify(leadListData)));
      const currentDate = new Date();

      await AsyncStorage.setItem('current_date', JSON.stringify(currentDate));
    }
  };

  return (
    <View style={styles.scene}>
      <View style={styles.tableList}>
        {allLeadList?.length > 0 ? (
          allLeadList.map(item => (
            <LeadItem
              key={`lead-${item.id}`}
              id={item.id}
              name={`${item.first_name} ${item.last_name}`}
              createdAt={item.created_at}
              navigation={navigation}
              item={item}
              limit={limit}
              planType={planType}
            />
          ))
        ) : (
          <View style={{alignItems: 'center'}}>
            <Text style={{color: 'red', fontWeight: '600'}}>
              No leads found
            </Text>
          </View>
        )}
      </View>

      {/* Fixed Footer */}
      <View style={styles.fixedFooter}>
        <View style={styles.tabRow}>
          <Text style={styles.label}>Last Updated Data: {timeAgo}</Text>
          <TouchableOpacity onPress={handleRefresh}>
            <Text style={styles.refreshBtnText}>Refresh Leads</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FirstRoute;

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
    marginTop: 10,
  },

  itemWrapper: {
    padding: 4,
  },

  tableListItem: {
    backgroundColor: '#F2E9FF',
    paddingHorizontal: 5,
    paddingVertical: 6,
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
    width: "7%",
  },

  center: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  leadText: {
    fontWeight: '600',
    fontSize: 15,
    color: '#555555',
    marginRight: 10,
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
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    paddingBottom: 30,
  },
  label: {
    color: '#000',
    fontWeight: '600',
  },
  refreshBtnText: {
    color: SelectColors.accentBlueColor,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  fixedFooter: {
    position: 'absolute',
    bottom: -15,
    left: 0,
    right: 0,
    // backgroundColor: 'red',
    // paddingVertical: 12,
    // paddingHorizontal: 10,
  },
});
