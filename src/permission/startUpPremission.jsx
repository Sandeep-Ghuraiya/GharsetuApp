import {Platform, PermissionsAndroid, Alert} from 'react-native';
import {
  request,
  requestMultiple,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

export const requestStartupPermissions = async () => {
  try {
    /* ================= ANDROID ================= */
    if (Platform.OS === 'android') {
      // Gallery permission (Android 13+ & below)
      const galleryPermission =
        Platform.Version >= 33
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

      const galleryGranted = await PermissionsAndroid.request(
        galleryPermission,
      );

      // Contacts permission
      const contactsGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      );

      if (
        galleryGranted !== PermissionsAndroid.RESULTS.GRANTED ||
        contactsGranted !== PermissionsAndroid.RESULTS.GRANTED
      ) {
        Alert.alert(
          'Permission Required',
          'Gallery or Contacts permission denied. Some features may not work.',
        );
      }
    }

    /* ================= iOS ================= */
    if (Platform.OS === 'ios') {
      const results = await requestMultiple([
        PERMISSIONS.IOS.PHOTO_LIBRARY,
        PERMISSIONS.IOS.CONTACTS,
      ]);

      const photoStatus = results[PERMISSIONS.IOS.PHOTO_LIBRARY];
      const contactsStatus = results[PERMISSIONS.IOS.CONTACTS];

      if (
        photoStatus !== RESULTS.GRANTED ||
        contactsStatus !== RESULTS.GRANTED
      ) {
        Alert.alert(
          'Permission Required',
          'Gallery or Contacts permission denied. Some features may not work.',
        );
      }
    }
  } catch (err) {
    console.log('Permission error:', err);
  }
};
