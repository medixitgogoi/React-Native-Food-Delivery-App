import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, TextInput } from 'react-native';
import { background, backIconColor, darkGreen, lightGreen, offWhite } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/dist/Feather';
import Icon4 from 'react-native-vector-icons/dist/Ionicons';
import { useEffect, useState } from 'react';
import { data } from '../utils/address';

const AddNewAddress = () => {

    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [addressType, setAddressType] = useState('Home');

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background, paddingBottom: 10 }}>
            <StatusBar
                animated={true}
                backgroundColor={'#f1f7fb'}
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ paddingHorizontal: 10, height: 50, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 8, elevation: 3 }} onPress={() => navigation.goBack()}>
                    <Icon name="keyboard-arrow-left" size={23} color={'#000'} />
                </TouchableOpacity>
                <Text style={{ color: '#000', fontWeight: "600", fontSize: responsiveFontSize(2.5), textAlign: 'center', textTransform: 'uppercase' }}>add a new address</Text>
                <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 8, elevation: 3 }} onPress={() => navigation.navigate('Profile')}>
                    <Icon2 name="account" size={23} color={'#000'} />
                </TouchableOpacity>
            </View>

            {/* Content */}
            <View style={{ padding: 10 }}>
                <TouchableOpacity style={{ backgroundColor: '#fff', paddingHorizontal: 13, paddingVertical: 12, flexDirection: 'column', elevation: 1, borderRadius: 12, gap: 8 }}>
                    <View>
                        <Text style={{ color: '#9297a0', fontWeight: '500', fontSize: responsiveFontSize(1.9) }}>Receiver details for this address</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                            <Icon3 name="phone-call" size={15} color={'#000'} />
                            <Text style={{ textTransform: 'uppercase', fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '500', marginLeft: 5 }}>Dixit Gogoi,</Text>
                            <Text style={{ textTransform: 'uppercase', fontSize: responsiveFontSize(1.9), color: '#000' }}>6000578700</Text>
                        </View>
                        <View>
                            <Icon name="keyboard-arrow-right" size={20} color={'#000'} />
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={{ backgroundColor: '#fff', marginTop: 10 }}>
                    {/* Receiver's Name */}
                    <View style={{ marginBottom: 16 }}>
                        <Text style={{ fontSize: 14, marginBottom: 8, color: '#555' }}>Receiver’s name</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8, padding: 10, backgroundColor: '#fff' }}>
                            <TextInput
                                value={name}
                                onChangeText={setName}
                                placeholder="Enter receiver's name"
                                style={{ flex: 1, fontSize: 16, color: '#000' }}
                            />
                            <TouchableOpacity onPress={() => setName('')}>
                                <Icon name="close" size={20} color="#999" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Receiver's Contact */}
                    <View style={{ marginBottom: 16 }}>
                        <Text style={{ fontSize: 14, marginBottom: 8, color: '#555' }}>Receiver’s contact</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8, padding: 10, backgroundColor: '#fff' }}>
                            <Text style={{ fontSize: 16, color: '#000', marginRight: 4 }}>+91</Text>
                            <TextInput
                                value={contact}
                                onChangeText={setContact}
                                keyboardType="numeric"
                                placeholder="Enter contact number"
                                style={{ flex: 1, fontSize: 16, color: '#000' }}
                            />
                            <TouchableOpacity onPress={() => setContact('')}>
                                <Icon name="close" size={20} color="#999" />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ fontSize: 12, color: '#999', marginTop: 4 }}>May be used to assist delivery</Text>
                    </View>
                </View>

                {/* Address Type */}
                <View style={{ marginBottom: 16 }}>
                    <Text style={{ fontSize: 14, marginBottom: 8, color: '#555' }}>Save address as *</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {['Home', 'Work', 'Hotel'].map((type) => (
                            <TouchableOpacity
                                key={type}
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    padding: 10,
                                    borderRadius: 8,
                                    borderWidth: 1,
                                    borderColor: addressType === type ? '#5EC467' : '#e0e0e0',
                                    backgroundColor: addressType === type ? '#FCECED' : '#fff',
                                    marginRight: type !== 'Hotel' ? 8 : 0
                                }}
                                onPress={() => setAddressType(type)}
                            >
                                <Icon
                                    name={type === 'Home' ? 'home' : type === 'Work' ? 'briefcase' : 'bed'}
                                    size={20}
                                    color={addressType === type ? '#CB202D' : '#555'}
                                />
                                <Text style={{ fontSize: 14, color: '#555', marginTop: 4 }}>{type}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity style={{ flex: 0.15, alignItems: 'center', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#e0e0e0', backgroundColor: '#fff' }}>
                            <Icon name="map-marker" size={20} color="#555" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Address Details */}
                <View style={{ marginBottom: 16 }}>
                    <Text style={{ fontSize: 16, color: '#555' }}>Christian Basti, Guwahati</Text>
                    <TouchableOpacity style={{ paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#F1F7FB', borderRadius: 4, alignSelf: 'flex-start', marginTop: 8 }}>
                        <Text style={{ fontSize: 14, color: '#CB202D' }}>Change</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 12, color: '#999', marginTop: 4 }}>Updated based on your exact map pin</Text>
                </View>

                {/* Flat/House Details */}
                <View style={{ marginBottom: 16 }}>
                    <TextInput
                        placeholder="Flat / House no / Floor / Building *"
                        style={{ borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#fff' }}
                    />
                </View>

                {/* Nearby Landmark */}
                <View style={{ marginBottom: 24 }}>
                    <TextInput
                        placeholder="Nearby landmark (optional)"
                        style={{ borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#fff' }}
                    />
                </View>

                {/* Confirm Address Button */}
                <TouchableOpacity style={{ backgroundColor: '#DADFE2', padding: 16, borderRadius: 8, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>Confirm address</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default AddNewAddress

const styles = StyleSheet.create({})
