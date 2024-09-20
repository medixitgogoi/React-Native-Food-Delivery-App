import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, Image } from 'react-native';
import { background, backIconColor, darkGreen, lightGreen, offWhite } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon2 from 'react-native-vector-icons/dist/FontAwesome6';
import Icon3 from 'react-native-vector-icons/dist/AntDesign';
import Icon4 from 'react-native-vector-icons/dist/FontAwesome5';
import Icon5 from 'react-native-vector-icons/dist/Ionicons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const Addresses = () => {

    const navigation = useNavigation();

    const userDetails = useSelector(state => state.user);

    const [addresses, setAddresses] = useState([]);

    const [loading, setLoading] = useState(true);

    // get Addresses
    useFocusEffect(
        useCallback(() => {
            const getAddresses = async () => {
                try {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${userDetails[0]?.accessToken}`;
                    const response = await axios.get('/user/shippingAddress/fetch');
                    setAddresses(response?.data?.data);
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
            <View style={{ paddingHorizontal: 10, height: 50, width: '100%', flexDirection: 'row', alignItems: 'center', position: 'relative' }}>
                <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 8, elevation: 3, zIndex: 1 }} onPress={() => navigation.goBack()}>
                    <Icon name="keyboard-arrow-left" size={23} color={'#000'} />
                </TouchableOpacity>

                <View style={{ position: 'absolute', left: 0, right: 0, alignItems: 'center' }}>
                    <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.5), textTransform: 'uppercase' }}>Your Addresses</Text>
                </View>
            </View>

            {/* Add new addresss */}
            {addresses?.length != 0 && (
                <TouchableOpacity onPress={() => navigation.navigate('AddNewAddress', { to: 'Addresses' })} style={{ elevation: 2, marginHorizontal: 10, marginVertical: 10, paddingVertical: 11, gap: 4, borderRadius: 12, backgroundColor: darkGreen, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.2) }}>Add a New Address</Text>
                    <Icon3 name="plussquare" size={20} color={'#000'} />
                </TouchableOpacity>
            )}

            {/* Content */}
            <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop: 10 }}>
                {/* Skeleton loader */}
                {loading && (
                    <FlatList
                        data={[1, 1, 1, 1, 1, 1]}
                        renderItem={({ index}) => (
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
                        contentContainerStyle={{ paddingHorizontal: 10 }}
                    />
                )}

                {/* Fallback image */}
                {!loading && addresses?.length === 0 && (
                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <Image source={require('../assets/no_address.png')} style={{ width: 200, height: 200, resizeMode: 'contain' }} />
                        <Text style={{ color: offWhite, fontWeight: '500' }}>You have not added any addresses yet!</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('AddNewAddress')} style={{ elevation: 2, marginHorizontal: 10, paddingHorizontal: 20, marginVertical: 10, paddingVertical: 12, gap: 6, borderRadius: 12, backgroundColor: darkGreen, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.2) }}>Add a New Address</Text>
                            <Icon3 name="plussquare" size={20} color={'#000'} />
                        </TouchableOpacity>
                    </View>
                )}

                <View style={{ marginTop: 2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 15, paddingBottom: 15 }}>
                    {!loading && addresses?.length > 0 && addresses?.map(item => (
                        <View key={item?.id} style={{ elevation: 2, backgroundColor: '#fff', paddingHorizontal: 8, marginHorizontal: 10, paddingVertical: 15, borderRadius: 12, flexDirection: 'row', alignItems: 'flex-start', elevation: 1, justifyContent: 'space-between' }}>
                            <View style={{ flex: 0.9, paddingHorizontal: 5, flexDirection: 'column', justifyContent: 'space-between', gap: 13, alignItems: 'flex-start' }}>
                                {/* Name, addressType */}
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                            <View style={{ backgroundColor: backIconColor, width: 23, height: 23, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 40 }}>
                                                <Icon4 name="user-alt" size={12} color={'#fff'} />
                                            </View>
                                            <Text style={{ color: '#000', fontWeight: '700', fontSize: responsiveFontSize(2.2) }}>{item?.name},</Text>
                                        </View>
                                        <Text style={{ color: '#000', fontWeight: '500', fontSize: responsiveFontSize(1.8) }}>{item?.address_type === '2' ? 'Work' : 'Home'}</Text>
                                    </View>
                                    {item.is_default === '2' && (
                                        <View style={{ backgroundColor: lightGreen, borderColor: backIconColor, borderWidth: 0.8, borderRadius: 4, paddingVertical: 2, paddingHorizontal: 4, marginTop: 2 }}>
                                            <Text style={{ color: backIconColor, fontSize: responsiveFontSize(1.4), fontWeight: '600' }}>Default</Text>
                                        </View>
                                    )}
                                </View>

                                {/* Location, address1 and address2 */}
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 6 }}>
                                    <View style={{ backgroundColor: backIconColor, width: 23, height: 23, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 40 }}>
                                        <Icon5 name="location-sharp" size={15} color={'#fff'} />
                                    </View>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ color: backIconColor, textAlign: 'justify', fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>{`${item.address}.`}{item?.landmark && ` Nearby ${item.landmark}`}</Text>
                                        {item.address_2 && (
                                            <Text style={{ color: backIconColor, textAlign: 'justify', fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>{item?.address_2}</Text>
                                        )}
                                    </View>
                                </View>
                            </View>

                            {/* Edit button */}
                            <TouchableOpacity onPress={() => navigation.navigate('EditAddress', { data: item })} style={{ flex: 0.1, paddingTop: 4, justifyContent: 'center', flexDirection: 'row' }}>
                                <Icon2 name="pencil" size={15} color={'#868c95'} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default Addresses;