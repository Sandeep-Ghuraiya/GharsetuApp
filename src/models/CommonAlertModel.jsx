/* eslint-disable prettier/prettier */
/* eslint-disable curly */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const CommonAlertModel = ({
  visible,
  title,
  message,
  type = 'info',
  onCancel,
  onConfirm,
}) => {
  if (!visible) return null;

  const getHeaderStyle = () => {
    switch (type) {
      case 'success':
        return styles.headerSuccess;
      case 'error':
        return styles.headerError;
      case 'confirm':
        return styles.headerConfirm;
      default:
        return styles.headerInfo;
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, getHeaderStyle()]}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.message}>{message}</Text>
      </View>

      <View style={styles.footer}>
        {onCancel && (
          <TouchableOpacity
            style={[styles.button, styles.cancelBtn]}
            onPress={onCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        )}

        {onConfirm && (
          <TouchableOpacity
            style={[styles.button, styles.confirmBtn]}
            onPress={onConfirm}>
            <Text style={styles.confirmText}>OK</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CommonAlertModel;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  header: {
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInfo: {
    backgroundColor: '#2f86eb33',
  },
  headerSuccess: {
    backgroundColor: '#2ecc7133',
  },
  headerError: {
    backgroundColor: '#e74c3c33',
  },
  headerConfirm: {
    backgroundColor: '#f1c40f33',
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
  },
  body: {
    padding: 18,
    minHeight: 200,
    justifyContent: 'center',
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 12,
    gap: 8,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    minWidth: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtn: {
    backgroundColor: '#f0f0f0',
  },
  confirmBtn: {
    backgroundColor: '#2f86eb',
  },
  cancelText: {
    color: '#333',
    fontWeight: '600',
  },
  confirmText: {
    color: '#fff',
    fontWeight: '700',
  },
});
