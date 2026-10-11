/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
/** ICONS **/
import {MaterialIcons} from '@react-native-vector-icons/material-icons';
import {Entypo} from '@react-native-vector-icons/entypo';
/*** CONSTANT ***/
import {SelectColors} from '../../constant/Colors';
import LogoutModal from '../../models/LogoutModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useLoginData from '../../hooks/useLoginData';
import Ionicons from '@react-native-vector-icons/ionicons';
import {logout} from '../../Redux/Reducers/authReducer';

const width = Dimensions.get('window').width;

const CustomDrawerModal = ({visibleModal, onClose, props}) => {
  const {loginDetails, loginLoading} = useLoginData();

  console.log('login', loginDetails);

  const dispatch = useDispatch();
  const {navigation, route} = props;

  const [currentRoute, setCurrentRoute] = useState('HomeTabs');
  const [logoutModal, setLogoutModal] = useState(false);

  // Animated value to control the sliding effect
  const slideAnim = useState(new Animated.Value(-width))[0]; // Start offscreen to the left

  useEffect(() => {
    if (visibleModal) {
      // Animate modal in from left
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      // Animate modal out to the left
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // After the slide-out animation is complete, set isVisible to false to close the modal
      });
    }
  }, [visibleModal]);

  // Handle closing the modal when clicking outside
  const handleClose = () => {
    // Trigger the slide-out animation
    Animated.timing(slideAnim, {
      toValue: -width,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      if (onClose) {
        onClose(); // Call the onClose prop if provided
      }
    });
  };

  const handleLogout = async () => {
    dispatch(logout());
    navigation.replace('Enterpin');
  };

  return (
    <View>
      <Modal
        visible={visibleModal}
        transparent={true}
        animationType="none" // We will handle the animation manually
        onBackdropPress={handleClose}
        statusBarTranslucent={true}
        style={{margin: 0}}>
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.container}>
            <TouchableWithoutFeedback>
              <Animated.View
                style={[
                  styles.modalContainer,
                  {transform: [{translateX: slideAnim}]},
                ]}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    handleClose();
                  }}>
                  <Entypo name="cross" color={'#000'} size={40} />
                </TouchableOpacity>
                <View style={styles.profileContainer}>
                  <View>
                    <Image
                      source={require('../../assets/images/profileIcon.png')}
                      style={{width: 70, height: 70}}
                    />
                    {/* <Ionicons name='person-circle-outline' size={30} color={SelectColors.} /> */}
                    {/* <TouchableOpacity
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 70,
                        backgroundColor: 'lightgray',
                        borderRadius: 50,
                        padding: 3,
                      }}
                      onPress={() => {
                        handleClose();
                        props.navigation.navigate('Profile');
                      }}>
                      <MaterialIcons name="edit" color="white" size={16} />
                    </TouchableOpacity> */}
                  </View>
                  <Text
                    style={{
                      marginVertical: 10,
                      color: 'white',
                      fontWeight: '600',
                      fontSize: 16,
                    }}>
                    {`${loginDetails?.data?.first_name} ${loginDetails?.data?.last_name}`}
                  </Text>
                </View>

                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setCurrentRoute('HomeTabs');
                      props.navigation.navigate('Home');
                      handleClose();
                    }}
                    style={[
                      currentRoute === 'HomeTabs'
                        ? styles.modalBox
                        : styles.modalInActiveBox,
                    ]}>
                    <Text
                      style={[
                        currentRoute === 'HomeTabs'
                          ? styles.modalText
                          : styles.modalInActiveText,
                      ]}>
                      Home
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setCurrentRoute('Aboutus');
                      props.navigation.navigate('Aboutus');
                      handleClose();
                    }}
                    style={[
                      currentRoute === 'Aboutus'
                        ? styles.modalBox
                        : styles.modalInActiveBox,
                    ]}>
                    <Text
                      style={[
                        currentRoute === 'Aboutus'
                          ? styles.modalText
                          : styles.modalInActiveText,
                      ]}>
                      About us
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setCurrentRoute('PrivacyPolicy');
                      props.navigation.navigate('PrivacyPolicy');
                      handleClose();
                    }}
                    style={[
                      currentRoute === 'PrivacyPolicy'
                        ? styles.modalBox
                        : styles.modalInActiveBox,
                    ]}>
                    <Text
                      style={[
                        currentRoute === 'PrivacyPolicy'
                          ? styles.modalText
                          : styles.modalInActiveText,
                      ]}>
                      Privacy Policy
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setCurrentRoute('Terms');
                      props.navigation.navigate('Terms');
                      handleClose();
                    }}
                    style={[
                      currentRoute === 'Terms'
                        ? styles.modalBox
                        : styles.modalInActiveBox,
                    ]}>
                    <Text
                      style={[
                        currentRoute === 'Terms'
                          ? styles.modalText
                          : styles.modalInActiveText,
                      ]}>
                      Terms of use
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setCurrentRoute('FAQ');
                      props.navigation.navigate('FAQ');
                      handleClose();
                    }}
                    style={[
                      currentRoute === 'FAQ'
                        ? styles.modalBox
                        : styles.modalInActiveBox,
                    ]}>
                    <Text
                      style={[
                        currentRoute === 'FAQ'
                          ? styles.modalText
                          : styles.modalInActiveText,
                      ]}>
                      FAQ
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.separator}></View>
                  {/* <TouchableOpacity
                    onPress={() => {
                      setCurrentRoute('ChangePassword');
                      props.navigation.navigate('ResetPassword',{from:'Change Password'});
                      handleClose();
                    }}
                    style={[
                      currentRoute === 'ChangePassword'
                        ? styles.modalBox
                        : styles.modalInActiveBox,
                    ]}>
                    <Text
                      style={[
                        currentRoute === 'ChangePassword'
                          ? styles.modalText
                          : styles.modalInActiveText,
                      ]}>
                      Change Password
                    </Text>
                  </TouchableOpacity> */}
                </View>

                <View style={styles.logoutContainer}>
                  <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => setLogoutModal(true)}>
                    <View>
                      <Text style={styles.logoutText}>Logout</Text>
                      <Text
                        style={{
                          fontSize: 12,
                        }}>{`${loginDetails?.data?.first_name} ${loginDetails?.data?.last_name}`}</Text>
                    </View>
                    <MaterialIcons name="logout" size={24} color={'#fff'} />
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
        <LogoutModal
          visible={logoutModal}
          onCancel={() => setLogoutModal(false)}
          onConfirm={handleLogout}
        />
      </Modal>
    </View>
  );
};

export default CustomDrawerModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    width: width * 0.75,
    height: '100%',
    backgroundColor: SelectColors.secondaryBlueColor,
    position: 'absolute',
    left: 0,
    top: 0,
    paddingTop: 60,
  },
  profileContainer: {
    marginVertical: 20,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 15,
  },
  modalBox: {
    width: '80%',
    padding: 10,
    backgroundColor: 'white',
    borderTopEndRadius: 40,
    borderBottomEndRadius: 40,
    paddingHorizontal: 20,
  },
  modalInActiveBox: {
    padding: 10,
    marginLeft: 10,
  },
  modalText: {
    color: '#4567b7',
    fontSize: 18,
    fontWeight: '600',
  },
  modalInActiveText: {
    color: 'white',
    fontSize: 18,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginVertical: 20,
  },
  logoutButton: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutText: {
    // paddingHorizontal: 10,
    fontSize: 18,
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 2,
  },
  logoutModalText: {
    fontSize: 16,
    marginBottom: 20,
    color: 'black',
    paddingHorizontal: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: -40,
    zIndex: 10,
  },
  logoutContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
});
