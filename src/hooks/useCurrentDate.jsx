/* eslint-disable curly */
/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

const useCurrentDate = () => {
  const {leadsList} = useSelector(state => state.agentLeads);

  const [timeAgo, setTimeAgo] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const getStoredDate = async () => {
        try {
          const value = await AsyncStorage.getItem('current_date');

          if (!value) return;

          const parsedDate = JSON.parse(value);

          const past = new Date(parsedDate.replace(' ', 'T'));
          const now = new Date();

          const diffMs = now - past;
          const diffMinutes = Math.floor(diffMs / (1000 * 60));
          const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
          const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

          let result = 'Just now';

          if (diffMinutes < 1) result = 'Just now';
          else if (diffMinutes < 60)
            result = `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
          else if (diffHours < 24)
            result = `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
          else result = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

          setTimeAgo(result);
        } catch (error) {
          console.log('Error reading date:', error);
        }
      };

      getStoredDate();
    }, [leadsList]),
  );

  return {timeAgo};
};

export default useCurrentDate;
