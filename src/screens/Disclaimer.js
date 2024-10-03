import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';

const Disclaimer = () => {

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
                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2.4), fontWeight: '500' }}>Disclaimer</Text>
                </View>
            </View>

            {/* Content */}
            <ScrollView>
                <View style={{ flexDirection: 'column', paddingHorizontal: 12, marginTop: 10 }}>
                    <Text style={{ color: '#000', textAlign: 'justify' }}>
                        The services and products offered through this grocery delivery app are subject to various conditions and limitations. Product availability is not guaranteed, as inventory levels may fluctuate due to high demand, supply constraints, or other unforeseen factors. While we strive to keep product listings accurate, there may be occasions when items are unavailable. In such cases, we will notify you, and substitutions or refunds will be provided at our discretion. Pricing information is regularly updated; however, prices may change without notice due to market conditions or promotions. Final costs, including taxes and delivery fees, will be confirmed at checkout. We do not guarantee the lowest possible prices.

                        Although we aim to deliver orders within the estimated timeframes provided, delivery times are not guaranteed and may be affected by external factors such as weather, traffic, or operational issues. Delays may occur, and we will do our best to keep you informed. Additionally, while we make every effort to provide accurate product descriptions, images, and nutritional information, discrepancies may arise. Product images may differ from the actual items, and customers are encouraged to verify details, especially regarding allergens, by reading product labels directly. We are not responsible for any inaccuracies or misrepresentations in third-party information.

                        We are committed to maintaining high food safety standards, but we cannot be held liable for any adverse health outcomes resulting from the consumption of products delivered through our service. Customers should inspect their orders upon delivery and follow appropriate food safety guidelines. Furthermore, we partner with third-party suppliers, delivery services, and payment processors to facilitate our operations. We are not responsible for the actions, omissions, or errors of these third-party partners, and any issues should be addressed directly with them.

                        Lastly, to the fullest extent permitted by law, we disclaim all warranties regarding the accuracy, quality, or reliability of our services. We will not be liable for any direct, indirect, incidental, or consequential damages that may arise from the use of this app. By using our services, you agree to these terms and acknowledge that we may update this disclaimer at any time. We encourage you to review this section periodically for any changes.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Disclaimer;