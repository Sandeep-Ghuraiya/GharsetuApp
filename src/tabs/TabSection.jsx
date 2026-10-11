/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import FirstRoute from './FirstRoute';
import SecondRoute from './SecondRoute';
import {SelectColors} from '../constant/Colors';

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function TabViewSection() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    {key: 'first', title: 'Latest Leads'},
    {key: 'second', title: 'Meeting Schedule'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={styles.indicator}
          style={styles.tabBar}
          labelStyle={styles.label}
          activeColor="#ffffff"
          inactiveColor="#c5c5c5"
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: SelectColors.greyColor,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 2,
    elevation: 2,
  },
  indicator: {
    backgroundColor: SelectColors.primaryOrangeColor,
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    color: '#333',
  },
  desc: {
    fontSize: 14,
    color: '#666',
  },
});
