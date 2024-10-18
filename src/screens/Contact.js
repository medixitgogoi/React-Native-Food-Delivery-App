import { useNavigation } from '@react-navigation/native';
import { View, Text, StatusBar, TouchableOpacity, Linking, useWindowDimensions } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import { backIconColor, darkGreen } from '../utils/colors';
import RenderHTML from 'react-native-render-html';

const Contact = ({ route }) => {

    const { width } = useWindowDimensions(); // Get screen width for RenderHTML

    const contact = route?.params?.data || '';
    console.log('contact', contact);

    const navigation = useNavigation();

    // handleCallPress
    const handleCallPress = () => {
        // Format the phone number with a country code (assuming +91 for India)
        const phoneNumber = `+91${contact}`;
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
                <Text style={{ color: '#000', fontSize: responsiveFontSize(2), marginBottom: 10, fontWeight: '500' }}>
                    Have a question or need help with your order? Reach out to our customer support team.
                </Text>

                <Text style={{ color: '#000', fontSize: 14, marginBottom: 10 }}>
                    We're here to assist you 24/7 with any inquiries or issues.
                </Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9), marginRight: 5 }}>Phone:</Text>

                    <Text style={{ color: backIconColor, fontSize: responsiveFontSize(2.1), marginRight: 2, fontWeight: '500' }}>+91</Text>

                    <RenderHTML
                        contentWidth={width} // Use device width
                        source={{ html: contact }} // Render the HTML disclaimer
                        tagsStyles={{
                            p: {
                                color: backIconColor, // Black text
                                fontWeight: 500,
                                fontSize: responsiveFontSize(2.1),  // Increase font size for <p> tag
                            },
                            span: {
                                color: darkGreen, // Black text for inline elements
                                fontWeight: 500,
                                fontSize: responsiveFontSize(2.1),  // Increase font size for <p> tag
                            }
                        }}
                    />
                </View>
            </View>

        </SafeAreaView>
    )
}

export default Contact;