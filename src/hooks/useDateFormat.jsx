/* eslint-disable curly */
import {useCallback} from 'react';

const useTimeAgo = () => {
  const getOrdinal = useCallback(day => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }, []);

  const formatDate = useCallback(
    dateString => {
      const d = new Date(dateString.replace(' ', 'T'));

      const day = d.getDate();
      const suffix = getOrdinal(day);

      const month = d.toLocaleString('en-IN', {month: 'short'});
      const year = d.getFullYear();

      return `${day}${suffix} ${month}, ${year}`;
    },
    [getOrdinal],
  );

  const getTimeAgo = useCallback(
    dateString => {
      const past = new Date(dateString.replace(' ', 'T'));
      const now = new Date();

      const diffMs = now - past;
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffMinutes < 1) return 'Just now';

      if (diffMinutes < 60)
        return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;

      if (diffHours < 24)
        return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;

      if (diffDays > 30) return formatDate(dateString);

      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    },
    [formatDate],
  );

  return {getTimeAgo, formatDate};
};

export default useTimeAgo;
