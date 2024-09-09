import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { background, backIconColor, darkGreen, lightGreen } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon2 from 'react-native-vector-icons/dist/FontAwesome6';
import Icon3 from 'react-native-vector-icons/dist/AntDesign';
import Icon4 from 'react-native-vector-icons/dist/FontAwesome5';
import Icon5 from 'react-native-vector-icons/dist/Ionicons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Modal from "react-native-modal";
import { useCallback, useState } from 'react';

const Addresses = () => {

    const navigation = useNavigation();

    const userDetails = useSelector(state => state.user);

    const [addresses, setAddresses] = useState(null);
    const [editAddress, setEditAddress] = useState(null);

    const [loading, setLoading] = useState(true);

    const [modal, setModal] = useState(false);

    useFocusEffect(
        useCallback(() => {
            const getAddresses = async () => {
                try {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${userDetails[0]?.accessToken}`;
                    const response = await axios.get('/user/shippingAddress/fetch');

                    console.log('addresssss', response);
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

    const editHandler = (item) => {
        setEditAddress(item);
        setModal(true);
        console.log('editAddress', editAddress);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background, paddingBottom: 10 }}>
            <StatusBar
                animated={true}
                backgroundColor={background}
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ paddingHorizontal: 10, height: 50, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 8, elevation: 3 }} onPress={() => navigation.goBack()}>
                    <Icon name="keyboard-arrow-left" size={23} color={'#000'} />
                </TouchableOpacity>
                <Text style={{ color: '#000', fontWeight: "600", fontSize: responsiveFontSize(2.5), textAlign: 'center', textTransform: 'uppercase', position: 'absolute', left: 0, right: 0 }}>Your Addresses</Text>
            </View>

            {/* Add new addresss */}
            <TouchableOpacity onPress={() => navigation.navigate('AddNewAddress')} style={{ elevation: 2, marginHorizontal: 10, marginVertical: 10, paddingVertical: 11, gap: 4, borderRadius: 12, backgroundColor: darkGreen, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.2) }}>Add a New Address</Text>
                <Icon3 name="plussquare" size={20} color={'#000'} />
            </TouchableOpacity>

            {/* Content */}
            <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop: 10 }}>
                {loading ? (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size='large' color={backIconColor} />
                    </View>
                ) : (
                    <View style={{ marginTop: 2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 15 }}>
                        {addresses?.map(item => (
                            <View key={item?.id} style={{ elevation: 2, backgroundColor: '#fff', paddingHorizontal: 8, marginHorizontal: 10, paddingVertical: 15, borderRadius: 12, flexDirection: 'row', alignItems: 'flex-start', elevation: 1, justifyContent: 'space-between' }}>
                                <View style={{ flex: 0.9, paddingHorizontal: 5, flexDirection: 'column', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start' }}>
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
                                <TouchableOpacity onPress={() => editHandler(item)} style={{ flex: 0.1, paddingTop: 4, justifyContent: 'center', flexDirection: 'row' }}>
                                    <Icon2 name="pencil" size={15} color={'#868c95'} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>

            {/* Edit Address Modal*/}
            <Modal
                isVisible={modal}
                onBackdropPress={() => {
                    setModal(false);
                }}
                onSwipeComplete={() => {
                    setModal(false);
                }}
                onRequestClose={() => {
                    setModal(false);
                }}
                animationType="slide"
                swipeDirection={['down']}
                backdropOpacity={0.5}
                style={{ justifyContent: 'flex-end', margin: 0, }}
            >
                <View style={{ width: "100%", }}>

                    {/* Close Button */}
                    <TouchableOpacity
                        style={{ alignSelf: 'center', backgroundColor: '#000', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 35, height: 35, borderRadius: 50, marginBottom: 10 }}
                        onPress={() => {
                            setModal(false);
                        }}>

                        <Icon5 name="close" size={20} style={{ color: '#fff' }} />
                    </TouchableOpacity>

                    {/* Main content */}
                    <View style={{ backgroundColor: background, borderTopLeftRadius: 20, borderTopRightRadius: 20, }}>

                        <ScrollView style={{ marginTop: 5, padding: 15, flexDirection: 'column', gap: 10 }}>

                            {/* Modal Header */}
                            <Text style={{ textAlign: 'center', color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.6), marginBottom: 20 }}>Enter details</Text>

                            <View style={{ flexDirection: 'column', gap: 8, padding: 2 }}>
                                {/* Name */}
                                <Text style={{ color: '#000' }}>{editAddress?.name}</Text>
                                <Text style={{ color: '#000' }}>{editAddress?.address}</Text>
                                {/* <View style={{ flexDirection: 'column', backgroundColor: '#fff', borderRadius: 15, paddingHorizontal: 15, paddingVertical: 10, gap: 4, elevation: 1 }}>
                                    <Text style={{ color: '#517c84', fontSize: responsiveFontSize(2.2), fontWeight: '500' }}>Enter your PARTY name</Text>
                                    <View style={{ alignSelf: "center", width: "100%", paddingHorizontal: 14, backgroundColor: background, elevation: 1, borderRadius: 8, borderColor: isPartyNameFocused ? zomatoRed : "", borderWidth: isPartyNameFocused ? 1 : 0, marginVertical: 2 }}>
                                        <TextInput
                                            style={{ paddingVertical: 5, fontSize: responsiveFontSize(2.1), fontWeight: "500", color: "#000", }}
                                            onChangeText={setPartyName}
                                            value={partyName}
                                            placeholderTextColor="#abb0ba"
                                            onFocus={() => setIsPartyNameFocused(true)}
                                            onBlur={() => setIsPartyNameFocused(false)}
                                        />
                                    </View>
                                </View> */}

                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    )
}

export default Addresses;