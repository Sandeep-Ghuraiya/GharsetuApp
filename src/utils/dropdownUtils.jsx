/* eslint-disable prettier/prettier */
import stateDistrictData from '../constant/states-and-districts.json';
import statusData from '../constant/agentStatus.json';

/* STATE LIST */
export const getStateOptions = () => {
  return stateDistrictData.states.map(item => ({
    label: item.state,
    value: item.state,
  }));
};

/* DISTRICT LIST BASED ON STATE */
export const getDistrictOptions = selectedState => {
  if (!selectedState) return [];

  const stateObj = stateDistrictData.states.find(
    item => item.state === selectedState,
  );

  return stateObj
    ? stateObj.districts.map(d => ({
        label: d,
        value: d,
      }))
    : [];
};

/* Status */
export const getStatusOptions = () => {
  return statusData.list.map(item => ({
    label: item.status,
    value: item.value,
  }));
};

/* PROPERTY AREA */
export const getPropertyAreaOptions = selectedArea => {
  if (!selectedArea) return [];

  return selectedArea.map(item => ({
    label: item.village,
    value: item.village,
  }));
};

/* PROPERTY FACILITIES */
export const getPropertFacilitiesOptions = selectedFacilities => {
  if (!selectedFacilities) return [];

  return selectedFacilities.map(item => ({
    label: item.name,
    value: Number(item.id),
  }));
};
