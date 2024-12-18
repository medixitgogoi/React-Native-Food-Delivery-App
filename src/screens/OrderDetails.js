import { View, Text, TouchableOpacity, StatusBar, ScrollView, Image, Linking, ActivityIndicator } from 'react-native';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { background, backIconColor, darkGreen, lightGreen, offWhite } from '../utils/colors';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addItemToCart, deleteAllItemsFromCart } from '../redux/CartSlice';

const OrderDetails = ({ route }) => {

    // console.log('route', route?.params?.detail);

    const navigation = useNavigation();

    const dispatch = useDispatch();

    const [detail, setDetail] = useState(null);

    const [loading, setLoading] = useState(false);

    // setDetail
    useFocusEffect(
        useCallback(() => {
            setDetail(route?.params?.detail);
        }, [])
    );

    const apiDate = route?.params?.detail?.created_at; // Input date from API

    const dateParts = apiDate.split("/"); // Split the date into parts

    // Create a new Date object (Month is 0-based in JavaScript)
    const formattedDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

    // Options for formatting
    const options = { day: 'numeric', month: 'short', year: 'numeric' };

    // Format the date
    const result = formattedDate.toLocaleDateString('en-GB', options);

    const finalResult = result.replace(/(\w{3}) (\d{4})/, '$1, $2');

    // handleCallPress
    const handleCallPress = () => {
        const phoneNumber = '+916033391141'; // Add your phone number here
        Linking.openURL(`tel:${phoneNumber}`);
    };

    // Reorder
    const reorder = async (item) => {
        setLoading(true);
        // Map the item array to extract the necessary fields

        const formData = new FormData();

        // Iterate through each product in the item array
        item.forEach((product, index) => {
            formData.append(`products[${index}][product_id]`, product.product_id);
            formData.append(`products[${index}][product_size_id]`, product.product_size_id);
            formData.append(`products[${index}][quantity]`, product.quantity);
        });

        try {
            // Send the POST request with JSON data
            const response = await axios.post('/user/cart/reorder', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response?.data?.status) {
                navigation.navigate('Cart', { data: response?.data?.data });
                dispatch(deleteAllItemsFromCart());
                response?.data?.data?.forEach((product) => {
                    dispatch(addItemToCart(product));
                });
            }
            console.log('Reorder', response);
        } catch (error) {
            console.error('Error reordering: ', error);
        } finally {
            setLoading(false);
        }
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
                            <View style={{ flexDirection: 'column', gap: 2, width: '85%' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '500' }}>{it?.product_name}  ({it?.product_size})</Text>
                                    {/* <Text style={{ fontSize: responsiveFontSize(1.7), color: '#000', fontWeight: '500' }}>({it?.product_size})</Text> */}
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 }}>
                                    <Text style={{ fontSize: responsiveFontSize(1.7), color: '#000', fontWeight: '500' }}>Quantity: </Text>
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

                    {/* Order Details Heading */}
                    <View style={{ marginTop: 15 }}>
                        <Text style={{ fontSize: responsiveFontSize(2.3), fontWeight: '600', color: '#000' }}>Order Details</Text>
                    </View>

                    {/* Divider */}
                    <View style={{ width: '100%', alignSelf: 'flex-end', backgroundColor: '#e1e3e5', height: 1, marginTop: 8 }}></View>

                    {/* Order Number */}
                    <View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: 10 }}>
                        <Text style={{ fontSize: responsiveFontSize(1.7), color: '#000', fontWeight: '500', opacity: 0.7 }}>Order Number</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.8), color: '#000', fontWeight: '500' }}>{detail?.o_uu_id}</Text>
                    </View>

                    {/* Payment type */}
                    {detail?.payment_type === '2' ? (
                        <View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: 12 }}>
                            <Text style={{ fontSize: responsiveFontSize(1.7), color: '#000', fontWeight: '500', opacity: 0.7 }}>Payment</Text>
                            <Text style={{ fontSize: responsiveFontSize(1.8), color: '#000', fontWeight: '500', }}>Payment Method: Cash on Delivery (₹{detail?.total_price + detail?.delivery_charge + detail?.addl_charge}.00)</Text>
                        </View>
                    ) : (
                        <View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: 12 }}>
                            <Text style={{ fontSize: responsiveFontSize(1.7), color: '#000', fontWeight: '500', opacity: 0.7 }}>Payment</Text>
                            <Text style={{ fontSize: responsiveFontSize(1.8), color: '#000', fontWeight: '500', }}>Payment Method: Online (₹{detail?.total_price + detail?.delivery_charge + detail?.addl_charge}.00)</Text>
                        </View>
                    )}

                    {/* Payment status */}
                    <View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: 12 }}>
                        <Text style={{ fontSize: responsiveFontSize(1.7), color: '#000', fontWeight: '500', opacity: 0.7 }}>Payment Status</Text>

                        {
                            detail?.payment_status === '1' ? (
                                <View style={{ backgroundColor: '#FFA500', alignSelf: 'flex-start', borderRadius: 5, paddingVertical: 3, paddingHorizontal: 8, marginTop: 3 }}>
                                    <Text style={{ fontSize: responsiveFontSize(1.4), color: '#fff', fontWeight: '600' }}>
                                        Pending
                                    </Text>
                                </View>
                            ) : detail?.payment_status === '2' ? (
                                <View style={{ backgroundColor: lightGreen, borderColor: backIconColor, borderWidth: 0.7, alignSelf: 'flex-start', borderRadius: 5, paddingVertical: 3, paddingHorizontal: 8, marginTop: 3 }}>
                                    <Text style={{ fontSize: responsiveFontSize(1.4), color: backIconColor, fontWeight: '600' }}>
                                        Paid
                                    </Text>
                                </View>
                            ) : detail?.payment_status === '3' ? (
                                <View style={{ backgroundColor: darkGreen, alignSelf: 'flex-start', borderRadius: 5, paddingVertical: 4, paddingHorizontal: 8, marginTop: 3 }}>
                                    <Text style={{ fontSize: responsiveFontSize(1.4), color: '#fff', fontWeight: '500' }}>
                                        Completed
                                    </Text>
                                </View>
                            ) : null
                        }
                    </View>

                    {/* Date */}
                    <View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: 12 }}>
                        <Text style={{ fontSize: responsiveFontSize(1.7), color: '#000', fontWeight: '500', opacity: 0.7 }}>Date</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.8), color: '#000', fontWeight: '500' }}>{finalResult}</Text>
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
                        <Text style={{ color: backIconColor, fontSize: responsiveFontSize(2), fontWeight: '500' }}>Call Skercart  (+91 6033391141)</Text>
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
                style={{ borderRadius: 12, height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', elevation: 2, position: 'absolute', bottom: 10, width: '95%', alignSelf: 'center' }}
            >
                <TouchableOpacity onPress={() => reorder(detail?.order_detail)} style={{ flexDirection: 'column', gap: 1, width: '100%', height: '100%', justifyContent: 'center' }}>
                    {/* Show ActivityIndicator only for the clicked order */}
                    {loading ? (
                        <ActivityIndicator size="small" color={lightGreen} />
                    ) : (
                        <>
                            <Text style={{ fontSize: responsiveFontSize(2.2), color: '#fff', textAlign: 'center', fontWeight: '600' }}>Repeat Order</Text>
                            <Text style={{ fontSize: responsiveFontSize(1.4), color: '#fff', textAlign: 'center' }}>VIEW CART ON NEXT STEP</Text>
                        </>
                    )}
                </TouchableOpacity>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default OrderDetails;