/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable curly */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import PropertyListCard from '../components/Cards/PropertyListCard';
import {getPropertiesList} from '../Redux/Reducers/propertyReducer';
import {useDispatch} from 'react-redux';
import useMobileNoDetails from '../hooks/useMobileNoDetails';

export default function PropertiesList({
  propertiesData,
  navigation,
  pageName,
  pageTitle,
  name,
  totalPage,
  handleLoader,
}) {
  const [visibleData, setVisibleData] = useState([]);

  const [page, setPage] = useState(1);

  const [loadingMore, setLoadingMore] = useState(false);

  const dispatch = useDispatch();

  const {mobileNoData} = useMobileNoDetails();

  // 🔒 Prevent multiple API calls

  const isFetching = useRef(false);

  const onEndReachedCalledDuringMomentum = useRef(false);

  // ✅ Update list when API data changes

  useEffect(() => {
    if (propertiesData && propertiesData.length > 0) {
      if (page === 1) {
        setVisibleData(propertiesData);
      } else {
        setVisibleData(prev => {
          const combined = [...prev, ...propertiesData];
          const unique = Array.from(
            new Map(combined.map(item => [item.id, item])).values(),
          );
          return unique;
        });
      }

      // ✅ Stop loader when data arrives

      setLoadingMore(false);

      isFetching.current = false;
    }
  }, [propertiesData]);

  // ✅ Load more function

  const loadMore = () => {
    if (isFetching.current || page >= totalPage) return;

    console.log('📦 loadMore triggered');

    isFetching.current = true;

    setLoadingMore(true);

    const nextPage = page + 1;

    if (mobileNoData) {
      const payload = {
        owner_mobile_no: mobileNoData,
        action: 'property_list',
        page: nextPage,
      };
      dispatch(getPropertiesList(JSON.stringify(payload)));
    }

    setPage(nextPage);
  };

  // ✅ Navigate to edit page

  const handleToMoveEditPage = item => {
    navigation.navigate(pageName, {
      propertyItem: item,
      name: name,
      from: pageTitle,
    });
  };

  const renderItem = useCallback(
    ({item}) => (
      <PropertyListCard
        title={item.property_name}
        image={item.property_images}
        bedroom={item.bedrooms}
        bathroom={item.bathrooms}
        area={item.property_area_square}
        propertyId={item.id}
        onPress={() => handleToMoveEditPage(item)}
        handleLoader={handleLoader}
      />
    ),
    [handleLoader],
  );

  return (
    <View style={{}}>
      <FlatList
        data={visibleData}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{flexGrow: 1}}
        renderItem={renderItem}
        // ✅ Prevent multiple triggers
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
        // ✅ Footer loader / button

        ListFooterComponent={() => {
          if (loadingMore) {
            return (
              <ActivityIndicator
                size="small"
                color="#000"
                style={{margin: 20}}
              />
            );
          }
          return null;
        }}
      />
    </View>
  );
}
