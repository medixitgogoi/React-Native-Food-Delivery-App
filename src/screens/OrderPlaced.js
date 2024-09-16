import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { backIconColor, darkGreen } from '../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const OrderPlaced = ({ route }) => {

    console.log('route', route);
    const address = route?.params?.selectedAddress.address;

    const deliveryAddress = "Flat 23B, Sunshine Apartments, 2nd Street, Sector 10, New Town, Kolkata, West Bengal, 700156"; // Example address

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
                        <Text style={{ fontSize: responsiveFontSize(2), color: '#000', fontWeight: '400', textAlign: 'center', marginVertical: 5 }}>
                            Thank you for your order. Your food is on its way.
                        </Text>
                    </View>

                    {/* Estimated Delivery Time */}
                    <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
                        <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '600', color: '#000' }}>
                            Estimated Delivery Time:
                        </Text>
                        <Text style={{ fontSize: responsiveFontSize(2.2), color: darkGreen, marginTop: 5, fontWeight: '600' }}>
                            30-40 minutes
                        </Text>
                    </View>

                    {/* Delivery Address */}
                    <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
                        <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '600', color: '#000', textAlign: 'center' }}>
                            Delivering To:
                        </Text>
                        <Text style={{ fontSize: responsiveFontSize(1.8), color: '#6e6e6e', marginTop: 5, textAlign: 'center', paddingHorizontal: 10 }}>
                            {address}
                        </Text>
                    </View>

                    {/* Track Order Button */}
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#5EC467',
                            paddingVertical: 15,
                            paddingHorizontal: 40,
                            borderRadius: 30,
                            marginTop: 70
                        }}
                    >
                        <Text style={{ color: '#fff', fontSize: responsiveFontSize(2), fontWeight: '600' }}>Back to Home</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default OrderPlaced;