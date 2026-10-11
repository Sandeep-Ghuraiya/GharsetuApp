/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
// components/CustomRadioButton.js
import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {SelectColors} from '../../constant/Colors';

export default function CustomRadioButton({
  label1,
  label2,
  value1,
  value2,
  selected,
  onPress,
}) {
  const scale1 = useSharedValue(selected === value1 ? 1 : 0);
  const scale2 = useSharedValue(selected === value2 ? 1 : 0);

  React.useEffect(() => {
    scale1.value = withTiming(selected === value1 ? 1 : 0, {duration: 150});
    scale2.value = withTiming(selected === value2 ? 1 : 0, {duration: 150});
  }, [selected]);

  const animatedStyle1 = useAnimatedStyle(() => ({
    transform: [{scale: scale1.value}],
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{scale: scale2.value}],
  }));

  return (
    <View style={styles.container}>
      <Pressable style={styles.innerContainer} onPress={() => onPress(value1)}>
        <View style={styles.radioOuter}>
          <Animated.View style={[styles.radioInner, animatedStyle1]} />
        </View>
        <Text style={styles.label}>{label1}</Text>
      </Pressable>

      <Pressable style={styles.innerContainer} onPress={() => onPress(value2)}>
        <View style={styles.radioOuter}>
          <Animated.View style={[styles.radioInner, animatedStyle2]} />
        </View>
        <Text style={styles.label}>{label2}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 60,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radioOuter: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: SelectColors.thirdBlueColor, // Paper primary color
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: SelectColors.thirdBlueColor,
  },
  label: {
    fontSize: 15,
    color: '#000',
  },
});
