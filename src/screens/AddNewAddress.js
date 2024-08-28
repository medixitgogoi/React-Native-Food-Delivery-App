import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, TextInput, PermissionsAndroid, Platform, Alert } from 'react-native';
import { background, backIconColor, darkGreen, lightGreen, offWhite } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome5';
import Icon4 from 'react-native-vector-icons/dist/Feather';
import Icon5 from 'react-native-vector-icons/dist/AntDesign';
import { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from 'react-native-geolocation-service';

const AddNewAddress = () => {

    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [addressType, setAddressType] = useState('Home');

    const [location, setLocation] = useState(null);

    useEffect(() => {
        requestLocationPermission();
    }, []);

    const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Permission',
                        message: 'This app needs access to your location.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    getLocation();
                } else {
                    Alert.alert('Location permission denied');
                }
            } catch (err) {
                console.warn(err);
            }
        } else {
            getLocation();
        }
    };

    const getLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                setLocation(position);
            },
            (error) => {
                Alert.alert(`Error: ${error.message}`);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    console.log(location);

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
                {/* Unexpanded */}
                <TouchableOpacity style={{ backgroundColor: '#fff', paddingHorizontal: 13, paddingVertical: 12, flexDirection: 'column', elevation: 1, borderRadius: 12, gap: 6 }}>
                    <View>
                        <Text style={{ color: '#9297a0', fontWeight: '500', fontSize: responsiveFontSize(1.9) }}>Receiver details for this address</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                            <Icon4 name="phone-call" size={15} color={'#000'} />
                            <Text style={{ textTransform: 'uppercase', fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '500', marginLeft: 5 }}>Dixit Gogoi,</Text>
                            <Text style={{ textTransform: 'uppercase', fontSize: responsiveFontSize(1.9), color: '#000' }}>6000578700</Text>
                        </View>
                        <View>
                            <Icon name="keyboard-arrow-right" size={20} color={'#000'} />
                        </View>
                    </View>
                </TouchableOpacity>

                {/* Expanded */}
                <View style={{ marginTop: 10, backgroundColor: '#fff', paddingHorizontal: 13, paddingVertical: 12, flexDirection: 'column', elevation: 1, borderRadius: 12, gap: 6 }}>
                    {/* Receiver's Name */}
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ color: '#9297a0', fontWeight: '500', fontSize: responsiveFontSize(1.9), marginBottom: 8 }}>Receiver’s name</Text>
                        <TextInput
                            style={{ height: 40, borderColor: offWhite, fontWeight: "500", borderWidth: 1.2, borderRadius: 8, paddingHorizontal: 15, fontSize: responsiveFontSize(2), color: '#000', backgroundColor: '#fff' }}
                            placeholder="Enter Name"
                            value={name}
                            onChangeText={setName}
                            placeholderTextColor={'#c8cacf'}
                        />
                    </View>

                    {/* Receiver's Contact */}
                    <View style={{}}>
                        <Text style={{ color: '#9297a0', fontWeight: '500', fontSize: responsiveFontSize(1.9), marginBottom: 8 }}>Receiver’s contact</Text>
                        <View style={{ height: 40, width: '100%', flexDirection: 'row', alignItems: 'center', borderRadius: 8, borderColor: offWhite, borderWidth: 1.2, paddingHorizontal: 10, justifyContent: 'flex-start' }}>
                            <View style={{ height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: 1 }}>
                                <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2), marginRight: 2, }}>+91</Text>
                            </View>
                            <TextInput
                                style={{ fontWeight: "500", fontSize: responsiveFontSize(2), color: '#000', width: '80%' }}
                                placeholder="Enter Contact No"
                                keyboardType='numeric'
                                maxLength={10}
                                value={contact}
                                onChangeText={setContact}
                                placeholderTextColor={'#c8cacf'}
                            />
                        </View>
                        <Text style={{ fontSize: responsiveFontSize(1.5), color: offWhite, marginTop: 2, textAlign: 'right' }}>*May be used to assist delivery</Text>
                    </View>
                </View>

                {/* Address Type */}
                <View style={{ marginTop: 10, paddingHorizontal: 13, paddingVertical: 12, backgroundColor: '#fff', elevation: 1, borderRadius: 12, }}>
                    <Text style={{ color: '#9297a0', fontWeight: '500', fontSize: responsiveFontSize(1.9), marginBottom: 8 }}>Save address as *</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        {['Home', 'Work'].map((type) => (
                            <TouchableOpacity
                                key={type}
                                style={{
                                    width: 80,
                                    height: 30,
                                    borderRadius: 8,
                                    borderWidth: 1,
                                    borderColor: addressType === type ? backIconColor : '#e0e0e0',
                                    backgroundColor: addressType === type ? lightGreen : '#fff',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 4
                                }}
                                onPress={() => setAddressType(type)}
                            >
                                <Icon3
                                    name={type === 'Home' ? 'home' : 'building'}
                                    size={13}
                                    color={addressType === type ? backIconColor : '#000'}
                                />
                                <Text style={{ fontSize: responsiveFontSize(1.7), color: '#000', fontWeight: '600' }}>{type}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Address Details */}
                <View style={{ flexDirection: 'column', marginTop: 10, paddingHorizontal: 13, paddingVertical: 12, backgroundColor: '#fff', elevation: 1, borderRadius: 12, }}>
                    {location ? (
                        <Text style={{ color: '#000' }}>
                            Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
                        </Text>
                    ) : (
                        <Text style={{ color: '#000' }}>Location not available</Text>
                    )}
                    <TouchableOpacity style={{ backgroundColor: darkGreen, padding: 10 }} onPress={getLocation}>
                        <Text style={{ color: '#fff' }}>Change</Text>
                    </TouchableOpacity>
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
            </View>

            {/* Confirm Address Button */}
            <LinearGradient
                colors={[darkGreen, '#3a9f43']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ borderRadius: 12, elevation: 2, position: 'absolute', bottom: 8, marginHorizontal: 10, width: '95%', height: 45, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <TouchableOpacity style={{ borderRadius: 8, alignItems: 'center', width: '100%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', gap: 3 }}>
                    <Text style={{ fontSize: responsiveFontSize(2.1), color: '#fff', fontWeight: '600', textTransform: 'uppercase' }}>Confirm address</Text>
                    <Icon5 name="arrowright" size={23} color={'#fff'} />
                </TouchableOpacity>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default AddNewAddress;

const styles = StyleSheet.create({});