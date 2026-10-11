/* eslint-disable prettier/prettier */
import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const useThemeColors = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return {
    isDark: isDarkMode,
    background: isDarkMode ? Colors.darker : Colors.lighter,
    text: isDarkMode ? Colors.white : Colors.black,
  };
};
