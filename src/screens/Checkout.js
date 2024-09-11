import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Alert, Image, FlatList, Animated } from 'react-native';
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

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const Checkout = () => {

    const navigation = useNavigation();

    const userDetails = useSelector(state => state.user);

    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const [loading, setLoading] = useState(true);

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

                    console.log('addresssss', response);
                    setAddresses(response?.data?.data);

                    const defaultAddress = response?.data?.data?.find(item => item.is_default === '2');
                    setSelectedAddress(defaultAddress);
                } catch (error) {
                    Alert.alert(error.message)
                } finally {
                    setLoading(false);
                }
            };

            getAddresses();
        }, [userDetails])
    );

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
                <Text style={{ color: '#000', fontWeight: "600", fontSize: responsiveFontSize(2.5), textAlign: 'center', textTransform: 'uppercase' }}>Checkout</Text>
                <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 8, elevation: 3 }} onPress={() => navigation.navigate('Profile')}>
                    <Icon2 name="account" size={23} color={'#000'} />
                </TouchableOpacity>
            </View>

            <View>
                {/* Address */}
                <View style={{ paddingHorizontal: 12, marginVertical: 13 }}>
                    {/* Heading */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <Icon4 name="bookmark" size={20} color={backIconColor} />
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2.3), fontWeight: '700' }}>Saved Addresses</Text>
                        </View>
                    </View>

                    {/* Skeleton loader */}
                    {loading && (
                        <FlatList
                            data={[1, 1, 1, 1, 1]}
                            renderItem={() => (
                                <View style={{ marginTop: 9, backgroundColor: '#fff', paddingHorizontal: 8, paddingVertical: 15, borderRadius: 12, flexDirection: 'row', alignItems: 'flex-start', elevation: 1, margin: 1 }}>
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
                            keyExtractor={(item) => item.key}
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
                        <TouchableOpacity onPress={() => setSelectedAddress(item)} key={item.id} style={{ marginTop: 9, backgroundColor: '#fff', paddingHorizontal: 8, paddingVertical: 15, borderRadius: 12, flexDirection: 'row', alignItems: 'flex-start', elevation: 1, margin: 1 }}>
                            <View style={{ flex: 0.1, justifyContent: 'center', flexDirection: 'row' }}>
                                {selectedAddress?.id === item?.id ? (
                                    <View>
                                        <Icon2 name="checkbox-marked" size={20} color={darkGreen} />
                                    </View>
                                ) : (
                                    <View>
                                        <Icon2 name="checkbox-blank-outline" size={20} color={'#868c95'} />
                                    </View>
                                )}
                            </View>

                            <View style={{ flex: 0.88, paddingHorizontal: 4, flexDirection: 'column', justifyContent: 'space-between', gap: 5, alignItems: 'flex-start' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 4 }}>
                                        <Text style={{ color: '#000', fontWeight: '700', fontSize: responsiveFontSize(2.2) }}>{item.name},</Text>
                                        <Text style={{ color: '#000', fontWeight: '500', fontSize: responsiveFontSize(1.8) }}>{item.address_type === '2' ? 'Work' : 'Home'}</Text>
                                    </View>
                                    {item.is_default === '2' && (
                                        <View style={{ backgroundColor: lightGreen, borderColor: backIconColor, borderWidth: 0.8, borderRadius: 4, paddingVertical: 2, paddingHorizontal: 4, marginTop: 2 }}>
                                            <Text style={{ color: backIconColor, fontSize: responsiveFontSize(1.4), fontWeight: '600' }}>Default</Text>
                                        </View>
                                    )}
                                </View>

                                <Text style={{ color: selectedAddress?.id === item?.id ? backIconColor : '#878787', textAlign: 'justify', fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>{`${item.address}.`}{item.landmark && ` Nearby ${item.landmark}`}</Text>

                                {item.address_2 && (
                                    <Text style={{ color: selectedAddress?.id === item?.id ? backIconColor : '#878787', textAlign: 'justify', fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>{item.address_2}</Text>
                                )}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Payment */}
                <View style={{ marginVertical: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10 }}>
                            <Icon name="account-balance-wallet" size={24} color={backIconColor} />
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2.3), fontWeight: '700' }}>Payment</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Continue button*/}
            <TouchableOpacity style={{ alignSelf: 'center', position: 'absolute', bottom: 12, backgroundColor: lightGreen, borderRadius: 14, width: '95%', padding: 10, height: 45, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, borderColor: backIconColor, borderWidth: 1.3 }}>
                <Text style={{ color: backIconColor, fontWeight: '700', textAlign: 'center', fontSize: responsiveFontSize(2.4), textTransform: 'uppercase' }}>Continue</Text>
                <Animated.View style={{ transform: [{ translateX: moveAnim }] }}>
                    <Icon5 name="arrowright" size={23} color={backIconColor} />
                </Animated.View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Checkout;

const styles = StyleSheet.create({});