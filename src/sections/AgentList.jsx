/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable curly */
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AgentCard from '../components/Cards/AgentCard';

// const allAgentList = [
//     { id: 1, name: "Amit Sharma", mobileNo: "9876543210" },
//     { id: 2, name: "Priya Verma", mobileNo: "9123456780" },
//     { id: 3, name: "Rahul Singh", mobileNo: "9988776655" },
//     { id: 4, name: "Neha Gupta", mobileNo: "9012345678" },
//     { id: 5, name: "Rohit Yadav", mobileNo: "9090909090" },
//     { id: 6, name: "Sneha Patel", mobileNo: "9345678901" },
//     { id: 7, name: "Vikas Kumar", mobileNo: "9765432109" },
//     { id: 8, name: "Anjali Mehta", mobileNo: "9871234560" },
//     { id: 9, name: "Karan Malhotra", mobileNo: "9456781230" },
//     { id: 10, name: "Pooja Singh", mobileNo: "9321456780" },
//     { id: 11, name: "Arjun Nair", mobileNo: "9898989898" },
//     { id: 12, name: "Meera Iyer", mobileNo: "9786543210" },
//     { id: 13, name: "Sanjay Das", mobileNo: "9678901234" },
//     { id: 14, name: "Kavita Joshi", mobileNo: "9567812340" },
//     { id: 15, name: "Deepak Choudhary", mobileNo: "9432109876" }
// ];

const AgentList = ({allAgentList, navigation}) => {
  const ITEMS_PER_PAGE = 12;

  const [visibleData, setVisibleData] = useState(
    allAgentList.slice(0, ITEMS_PER_PAGE),
  );
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMore = () => {
    if (loadingMore) return;

    // Stop if all data loaded
    if (visibleData.length >= allAgentList.length) return;

    setLoadingMore(true);

    setTimeout(() => {
      const nextPage = page + 1;
      const newData = allAgentList.slice(0, nextPage * ITEMS_PER_PAGE);

      setVisibleData(newData);
      setPage(nextPage);
      setLoadingMore(false);
    }, 2000); // simulate API delay
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={visibleData}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <AgentCard
            name={`${item.agent_name} `}
            mobileNo={item.agent_mobile_no}
            navigation={navigation}
            agentData={item}
          />
        )}
        // Auto trigger load more on scroll
        onEndReached={loadMore}
        onEndReachedThreshold={0}
        // Loader at bottom
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator
              size="small"
              color={'#000'}
              style={{margin: 20}}
            />
          ) : //    : visibleData.length < leadData.length ? (
          //      <TouchableOpacity
          //        onPress={loadMore}
          //        style={{padding: 15, alignItems: 'center'}}>
          //        <Text style={{color: '#000'}}>Load More</Text>
          //      </TouchableOpacity>
          //    )
          null
        }
      />
      {/* <Text style={{color:'red'}}>Syuskswl,sls</Text> */}
    </View>
  );
};

export default AgentList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
