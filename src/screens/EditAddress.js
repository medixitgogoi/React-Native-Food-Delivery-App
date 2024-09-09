import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, ActivityIndicator, TextInput } from 'react-native';
import { background, backIconColor, darkGreen, lightGreen, offWhite } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon2 from 'react-native-vector-icons/dist/AntDesign';
import Icon3 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/dist/FontAwesome5';
// import Icon5 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';

const EditAddress = ({ route }) => {

    const { data: address } = route?.params;
    console.log('address', address);

    const navigation = useNavigation();

    const userDetails = useSelector(state => state.user);

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [addressType, setAddresssType] = useState('Home');

    const [address1, setAddress1] = useState(null);
    const [address1Focused, setAddress1Focused] = useState(false);

    const [address2, setAddress2] = useState(null);
    const [address2Focused, setAddress2Focused] = useState(false);

    const [city, setCity] = useState(null);
    const [cityFocused, setCityFocused] = useState(false);

    const [pinCode, setPinCode] = useState(null);
    const [pinCodeFocused, setPinCodeFocused] = useState(false);

    const [state, setState] = useState(null);
    const [stateFocused, setStateFocused] = useState(false);

    const [landmark, setLandmark] = useState(null);
    const [landmarkFocused, setLandmarkFocused] = useState(false);

    const [checked, setChecked] = useState(false);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setName(address?.name);
        setContact(address?.mobile);
        setAddresssType(address?.address_type === '1' ? 'Home' : 'Work');
        setAddress1(address?.address);
        setAddress2(address?.address_2);
        setCity(address?.city);
        setPinCode(address?.pin);
        setState(address?.state);
        setLandmark(address?.landmark);
        setChecked(address?.is_default === '1' ? false : true);
    }, [])

    const updateAddressHandler = async () => {
        try {
            setLoading(true);
            // Data object as per the API requirement
            const data = {
                id: address?.id,
                name: name,
                mobile: contact,
                state: state,
                city: city,
                pin: pinCode,
                address: address1,
                address_2: address2 ? address2 : null,
                landmark: landmark ? landmark : 'lhahah',
                address_type: addressType === 'Home' ? '1' : '2',
                is_default: checked ? '2' : '1',
            };

            // API Call using axios
            const response = await axios.post(`user/shippingAddress/add`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('responseAddress', response);

            // Handle success response
            if (response.data.status) {

                navigation.navigate('Addresses');

                setName('');
                setContact('')
                setState(null);
                setCity(null);
                setPinCode('');
                setAddress1(null);
                setAddress2(null);
                setChecked(false);
                setLandmark(null)

            } else {
                Alert.alert(response?.data?.message || 'Something went wrong.', 'Please try again.');
            }

            setLoading(false);

            // int p = 2;
            // int *poi=& p;

            // parseInt(*poi);

        } catch (error) {
            // Handle error response
            if (error.response) {
                Alert.alert("Error", error.response.data.message || "Something went wrong. Please try again.");
            } else {
                Alert.alert("Error", "Network error. Please check your internet connection and try again.");
            }
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background, paddingBottom: 5 }}>
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
                <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.5), textAlign: 'center', textTransform: 'uppercase', position: 'absolute', left: 0, right: 0 }}>Edit Address</Text>
            </View>

            <ScrollView>
                <View style={{ paddingHorizontal: 12, paddingVertical: 10 }}>
                    {/* Name and contact */}
                    <View style={{ backgroundColor: lightGreen, paddingHorizontal: 13, paddingVertical: 12, flexDirection: 'column', elevation: 2, borderRadius: 12, gap: 6 }}>
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
                        <View style={{ marginBottom: 4 }}>
                            <Text style={{ color: '#9297a0', fontWeight: '500', fontSize: responsiveFontSize(1.9), marginBottom: 8 }}>Receiver’s contact</Text>
                            <View style={{ height: 40, width: '100%', flexDirection: 'row', alignItems: 'center', borderRadius: 8, borderColor: offWhite, borderWidth: 1.2, paddingHorizontal: 10, justifyContent: 'flex-start', backgroundColor: '#fff' }}>
                                <View style={{ height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: 1, backgroundColor: '#fff' }}>
                                    <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2), marginRight: 2, }}>+91</Text>
                                </View>
                                <TextInput
                                    style={{ fontWeight: "500", fontSize: responsiveFontSize(2), color: '#000', width: '80%', backgroundColor: '#fff' }}
                                    placeholder="Enter Contact No"
                                    keyboardType='numeric'
                                    maxLength={10}
                                    value={contact}
                                    onChangeText={setContact}
                                    placeholderTextColor={'#c8cacf'}
                                />
                            </View>
                        </View>
                    </View>

                    {/* Address Type */}
                    <View style={{ marginTop: 10, paddingHorizontal: 13, paddingVertical: 12, backgroundColor: '#fff', elevation: 1, borderRadius: 12, }}>
                        <Text style={{ color: '#9297a0', fontWeight: '500', fontSize: responsiveFontSize(1.9), marginBottom: 8 }}>Save address as</Text>
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
                                    onPress={() => setAddresssType(type)}
                                >
                                    <Icon4
                                        name={type === 'Home' ? 'home' : 'building'}
                                        size={13}
                                        color={addressType === type ? backIconColor : '#000'}
                                    />
                                    <Text style={{ fontSize: responsiveFontSize(1.7), color: '#000', fontWeight: '600' }}>{type}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Address Line 1 */}
                    <View style={{ marginTop: 10, paddingHorizontal: 13, paddingVertical: 12, backgroundColor: '#fff', elevation: 1, borderRadius: 12, }}>
                        <View style={{ marginBottom: 4 }}>
                            <Text style={{ color: '#9297a0', fontWeight: '500', fontSize: responsiveFontSize(1.9), marginBottom: 8 }}>Address Line 1 *</Text>
                            <TextInput
                                style={{ height: 38, fontWeight: "500", borderColor: address1Focused ? backIconColor : offWhite, borderWidth: address1Focused ? 1.4 : 1.2, borderRadius: 8, paddingHorizontal: 12, fontSize: responsiveFontSize(1.8), color: '#000', backgroundColor: '#fff' }}
                                placeholder="Flat / House no / Floor / Building"
                                value={address1}
                                onChangeText={setAddress1}
                                placeholderTextColor={'#c8cacf'}
                                onFocus={() => setAddress1Focused(true)}
                                onBlur={() => setAddress1Focused(false)}
                            />
                        </View>
                    </View>

                    {/* Address Line 2 */}
                    <View style={{ marginTop: 10, paddingHorizontal: 13, paddingVertical: 12, backgroundColor: '#fff', elevation: 1, borderRadius: 12, }}>
                        <View style={{ marginBottom: 4 }}>
                            <Text style={{ color: '#9297a0', fontWeight: '500', fontSize: responsiveFontSize(1.9), marginBottom: 8 }}>Address Line 2 (optional)</Text>
                            <TextInput
                                style={{ height: 38, borderColor: address2Focused ? backIconColor : offWhite, fontWeight: "500", borderWidth: address2Focused ? 1.4 : 1.2, borderRadius: 8, paddingHorizontal: 12, fontSize: responsiveFontSize(1.8), color: '#000', backgroundColor: '#fff' }}
                                placeholder="Flat / House no / Floor / Building"
                                value={address2}
                                onChangeText={setAddress2}
                                placeholderTextColor={'#c8cacf'}
                                onFocus={() => setAddress2Focused(true)}
                                onBlur={() => setAddress2Focused(false)}
                            />
                        </View>
                    </View>

                    {/* City and Pin code */}
                    <View style={{ flex: 1, marginTop: 10, paddingHorizontal: 13, paddingVertical: 12, backgroundColor: '#fff', elevation: 1, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        {/* City */}
                        <View style={{ flex: 0.52 }}>
                            <View style={{ marginBottom: 4, width: '100%' }}>
                                <Text style={{ color: '#9297a0', fontWeight: '500', fontSize: responsiveFontSize(1.9), marginBottom: 8 }}>City *</Text>
                                <TextInput
                                    style={{ height: 38, borderColor: cityFocused ? backIconColor : offWhite, fontWeight: "500", borderWidth: cityFocused ? 1.4 : 1.2, borderRadius: 8, paddingHorizontal: 12, fontSize: responsiveFontSize(1.8), color: '#000', backgroundColor: '#fff' }}
                                    placeholder="Enter City"
                                    value={city}
                                    onChangeText={setCity}
                                    placeholderTextColor={'#c8cacf'}
                                    onFocus={() => setCityFocused(true)}
                                    onBlur={() => setCityFocused(false)}
                                />
                            </View>
                        </View>

                        {/* Pin Code */}
                        <View style={{ flex: 0.43 }}>
                            <View style={{ marginBottom: 4, width: '100%' }}>
                                <Text style={{ color: '#9297a0', fontWeight: '500', fontSize: responsiveFontSize(1.9), marginBottom: 8 }}>Pin Code *</Text>
                                <TextInput
                                    style={{ height: 38, borderColor: pinCodeFocused ? backIconColor : offWhite, fontWeight: "500", borderWidth: pinCodeFocused ? 1.4 : 1.2, borderRadius: 8, paddingHorizontal: 12, fontSize: responsiveFontSize(1.8), color: '#000', backgroundColor: '#fff' }}
                                    placeholder="Enter Pin Code"
                                    value={pinCode}
                                    onChangeText={setPinCode}
                                    keyboardType='numeric'
                                    placeholderTextColor={'#c8cacf'}
                                    onFocus={() => setPinCodeFocused(true)}
                                    onBlur={() => setPinCodeFocused(false)}
                                />
                            </View>
                        </View>
                    </View>

                    {/* State and location */}
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <View style={{ width: '100%', marginTop: 10, paddingHorizontal: 13, paddingVertical: 12, backgroundColor: '#fff', elevation: 1, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ marginBottom: 4, width: '100%' }}>
                                <Text style={{ color: '#9297a0', fontWeight: '500', fontSize: responsiveFontSize(1.9), marginBottom: 8 }}>State *</Text>
                                <TextInput
                                    style={{ height: 38, borderColor: stateFocused ? backIconColor : offWhite, fontWeight: "500", borderWidth: stateFocused ? 1.4 : 1.2, borderRadius: 8, paddingHorizontal: 12, fontSize: responsiveFontSize(1.8), color: '#000', backgroundColor: '#fff' }}
                                    placeholder="Enter State"
                                    value={state}
                                    onChangeText={setState}
                                    placeholderTextColor={'#c8cacf'}
                                    onFocus={() => setStateFocused(true)}
                                    onBlur={() => setStateFocused(false)}
                                />
                            </View>
                        </View>
                    </View>

                    {/* Landmark */}
                    <View style={{ marginTop: 10, paddingHorizontal: 13, paddingVertical: 12, backgroundColor: '#fff', elevation: 1, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ marginBottom: 6, width: '100%' }}>
                            <Text style={{ color: '#9297a0', fontWeight: '500', fontSize: responsiveFontSize(1.9), marginBottom: 9 }}>Nearby Landmark (optional)</Text>
                            <TextInput
                                style={{ height: 38, borderColor: landmarkFocused ? backIconColor : offWhite, fontWeight: "500", borderWidth: landmarkFocused ? 1.4 : 1.2, borderRadius: 8, paddingHorizontal: 12, fontSize: responsiveFontSize(1.8), color: '#000', backgroundColor: '#fff' }}
                                placeholder="Enter Landmark"
                                value={landmark}
                                onChangeText={setLandmark}
                                placeholderTextColor={'#c8cacf'}
                                onFocus={() => setLandmarkFocused(true)}
                                onBlur={() => setLandmarkFocused(false)}
                            />
                        </View>
                    </View>

                    {/* Default */}
                    <View style={{ marginVertical: 10, flexDirection: 'row', gap: 5, justifyContent: 'flex-start', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => setChecked(prev => !prev)}>
                            {checked ? (
                                <View>
                                    <Icon3 name="checkbox-marked" size={22} color={backIconColor} />
                                </View>
                            ) : (
                                <View>
                                    <Icon3 name="checkbox-blank-outline" size={22} color={'#868c95'} />
                                </View>
                            )}
                        </TouchableOpacity>
                        <Text style={{ color: '#000', fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>Mark as default</Text>
                    </View>

                    {/* Save Address Button */}
                    <LinearGradient
                        colors={[darkGreen, '#3a9f43']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ marginTop: 5, borderRadius: 12, elevation: 2, marginHorizontal: 10, width: '100%', height: 48, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <TouchableOpacity onPress={updateAddressHandler} style={{ borderRadius: 8, alignItems: 'center', width: '100%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', gap: 3 }}>
                            {loading ? (
                                <Text style={{ fontSize: responsiveFontSize(2.2), color: '#fff', fontWeight: '600', textTransform: 'uppercase' }}>Updating data ...</Text>
                            ) : (
                                <Text style={{ fontSize: responsiveFontSize(2.2), color: '#fff', fontWeight: '600', textTransform: 'uppercase' }}>Update address</Text>
                            )}
                            {!loading && (
                                <Icon2 name="arrowright" size={23} color={'#fff'} />
                            )}
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default EditAddress;