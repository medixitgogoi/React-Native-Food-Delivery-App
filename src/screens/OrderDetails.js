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

    // console.log('route', route?.params?.detail);

    const [detail, setDetail] = useState(null);

    // setDetail
    useEffect(() => {
        setDetail(route?.params?.detail);
    }, []);

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

            <ScrollView style={{ padding: 16, backgroundColor: '#fff' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 14, color: '#000' }}>{'<'}</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 14, color: '#000' }}>Support</Text>
                </View>

                <Text style={{ fontSize: 16, marginVertical: 8, fontWeight: 'bold', color: '#000' }}>Your Order</Text>

                {/* Item 1 */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <View>
                        <Text style={{ fontSize: 14, color: '#000' }}>Chicken Curry</Text>
                        <Text style={{ fontSize: 12, color: '#000' }}>Quantity: Full</Text>
                        <Text style={{ fontSize: 12, color: '#000' }}>1 X ₹340</Text>
                    </View>
                    <Text style={{ fontSize: 14, color: '#000' }}>₹340</Text>
                </View>

                {/* Item 2 */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <View>
                        <Text style={{ fontSize: 14, color: '#000' }}>Chicken Dry Fry</Text>
                        <Text style={{ fontSize: 12, color: '#000' }}>Quantity: Half</Text>
                        <Text style={{ fontSize: 12, color: '#000' }}>1 X ₹200</Text>
                    </View>
                    <Text style={{ fontSize: 14, color: '#000' }}>₹200</Text>
                </View>

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