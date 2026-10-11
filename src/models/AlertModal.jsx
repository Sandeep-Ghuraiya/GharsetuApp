import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

const AlertModal = ({
  isVisible,
  title = 'Alert',
  message = '',
  onConfirm,
  onCancel,
  confirmText = 'OK',
  cancelText = 'Cancel',
  showCancel = true,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.45}
      animationIn="zoomIn"
      animationOut="zoomOut"
      useNativeDriver
      onBackdropPress={onCancel}
      onBackButtonPress={onCancel}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>

        {!!message && <Text style={styles.message}>{message}</Text>}

        <View style={styles.buttonRow}>
          {showCancel && (
            <TouchableOpacity
              style={[styles.button, styles.cancelBtn]}
              onPress={onCancel}>
              <Text style={styles.cancelText}>{cancelText}</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.button, styles.confirmBtn]}
            onPress={onConfirm}>
            <Text style={styles.confirmText}>{confirmText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AlertModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  message: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 6,
    marginLeft: 10,
  },
  cancelBtn: {
    backgroundColor: '#f1f1f1',
  },
  confirmBtn: {
    backgroundColor: '#007AFF',
  },
  cancelText: {
    color: '#333',
    fontWeight: '500',
  },
  confirmText: {
    color: '#fff',
    fontWeight: '600',
  },
});
