/* eslint-disable prettier/prettier */
import {useState, useEffect} from 'react';

const useFloorNumber = (length = 15, totalFloorValue) => {
  const [totalFloorNumber, setTotalFloorNumber] = useState([]);
  const [floorNumber, setFloorNumber] = useState([]);

  // First useEffect: Always add Ground Floor at the beginning
  useEffect(() => {
    const generatedData = Array.from({length}, (_, index) => ({
      label: `${index + 1}`,
      value: `${index + 1}`,
    }));

    // Always add "Ground" at the beginning
    generatedData.unshift({label: 'Ground', value: 'Ground'});

    setTotalFloorNumber(generatedData); // Set totalFloor state with Ground included
  }, [length]); // Only depend on the length of the total floors

  // Second useEffect: Modify floor array based on user's selection
  useEffect(() => {
    let floorData = [];

    if (totalFloorValue === 1) {
      // If the user selects only "Ground", only include Ground
      floorData = [{label: 'Ground', value: 'Ground'}];
    } else {
      // Otherwise, include Ground and the selected floors
      floorData = Array.from({length: totalFloorValue}, (_, index) => ({
        label: `${index + 1}`,
        value: `${index + 1}`,
      }));
      floorData.unshift({label: 'Ground', value: 'Ground'}); // Add Ground at the start
    }

    setFloorNumber(floorData); // Set floorNumber state with updated list
  }, [totalFloorValue]); // Re-run when totalFloorValue changes

  return {totalFloorNumber, floorNumber};
};

export default useFloorNumber;
