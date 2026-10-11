/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import {
  Button,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import CardBox from '../components/Cards/CardBox';
import {useThemeColors} from '../hooks/useThemeColors';
import {useDispatch, useSelector} from 'react-redux';
import {getFacilitiesList} from '../Redux/Reducers/locationReducer';
import RectangleBox from '../components/Cards/RectangleBox';
import TabViewSection from '../tabs/TabSection';
import useMobileNoDetails from '../hooks/useMobileNoDetails';

const HomeScreen = props => {
  const {background, text} = useThemeColors();

  const {leadsList} = useSelector(state => state.agentLeads);
  const {propertiesList} = useSelector(state => state.propertiesData);

  console.log('Recods:', propertiesList?.total_records ? 1 : 0);

  const {mobileNoData} = useMobileNoDetails();

  const dispatch = useDispatch();

  return (
    <View style={[styles.container, {backgroundColor: '#fff'}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.fullWidth]}>
          <View style={[styles.rectCardRow]}>
            <RectangleBox
              icon="badge-account-horizontal"
              headerTitle="Leads"
              infoText={`${leadsList?.pagination?.total} Active Leads`}
              goToPage="Leads"
              navigation={props.navigation}
              props={props}
              width={'48%'}
              from={'Lead List'}
            />
            <RectangleBox
              icon="map-marker"
              headerTitle="My Property"
              infoText={
                propertiesList?.total_records
                  ? `${parseInt(propertiesList?.total_records)} Properties List`
                  : '0 Properties List'
              }
              goToPage="PropertiesList"
              navigation={props.navigation}
              props={props}
              width={'48%'}
              from={'Properties List'}
            />
          </View>
          <View style={[{marginBottom: 10, height: 440}]}>
            <TabViewSection />
          </View>
          <View style={styles.row}>
            <CardBox
              icon="home"
              title="Properties"
              goToPage="PropertiesList"
              props={props}
              textColor={text}
              from={'Properties List'}
            />
            <CardBox
              icon="handshake-o"
              title="Meetings"
              goToPage="MeetingList"
              props={props}
              textColor={text}
              from={'Meeting List'}
            />
            <CardBox
              icon="industry"
              title="Agents"
              goToPage="AgentList"
              props={props}
              textColor={text}
              from={'Agent List'}
            />
            <CardBox
              icon="bar-chart"
              title="Analytics"
              goToPage="Agents"
              props={props}
              textColor={text}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: '100%',
    height: '100%',
    minHeight: 100,
  },
  fullWidth: {width: '100%'},
  title: {
    fontWeight: '600',
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 20,
  },
  rectCardRow: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
    gap: 5,
  },
  tableList: {
    width: '100%',
    marginVertical: 10,
  },
  tableItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 15,
  },
  tableListItem: {
    justifyContent: 'flex-start',
    marginBottom: 10,
    backgroundColor: '#F2E9FF',
    borderRadius: 15,
    padding: 15,

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 4,

    // Android shadow
    elevation: 6,
  },
});
