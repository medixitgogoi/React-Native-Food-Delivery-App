import { View, Text, TouchableOpacity, StatusBar, TextInput, ScrollView, Dimensions, Alert, Image, FlatList, Linking } from 'react-native';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { background, backIconColor, darkGreen, lightGreen, offWhite } from '../utils/colors';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon5 from 'react-native-vector-icons/dist/Ionicons';
import { useCallback, useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';

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

    const timestamp = detail?.address_detail?.created_at;

    const dateObj = new Date(timestamp);

    const day = dateObj.getUTCDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[dateObj.getUTCMonth()];
    const year = dateObj.getUTCFullYear();
    const formattedDate = `${month} ${day}, ${year}`;

    // Format the time as 'HH:MMam/pm'
    let hours = dateObj.getUTCHours();
    const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0');
    const period = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12; // Convert to 12-hour format
    const formattedTime = `${hours}:${minutes}${period}`;

    // handleCallPress
    const handleCallPress = () => {
        const phoneNumber = '+910000000000'; // Add your phone number here
        Linking.openURL(`tel:${phoneNumber}`);
    };

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
            <ScrollView style={{ paddingHorizontal: 14, paddingTop: 15 }}>
                <View style={{ paddingBottom: 100 }}>
                    <Text style={{ fontSize: responsiveFontSize(2.3), fontWeight: '600', color: '#000' }}>Your Order</Text>

                    {/* Divider */}
                    {/* <View style={{ width: '100%', alignSelf: 'flex-end', backgroundColor: '#e1e3e5', height: 1, marginTop: 8 }}></View> */}

                    {detail?.order_detail?.map(it => (
                        <View key={it?.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomColor: '#e6e8e9', borderBottomWidth: 1 }}>
                            <View style={{ flexDirection: 'column', gap: 2 }}>
                                <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '500' }}>{it?.product_name}</Text>
                                <Text style={{ fontSize: responsiveFontSize(1.7), color: '#000', fontWeight: '500' }}>Quantity: {it?.product_size}</Text>
                                {/* <Text style={{ fontSize: responsiveFontSize(1.7), color: '#000', fontWeight: '500' }}>MRP: {it?.mrp}</Text> */}
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 }}>
                                    <View style={{ backgroundColor: lightGreen, width: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 18, borderRadius: 3, borderColor: '#40af4a', elevation: 1, borderWidth: 0.8 }}>
                                        <Text style={{ fontSize: responsiveFontSize(1.5), fontWeight: '500', color: '#000' }}>{it?.quantity}</Text>
                                    </View>
                                    <Text style={{ fontSize: 12, color: '#000', fontWeight: '500' }}>x</Text>
                                    <Text style={{ fontSize: 12, color: '#000', fontWeight: '500' }}>₹{it?.price}</Text>
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
                        <Text style={{ fontSize: 12, color: '#000', fontWeight: '500' }}>Total MRP</Text>
                        <Text style={{ fontSize: 12, color: '#000', fontWeight: '500' }}>₹{detail?.total_mrp}.00</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, paddingLeft: 5 }}>
                        <Text style={{ fontSize: 12, color: '#000', fontWeight: '500' }}>Discount on MRP</Text>
                        <Text style={{ fontSize: 12, color: '#000', fontWeight: '500' }}>₹{detail?.total_mrp - detail?.total_price}.00</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, paddingLeft: 5 }}>
                        <Text style={{ fontSize: 12, color: '#000', fontWeight: '500' }}>Delivery Charge</Text>
                        <Text style={{ fontSize: 12, color: '#000', fontWeight: '500' }}>₹{detail?.delivery_charge}.00</Text>
                    </View>

                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                        <Text style={{ fontSize: 12, color: '#000' }}>Restaurant Packaging Charges</Text>
                        <Text style={{ fontSize: 12, color: '#000' }}>₹30.00</Text>
                    </View> */}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, paddingLeft: 5 }}>
                        <Text style={{ fontSize: 12, color: '#000', fontWeight: '500' }}>Additional charges</Text>
                        <Text style={{ fontSize: 12, color: '#000', fontWeight: '500' }}>₹{detail?.addl_charge}.00</Text>
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

                    <View style={{ paddingVertical: 6, paddingHorizontal: 8, backgroundColor: lightGreen, marginVertical: 8, borderColor: darkGreen, borderWidth: 1, borderRadius: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: responsiveFontSize(1.7), color: backIconColor, fontWeight: '500' }}>Your total savings 🎉🎉</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.6), fontWeight: '500', color: '#000' }}>₹{detail?.total_mrp - detail?.total_price}</Text>
                    </View>

                    {/* Order Details */}
                    <View style={{ marginTop: 15 }}>
                        <Text style={{ fontSize: responsiveFontSize(2.3), fontWeight: '600', color: '#000' }}>Order Details</Text>
                    </View>

                    {/* Divider */}
                    <View style={{ width: '100%', alignSelf: 'flex-end', backgroundColor: '#e1e3e5', height: 1, marginTop: 8 }}></View>

                    {/* Order Number */}
                    <View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: 10 }}>
                        <Text style={{ fontSize: responsiveFontSize(1.7), color: '#000', fontWeight: '500', opacity: 0.7 }}>Order Number</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.8), color: '#000', fontWeight: '500' }}>{detail?.o_uu_id || 123577373}</Text>
                    </View>

                    {/* Payment */}
                    <View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: 12 }}>
                        <Text style={{ fontSize: responsiveFontSize(1.7), color: '#000', fontWeight: '500', opacity: 0.7 }}>Payment</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.8), color: '#000', fontWeight: '500', }}>Paid using : Using Upi_qr (₹{detail?.total_price + detail?.delivery_charge + detail?.addl_charge}.00)</Text>
                    </View>

                    {/* Date */}
                    <View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: 12 }}>
                        <Text style={{ fontSize: responsiveFontSize(1.7), color: '#000', fontWeight: '500', opacity: 0.7 }}>Date</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.8), color: '#000', fontWeight: '500' }}>{formattedDate} at {formattedTime}</Text>
                    </View>

                    {/* Phone Number */}
                    <View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: 12 }}>
                        <Text style={{ fontSize: responsiveFontSize(1.7), color: '#000', fontWeight: '500', opacity: 0.7 }}>Phone Number</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.8), color: '#000', fontWeight: '500' }}>{detail?.address_detail?.mobile}</Text>
                    </View>

                    {/* Deliver to */}
                    <View style={{ flexDirection: 'column', justifyContent: 'center', marginVertical: 10 }}>
                        <Text style={{ fontSize: responsiveFontSize(1.7), color: '#000', fontWeight: '500', opacity: 0.7 }}>Deliver to</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.8), color: '#000', fontWeight: '500' }}>{detail?.address_detail?.name} : {detail?.address_detail?.address}</Text>
                    </View>

                    {/* Divider */}
                    <View style={{ width: '100%', alignSelf: 'flex-end', backgroundColor: '#e1e3e5', height: 1, marginTop: 6 }}></View>

                    {/* Call Skercart */}
                    <TouchableOpacity onPress={handleCallPress} style={{ marginVertical: 15, alignSelf: 'center' }}>
                        <Text style={{ color: backIconColor, fontSize: responsiveFontSize(2), fontWeight: '500' }}>Call Skercart  (+91 00000000000)</Text>
                    </TouchableOpacity>

                    {/* Divider */}
                    <View style={{ width: '100%', alignSelf: 'flex-end', backgroundColor: '#e1e3e5', height: 1, marginBottom: 8 }}></View>

                    {/* Footer */}
                    <View style={{ flexDirection: 'column', marginTop: 10, gap: 3 }}>
                        <Text style={{ color: offWhite, fontSize: responsiveHeight(1.7), fontWeight: '500' }}>Skercart</Text>
                        <Image source={require('../assets/fssai.png')} style={{ width: 29, height: 18, resizeMode: 'contain', opacity: 0.5 }} />
                        <Text style={{ color: offWhite, fontSize: responsiveHeight(1.7), fontWeight: '500' }}>Lic. No. 37453728745363</Text>
                    </View>

                </View>
            </ScrollView>

            {/* Repeat Order Button */}
            <LinearGradient
                colors={['#67c770', '#3a9f43']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ borderRadius: 12, height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24, elevation: 2, position: 'absolute', bottom: 10, width: '93%', alignSelf: 'center' }}
            >
                <TouchableOpacity style={{ flexDirection: 'column', gap: 1 }}>
                    <Text style={{ fontSize: responsiveFontSize(2.2), color: '#fff', textAlign: 'center', fontWeight: '600' }}>Repeat Order</Text>
                    <Text style={{ fontSize: responsiveFontSize(1.4), color: '#fff', textAlign: 'center' }}>VIEW CART ON NEXT STEP</Text>
                </TouchableOpacity>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default OrderDetails;