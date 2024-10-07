import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';

const TermsAndConditions = () => {

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
                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2.4), fontWeight: '500' }}>Terms And Conditions</Text>
                </View>
            </View>

            {/* Content */}
            <ScrollView>
                <View style={{ flexDirection: 'column', paddingHorizontal: 12, marginTop: 10 }}>
                    <Text style={{ color: '#000', textAlign: 'justify' }}>
                        Welcome to Skercart, your go-to grocery delivery app. By using our services, you agree to be bound by the following terms and conditions. These terms govern your access to and use of our app, including any orders placed through our platform. All users must provide accurate, up-to-date information during registration and ensure payment details are valid for processing transactions. We reserve the right to modify prices, products, and promotions without prior notice. Any orders placed are subject to availability, and we may limit or cancel quantities purchased at our discretion. Delivery times are estimates, and while we strive to deliver on time, unforeseen circumstances may cause delays. In such cases, Skercart is not liable for any resulting inconvenience.

                        All content, including images and descriptions of goods, are for informational purposes and may not reflect the exact product delivered. Users are responsible for ensuring their account security, and any misuse or unauthorized access must be reported immediately. We maintain the right to suspend or terminate accounts for violating these terms. By using our service, you also agree to our privacy policy, which outlines how we handle your personal information. These terms may be updated periodically, and continued use of the app signifies acceptance of any changes.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default TermsAndConditions;