import { View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, Image, ActivityIndicator, KeyboardAvoidingView, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import Icon2 from 'react-native-vector-icons/dist/FontAwesome';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
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
    // console.log('userDetails', userDetails);

    const dispatch = useDispatch();

    const navigation = useNavigation();

    const [mobileNumber, setMobileNumber] = useState('');

    const [name, setName] = useState();
    const [isNameFocused, setIsNameFocused] = useState(false);

    const [email, setEmail] = useState();
    const [isEmailFocused, setIsEmailFocused] = useState(false);

    const [gender, setGender] = useState();
    const [isGenderFocused, setIsGenderFocused] = useState(false);

    const [accessToken, setAccessToken] = useState('');

    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(false);

    // useEffect for setting the user details
    useEffect(() => {
        setPassword(userDetails?.[0]?.password);
        setAccessToken(userDetails?.[0]?.accessToken)
        setMobileNumber(userDetails?.[0]?.mobileNumber);
        setName(userDetails[0]?.name);
        setEmail(userDetails?.[0]?.email);
        if (userDetails?.[0]?.gender) {
            setGender(userDetails?.[0]?.gender);
        }
    }, [updateHandler]);

    // updateHandler
    const updateHandler = async () => {
        // Check if any of the fields are empty
        if (!name || !email || !gender) {
            // setError(true);

            // Display error Toast
            Toast.show({
                type: 'error',
                text1: 'Please fill all the details',
                text2: 'All fields are required to proceed.',
                position: 'top',
                topOffset: 10,
            });

            return; // Exit the function if validation fails
        }

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

            console.log('editProfile', response);

            // Handle success response
            if (response?.data?.status) {
                Toast.show({
                    type: 'success',
                    text1: 'User Details updated successfully',
                    text2: `Profile updated for ${response?.data?.data?.name}.`,
                    position: 'top',
                    topOffset: 10,
                });

                navigation.navigate('Profile');

                setIsEmailFocused(false);
                setIsNameFocused(false);
                setIsGenderFocused(false);

                const userInfo = {
                    password: password,
                    accessToken: accessToken,
                    name: response?.data?.data?.name,
                    email: response?.data?.data?.email,
                    gender: response?.data?.data?.gender,
                    mobileNumber: mobileNumber,
                };

                dispatch(addUser(userInfo));
                await AsyncStorage.setItem('userDetails', JSON.stringify(userInfo));
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Update failed',
                    text2: response?.data?.message || 'Something went wrong.',
                    position: 'top',
                    topOffset: 10,
                });
            }
        } catch (error) {
            // Handle error response
            if (error.response) {
                Toast.show({
                    type: 'error',
                    text1: 'Something went wrong.',
                    text2: error.response.data?.message || 'Please try again.',
                    position: 'top',
                    topOffset: 10,
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Network error',
                    text2: 'Please check your internet connection and try again.',
                    position: 'top',
                    topOffset: 10,
                });
            }
        } finally {
            setLoading(false);
        }
    };

    // Reset error when input fields are modified
    useEffect(() => {
        if (name && email && gender) {
            setError(false); // Clear error when all fields are filled
        }
    }, [name, email, gender]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                animated={true}
                backgroundColor={'#fff'}
                barStyle="dark-content"
            />

            {/* Linear Gradient Background */}
            <LinearGradient
                colors={['#fff', '#c8e6c4']}
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

                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 100}
                >
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Avatar */}
                        <View style={{ width: 180, height: 180, alignSelf: 'center', borderRadius: 100, overflow: 'hidden', marginTop: 20, marginBottom: 15, backgroundColor: lightGreen, borderColor: darkGreen, borderWidth: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../assets/ava2.png')} style={{ height: '65%', width: '65%', resizeMode: 'contain' }} />
                        </View>

                        <View style={{ marginHorizontal: 0, backgroundColor: '#fff', borderRadius: 20, paddingVertical: 20, width: '95%', marginTop: 30, borderColor: darkGreen, borderWidth: 1.5, elevation: 1 }}>
                            {/* Mobile Input */}
                            <View style={{ width: '100%', flexDirection: 'column', paddingHorizontal: 15, gap: 3, }}>
                                <Text style={{ color: '#888888', zIndex: 1, fontWeight: '500', fontStyle: 'italic' }}>Mobile</Text>
                                <View style={{ flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', height: 40, backgroundColor: '#efefef', borderRadius: 10, elevation: 1, justifyContent: 'space-between' }}>
                                    <Text style={{ color: '#6f6f6f', fontWeight: '500', fontStyle: 'italic' }}>{mobileNumber}</Text>
                                    <Icon name="block" size={20} color={'red'} />
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
                                        placeholder='M or F'
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>

                {/* Update Profile */}
                <LinearGradient
                    colors={[darkGreen, '#3a9f43']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ borderRadius: 12, paddingVertical: 13, paddingHorizontal: 24, elevation: 5, marginTop: 30, width: '95%', alignSelf: 'center', position: 'absolute', bottom: 10 }}
                >
                    <TouchableOpacity onPress={updateHandler} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                        {loading ? (
                            <ActivityIndicator size="small" color={'#000'} />
                        ) : (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                <Text style={{ color: '#fff', fontWeight: '500', fontSize: responsiveFontSize(2.4) }}>Update Profile</Text>
                                <Icon2 name="pencil-square" size={22} color={'#fff'} />
                            </View>
                        )}
                    </TouchableOpacity>
                </LinearGradient>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default EditProfile;