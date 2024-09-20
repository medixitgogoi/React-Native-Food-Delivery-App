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
            <ScrollView style={{ padding: 14, }}>
                <Text style={{ fontSize: responsiveFontSize(2.2), fontWeight: 'bold', color: '#000' }}>Your Order</Text>

                {/* Divider */}
                {/* <View style={{ width: '100%', alignSelf: 'flex-end', backgroundColor: '#e1e3e5', height: 1, marginTop: 8 }}></View> */}

                {detail?.order_detail?.map(it => (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, borderBottomColor: '#e6e8e9', borderBottomWidth: 1 }}>
                        <View style={{ flexDirection: 'column', gap: 2 }}>
                            <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '500' }}>{it?.product_name}</Text>
                            <Text style={{ fontSize: responsiveFontSize(1.7), color: '#000' }}>Quantity: {it?.product_size}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 }}>
                                <View style={{ backgroundColor: lightGreen, paddingVertical: 1, paddingHorizontal: 5, borderRadius: 3, borderColor: darkGreen, elevation: 1, borderWidth: 0.7 }}>
                                    <Text style={{ fontSize: responsiveFontSize(1.7), fontWeight: '500', color: '#000' }}>{it?.quantity}</Text>
                                </View>
                                <Text style={{ fontSize: 12, color: '#000' }}>x</Text>
                                <Text style={{ fontSize: 12, color: '#000', fontWeight: '500' }}>₹{it?.price}.00</Text>
                            </View>
                        </View>
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000' , fontWeight: '500'}}>₹{it?.price * parseInt(it?.quantity)}.00</Text>
                    </View>
                ))}

                <Text style={{ fontSize: 16, marginVertical: 8, fontWeight: 'bold', color: '#000' }}>Item total</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text style={{ fontSize: 12, color: '#000' }}>Coupon - (JUST4U)</Text>
                    <Text style={{ fontSize: 12, color: '#5EC467' }}>You saved ₹120.00</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text style={{ fontSize: 12, color: '#000' }}>Taxes</Text>
                    <Text style={{ fontSize: 12, color: '#000' }}>₹24.63</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text style={{ fontSize: 12, color: '#000' }}>Delivery Charge</Text>
                    <Text style={{ fontSize: 12, color: '#000' }}>₹41.00</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text style={{ fontSize: 12, color: '#000' }}>Restaurant Packaging Charges</Text>
                    <Text style={{ fontSize: 12, color: '#000' }}>₹30.00</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text style={{ fontSize: 12, color: '#000' }}>Donate ₹2 to Feeding India</Text>
                    <Text style={{ fontSize: 12, color: '#000' }}>₹2.00</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text style={{ fontSize: 12, color: '#000' }}>Platform fee</Text>
                    <Text style={{ fontSize: 12, color: '#000' }}>₹6.00</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text style={{ fontSize: 12, color: '#000' }}>Cash round off</Text>
                    <Text style={{ fontSize: 12, color: '#000' }}>₹0.37</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>Grand Total</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>₹524.00</Text>
                </View>

                <View style={{ padding: 16, backgroundColor: '#EDF7EC', marginVertical: 8 }}>
                    <Text style={{ fontSize: 14, color: '#000' }}>Your total savings</Text>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000' }}>₹120</Text>
                </View>

                <Text style={{ fontSize: 14, marginVertical: 8, color: '#000' }}>Order Details</Text>

                <View>
                    <Text style={{ fontSize: 12, color: '#000' }}>Order Number: 6174821894</Text>
                    <Text style={{ fontSize: 12, color: '#000' }}>Date: Today</Text>
                </View>

                <TouchableOpacity style={{ padding: 16, backgroundColor: '#E74C3C', marginVertical: 16, borderRadius: 8 }}>
                    <Text style={{ fontSize: 14, color: '#fff', textAlign: 'center' }}>Repeat Order</Text>
                    <Text style={{ fontSize: 12, color: '#fff', textAlign: 'center' }}>VIEW CART ON NEXT STEP</Text>
                </TouchableOpacity>
            </ScrollView>

        </SafeAreaView>
    )
}

export default OrderDetails;