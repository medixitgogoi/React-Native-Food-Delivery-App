import { useNavigation } from '@react-navigation/native';
import { View, Text, StatusBar, TouchableOpacity, Linking } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import { darkGreen } from '../utils/colors';

const Contact = ({ route }) => {

    const contact = route?.params?.data || '';

    const navigation = useNavigation();

    // handleCallPress
    const handleCallPress = () => {
        const phoneNumber = contact; // Add your phone number here
        Linking.openURL(`tel:${phoneNumber}`);
    };

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
                <View style={{ position: 'absolute', left: 0, right: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2.4), fontWeight: '500' }}>Contact</Text>
                </View>
            </View>

            {/* Content */}
            <View style={{ flexDirection: 'column', paddingHorizontal: 12, marginTop: 5 }}>
                <Text style={{
                    color: '#000', fontSize: responsiveFontSize(2), marginBottom: 10, fontWeight: '500'}}>
                    Have a question or need help with your order? Reach out to our customer support team.
                </Text>

                <Text style={{ color: '#000', fontSize: 14, marginBottom: 10 }}>
                    We're here to assist you 24/7 with any inquiries or issues.
                </Text>

                <TouchableOpacity onPress={handleCallPress}>
                    <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9), marginBottom: 5 }}>
                        Phone: <Text style={{ color: darkGreen, fontWeight: '500' }}>+91 {contact}</Text>
                    </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default Contact;
