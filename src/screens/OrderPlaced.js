import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { background, backIconColor, darkGreen } from '../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const OrderPlaced = ({ route, navigation }) => {

    console.log('route', route);

    const address = route?.params?.selectedAddress?.address;
    const deliveryCharge = route?.params?.data?.delivery_charge;
    const totalPrice = parseInt(route?.params?.data?.total_price);

    // Status Bar setters
    useFocusEffect(
        useCallback(() => {
            StatusBar.setBackgroundColor("#fff"); // Set your cart screen status bar color
            StatusBar.setBarStyle('dark-content'); // Optional: change text color (light/dark)
        }, [])
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                animated={true}
                backgroundColor="#fff"
                barStyle="dark-content"
            />

            <LinearGradient
                colors={['#fff', '#c7e6c4']}
                style={{ flex: 1 }}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                    {/* Checkmark Icon */}
                    <View style={{ backgroundColor: darkGreen, borderRadius: 50, padding: 20 }}>
                        <Icon name="check" size={60} color={'#fff'} />
                    </View>

                    {/* Success Message */}
                    <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
                        <Text style={{ fontSize: responsiveFontSize(3), fontWeight: '700', color: '#000', }}>
                            Order Placed!
                        </Text>
                        <Text style={{ fontSize: responsiveFontSize(2), color: '#000', fontWeight: '500', textAlign: 'center', marginVertical: 5 }}>
                            Thank you for your order. Your food is on its way.
                        </Text>
                    </View>

                    {/* Estimated Delivery Time */}
                    <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
                        <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '600', color: '#000' }}>
                            Estimated Delivery Time:
                        </Text>
                        <Text style={{ fontSize: responsiveFontSize(2.2), color: backIconColor, marginTop: 5, fontWeight: '600' }}>
                            30-40 minutes
                        </Text>
                    </View>

                    {/* Delivery Address */}
                    <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
                        <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '600', color: '#000', textAlign: 'center' }}>
                            Delivering To:
                        </Text>
                        <Text style={{ fontSize: responsiveFontSize(2), color: backIconColor, marginTop: 3, textAlign: 'center', paddingHorizontal: 10, fontWeight: '500' }}>
                            {address}
                        </Text>
                    </View>

                    {/* Total price */}
                    <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
                        <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '600', color: '#000', textAlign: 'center' }}>
                            Total Price:
                        </Text>
                        <Text style={{ fontSize: responsiveFontSize(2.2), fontWeight: '800', color: backIconColor, marginTop: 3, textAlign: 'center', paddingHorizontal: 10 }}>
                            ₹{deliveryCharge + totalPrice}
                        </Text>
                    </View>

                    {/* Back to Home Button */}
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#5EC467',
                            paddingVertical: 15,
                            paddingHorizontal: 40,
                            borderRadius: 30,
                            marginTop: 70,
                            elevation: 5,
                            borderColor: backIconColor,
                            borderWidth: 1
                        }}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={{ color: '#fff', fontSize: responsiveFontSize(2), fontWeight: '600' }}>Back to Home</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default OrderPlaced;