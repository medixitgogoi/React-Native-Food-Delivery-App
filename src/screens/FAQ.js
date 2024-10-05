import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';

const FAQ = () => {

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
                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2.4), fontWeight: '500' }}>FAQ</Text>
                </View>
            </View>

            {/* Content */}
            <ScrollView>
                <View style={{ flexDirection: 'column', paddingHorizontal: 12, paddingBottom: 20 }}>
                    <View style={{ marginVertical: 8 }}>
                        <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.1) }}>1. What products and services does Skercart offer?</Text>
                        <Text style={{ color: '#000', marginTop: 3, fontSize: responsiveFontSize(1.9) }}>
                            Skercart provides a wide selection of groceries, household essentials, and more. We strive to offer the freshest products, but availability may change due to stock levels, demand, and supply constraints.
                        </Text>
                    </View>

                    <View style={{ marginVertical: 5 }}>
                        <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.1) }}>2. Can I be sure all items I order will be available?</Text>
                        <Text style={{ color: '#000', marginTop: 3, fontSize: responsiveFontSize(1.9) }}>
                            While we do our best to keep all products in stock, there are times when items may be unavailable. In such cases, we'll notify you and offer a substitution or refund.
                        </Text>
                    </View>

                    <View style={{ marginVertical: 5 }}>
                        <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.1) }}>3. How are prices determined on Skercart?</Text>
                        <Text style={{ color: '#000', marginTop: 3, fontSize: responsiveFontSize(1.9) }}>
                            Prices are updated regularly to reflect market conditions and promotions. Please note that prices may change without notice. The final cost, including any taxes and delivery fees, will be confirmed at checkout.
                        </Text>
                    </View>

                    <View style={{ marginVertical: 5 }}>
                        <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.1) }}>4. Is Skercart the cheapest option for groceries?</Text>
                        <Text style={{ color: '#000', marginTop: 3, fontSize: responsiveFontSize(1.9) }}>
                            We do not guarantee the lowest prices, but we work hard to provide competitive pricing on all products.
                        </Text>
                    </View>

                    <View style={{ marginVertical: 5 }}>
                        <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.1) }}>5. What are the delivery times, and are they guaranteed?</Text>
                        <Text style={{ color: '#000', marginTop: 3, fontSize: responsiveFontSize(1.9) }}>
                            We aim to deliver within the estimated timeframes shown during checkout. However, delivery times are not guaranteed and may be impacted by external factors such as weather, traffic, or operational delays. We’ll do our best to keep you informed if any delays occur.
                        </Text>
                    </View>

                    <View style={{ marginVertical: 5 }}>
                        <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.1) }}>6. What happens if the product images or descriptions don’t match the actual product?</Text>
                        <Text style={{ color: '#000', marginTop: 3, fontSize: responsiveFontSize(1.9) }}>
                            We strive to provide accurate images and descriptions of all products. However, variations may occur. We encourage customers to review product labels and descriptions, especially for important details such as allergens or nutritional information.
                        </Text>
                    </View>

                    <View style={{ marginVertical: 5 }}>
                        <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.1) }}>7. Can I return an item or request a refund?</Text>
                        <Text style={{ color: '#000', marginTop: 3, fontSize: responsiveFontSize(1.9) }}>
                            If an item is damaged or incorrect, please reach out to our customer support team. Refunds or replacements will be processed at our discretion.
                        </Text>
                    </View>

                    <View style={{ marginVertical: 5 }}>
                        <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.1) }}>8. What about food safety?</Text>
                        <Text style={{ color: '#000', marginTop: 3, fontSize: responsiveFontSize(1.9) }}>
                            We are committed to maintaining high food safety standards. Please inspect your order upon delivery to ensure everything is in good condition. Follow appropriate food storage guidelines after receiving your groceries.
                        </Text>
                    </View>

                    <View style={{ marginVertical: 5 }}>
                        <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.1) }}>9. Do you work with third-party suppliers and services?</Text>
                        <Text style={{ color: '#000', marginTop: 3, fontSize: responsiveFontSize(1.9) }}>
                            Yes, we partner with third-party suppliers, delivery services, and payment processors. While we work with trusted partners, we are not responsible for their actions or any issues that may arise. Please contact them directly for any concerns.
                        </Text>
                    </View>

                    <View style={{ marginVertical: 5 }}>
                        <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.1) }}>10. Are there any limitations to your service?</Text>
                        <Text style={{ color: '#000', marginTop: 3, fontSize: responsiveFontSize(1.9) }}>
                            To the fullest extent permitted by law, Skercart disclaims all warranties regarding the accuracy, quality, or reliability of the service. We are not liable for any direct or indirect damages that may arise from using the app.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default FAQ