import { View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, Image, Alert, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import { background, backIconColor, darkGreen, lightGreen, offWhite } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addUser } from '../redux/UserSlice';
import Toast from 'react-native-toast-message';

const EditProfile = () => {

    const userDetails = useSelector(state => state.user);
    console.log('userDetails', userDetails);

    const dispatch = useDispatch();

    const navigation = useNavigation();

    const [mobile, setMobile] = useState('');

    const [name, setName] = useState('');
    const [isNameFocused, setIsNameFocused] = useState(false);

    const [email, setEmail] = useState('');
    const [isEmailFocused, setIsEmailFocused] = useState(false);

    const [gender, setGender] = useState('');
    const [isGenderFocused, setIsGenderFocused] = useState(false);

    const [accessToken, setAccessToken] = useState('');

    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setPassword(userDetails?.[0]?.password);
        setAccessToken(userDetails?.[0]?.accessToken)
        setMobile(userDetails?.[0]?.mobile);
        setName(userDetails[0]?.name);
        setEmail(userDetails?.[0]?.email);
        if (userDetails?.[0]?.gender) {
            setGender(userDetails?.[0]?.gender);
        }
    }, [updateHandler]);

    const updateHandler = async () => {
        try {
            setLoading(true);

            // Data object as per the API requirement
            const data = {
                name: name,
                email: email,
                gender: gender,
            };

            // API Call using axios
            const response = await axios.post(`/user/profile/update`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('editProfiel', response);

            // Handle success response
            if (response?.data?.status) {
                Toast.show({
                    type: 'success',
                    text1: 'User Details updated successfully',
                    text2: `You can only add up to ${stock} units of ${name}.`,
                    position: 'top', // Adjusts to the bottom by default
                    topOffset: 10, // Moves the toast 10 units down from the bottom
                });

                setIsEmailFocused(false);
                setIsNameFocused(false);
                setIsGenderFocused(false);

                const userInfo = {
                    password: password,
                    accessToken: accessToken,
                    name: response?.data?.data?.name,
                    email: response?.data?.data?.email,
                    gender: response?.data?.data?.gender,
                    mobile: mobile,
                };

                dispatch(addUser(userInfo));
                await AsyncStorage.setItem('userDetails', JSON.stringify(userInfo));

            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Something went wrong.',
                    text2: response?.data?.message,
                    position: 'top', // Adjusts to the bottom by default
                    topOffset: 10, // Moves the toast 10 units down from the bottom
                });
                // Alert.alert(response?.data?.message || 'Something went wrong.', 'Please try again.');
            }
        } catch (error) {
            // Handle error response
            if (error.response) {
                Toast.show({
                    type: 'error',
                    text1: 'Something went wrong. Please try again.',
                    text2: error.response.data.message,
                    position: 'top', // Adjusts to the bottom by default
                    topOffset: 10, // Moves the toast 10 units down from the bottom
                });
                // Alert.alert("Error", error.response.data.message || "Something went wrong. Please try again.");
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Network error.',
                    text2: `Please check your internet connection and try again.`,
                    position: 'top', // Adjusts to the bottom by default
                    topOffset: 10, // Moves the toast 10 units down from the bottom
                });
                // Alert.alert("Error", "Network error. Please check your internet connection and try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                animated={true}
                backgroundColor={'#f9f9f9'}
                barStyle="dark-content"
            />

            {/* Linear Gradient Background */}
            <LinearGradient
                colors={['#f9f9f9', '#a6d7a1']}
                style={{ flex: 1 }}
            >
                {/* Header */}
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
                        <Icon4 name="arrowleft" size={22} color={'#000'} />
                    </TouchableOpacity>
                    <View style={{ position: 'absolute', left: 0, right: 0, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ color: '#000', fontSize: responsiveFontSize(2.4), fontWeight: '500' }}>Edit Profile</Text>
                    </View>
                </View>

                <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', }}>
                    {/* Avatar */}
                    <View style={{ width: 180, height: 180, alignSelf: 'center', borderRadius: 100, overflow: 'hidden', marginTop: 20, marginBottom: 15 }}>
                        <Image source={require('../assets/avatar.jpeg')} style={{ height: '100%', width: '100%', resizeMode: 'contain' }} />
                    </View>

                    <View style={{ marginHorizontal: 0, backgroundColor: '#fff', borderRadius: 20, paddingVertical: 20, width: '95%', marginTop: 30, borderColor: darkGreen, borderWidth: 1.5, elevation: 1 }}>
                        {/* Mobile Input */}
                        <View style={{ width: '100%', flexDirection: 'column', paddingHorizontal: 15, gap: 3, }}>
                            <Text style={{ color: '#888888', zIndex: 1, fontWeight: '500', fontStyle: 'italic' }}>Mobile</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', height: 40, backgroundColor: '#efefef', borderRadius: 10, elevation: 1, }}>
                                <Text style={{ color: '#6f6f6f', paddingLeft: 10, fontWeight: '500', fontStyle: 'italic' }}>{mobile}</Text>
                            </View>
                        </View>

                        {/* Name Input */}
                        <View style={{ width: '100%', flexDirection: 'column', paddingHorizontal: 15, gap: 3, marginTop: 20 }}>
                            <Text style={{ color: isNameFocused ? backIconColor : '#000', zIndex: 1, fontWeight: '500' }}>Enter Your Name</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <TextInput
                                    style={{ height: 40, color: '#000', fontWeight: '500', borderColor: isNameFocused ? backIconColor : '#ccc', borderWidth: 1, width: '100%', borderRadius: 10, paddingLeft: 10, backgroundColor: 'white' }}
                                    value={name}
                                    onChangeText={setName}
                                    onFocus={() => setIsNameFocused(true)}
                                    onBlur={() => setIsNameFocused(false)}
                                />
                            </View>
                        </View>

                        {/* Email Input */}
                        <View style={{ width: '100%', flexDirection: 'column', paddingHorizontal: 15, gap: 3, marginTop: 20 }}>
                            <Text style={{ color: isEmailFocused ? backIconColor : '#000', zIndex: 1, fontWeight: '500' }}>Enter Your Email</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <TextInput
                                    style={{ height: 40, color: '#000', fontWeight: '500', borderColor: isEmailFocused ? backIconColor : '#ccc', borderWidth: 1, width: '100%', borderRadius: 10, paddingLeft: 10, backgroundColor: 'white' }}
                                    value={email}
                                    onChangeText={setEmail}
                                    onFocus={() => setIsEmailFocused(true)}
                                    onBlur={() => setIsEmailFocused(false)}
                                />
                            </View>
                        </View>

                        {/* Gender Input */}
                        <View style={{ width: '100%', flexDirection: 'column', paddingHorizontal: 15, gap: 3, marginTop: 20 }}>
                            <Text style={{ color: isGenderFocused ? backIconColor : '#000', zIndex: 1, fontWeight: '500' }}>Gender</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <TextInput
                                    style={{ height: 40, color: '#000', fontWeight: '500', borderColor: isGenderFocused ? backIconColor : '#ccc', borderWidth: 1, width: '100%', borderRadius: 10, paddingLeft: 10, backgroundColor: 'white' }}
                                    value={gender}
                                    onChangeText={setGender}
                                    onFocus={() => setIsGenderFocused(true)}
                                    onBlur={() => setIsGenderFocused(false)}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>

                {/* Update Profile */}
                <TouchableOpacity onPress={updateHandler} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 10, width: '95%', alignSelf: 'center', height: 48, backgroundColor: darkGreen, borderColor: backIconColor, borderWidth: 1.5, borderRadius: 12 }}>
                    <Text style={{ color: '#000', fontWeight: '500', fontSize: responsiveFontSize(2.3) }}>Update Profile</Text>
                </TouchableOpacity>
            </LinearGradient>

        </SafeAreaView>
    );
};

export default EditProfile;