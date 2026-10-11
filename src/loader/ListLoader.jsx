import {StyleSheet, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

const ListLoader = () => {
  const shimmerArray = Array.from({length: 5});

  return (
    <View>
      {shimmerArray.map((_, index) => (
        <ShimmerPlaceHolder
          key={index}
          LinearGradient={LinearGradient}
          style={styles.shimmerBox}
          shimmerColors={['#d6d6d6', '#bfbfbf', '#d6d6d6']}
          // good for white background
        />
      ))}
    </View>
  );
};

export default ListLoader;

const styles = StyleSheet.create({
  shimmerBox: {
    width: '100%',
    borderRadius: 12,
    marginVertical: 8,
    height: 65,
  },
});
