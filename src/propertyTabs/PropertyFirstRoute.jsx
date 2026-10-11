/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropertiesList from '../sections/PropertiesList';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import PropertiesListLoader from '../loader/PropertiesListLoader';

const PropertyFirstRoute = () => {
  const propertiesListFromRedux = useSelector(
    state => state.propertiesData.propertiesList,
  );

  const newPropertiesList = useMemo(() => {
    return propertiesListFromRedux || [];
  }, [propertiesListFromRedux]);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [propertyLists, setPropertyLists] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPropertyLists(newPropertiesList?.properties);
    setTotalPage(newPropertiesList?.total_pages);
  }, [newPropertiesList]);

  const handleLoader = value => {
    setLoading(value);
  };

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <View style={styles.scene}>
      <View style={styles.tableList}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <PropertiesListLoader />
          </View>
        ) : propertyLists?.length > 0 ? (
          <PropertiesList
            propertiesData={propertyLists}
            navigation={navigation}
            pageName={'PropertyDetails'}
            pageTitle={'Property Details'}
            name={'PublishProperty'}
            totalPage={totalPage}
            handleLoader={handleLoader}
          />
        ) : (
          <>
            <Text style={{color: '#000', textAlign: 'center'}}>
              No property available
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

export default PropertyFirstRoute;

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    marginTop: 10,
    // backgroundColor: '#fff',
  },
});
