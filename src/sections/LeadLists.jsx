/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import ListCard from '../components/Cards/ListCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userGetLead} from '../Redux/Reducers/leadReducer';
import useMobileNoDetails from '../hooks/useMobileNoDetails';
import {useDispatch} from 'react-redux';
import {SelectColors} from '../constant/Colors';

export default function LeadList({
  leadData,
  navigation,
  limit,
  planType,
  totalPage,
}) {
  const [page, setPage] = useState(1);
  const [visibleData, setVisibleData] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const {mobileNoData} = useMobileNoDetails();
  const dispatch = useDispatch();

  const isFetching = useRef(false);

  const onEndReachedCalledDuringMomentum = useRef(false);

  useEffect(() => {
    if (leadData && leadData.length > 0) {
      if (page === 1) {
        setVisibleData(leadData);
      } else {
        setVisibleData(prev => [...prev, ...leadData]);
      }
      // ✅ Stop loader when data arrives

      setLoadingMore(false);

      isFetching.current = false;
    }
  }, [leadData]);

  // ✅ Load more function

  const loadMore = async () => {
    if (isFetching.current || page >= totalPage) return;

    console.log('📦 loadMore triggered');

    isFetching.current = true;

    setLoadingMore(true);

    const nextPage = page + 1;
    if (mobileNoData) {
      const leadListData = {
        owner_mobile_no: mobileNoData,
        action: 'lead_list',
        status: '',
        page: nextPage,
      };
      dispatch(userGetLead(JSON.stringify(leadListData)));
    }
    setPage(nextPage);
  };

  const handleToMoveEditPage = async item => {
    const value = await AsyncStorage.getItem('counter');
    const parsedValue = JSON.parse(value);
    const nextValue = parsedValue + 1;

    await AsyncStorage.setItem('counter', JSON.stringify(nextValue));

    setTimeout(() => {
      navigation.navigate('LeadDetails', {
        leadItem: item,
        limit: limit,
        planType: planType,
        from: 'Lead Details',
      });
    }, 500);
  };

  const statusArray = ['All', 'New', '', 'Convert', 'Lost'];

  return (
    <View style={{flex: 1, marginBottom: 10}}>
      <View style={styles.filterBox}>
        <Text style={styles.filterLabel}>Filter:</Text>
        {
          <FlatList
            data={statusArray}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.filterBtn}
                onPress={() => setSelectedItem(item)}>
                <Text style={styles.btnText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        }
      </View>
      <View>
        <FlatList
          data={visibleData}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <ListCard
              title={`${item.first_name} ${item.last_name}`}
              createdAt={item.created_at}
              subtitle={''}
              secondaryIcon={true}
              iconName="edit"
              onPress={() => handleToMoveEditPage(item)}
            />
          )}
          // Auto trigger load more on scroll
          onMomentumScrollBegin={() => {
            onEndReachedCalledDuringMomentum.current = false;
          }}
          onEndReached={() => {
            if (!onEndReachedCalledDuringMomentum.current) {
              loadMore();

              onEndReachedCalledDuringMomentum.current = true;
            }
          }}
          onEndReachedThreshold={0.5}
          // Loader at bottom
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator
                size="small"
                color={'#000'}
                style={{margin: 20}}
              />
            ) : null
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filterBox: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -5,
    marginBottom: 10,
  },
  filterLabel: {
    fontWeight: '800',
    color: SelectColors.accentBlueColor,
    fontSize: 18,
  },
  filterBtn: {
    backgroundColor: SelectColors.accentBlueColor,
    padding: 9,
    marginRight: 10,
    marginVertical: 10,
    width: 120,
    alignItems: 'center',
    borderRadius: 20,
    //  / iOS shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,

    // Android shadow
    elevation: 4,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
