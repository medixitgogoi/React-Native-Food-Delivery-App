import { View, Text, TouchableOpacity, StatusBar, TextInput, ScrollView, Dimensions, Alert, Image, FlatList } from 'react-native';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { background, backIconColor, darkGreen, lightGreen, offWhite } from '../utils/colors';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon5 from 'react-native-vector-icons/dist/Ionicons';
import { useCallback, useEffect, useState } from 'react';
import { orders } from '../utils/orders';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import axios from 'axios';

const OrderDetails = ({ route }) => {

    const navigation = useNavigation();

    console.log('route', route?.params?.detail);

    const [detail, setDetail] = useState(null);

    // setDetail
    useFocusEffect(
        useCallback(() => {
            setDetail(route?.params?.detail);
        }, [])
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
            <StatusBar
                animated={true}
                backgroundColor={background}
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 8 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingVertical: 5, paddingHorizontal: 10, alignSelf: 'flex-start' }}>
                    <Icon4 name="arrowleft" size={22} color={'#000'} />
                </TouchableOpacity>
                <Text style={{ color: '#000', fontSize: responsiveFontSize(2.4), fontWeight: '500' }}>Order Summary</Text>
            </View>

            {/* Content */}
            <ScrollView style={{ paddingHorizontal: 14, marginTop: 15 }}>
                <Text style={{ fontSize: responsiveFontSize(2.2), fontWeight: 'bold', color: '#000' }}>Your Order</Text>

                {/* Divider */}
                {/* <View style={{ width: '100%', alignSelf: 'flex-end', backgroundColor: '#e1e3e5', height: 1, marginTop: 8 }}></View> */}

                {detail?.order_detail?.map(it => (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomColor: '#e6e8e9', borderBottomWidth: 1 }}>
                        <View style={{ flexDirection: 'column', gap: 2 }}>
                            <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', }}>{it?.product_name}</Text>
                            <Text style={{ fontSize: responsiveFontSize(1.7), color: '#000' }}>Quantity: {it?.product_size}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 }}>
                                <View style={{ backgroundColor: lightGreen, width: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 18, borderRadius: 3, borderColor: '#40af4a', elevation: 1, borderWidth: 0.8 }}>
                                    <Text style={{ fontSize: responsiveFontSize(1.5), fontWeight: '500', color: '#000' }}>{it?.quantity}</Text>
                                </View>
                                <Text style={{ fontSize: 12, color: '#000' }}>x</Text>
                                <Text style={{ fontSize: 12, color: '#000' }}>₹{it?.price}</Text>
                            </View>
                        </View>
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '500' }}>₹{it?.price * parseInt(it?.quantity)}</Text>
                    </View>
                ))}

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16, marginVertical: 8, fontWeight: '500', color: '#000' }}>Item total</Text>
                    <Text style={{ fontSize: 16, marginVertical: 8, fontWeight: '500', color: '#000' }}>₹{detail?.total_price}</Text>
                </View>

                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text style={{ fontSize: 12, color: '#000' }}>Coupon - (JUST4U)</Text>
                    <Text style={{ fontSize: 12, color: '#5EC467' }}>You saved ₹120.00</Text>
                </View> */}

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, paddingLeft: 5 }}>
                    <Text style={{ fontSize: 12, color: '#000' }}>Total MRP</Text>
                    <Text style={{ fontSize: 12, color: '#000' }}>₹{detail?.total_mrp}.00</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, paddingLeft: 5 }}>
                    <Text style={{ fontSize: 12, color: '#000' }}>Discount on MRP</Text>
                    <Text style={{ fontSize: 12, color: '#000' }}>₹{detail?.total_mrp - detail?.total_price}.00</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, paddingLeft: 5 }}>
                    <Text style={{ fontSize: 12, color: '#000' }}>Delivery Charge</Text>
                    <Text style={{ fontSize: 12, color: '#000' }}>₹{detail?.delivery_charge}.00</Text>
                </View>

                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                    <Text style={{ fontSize: 12, color: '#000' }}>Restaurant Packaging Charges</Text>
                    <Text style={{ fontSize: 12, color: '#000' }}>₹30.00</Text>
                </View> */}

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, paddingLeft: 5 }}>
                    <Text style={{ fontSize: 12, color: '#000' }}>Additional charges</Text>
                    <Text style={{ fontSize: 12, color: '#000' }}>₹{detail?.addl_charge}.00</Text>
                </View>

                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text style={{ fontSize: 12, color: '#000' }}>Cash round off</Text>
                    <Text style={{ fontSize: 12, color: '#000' }}>₹0.37</Text>
                </View> */}

                {/* Divider */}
                <View style={{ width: '100%', alignSelf: 'flex-end', backgroundColor: '#e1e3e5', height: 1, marginTop: 5 }}></View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>Grand Total</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>₹{detail?.total_price + detail?.delivery_charge + detail?.addl_charge}.00</Text>
                </View>

                <View style={{ paddingVertical: 4, paddingHorizontal: 8, backgroundColor: lightGreen, marginVertical: 8, borderColor: darkGreen, borderWidth: 1, borderRadius: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: responsiveFontSize(1.7), color: backIconColor, fontWeight: '500' }}>Your total savings 🎉🎉</Text>
                    <Text style={{ fontSize: responsiveFontSize(1.6), fontWeight: '500', color: '#000' }}>₹{detail?.total_mrp - detail?.total_price}</Text>
                </View>

                <View style={{ marginTop: 15 }}>
                    <Text style={{ fontSize: responsiveFontSize(2.2), fontWeight: 'bold', color: '#000' }}>Order Details</Text>
                </View>

                {/* Divider */}
                <View style={{ width: '100%', alignSelf: 'flex-end', backgroundColor: '#e1e3e5', height: 1, marginTop: 8 }}></View>

                <View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: 10 }}>
                    <Text style={{ fontSize: responsiveFontSize(1.8), color: '#000', fontWeight: '400' }}>Order Number</Text>
                    <Text style={{ fontSize: responsiveFontSize(1.8), color: '#000', fontWeight: '600' }}>{detail?.o_uu_id || 123577373}</Text>
                </View>
                
                <View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: 10 }}>
                    <Text style={{ fontSize: responsiveFontSize(1.8), color: '#000', fontWeight: '400' }}>Order Number</Text>
                    <Text style={{ fontSize: responsiveFontSize(1.8), color: '#000', fontWeight: '600' }}>{detail?.o_uu_id || 123577373}</Text>
                </View>

                <Text style={{ fontSize: 12, color: '#000' }}>Date: Today</Text>

                <TouchableOpacity style={{ padding: 16, backgroundColor: '#E74C3C', marginVertical: 16, borderRadius: 8 }}>
                    <Text style={{ fontSize: 14, color: '#fff', textAlign: 'center' }}>Repeat Order</Text>
                    <Text style={{ fontSize: 12, color: '#fff', textAlign: 'center' }}>VIEW CART ON NEXT STEP</Text>
                </TouchableOpacity>
            </ScrollView>

        </SafeAreaView>
    )
}

export default OrderDetails;