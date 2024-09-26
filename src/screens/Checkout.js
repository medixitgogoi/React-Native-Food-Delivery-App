import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Alert, Image, FlatList, Animated, ActivityIndicator, ScrollView } from 'react-native';
import { background, backIconColor, darkGreen, lightGreen, offWhite } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome6';
import Icon4 from 'react-native-vector-icons/dist/FontAwesome';
import Icon5 from 'react-native-vector-icons/dist/AntDesign';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import phonepeSDK from 'react-native-phonepe-pg';
import Base64 from 'react-native-base64';
import sha256 from 'sha256';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const Checkout = () => {

    const navigation = useNavigation();

    const userDetails = useSelector(state => state.user);
    console.log('userDetails', userDetails);

    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const [loading, setLoading] = useState(true);
    const [contineLoading, setContineLoading] = useState(false);

    const [environment, setenvironment] = useState("SANDBOX");
    const [merchantId, setmerchantId] = useState("PGTESTPAYUAT86");
    const [appId, setappId] = useState(null);
    const [enableLogging, setenableLogging] = useState(true);

    const moveAnim = useRef(new Animated.Value(0)).current;

    // Animation
    useEffect(() => {
        const startAnimation = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(moveAnim, {
                        toValue: 10, // Move to the right by 10 units
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(moveAnim, {
                        toValue: 0, // Move back to the left
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        };

        startAnimation();
    }, [moveAnim]);

    // Fetch address
    useFocusEffect(
        useCallback(() => {
            const getAddresses = async () => {
                try {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${userDetails[0]?.accessToken}`;
                    const response = await axios.get('/user/shippingAddress/fetch');

                    const allAddresses = response?.data?.data;
                    console.log('Addresses:', allAddresses);

                    // Separate default and non-default addresses
                    const defaultAddresses = allAddresses.filter(item => item.is_default === '2');
                    const nonDefaultAddresses = allAddresses.filter(item => item.is_default !== '2');

                    // Combine default addresses at the top and non-default at the bottom
                    const sortedAddresses = [...defaultAddresses, ...nonDefaultAddresses];
                    setAddresses(sortedAddresses);

                    // Automatically select the first default address
                    if (defaultAddresses.length > 0) {
                        setSelectedAddress(defaultAddresses[0]);
                    }
                } catch (error) {
                    Alert.alert(error.message);
                } finally {
                    setLoading(false);
                }
            };

            getAddresses();
        }, [userDetails])
    );

    const generatetransactionId = () => {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000000);
        const merchantPrefix = "T";
        return `${merchantPrefix}${timestamp}${random}`
    }

    const continueHandler = async () => {
        try {
            setContineLoading(true);
            // Data object as per the API requirement
            const data = {
                address_id: selectedAddress?.id,
                payment_type: '1',
            };

            // API Call using axios
            const response = await axios.post(`user/order/place`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('orderPlaced', response?.data?.data);

            if (response?.data?.success) {
                const totalAmount = response?.data?.data?.total_price + response?.data?.data?.delivery_charge + response?.data?.data?.addl_charge;

                const submitHandler = async () => {
                    try {
                        console.log('Initializing PhonePe SDK...');
                        const initResponse = await phonepeSDK.init(environment, merchantId, appId, enableLogging);
                        console.log('PhonePe SDK initialized:', initResponse);

                        const requestBody = {
                            merchantId: merchantId,
                            merchantTransactionId: generatetransactionId(),
                            merchantUserId: "",
                            amount: totalAmount * 100,
                            callbackurl: "https://webhook.site/callback-url",
                            mobileNumber: userDetails?.mobileNumber,
                            paymentInstrument: {
                                type: "PAY_PAGE",
                            },
                        }

                        const salt_key = "96434309-7796-489d-8924-ab56988a6076";
                        const salt_Index = 1;
                        const payload = JSON.stringify(requestBody);
                        console.log('payload: ', payload);
                        const payload_main = Base64.encode(payload);
                        console.log('payload_main: ', payload_main);
                        const string = payload_main + "/pg/v1/pay" + salt_key;

                        const checksum = sha256(string) + "###" + salt_Index;

                        console.log('checksum: ', checksum);
                        console.log('Starting transaction with payload: ', payload_main);

                        const transactionResponse = await phonepeSDK.startTransaction(
                            payload_main,
                            checksum,
                            null,
                            null
                        );

                        // console.log('Transaction response: ', transactionResponse);

                        if (transactionResponse.status) {
                            navigation.navigate('OrderPlaced', {
                                data: response?.data?.data,
                                selectedAddress: selectedAddress
                            });
                        }
                    } catch (err) {
                        console.error('Error during PhonePe transaction: ', err);
                    }
                }

                submitHandler();
            }

            console.log('responseadddd', response);

        } catch (error) {
            // Handle error response
            if (error.response) {
                Alert.alert("Error", error.response.data.message || "Something went wrong. Please try again.");
            } else {
                Alert.alert("Error", "Network error. Please check your internet connection and try again.");
            }
        } finally {
            setTimeout(() => {
                setContineLoading(false);
            }, 2000)
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background, paddingBottom: 10 }}>
            <StatusBar
                animated={true}
                backgroundColor={background}
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ paddingHorizontal: 10, height: 50, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 8, elevation: 3 }} onPress={() => navigation.goBack()}>
                    <Icon name="keyboard-arrow-left" size={23} color={'#000'} />
                </TouchableOpacity>
                <Text style={{ color: '#000', fontWeight: "600", fontSize: responsiveFontSize(2.3), textAlign: 'center', textTransform: 'uppercase' }}>Select Address</Text>
                <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 8, elevation: 3 }} onPress={() => navigation.navigate('Profile')}>
                    <Icon2 name="account" size={23} color={'#000'} />
                </TouchableOpacity>
            </View>

            <ScrollView style={{ flex: 1 }}>
                <View style={{ paddingBottom: 40 }}>
                    {/* Address */}
                    <View style={{ paddingHorizontal: 12, marginVertical: 13 }}>
                        {/* Heading */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                <Icon4 name="bookmark" size={19} color={backIconColor} />
                                <Text style={{ color: '#000', fontSize: responsiveFontSize(2.2), fontWeight: '700' }}>Saved Addresses</Text>
                            </View>
                            {!loading && addresses?.length > 0 && (
                                <TouchableOpacity onPress={() => navigation.navigate('AddNewAddress', { to: 'Checkout' })} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                    <Text style={{ color: darkGreen, fontWeight: '600', fontSize: responsiveFontSize(1.9) }}>Add New</Text>
                                    <Icon3 name="plus" size={14} color={darkGreen} />
                                </TouchableOpacity>
                            )}
                        </View>

                        {/* Skeleton loader */}
                        {loading && (
                            <FlatList
                                data={[1, 1, 1, 1, 1]}
                                renderItem={({ index }) => (
                                    <View key={index} style={{ marginTop: 9, backgroundColor: '#fff', paddingHorizontal: 8, paddingVertical: 15, borderRadius: 12, flexDirection: 'row', alignItems: 'flex-start', elevation: 1, margin: 1 }}>
                                        {/* Shimmer for Checkbox */}
                                        <ShimmerPlaceHolder style={{ flex: 0.1, height: 17, width: 17, borderRadius: 4 }} />

                                        <View style={{ flex: 0.88, paddingHorizontal: 4, flexDirection: 'column', justifyContent: 'space-between', gap: 3, alignItems: 'flex-start' }}>
                                            {/* Shimmer for Name and Address Type */}
                                            <ShimmerPlaceHolder style={{ width: '60%', height: 15, marginBottom: 8 }} />
                                            <ShimmerPlaceHolder style={{ width: '30%', height: 10, marginBottom: 8 }} />

                                            {/* Shimmer for Address Line 1 */}
                                            <ShimmerPlaceHolder style={{ width: '90%', height: 10, marginBottom: 8 }} />

                                            {/* Shimmer for Address Line 2 */}
                                            <ShimmerPlaceHolder style={{ width: '80%', height: 10 }} />
                                        </View>
                                    </View>
                                )}
                                keyExtractor={(item, index) => String(index)}
                            />
                        )}

                        {/* Fallback image */}
                        {!loading && addresses?.length === 0 && (
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <Image source={require('../assets/no_address.png')} style={{ width: 200, height: 200, resizeMode: 'contain' }} />
                                <Text style={{ color: offWhite, fontWeight: '500' }}>You have not added any addresses yet!</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('AddNewAddress')} style={{ elevation: 2, marginHorizontal: 10, paddingHorizontal: 20, marginVertical: 10, paddingVertical: 12, gap: 6, borderRadius: 12, backgroundColor: darkGreen, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.2) }}>Add a New Address</Text>
                                    <Icon5 name="plussquare" size={20} color={'#000'} />
                                </TouchableOpacity>
                            </View>
                        )}

                        {/* Content */}
                        {!loading && addresses?.length > 0 && addresses?.map(item => (
                            <TouchableOpacity onPress={() => setSelectedAddress(item)} key={item?.id} style={{ marginTop: 9, backgroundColor: '#fff', paddingHorizontal: 8, paddingVertical: 15, borderRadius: 12, flexDirection: 'row', alignItems: 'flex-start', elevation: 1, margin: 1 }}>
                                <View style={{ flex: 0.09, justifyContent: 'center', flexDirection: 'row' }}>
                                    {selectedAddress?.id === item?.id ? (
                                        <View>
                                            <Icon2 name="checkbox-marked" size={19} color={darkGreen} />
                                        </View>
                                    ) : (
                                        <View>
                                            <Icon2 name="checkbox-blank-outline" size={19} color={'#868c95'} />
                                        </View>
                                    )}
                                </View>

                                <View style={{ flex: 0.89, paddingHorizontal: 4, flexDirection: 'column', justifyContent: 'space-between', gap: 5, alignItems: 'flex-start' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 4 }}>
                                            <Text style={{ color: '#000', fontWeight: '700', fontSize: responsiveFontSize(2) }}>{item.name},</Text>
                                            <Text style={{ color: '#000', fontWeight: '500', fontSize: responsiveFontSize(1.6) }}>{item.address_type === '2' ? 'Work' : 'Home'}</Text>
                                        </View>
                                        {item.is_default === '2' && (
                                            <View style={{ backgroundColor: lightGreen, borderColor: backIconColor, borderWidth: 0.8, borderRadius: 4, paddingVertical: 2, paddingHorizontal: 4, marginTop: 2 }}>
                                                <Text style={{ color: backIconColor, fontSize: responsiveFontSize(1.3), fontWeight: '600' }}>Default</Text>
                                            </View>
                                        )}
                                    </View>

                                    <Text style={{ color: selectedAddress?.id === item?.id ? backIconColor : '#878787', textAlign: 'justify', fontSize: responsiveFontSize(1.7), fontWeight: '500' }}>{`${item.address}.`}{item.landmark && ` Nearby ${item.landmark}`}</Text>

                                    {item.address_2 && (
                                        <Text style={{ color: selectedAddress?.id === item?.id ? backIconColor : '#878787', textAlign: 'justify', fontSize: responsiveFontSize(1.7), fontWeight: '500' }}>{item.address_2}</Text>
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Payment */}
                    {/* {!loading && addresses?.length > 0 && (
                        <View style={{ marginVertical: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10 }}>
                                    <Icon name="account-balance-wallet" size={21} color={backIconColor} />
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2.2), fontWeight: '700' }}>Payment</Text>
                                </View>
                            </View>
                        </View>
                    )} */}
                </View>
            </ScrollView>

            {/* Continue button*/}
            {!loading && addresses.length !== 0 && (
                <TouchableOpacity onPress={continueHandler} style={{ alignSelf: 'center', position: 'absolute', bottom: 9, backgroundColor: lightGreen, borderRadius: 14, width: '94%', padding: 10, height: 45, borderColor: backIconColor, borderWidth: 1.3 }}>
                    {contineLoading ? (
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, justifyContent: 'center' }}>
                            <ActivityIndicator size="small" color={backIconColor} />
                        </View>
                    ) : (
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                            <Text style={{ color: backIconColor, fontWeight: '700', textAlign: 'center', fontSize: responsiveFontSize(2.4), textTransform: 'uppercase' }}>Continue to payment</Text>
                            <Animated.View style={{ transform: [{ translateX: moveAnim }] }}>
                                <Icon5 name="arrowright" size={23} color={backIconColor} />
                            </Animated.View>
                        </View>
                    )}
                </TouchableOpacity>
            )}
        </SafeAreaView>
    )
}

export default Checkout;

const styles = StyleSheet.create({});