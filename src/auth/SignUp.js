import { Alert, Animated, Dimensions, Image, StatusBar, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/dist/Feather';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { backIconColor, darkGreen, lightGreen, offWhite } from '../utils/colors';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { addUser } from '../redux/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = ({ route }) => {

    const mobileNumber = route.params.mobile;
    const otp = route.params.otp;

    const navigation = useNavigation();

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.user);

    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('');
    const [isNameFocused, setIsNameFocused] = useState(false);

    const [password, setPassword] = useState('');
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

    const [email, setEmail] = useState('');
    const [isEmailFocused, setIsEmailFocused] = useState(false);

    const [show, setShow] = useState(true);
    const [confirmShow, setConfirmShow] = useState(true);

    const registerUser = async () => {
        // Ensure all fields are filled
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert("Error", "All fields are required.");
            return;
        }

        // Ensure passwords match
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match.");
            return;
        }

        // Ensure terms and conditions are accepted
        if (!checked) {
            Alert.alert("Error", "Please accept the Terms & Conditions.");
            return;
        }

        try {
            setLoading(true);
            // Data object as per the API requirement
            const data = {
                mobile: mobileNumber,
                otp: otp,
                name: name,
                email: email,
                password: password,
                confirm_password: confirmPassword
            };

            // API Call using axios
            const response = await axios.post(`user/registration/detail/update`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Handle success response
            if (response.data.status) {
                const userInfo = {
                    name: response?.data?.data?.name,
                    email: response?.data?.data?.email,
                    mobileNumber: mobileNumber,
                    password: password,
                    accessToken: response?.data?.access_token,
                };

                dispatch(addUser(userInfo));
                await AsyncStorage.setItem('userDetails', JSON.stringify(userInfo));

                setName('');
                setPassword('');
                setConfirmPassword('');
                setEmail('');
            } else {
                Alert.alert(response?.data?.message || 'Something went wrong.', 'Please try again.');
            }

            setLoading(false);

        } catch (error) {
            // Handle error response
            if (error.response) {
                Alert.alert("Error", error.response.data.message || "Something went wrong. Please try again.");
            } else {
                Alert.alert("Error", "Network error. Please check your internet connection and try again.");
            }
        }
    };

    console.log('userDetails', userDetails);

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
                        <View style={{ flex: 1, flexDirection: 'column', paddingHorizontal: 20, gap: 30, paddingVertical: 50 }}>
                            {/* Heading */}
                            <View style={{ marginBottom: 40 }}>
                                <Text style={{ fontSize: responsiveFontSize(3.5), fontWeight: '700', color: '#000', marginBottom: 8 }}>Let's Register Account</Text>
                                <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '400', color: '#333', fontWeight: '500' }}>Start your journey to fresher, healthier living today!</Text>
                            </View>

                            {/* Text Inputs */}
                            <View>
                                {/* Name */}
                                <TextInput
                                    style={{ height: 45, borderColor: isNameFocused ? backIconColor : '#ccc', fontWeight: "500", borderWidth: 1.4, borderRadius: 8, paddingHorizontal: 15, fontSize: responsiveFontSize(2), color: '#000' }}
                                    placeholder="Enter Your Name"
                                    value={name}
                                    onChangeText={setName}
                                    placeholderTextColor={offWhite}
                                    onFocus={() => setIsNameFocused(true)}
                                    onBlur={() => setIsNameFocused(false)}
                                />

                                {/* Email */}
                                <TextInput
                                    style={{ marginTop: 25, height: 45, borderColor: isEmailFocused ? backIconColor : '#ccc', fontWeight: "500", borderWidth: 1.4, borderRadius: 8, paddingHorizontal: 15, fontSize: responsiveFontSize(2), color: '#000' }}
                                    placeholder="Enter Your Email"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType='email-address'
                                    placeholderTextColor={offWhite}
                                    onFocus={() => setIsEmailFocused(true)}
                                    onBlur={() => setIsEmailFocused(false)}
                                />

                                {/* Password */}
                                <View style={{ marginTop: 25 }}>
                                    <TextInput
                                        style={{ height: 45, borderColor: isPasswordFocused ? backIconColor : '#ccc', fontWeight: "500", borderWidth: 1.4, borderRadius: 8, paddingHorizontal: 15, fontSize: responsiveFontSize(2), color: '#000' }}
                                        placeholder="Enter Password"
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
                                <View style={{ marginTop: 25 }}>
                                    <TextInput
                                        style={{ height: 45, borderColor: isConfirmPasswordFocused ? backIconColor : '#ccc', fontWeight: "500", borderWidth: 1.4, borderRadius: 8, paddingHorizontal: 15, fontSize: responsiveFontSize(2), color: '#000' }}
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
                            </View>

                            {/* Buttons */}
                            <View style={{ marginTop: 20, }}>
                                {/* Sign up button */}
                                <LinearGradient
                                    colors={[darkGreen, '#3a9f43']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={{ borderRadius: 12, paddingHorizontal: 24, elevation: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                                >
                                    <TouchableOpacity onPress={registerUser} disabled={loading} style={{ gap: 5, height: 47, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                        {loading ? (
                                            <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.5), fontWeight: '600', }}>Signing you up ...</Text>
                                        ) : (
                                            <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.5), fontWeight: '600', }}>Sign up</Text>
                                        )}
                                        {!loading && <Icon4 name="arrowright" size={23} color='#fff' />}
                                    </TouchableOpacity>
                                </LinearGradient>

                                {/* Already have an account */}
                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
                                    <Text style={{ color: '#333', fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>Already have an account? </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                        <Text style={{ color: backIconColor, fontSize: responsiveFontSize(1.8), fontWeight: '600' }}>Login</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        {/* Terms of service and Privacy Policy */}
                        <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
                            <TouchableOpacity onPress={() => setChecked(prev => !prev)}>
                                {checked ? (
                                    <View>
                                        <Icon2 name="checkbox-marked" size={16} color={backIconColor} />
                                    </View>
                                ) : (
                                    <View>
                                        <Icon2 name="checkbox-blank-outline" size={16} color={'#868c95'} />
                                    </View>
                                )}
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'column', alignItems: 'center', }}>
                                <Text style={{ color: '#000', fontSize: responsiveFontSize(1.5), paddingTop: 1.5 }}>By continuing, you agree to our company's</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 3 }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('TermsAndConditions')}>
                                        <Text style={{ color: backIconColor, fontSize: responsiveFontSize(1.7), fontWeight: '600' }}>Terms & Conditions</Text>
                                    </TouchableOpacity>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(1.5) }}>and</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
                                        <Text style={{ color: backIconColor, fontSize: responsiveFontSize(1.7), fontWeight: '600' }}>Privacy Policy</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default SignUp;