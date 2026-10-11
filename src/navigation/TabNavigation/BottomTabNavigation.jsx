/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import {Ionicons} from '@react-native-vector-icons/ionicons'; // For icons

// Screens (define your screen components here or import them)
import HomeScreen from '../../screens/HomeScreen';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import NotificationScreen from '../../screens/NotificationScreen';
import LeadListScreen from '../../screens/LeadListScreen';
import AccountScreen from '../../screens/AccountScreen';
// import OtherScreen from '../../screens/OtherScreen';
import {SelectColors} from '../../constant/Colors';
import CustomDrawerModal from '../../components/custom/CustomDrawer';
//import Header from '../../components/header/Header';
import TabHeader from '../../components/header/TabHeader';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation(props) {
  const [toolTipVisible, setTooltipVisible] = useState(false); // Set initial visibility to true
  const [visibleModal, setVisibleModal] = useState(false);

  const backgroundColor = Colors.lighter;
  const colorStyles = '#000000';

  // Define an action (function) to be called when a tab is pressed
  const handleTabPress = () => {
    setVisibleModal(true);
  };

  const onClose = () => {
    setVisibleModal(false);
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let iconSize = size;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Notification') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            } else if (route.name === 'Leads') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'Account') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Menu') {
              iconName = focused ? 'menu' : 'menu-outline';
            }

            return <Ionicons name={iconName} size={iconSize} color={color} />;
          },
          tabBarLabel: route.name === 'Add' ? '' : undefined, // Hide label for "Add" tab
          tabBarActiveTintColor: SelectColors.tabColor,
          tabBarInactiveTintColor: colorStyles,
          tabBarStyle: {
            backgroundColor: backgroundColor,
            paddingBottom: 30,
            height: 100,
            // ⭐ Shadow for iOS
            shadowColor: '#000',
            shadowOffset: {width: 0, height: -3},
            shadowOpacity: 0.15,
            shadowRadius: 6,
            // ⭐ Elevation for Android
            elevation: 15,
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '600',
          },
          headerShown: true,
        })}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={({navigation, route}) => ({
            title: 'Home',
            header: () => (
              <TabHeader
                navigation={navigation}
                route={route}
                title={'Gharsetu'}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Notification"
          component={NotificationScreen}
          options={({navigation, route}) => ({
            title: 'Notification',
            header: () => (
              <TabHeader
                navigation={navigation}
                route={route}
                title={'Gharsetu'}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Leads"
          component={LeadListScreen}
          options={({navigation, route}) => ({
            title: 'Leads',
            header: () => (
              <TabHeader
                navigation={navigation}
                route={route}
                title={'Lead List'}
                icon={true}
                screenName={'AddLead'}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={({navigation, route}) => ({
            title: 'Account',
            header: () => (
              <TabHeader
                navigation={navigation}
                route={route}
                title={'Gharsetu'}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Menu"
          component={CustomDrawerModal}
          listeners={({navigation}) => ({
            tabPress: e => {
              e.preventDefault();
              handleTabPress();
            },
          })}
        />
      </Tab.Navigator>
      {visibleModal && (
        <CustomDrawerModal
          visibleModal={visibleModal}
          onClose={onClose}
          props={props}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  touchable: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ff9900',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
