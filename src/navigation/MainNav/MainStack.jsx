/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
//Navigation
import {createNativeStackNavigator} from '@react-navigation/native-stack';

/* SCREENS */
import AddLeadScreen from '../../screens/AddLeadScreen';
import LeadDetailsScreen from '../../screens/LeadDetailsScreen';
import EditLeadScreen from '../../screens/EditLeadScreen';
import PropertyListScreen from '../../screens/PropertiesListScreen';
import AddPropertiesScreen from '../../screens/AddPropertiesScreen';
import PropertyDetailsScreen from '../../screens/PropertyDetailsScreen';

// TAB
import BottomTabNavigation from '../TabNavigation/BottomTabNavigation';

// COMPONENTS
import Header from '../../components/header/Header';
import EditPropertyScreen from '../../screens/EditPropertyScreen';
import SubscriptionScreen from '../../screens/SubscriptionScreen';
import AddAgentScreen from '../../screens/AddAgentScreen';
import MeetingListScreen from '../../screens/MeetingListScreen';
import AgentDetailsScreen from '../../screens/AgentDetailsScreen';
import AgentListScreen from '../../screens/AgentListScreen';
import EditAgentScreen from '../../screens/EditAgentScreen';
import AddMeetingScreen from '../../screens/AddMeetingScreen';
import EditMeetingScreen from '../../screens/EditMeetingScreen';
import ResetPasswordScreen from '../../screens/AuthScreen/ResetPasswordScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="MainTabs"
        component={BottomTabNavigation}
        options={({navigation, route}) => ({
          headerShown: false,
          title: 'Gharsetu',
          header: () => <Header navigation={navigation} route={route} />,
        })}
      />
      <Stack.Screen
        name="LeadDetails"
        component={LeadDetailsScreen}
        options={({navigation, route}) => ({
          headerShown: true,
          title: 'Lead Details',
          header: () => <Header navigation={navigation} route={route} />,
        })}
      />
      <Stack.Screen
        name="AddLead"
        component={AddLeadScreen}
        options={({navigation, route}) => ({
          headerShown: true,
          title: 'Add Lead',
          header: () => <Header navigation={navigation} route={route} />,
        })}
      />
      <Stack.Screen
        name="EditLead"
        component={EditLeadScreen}
        options={({navigation, route}) => ({
          headerShown: true,
          title: 'Edit Lead',
          header: () => <Header navigation={navigation} route={route} />,
        })}
      />
      <Stack.Screen
        name="PropertiesList"
        component={PropertyListScreen}
        options={({navigation, route}) => ({
          headerShown: true,
          title: 'Property List',
          header: () => (
            <Header
              navigation={navigation}
              route={route}
              icon={true}
              screenName={'AddProperties'}
              title={'Add Properties'}
            />
          ),
        })}
      />
      <Stack.Screen
        name="PropertyDetails"
        component={PropertyDetailsScreen}
        options={({navigation, route}) => ({
          headerShown: true,
          title: 'Property Details',
          header: () => <Header navigation={navigation} route={route} />,
        })}
      />
      <Stack.Screen
        name="AddProperties"
        component={AddPropertiesScreen}
        options={({navigation, route}) => ({
          headerShown: true,
          title: 'Add Property',
          header: () => <Header navigation={navigation} route={route} />,
        })}
      />
      <Stack.Screen
        name="EditProperty"
        component={EditPropertyScreen}
        options={({navigation, route}) => ({
          headerShown: true,
          title: 'Edit Property',
          header: () => <Header navigation={navigation} route={route} />,
        })}
      />
      <Stack.Screen
        name="Subscription"
        component={SubscriptionScreen}
        options={({navigation, route}) => ({
          headerShown: true,
          title: 'Subscription',
          header: () => <Header navigation={navigation} route={route} />,
        })}
      />
      <Stack.Screen
        name="AgentList"
        component={AgentListScreen}
        options={({navigation, route}) => ({
          headerShown: true,
          title: 'Agent List',
          header: () => (
            <Header
              navigation={navigation}
              route={route}
              icon={true}
              screenName={'AddAgent'}
              title={'Add Agent'}
            />
          ),
        })}
      />
      <Stack.Screen
        name="AddAgent"
        component={AddAgentScreen}
        options={({navigation, route}) => ({
          headerShown: true,
          title: 'AddAgent',
          header: () => <Header navigation={navigation} route={route} />,
        })}
      />
      <Stack.Screen
        name="EditAgent"
        component={EditAgentScreen}
        options={({navigation, route}) => ({
          headerShown: true,
          title: 'AddAgent',
          header: () => <Header navigation={navigation} route={route} />,
        })}
      />
      <Stack.Screen
        name="AgentDetails"
        component={AgentDetailsScreen}
        options={({navigation, route}) => ({
          headerShown: true,
          title: 'Agent',
          header: () => <Header navigation={navigation} route={route} />,
        })}
      />
      <Stack.Screen
        name="MeetingList"
        component={MeetingListScreen}
        options={({navigation, route}) => ({
          headerShown: true,
          title: 'Meeting',
          header: () => (
            <Header
              navigation={navigation}
              route={route}
              icon={true}
              screenName={'AddMeeting'}
              title={'Add Meeting'}
            />
          ),
        })}
      />

      <Stack.Screen
        name="AddMeeting"
        component={AddMeetingScreen}
        options={({navigation, route}) => ({
          headerShown: true,
          title: 'Meeting',
          header: () => <Header navigation={navigation} route={route} />,
        })}
      />
      <Stack.Screen
        name="EditMeeting"
        component={EditMeetingScreen}
        options={({navigation, route}) => ({
          headerShown: true,
          title: 'Meeting',
          header: () => <Header navigation={navigation} route={route} />,
        })}
      />

      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={({navigation, route}) => ({
          headerShown: true,
          title: 'Change Password',
          header: () => <Header navigation={navigation} route={route} />,
        })}
      />
    </Stack.Navigator>
  );
};

export default MainStack;

// const styles = StyleSheet.create({});
