/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {SelectColors} from '../constant/Colors';
import PropertyFirstRoute from './PropertyFirstRoute';
import PropertySecondRoute from './PropertySecondRoute';

const renderScene = SceneMap({
  first: PropertyFirstRoute,
  second: PropertySecondRoute,
});

export default function PropertyTabSection() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    {key: 'first', title: 'Property'},
    {key: 'second', title: 'Draft '},
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
          inactiveColor="#f6f6f6"
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: SelectColors.darkGray,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 2,
    elevation: 2,
  },
  indicator: {
    backgroundColor: SelectColors.accentBlueColor,
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
