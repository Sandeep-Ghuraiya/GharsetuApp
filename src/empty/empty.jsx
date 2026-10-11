import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import FontAwesome from '@react-native-vector-icons/fontawesome';

const empty = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          {/* <Section title="Step One">
                  <FontAwesome name="sign-out" color="#ff0000" size={30} />
                  Edit <Text style={styles.highlight}>App.tsx</Text> to change this
                  screen and then come back to see your edits hello.
                </Section> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default empty;


/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
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
    setVisibleModal(true)
  };
 
  const closeModal = () => {
    setTooltipVisible(false)
  }
 
  const onClose = () => {
    setVisibleModal(false)
  }
 
  return (
    <>
 
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
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
                <View style={{
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
        <Tab.Screen name="Notification" component={NotificationScreen}
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
        <Tab.Screen name="Add"
          component={AddScreen}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              setTooltipVisible(true)
            },
          })}
        />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen
          name="Other"
          component={CustomDrawerModal}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
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
      {
        visibleModal &&
        <CustomDrawerModal
          visibleModal={visibleModal}
          onClose={onClose}
          props={props}
        />
      }
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


// // LeadCard.js
// import React from 'react';
// import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';

// const LabelValueRow = ({label, value, onPressValue}) => (
//   <View style={styles.row}>
//     <Text style={styles.label}>{label}</Text>
//     {onPressValue ? (
//       <TouchableOpacity onPress={onPressValue} accessibilityRole="button">
//         <Text style={[styles.value, styles.link]}>{value}</Text>
//       </TouchableOpacity>
//     ) : (
//       <Text style={styles.value}>{value}</Text>
//     )}
//   </View>
// );

// const formatCurrency = amount => {
//   if (!amount && amount !== 0) return '-';
//   try {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       maximumFractionDigits: 0,
//     }).format(Number(amount));
//   } catch {
//     return amount;
//   }
// };

// const LeadCard = ({lead = {}, navigation, from, style}) => {
//   const handlePhonePress = phone => {
//     const url = `tel:${phone}`;
//     Linking.canOpenURL(url).then(
//       supported => supported && Linking.openURL(url),
//     );
//   };

//   const handleEmailPress = email => {
//     const url = `mailto:${email}`;
//     Linking.canOpenURL(url).then(
//       supported => supported && Linking.openURL(url),
//     );
//   };

//   return (
//     <View style={[styles.card, style]}>
//       <Text style={styles.title}>{lead.fullName ?? 'No name'}</Text>

//       <LabelValueRow label="ID" value={lead.id?.toString() ?? '-'} />
//       <LabelValueRow label="Address" value={lead.address ?? '-'} />
//       <LabelValueRow label="Area / Locality" value={lead.area ?? '-'} />
//       <LabelValueRow label="Looking For" value={lead.lookingFor ?? '-'} />
//       <LabelValueRow
//         label="Client Budget"
//         value={formatCurrency(lead.clientBudget)}
//       />
//       <LabelValueRow
//         label="Email"
//         value={lead.email ?? '-'}
//         onPressValue={() => handleEmailPress(lead.email)}
//       />
//       <LabelValueRow
//         label="Phone"
//         value={lead.phone ?? '-'}
//         onPressValue={() => handlePhonePress(lead.phone)}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 14,
//     margin: 12,
//     // subtle shadow (iOS/Android)
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 6},
//     shadowOpacity: 0.08,
//     shadowRadius: 10,
//     elevation: 3,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: '700',
//     marginBottom: 8,
//   },
//   row: {
//     flexDirection: 'row',
//     paddingVertical: 8,
//     borderBottomWidth: 0.5,
//     borderBottomColor: '#eee',
//     alignItems: 'center',
//   },
//   label: {
//     flex: 0.45,
//     fontSize: 14,
//     color: '#666',
//   },
//   value: {
//     flex: 0.55,
//     fontSize: 15,
//     color: '#111',
//   },
//   link: {
//     textDecorationLine: 'underline',
//   },
// });

// export default LeadCard;
