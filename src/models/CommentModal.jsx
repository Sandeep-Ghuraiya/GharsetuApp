/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SelectColors} from '../constant/Colors';
import LinearGradient from 'react-native-linear-gradient';
import Feather from '@react-native-vector-icons/feather';
import AntDesign from '@react-native-vector-icons/ant-design';

const CommentModal = ({
  commentData,
  statusModalOpen,
  onCloseModal,
  navigation,
  allLeadData,
}) => {
  const formatDate = dateStr => {
    const d = new Date(dateStr);
    return d.toLocaleString();
  };

  const handleEditComment = () => {
    onCloseModal();
    navigation.navigate('EditLead', {
      leadItem: allLeadData,
      from: 'Add Comment',
    });
  };

  return (
    <Modal
      visible={statusModalOpen}
      style={{flex: 1}}
      transparent={true}
      animationType="slide">
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => onCloseModal()}>
          <AntDesign name="close-circle" size={25} color={'#fff'} />
        </TouchableOpacity>
        <View style={styles.cardWrapper}>
          <LinearGradient colors={['#6C63FF', '#8A80FF']} style={styles.header}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              onPress={handleEditComment}>
              <Text style={styles.headerName}>Status & Comments</Text>
              <View>
                <Feather name={'edit'} size={24} color={'#FFFFFF'} />
              </View>
            </TouchableOpacity>
          </LinearGradient>
          <View style={styles.cardBody}>
            <FlatList
              data={commentData}
              key={item => item.id.toString()}
              renderItem={({item}) => (
                <View style={styles.row}>
                  {/* Content */}
                  <View style={styles.card}>
                    <Text style={[styles.status]}>{item.status}</Text>
                    <Text style={styles.comment}>{item.comment}</Text>
                    <Text style={styles.date}>
                      {formatDate(item.created_date)}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CommentModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    // padding: 20,
  },
  closeBtn: {
    alignItems: 'flex-end',
    margin: 10,
  },
  cardWrapper: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
    height: '90%',
    overflow: 'hidden',
    paddingBottom: 30,
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timeline: {
    width: 30,
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    // borderRadius: 10,
    backgroundColor: SelectColors.accentBlueColor,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: '#ccc',
    marginTop: 2,
  },
  cardBody: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    elevation: 2,
  },
  status: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#000',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  comment: {
    color: '#444',
    marginBottom: 6,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
});
