/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

/** ICONS **/
import {FontAwesome} from '@react-native-vector-icons/fontawesome';

/** COMPONENTS **/
import CommonButton from '../components/common/CommonButton';
import LeadList from '../sections/LeadLists';
import FilterScreen from '../components/datePicker/FilterScreen';
import {SelectColors} from '../constant/Colors';
import {getPropertiesList} from '../Redux/Reducers/propertyReducer';
import useMobileNoDetails from '../hooks/useMobileNoDetails';
import {userGetLead} from '../Redux/Reducers/leadReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListLoader from '../loader/ListLoader';

const LeadListScreen = ({navigation}) => {
  const leadListFromRedux = useSelector(state => state.agentLeads.leadsList);

  const {mobileNoData} = useMobileNoDetails();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [leadData, setLeadData] = useState([]);
  const [limit, setLimit] = useState(0);
  const [planType, setPlanType] = useState('');
  const [totalPage, setTotalPage] = useState(0);

  /** FAKE LOADING ON SCREEN FOCUS */
  // useFocusEffect(
  useEffect(() => {
    if (mobileNoData) {
      const propertiesListData = {
        owner_mobile_no: mobileNoData,
        action: 'property_list',
        page: 'all',
      };
      dispatch(getPropertiesList(JSON.stringify(propertiesListData)));
    }
    setLeadData(leadListFromRedux?.data);
    setLimit(leadListFromRedux?.free_plan_lead_limit);
    setPlanType(leadListFromRedux?.plan_type);
    setTotalPage(leadListFromRedux?.pagination?.total_pages);
  }, [leadListFromRedux, mobileNoData]),
    useFocusEffect(
      useCallback(() => {
        const leadDataHandle = async () => {
          if (mobileNoData) {
            const leadListData = {
              owner_mobile_no: mobileNoData,
              action: 'lead_list',
              status: '',
              page: 1,
            };
            dispatch(userGetLead(JSON.stringify(leadListData)));

            const currentDate = new Date();
            await AsyncStorage.setItem(
              'current_date',
              JSON.stringify(currentDate),
            );
          }
        };

        leadDataHandle();
      }, [mobileNoData]),
    );

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }, []),
  );

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 20,
        paddingBottom: 10,
        justifyContent: 'flex-start',
      }}>
      {loading ? (
        <View style={{}}>
          <ListLoader />
        </View>
      ) : leadData?.length > 0 ? (
        <LeadList
          leadData={leadData}
          navigation={navigation}
          limit={limit}
          planType={planType}
          totalPage={totalPage}
        />
      ) : (
        <Text
          style={{
            textAlign: 'center',
            color: '#000',
            fontWeight: '600',
          }}>
          No leads found
        </Text>
      )}
    </View>
  );
};

export default LeadListScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
