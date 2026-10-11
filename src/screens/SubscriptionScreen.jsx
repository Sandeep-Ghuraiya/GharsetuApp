/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable curly */
/* eslint-disable no-unused-vars */

import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {
  View,
  Text,
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';
import {SelectColors} from '../constant/Colors';
import useLoginData from '../hooks/useLoginData';
import {
  createOrderDetails,
  createPaymentDetails,
} from '../Redux/Reducers/paymetReducer';

/* ================= PLAN CARD ================= */

const PlanCard = React.memo(({item, onPay}) => {
  const isBest = item.badge === 'BEST';

  return (
    <Animated.View style={[styles.card, isBest && styles.bestCard]}>
      <View style={styles.header}>
        <Text style={styles.title}>{item.title}</Text>

        {isBest && (
          <View style={styles.bestTag}>
            <Text style={styles.bestText}>🔥 BEST</Text>
          </View>
        )}
      </View>

      <Text style={styles.price}>₹{item.amount}</Text>

      <Text style={styles.perMonth}>
        ≈ ₹{Math.round(item.amount / item.duration)}/month
      </Text>

      <Text style={styles.validity}>{item.validity}</Text>

      <View style={styles.featuresBox}>
        {item.features?.map((f, i) => (
          <Text key={i} style={styles.feature}>
            ✓ {f}
          </Text>
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => onPay(item.amount, item.plan_id)}>
        <Text style={styles.buttonText}>{item.button}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

/* ================= MAIN SCREEN ================= */

export default function SubscriptionScreen() {
  const {dropdownData} = useSelector(state => state.dropdownDetails);
  const {createOrderData, createPayment} = useSelector(
    state => state.paymentInfo,
  );
  const {loginDetails} = useLoginData();
  const userData = loginDetails?.data;

  const dispatch = useDispatch();

  const [plans, setPlans] = useState([]);
  const [activeTab, setActiveTab] = useState('monthly');

  useEffect(() => {
    setPlans(dropdownData?.data?.plan_details || []);
  }, [dropdownData]);

  useEffect(() => {
    if (!createOrderData) return;
    console.log('createOrderData: ', createPayment);
  }, [createOrderData]);

  /* ================= FILTER ================= */

  const filteredPlans = useMemo(() => {
    if (!plans) return [];

    if (activeTab === 'monthly') {
      return plans.filter(p => p.duration <= 6);
    }

    if (activeTab === 'yearly') {
      return plans.filter(p => p.duration > 6);
    }

    return plans;
  }, [plans, activeTab]);

  const handlePayment = async (amount, planId) => {
    if (!userData) return;

    console.log('====================================');
    console.log(amount, planId);
    console.log('====================================');

    try {
      const orderPayload = {
        action: 'createOrder',
        amount,
        plan_id: planId,
        owner_mobile_no: userData?.mobile_no,
      };

      const orderResponse = await dispatch(
        createOrderDetails(orderPayload),
      ).unwrap();

      const orderId = orderResponse?.data?.id;

      if (!orderId) {
        console.log('Order ID missing');
        return;
      }

      const options = {
        description: 'Test Payment',
        image: 'https://picsum.photos/id/1/200/300',
        currency: 'INR',
        key: 'rzp_test_SAP2WC0HyIMBY4', // move to env later
        amount: amount * 100,
        order_id: orderId,
        name: 'Gharsetu',
        prefill: {
          email: userData?.email,
          contact: userData?.mobile_no,
          name: `${userData?.first_name} ${userData?.last_name}`,
        },
        theme: {color: SelectColors.accentBlueColor},
      };

      const data = await RazorpayCheckout.open(options);

      console.log('RazorpayCheckout: ', data);

      const paymentPayload = {
        action: 'create_payment',
        owner_mobile_no: userData?.mobile_no,
        plan: planId,
        amount,
        order_id: orderId,
        payment_id: data.razorpay_payment_id,
        razorpay_order_id: data.razorpay_order_id,
        razorpay_signature: data.razorpay_signature,
        status: 'paid',
      };

      await dispatch(createPaymentDetails(paymentPayload));
    } catch (error) {
      if (error?.description) {
        console.log('Payment Failed:', error.description);
      } else {
        console.log('Error:', error);
      }
    }
  };

  const handlePaymentPress = useCallback((amount, planId) => {
    handlePayment(amount, planId);
  }, []);

  /* ================= RENDER ================= */

  const renderItem = useCallback(
    ({item}) => <PlanCard item={item} onPay={handlePaymentPress} />,
    [handlePaymentPress],
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Choose Your Subscription Plan</Text>
        <Text style={styles.subText}>
          Unlock more features and grow your business faster 🚀
        </Text>
      </View>

      {/* TABS */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'monthly' && styles.activeTab]}
          onPress={() => setActiveTab('monthly')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'monthly' && styles.activeTabText,
            ]}>
            Monthly
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'yearly' && styles.activeTab]}
          onPress={() => setActiveTab('yearly')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'yearly' && styles.activeTabText,
            ]}>
            Yearly
          </Text>
        </TouchableOpacity>
      </View>

      {/* LIST */}
      <FlatList
        data={filteredPlans}
        keyExtractor={item => item.plan_id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        initialNumToRender={4}
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews
      />
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  listContainer: {
    padding: 16,
  },

  headerContainer: {
    paddingHorizontal: 15,
    marginVertical: 25,
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
  },

  subText: {
    fontSize: 13,
    color: 'gray',
    marginTop: 8,
  },

  /* TAB UI */
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    backgroundColor: '#e5e7eb',
    borderRadius: 12,
    overflow: 'hidden',
  },

  tab: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },

  activeTab: {
    backgroundColor: '#4f46e5',
  },

  tabText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 20,
  },

  activeTabText: {
    color: '#fff',
  },

  /* CARD */
  card: {
    width: '100%',
    height: 520,
    borderRadius: 24,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#4f46e5',
    marginVertical: 20,
    shadowColor: '#4f46e5',
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 12,
    alignItems: 'center',
    marginBottom: 50,
    // justifyContent:'center'
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
  },

  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },

  bestTag: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },

  bestText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4f46e5',
  },

  price: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },

  perMonth: {
    color: '#cbd5f5',
    fontSize: 14,
    marginBottom: 5,
  },

  validity: {
    color: '#cbd5f5',
    marginBottom: 10,
    fontSize: 16,
  },

  featuresBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 14,
    padding: 15,
    marginVertical: 20,
    width: '100%',
    alignItems: 'center',
  },

  feature: {
    color: '#e2e8f0',
    marginVertical: 8,
    fontSize: 15,
  },

  button: {
    marginTop: 15,
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    width: '100%',
  },

  buttonText: {
    color: '#1e293b',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
