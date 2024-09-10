import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { background, backIconColor, darkGreen, lightGreen, offWhite } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome6';
import Icon4 from 'react-native-vector-icons/dist/FontAwesome';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { data } from '../utils/address';
import axios from 'axios';

const Checkout = () => {

    const navigation = useNavigation();

    const userDetails = useSelector(state => state.user);

    const [addresses, setAddresses] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const [loading, setLoading] = useState(true);

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

            <View style={{}}>
                {/* address */}
                <View style={{ paddingHorizontal: 13, marginVertical: 14 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <Icon4 name="bookmark" size={20} color={backIconColor} />
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2.3), fontWeight: '700' }}>Saved Addresses</Text>
                        </View>
                    </View>

                    {loading && (
                        <View>
                            <ActivityIndicator size='large' color={backIconColor} />
                        </View>
                    )}

                    {!loading && addresses?.length > 0 && addresses?.map(item => (
                        <View key={item.id} style={{ marginTop: 9, backgroundColor: '#fff', paddingHorizontal: 8, paddingVertical: 15, borderRadius: 12, flexDirection: 'row', alignItems: 'flex-start', elevation: 1, }}>
                            <TouchableOpacity onPress={() => setSelectedAddress(item)} style={{ flex: 0.1, justifyContent: 'center', flexDirection: 'row' }}>
                                {selectedAddress?.id === item?.id ? (
                                    <View>
                                        <Icon2 name="checkbox-marked" size={20} color={darkGreen} />
                                    </View>
                                ) : (
                                    <View>
                                        <Icon2 name="checkbox-blank-outline" size={20} color={'#868c95'} />
                                    </View>
                                )}
                            </TouchableOpacity>

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
                        </View>
                    ))}

                </View>

                {/* payment */}
                <View style={{ marginVertical: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6,  paddingHorizontal: 10 }}>
                            <Icon name="account-balance-wallet" size={24} color={backIconColor} />
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2.3), fontWeight: '700' }}>Payment</Text>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Checkout;

const styles = StyleSheet.create({});