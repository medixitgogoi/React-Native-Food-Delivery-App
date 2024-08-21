import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { background, backIconColor, darkGreen, lightGreen, offWhite } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome6';
import Icon4 from 'react-native-vector-icons/dist/Ionicons';
import { useEffect, useState } from 'react';
import { data } from '../utils/address';

const Checkout = () => {

    const navigation = useNavigation();

    const [address, setAddress] = useState(null);

    useEffect(() => {
        setAddress(data[0]);
    }, []);

    // console.log('address', address);

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
                <View style={{ paddingHorizontal: 13, marginVertical: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
                        <Text style={{ color: '#000', fontSize: responsiveFontSize(2.3), fontWeight: '700' }}>Saved Addresses</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('AddNewAddress')} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                            <Text style={{ color: backIconColor, fontSize: responsiveFontSize(2), fontWeight: '500' }}>Add new</Text>
                            <Icon3 name="plus" size={13} color={backIconColor} />
                        </TouchableOpacity>
                    </View>

                    {data.map(item => (
                        <View key={item.id} style={{ marginTop: 9, backgroundColor: '#fff', paddingHorizontal: 8, paddingVertical: 15, borderRadius: 12, flexDirection: 'row', alignItems: 'flex-start', elevation: 1, }}>
                            <TouchableOpacity onPress={() => setAddress(item)} style={{ flex: 0.1, justifyContent: 'center', flexDirection: 'row' }}>
                                {address?.id === item?.id ? (
                                    <View>
                                        <Icon2 name="checkbox-marked" size={20} color={backIconColor} />
                                    </View>
                                ) : (
                                    <View>
                                        <Icon2 name="checkbox-blank-outline" size={20} color={'#868c95'} />
                                    </View>
                                )}

                            </TouchableOpacity>
                            <View style={{ flex: 0.8, paddingHorizontal: 5, flexDirection: 'column', justifyContent: 'space-between', gap: 5 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                    <Text style={{ color: '#000', fontWeight: '700', fontSize: responsiveFontSize(2.2) }}>{item.type}</Text>
                                    {item.default && (
                                        <View style={{ backgroundColor: lightGreen, borderColor: backIconColor, borderWidth: 0.8, borderRadius: 5, paddingVertical: 2, paddingHorizontal: 4 }}>
                                            <Text style={{ color: backIconColor, fontSize: responsiveFontSize(1.4), fontWeight: '600' }}>Default</Text>
                                        </View>
                                    )}
                                </View>
                                <Text style={{ color: address?.id === item?.id ? backIconColor : '#878787', textAlign: 'justify', fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>{item.address}</Text>
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate('EditAddress')} style={{ flex: 0.1, paddingTop: 4, justifyContent: 'center', flexDirection: 'row' }}>
                                <Icon3 name="pencil" size={15} color={'#868c95'} />
                            </TouchableOpacity>
                        </View>
                    ))}

                </View>

                {/* payment */}
                <View style={{ paddingHorizontal: 13, marginTop: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
                        <Text style={{ color: '#000', fontSize: responsiveFontSize(2.3), fontWeight: '700' }}>Payment</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Checkout;

const styles = StyleSheet.create({});