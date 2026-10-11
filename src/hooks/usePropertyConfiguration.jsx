/* eslint-disable prettier/prettier */
import {useState, useEffect} from 'react';

const usePropertyConfiguration = () => {
  const [propertyConfiguration, setPropertyConfiguration] = useState([]);

  useEffect(() => {
    // Creating BHK and RK arrays
    const bhkArray = Array.from({length: 9}, (_, index) => ({
      label: `${index + 1}BHK`,
      value: `${index + 1}BHK`,
    }));

    const rkArray = Array.from({length: 6}, (_, index) => ({
      label: `${index + 1}RK`,
      value: `${index + 1}RK`,
    }));

    // Combine both arrays into one
    const combinedArray = [...bhkArray, ...rkArray];
    setPropertyConfiguration(combinedArray); // Set the combined array
  }, []);

  return {propertyConfiguration};
};

export default usePropertyConfiguration;
