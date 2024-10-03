import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';

const Cancellation = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar
                animated={true}
                backgroundColor={'#fff'}
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
                    <Icon4 name="arrowleft" size={22} color={'#000'} />
                </TouchableOpacity>
                <View style={{ position: 'absolute', left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', }}>
                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2.4), fontWeight: '500' }}>Privacy Policy</Text>
                </View>
            </View>

            {/* Content */}
            <ScrollView>
                <View style={{ flexDirection: 'column', paddingHorizontal: 12, marginTop: 10 }}>
                    <Text style={{ color: '#000', textAlign: 'justify' }}>
                        The Cancellation section of the grocery delivery app provides users with clear guidelines and policies for canceling their orders. Customers can cancel their orders within a specific timeframe, usually before the order is processed or dispatched for delivery. The app aims to provide flexibility, allowing users to modify or cancel orders directly from their account. However, once the order has been prepared or dispatched, cancellation may no longer be available, or additional charges may apply. Refunds for canceled orders, where applicable, will be processed promptly, and users will be notified via email or app notifications. The cancellation policy ensures a seamless experience while balancing operational efficiency for both customers and delivery partners.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Cancellation