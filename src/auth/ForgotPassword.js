import { Image, StatusBar, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/dist/Feather';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { backIconColor, darkGreen, offWhite } from '../utils/colors';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const ForgotPassword = ({ route }) => {

    const mobileNumber = route.params.mobile;
    const otp = route.params.otp;

    const navigation = useNavigation();

    const [password, setPassword] = useState('');
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

    const [show, setShow] = useState(true);
    const [confirmShow, setConfirmShow] = useState(true);

    const [loading, setLoading] = useState(false);

    const changePasswordHandler = async () => {
        if (!password || !confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'Incomplete Information',
                text2: 'All fields are required.',
                position: 'top',
                topOffset: 10,
            });
            return;
        } else {
            try {
                setLoading(true);
                // Data object as per the API requirement
                const data = {
                    mobile: mobileNumber,
                    otp: otp,
                    password: password,
                    confirm_password: confirmPassword
                };

                // API Call using axios
                const response = await axios.post(`/user/change/password/submit`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                console.log('change password', response);

                // Handle success response
                // if (response.data.status) {
                //     const userInfo = {
                //         name: response?.data?.data?.name,
                //         email: response?.data?.data?.email,
                //         mobileNumber: mobileNumber,
                //         password: password,
                //         accessToken: response?.data?.access_token,
                //     };

                //     dispatch(addUser(userInfo));
                //     await AsyncStorage.setItem('userDetails', JSON.stringify(userInfo));

                //     setName('');
                //     setPassword('');
                //     setConfirmPassword('');
                //     setEmail('');
                // } else {
                //     Alert.alert(response?.data?.message || 'Something went wrong.', 'Please try again.');
                // }
            } catch (error) {
                // Handle error response
                if (error.response) {
                    Alert.alert("Error", error.response.data.message || "Something went wrong. Please try again.");
                } else {
                    Alert.alert("Error", "Network error. Please check your internet connection and try again.");
                }
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                animated={true}
                backgroundColor="#fff"
                barStyle="dark-content"
            />

            {/* Linear Gradient Background */}
            <LinearGradient
                colors={['#fff', '#c7e6c4']}
                style={{ flex: 1 }}
            >
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={'padding'}
                >
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        {/* Header */}
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginVertical: 15, paddingHorizontal: 13 }}>
                            <Icon4 name="arrowleft" size={23} color={'#000'} />
                        </TouchableOpacity>

                        {/* Content */}
                        <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 40 }}>
                            {/* Image */}
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}>
                                <Image source={require('../assets/forgotPassword.png')} style={{ width: 300, height: 300, resizeMode: 'contain' }} />
                            </View>

                            {/* Password */}
                            <View style={{ marginTop: 10 }}>
                                <TextInput
                                    style={{
                                        height: 45,
                                        borderColor: isPasswordFocused ? backIconColor : '#ccc',
                                        fontWeight: "500",
                                        borderWidth: 1.4,
                                        borderRadius: 8,
                                        paddingHorizontal: 15,
                                        fontSize: responsiveFontSize(2),
                                        color: '#000'
                                    }}
                                    placeholder="Enter New Password"
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholderTextColor={offWhite}
                                    secureTextEntry={show}
                                    onFocus={() => setIsPasswordFocused(true)}
                                    onBlur={() => setIsPasswordFocused(false)}
                                />
                                <View style={{ position: 'absolute', right: 5, top: 12 }}>
                                    <Icon
                                        name={show ? 'eye-off' : 'eye'}
                                        onPress={() => setShow(!show)}
                                        style={{
                                            color: '#000',
                                            fontSize: responsiveFontSize(2.2),
                                            width: 28,
                                            height: 28,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    />
                                </View>
                            </View>

                            {/* Confirm Password */}
                            <View style={{ marginTop: 20 }}>
                                <TextInput
                                    style={{
                                        height: 45,
                                        borderColor: isConfirmPasswordFocused ? backIconColor : '#ccc',
                                        fontWeight: "500",
                                        borderWidth: 1.4,
                                        borderRadius: 8,
                                        paddingHorizontal: 15,
                                        fontSize: responsiveFontSize(2),
                                        color: '#000'
                                    }}
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    placeholderTextColor={offWhite}
                                    secureTextEntry={confirmShow}
                                    onFocus={() => setIsConfirmPasswordFocused(true)}
                                    onBlur={() => setIsConfirmPasswordFocused(false)}
                                />
                                <View style={{ position: 'absolute', right: 5, top: 12 }}>
                                    <Icon
                                        name={confirmShow ? 'eye-off' : 'eye'}
                                        onPress={() => setConfirmShow(!confirmShow)}
                                        style={{
                                            color: '#000',
                                            fontSize: responsiveFontSize(2.2),
                                            width: 28,
                                            height: 28,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    />
                                </View>
                            </View>

                            {/* Button */}
                            <LinearGradient
                                colors={[darkGreen, '#3a9f43']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{
                                    borderRadius: 12,
                                    paddingHorizontal: 24,
                                    elevation: 2,
                                    marginTop: 40,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <TouchableOpacity onPress={changePasswordHandler} style={{ gap: 5, height: 47, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '65%' }}>
                                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.5), fontWeight: '600' }}>Change Password</Text>
                                </TouchableOpacity>
                            </LinearGradient>

                            {/* Already have an account */}
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, alignItems: 'flex-end' }}>
                                <Text style={{ color: '#333', fontSize: responsiveFontSize(1.7), fontWeight: '500' }}>Already have an account? </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                    <Text style={{ color: backIconColor, fontSize: responsiveFontSize(1.8), fontWeight: '600' }}>Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default ForgotPassword;