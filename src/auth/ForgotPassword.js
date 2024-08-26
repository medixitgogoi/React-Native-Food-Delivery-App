import { Alert, Animated, Dimensions, Image, StatusBar, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/dist/Feather';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { backIconColor, darkGreen, offWhite } from '../utils/colors';
import { useState } from 'react';

const ForgotPassword = () => {

    const navigation = useNavigation();

    const [password, setPassword] = useState('');
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

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
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={50}
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
                                <TouchableOpacity style={{ gap: 5, height: 47, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '65%' }}>
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