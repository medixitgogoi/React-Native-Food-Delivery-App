import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';

const About = () => {

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
                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2.4), fontWeight: '500' }}>About</Text>
                </View>
            </View>

            {/* Content */}
            <ScrollView>
                <View style={{ flexDirection: 'column', paddingHorizontal: 12, marginTop: 10 }}>
                    <Text style={{ color: '#000', textAlign: 'justify' }}>
                        Welcome to Skercart, your go-to app for fast and convenient grocery delivery. We aim to provide a seamless shopping experience, offering a wide range of products from fresh produce to everyday essentials, all delivered right to your doorstep.

                        Please note that product availability can vary due to stock levels and supply chain factors. While we do our best to keep inventory up-to-date, there may be rare occasions when certain items become unavailable after you've placed an order. In such cases, we will notify you promptly, offering alternatives or refunds as needed.

                        Skercart strives to provide accurate product details, pricing, and nutritional information. However, product images and descriptions may differ slightly from the actual items delivered. We encourage you to check product labels directly for the most reliable information, especially if you have dietary restrictions or allergies.

                        Our team works hard to deliver your orders on time, but delivery windows are estimates and can be affected by factors like traffic, weather, or operational issues. Should any delays occur, we will keep you informed and work to resolve the situation as quickly as possible.

                        Skercart partners with trusted third-party vendors and delivery providers to ensure a smooth operation. We are committed to quality service, but we cannot take responsibility for actions or errors by third-party suppliers. Any concerns related to delivery or payment should be addressed to the respective provider.

                        Your health and safety are our priority. We adhere to strict food safety guidelines, and we encourage you to inspect your orders upon delivery. By using Skercart, you acknowledge and accept our terms of service, and we advise reviewing these periodically as we may update them from time to time.

                        Thank you for choosing Skercart for your grocery needs. We look forward to serving you!
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default About;