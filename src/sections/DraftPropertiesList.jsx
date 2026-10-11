/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable curly */

import React, {useState, useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropertyListCard from '../components/Cards/PropertyListCard';

export default function DraftPropertiesList({
  propertiesData,
  navigation,
  pageName,
  pageTitle,
  name,
  totalPage,
}) {
  const [page, setPage] = useState(1);
  const [visibleData, setVisibleData] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);

  // Load first 10 items
  useEffect(() => {
    setVisibleData(propertiesData.slice(0, 10));
  }, [propertiesData]);

  // Load more function
  const loadMore = () => {
    if (loadingMore) return;

    setLoadingMore(true);

    setTimeout(() => {
      const nextPage = page + 1;
      const newData = propertiesData.slice(0, nextPage * 10);

      setVisibleData(newData);
      setPage(nextPage);
      setLoadingMore(false);
    }, 600); // simulate small delay
  };

  const handleToMoveEditPage = item => {
    navigation.navigate(pageName, {
      propertyItem: item,
      name: name,
      from: pageTitle,
    });
  };

  return (
    <View style={{}}>
      <View>
        <FlatList
          data={visibleData}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <PropertyListCard
              title={item.property_name}
              createdAt={item.created_at}
              subtitle={''}
              secondaryIcon={true}
              iconName="edit"
              onPress={() => handleToMoveEditPage(item)}
            />
          )}
          // Auto trigger load more on scroll
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          // Loader at bottom
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator
                size="small"
                color={'#000'}
                style={{margin: 20}}
              />
            ) : visibleData.length < propertiesData.length ? (
              <TouchableOpacity
                onPress={loadMore}
                style={{padding: 15, alignItems: 'center'}}>
                <Text style={{color: '#000'}}>Load More</Text>
              </TouchableOpacity>
            ) : null
          }
        />
      </View>
    </View>
  );
}
