import { Alert, Animated, Dimensions, Image, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/dist/Feather';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { backIconColor, darkGreen, lightGreen, offWhite } from '../utils/colors';
import { useState, useRef, useEffect } from 'react';

const SignUp = () => {

    const navigation = useNavigation();

    const [checked, setChecked] = useState(false);

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
                    <View>
                        {/* Sign up button */}
                        <LinearGradient
                            colors={[darkGreen, '#3a9f43']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ borderRadius: 12, paddingHorizontal: 24, elevation: 2, marginTop: 40, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <TouchableOpacity style={{ gap: 5, height: 47, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '65%' }}>
                                <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.5), fontWeight: '600', }}>Sign up</Text>
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
            </LinearGradient>
        </SafeAreaView>
    )
}

export default SignUp;