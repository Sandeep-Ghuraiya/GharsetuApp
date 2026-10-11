/* eslint-disable prettier/prettier */
/* eslint-disable curly */

import axios from 'axios';

const PINCODE_API_BASE = 'https://api.postalpincode.in';

/**
 * Get pincodes by city name
 * @param {string} city
 * @returns {Promise<Array>}
 */
export const getSinglePincodeByStateDistrict = async (
  state = '',
  district = '',
) => {
  if (!state || !district) return null;

  try {
    const response = await axios.get(
      `${PINCODE_API_BASE}/postoffice/${district}`,
    );

    const result = response?.data?.[0];

    const normalize = value => value?.toString().trim().toLowerCase();

    if (result?.Status === 'Success' && Array.isArray(result.PostOffice)) {
      const exactMatch = result.PostOffice.filter(item => {
        return (
          normalize(item.State) === normalize(state) &&
          normalize(item.District) === normalize(district)
        );
      });

      if (!exactMatch) return null;

      return exactMatch;
    }
  } catch (error) {
    console.error('City to Pincode error:', error?.message || error);
    return [];
  }
};
