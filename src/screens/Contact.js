import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';

const Contact = () => {

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
                <View style={{ position: 'absolute', left: 0, right: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2.4), fontWeight: '500' }}>Contact</Text>
                </View>
            </View>

            {/* Content */}
            <ScrollView>
                <View style={{ flexDirection: 'column', paddingHorizontal: 12, marginTop: 10 }}>
                    <Text style={{ color: '#000', marginBottom: 10 }}>
                        If you have any questions, concerns, or feedback, we’d love to hear from you! Please reach out to our customer support team through the following channels:
                    </Text>
                    <Text style={{ color: '#000', fontWeight: 'bold', marginBottom: 5 }}>Phone:</Text>
                    <Text style={{ color: '#000', marginBottom: 10 }}>+91 6033391141</Text>
                    <Text style={{ color: '#000', fontWeight: 'bold', marginBottom: 5 }}>Email:</Text>
                    <Text style={{ color: '#000', marginBottom: 10 }}>support@groceryapp.com</Text>
                    <Text style={{ color: '#000', fontWeight: 'bold', marginBottom: 5 }}>Business Hours:</Text>
                    <Text style={{ color: '#000', marginBottom: 10 }}>Monday - Friday: 8 AM - 8 PM</Text>
                    <Text style={{ color: '#000', marginBottom: 10 }}>Saturday - Sunday: 10 AM - 6 PM</Text>
                    <Text style={{ color: '#000', }}>Your feedback is important to us, and we aim to respond to all inquiries within 24 hours. Thank you for choosing our grocery delivery service!</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Contact;
