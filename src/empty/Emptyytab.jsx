/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // For icons

// Screens (define your screen components here or import them)
import HomeScreen from '../../Screens/HomeScreen';
import NotificationScreen from '../../Screens/NotificationScreen';
import ProfileScreen from '../../Screens/ProfileScreen';
import AddScreen from '../../Screens/AddScreen';
import CustomDrawerModal from './CustomDrawerModal';

const Tab = createBottomTabNavigator();

export default function TabNavigation(props) {
  const [toolTipVisible, setTooltipVisible] = useState(false); // Set initial visibility to true
  const [visibleModal, setVisibleModal] = useState(false);

  // Define an action (function) to be called when a tab is pressed
  const handleTabPress = () => {
    setVisibleModal(true);
  };

  const closeModal = () => {
    setTooltipVisible(false);
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
            } else if (route.name === 'Add') {
              iconName = focused ? 'close-circle' : 'add-circle';
              iconSize = size + 25; // Increase size for the Add icon
              return (
                <View
                  style={{
                    position: 'absolute',
                    top: 5,
                    backgroundColor: '#4567b7',
                  }}>
                  <Ionicons name={iconName} size={iconSize} color="white" />
                </View>
              );
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Other') {
              iconName = focused ? 'menu' : 'menu-outline';
            }

            return <Ionicons name={iconName} size={iconSize} color={color} />;
          },
          tabBarLabel: route.name === 'Add' ? '' : undefined, // Hide label for "Add" tab
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'white',
          tabBarStyle: {
            backgroundColor: '#4567b7',
            paddingBottom: 8,
            height: 65,
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
          headerShown: false,
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            headerShown: true,
            headerTitle: 'Notification',
            headerTitleAlign: 'center', // Center aligns the title
            headerTitleStyle: {
              color: '#fff',
              fontWeight: '600',
            },
            headerStyle: {
              backgroundColor: '#4567b7',
            },
            headerTintColor: '#fff', // Sets the back arrow color to white
          }}
        />
        <Tab.Screen
          name="Add"
          component={AddScreen}
          listeners={({navigation}) => ({
            tabPress: e => {
              e.preventDefault();
              setTooltipVisible(true);
            },
          })}
        />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen
          name="Other"
          component={CustomDrawerModal}
          listeners={({navigation}) => ({
            tabPress: e => {
              e.preventDefault();
              handleTabPress();
            },
          })}
        />
      </Tab.Navigator>
      <AddScreen
        toolTipVisible={toolTipVisible}
        closeModal={closeModal}
        props={props}
      />
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
