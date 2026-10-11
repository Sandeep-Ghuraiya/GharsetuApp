/* eslint-disable prettier/prettier */
import {showMessage} from 'react-native-flash-message';

const baseConfig = {
  duration: 3000,
  position: 'top',
  floating: false,
  hideOnPress: true,
  animated: true,
  autoHide: true,
  titleStyle: {
    fontWeight: '600',
    fontSize: 15,
  },
  textStyle: {
    fontSize: 13,
  },
};

export const showSuccess = ({message, description = '', duration}) => {

  showMessage({
    ...baseConfig,
    message,
    description,
    type: 'success',
    icon: 'success',
    backgroundColor: '#16a34a',
    color: '#fff',
    duration: duration ?? baseConfig.duration,
    statusBarHeight: 50,
  });
};

export const showError = ({message, description = '', duration}) => {

  showMessage({
    ...baseConfig,
    message,
    description,
    type: 'danger',
    icon: 'danger',
    backgroundColor: '#dc2626',
    color: '#fff',
    duration,
    statusBarHeight: 50,
  });
};

export const showWarning = ({message, description = ''}) => {
  showMessage({
    ...baseConfig,
    message,
    description,
    type: 'warning',
    icon: 'warning',
    backgroundColor: '#f59e0b',
    color: '#000',
    statusBarHeight: 50,
  });
};

export const showInfo = ({message, description = ''}) => {
  showMessage({
    ...baseConfig,
    message,
    description,
    type: 'info',
    icon: 'info',
    backgroundColor: '#2563eb',
    color: '#fff',
    statusBarHeight: 50,
  });
};
