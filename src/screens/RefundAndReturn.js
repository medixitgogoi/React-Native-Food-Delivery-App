import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';

const RefundAndReturn = () => {

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
                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2.4), fontWeight: '500' }}>Refund And Return Policy</Text>
                </View>
            </View>

            {/* Content */}
            <ScrollView>
                <View style={{ flexDirection: 'column', paddingHorizontal: 12, marginTop: 10 }}>
                    <Text style={{ color: '#000' }}>
                        Our Refund and Return Policy is designed to ensure customer satisfaction while maintaining the highest standards of quality and service. If you are not completely satisfied with your order, we offer a hassle-free refund and return process. Returns are accepted for products that are damaged, expired, or incorrect upon delivery. To request a refund or exchange, simply contact our customer support team within 24 hours of receiving your order. We may ask for a photo of the product or other relevant details to process your request. Refunds will be issued to the original payment method and typically take 5-7 business days to reflect. Please note that for perishable items, refunds or returns may be limited depending on the condition of the product. We strive to make the process as seamless as possible, ensuring you can shop with confidence.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RefundAndReturn