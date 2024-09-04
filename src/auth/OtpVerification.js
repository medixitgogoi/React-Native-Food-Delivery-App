import { Alert, Animated, Dimensions, Image, KeyboardAvoidingView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { backIconColor, darkGreen, offWhite } from '../utils/colors';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const { width: screenWidth } = Dimensions.get('window');

const OtpVerification = ({ route }) => {

    const to = route?.params?.to;

    const navigation = useNavigation();

    const inputRefs = useRef([]);

    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const [resendTimer, setResendTimer] = useState(30);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [showOtpSection, setShowOtpSection] = useState(false);
    const [loading, setLoading] = useState(false);

    const slideAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        let timer;
        if (resendTimer > 0) {
            timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
        } else {
            setIsResendDisabled(false);
        }

        // Cleanup the timer when the component unmounts
        return () => clearTimeout(timer);
    }, [resendTimer]);

    const handleOTPVerificationSuccess = async () => {
        if (!otp[0] || !otp[1] || !otp[2] || !otp[3]) {
            return;
        } else {
            setLoading(true);
            try {
                // Combine the OTP array into a single string
                const otpCode = otp.join('');

                const response = await axios.post(`user/otp/verify`, {
                    mobile: mobileNumber,
                    otp: otpCode // Send the OTP as a single string
                });

                console.log('response', response);

                if (response.data.status) {
                    if (to === 'signup') {
                        navigation.navigate('SignUp');
                    } else if (to === 'forgotPassword') {
                        navigation.navigate('ForgotPassword');
                    }
                }

                console.log('response', response?.data?.message);

            } catch (error) {
                Alert.alert(error.message);
            }
            setLoading(false);
        }
    };

    const handleInputChange = (text, index) => {
        if (text.length === 1) {
            const newOtp = [...otp];
            newOtp[index] = text;
            setOtp(newOtp);
            if (index < 3) {
                inputRefs.current[index + 1].focus();
            }
        } else if (text === '') {
            const newOtp = [...otp];
            newOtp[index] = text;
            setOtp(newOtp);
            if (index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handleResendOTP = () => {
        setResendTimer(30);
        setIsResendDisabled(true);
    };

    const handleSendOtpPress = async () => {
        if (mobileNumber.length < 10) {
            Alert.alert('Invalid Number', 'Please enter a valid 10-digit mobile number.');
            return;
        } else {
            setLoading(true);
            try {
                const response = await axios.post(`user/otp/send`,
                    {
                        mobile: mobileNumber
                    }
                );

                if (response.data.status) {
                    setShowOtpSection(true);
                    Animated.timing(slideAnim, {
                        toValue: -screenWidth,
                        duration: 300,
                        useNativeDriver: true,
                    }).start();
                }

                // console.log('response', response?.data?.message);

            } catch (error) {
                Alert.alert(error.message)
            }
            setLoading(false);
        }
    };

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
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginVertical: 20, paddingHorizontal: 13 }}>
                            <Icon4 name="arrowleft" size={23} color={'#000'} />
                        </TouchableOpacity>

                        {/* Content */}
                        <View style={{ flexDirection: 'column', paddingTop: 15 }}>
                            {/* Image */}
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
                                <Image source={require('../assets/otp.png')} style={{ width: 220, height: 220, resizeMode: 'contain' }} />
                            </View>

                            {/* Sections */}
                            <Animated.View
                                style={{
                                    flexDirection: 'row',
                                    width: screenWidth * 2, // The total width (2 sections)
                                    transform: [{ translateX: slideAnim }], // Apply the sliding animation
                                }}
                            >
                                {/* Enter mobile number */}
                                <View style={{ width: screenWidth, paddingHorizontal: 20, flexDirection: 'column', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'column', gap: 1 }}>
                                        <Text style={{ color: '#000', fontSize: responsiveFontSize(2.5), fontWeight: '700', textAlign: 'center' }}>Enter Your Mobile Number</Text>
                                        <Text style={{ color: '#444444', fontSize: responsiveFontSize(1.9), fontWeight: '500', textAlign: 'center' }}>We'll send a confirmation code to verify it's really you</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 30 }}>
                                            <View style={{ height: 45, flex: 0.14, borderColor: '#4d4d4d', borderWidth: 1, borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#d9eed7' }}>
                                                <Text style={{ color: '#000', fontWeight: '700', fontSize: responsiveFontSize(2) }}>+91</Text>
                                            </View>
                                            <View style={{ flex: 0.82 }}>
                                                <TextInput
                                                    style={{ height: 45, borderColor: '#4d4d4d', fontWeight: '500', borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, fontSize: responsiveFontSize(2), color: '#000', backgroundColor: '#fff' }}
                                                    placeholder="Enter Phone Number"
                                                    keyboardType="numeric"
                                                    maxLength={10}
                                                    value={mobileNumber}
                                                    onChangeText={setMobileNumber}
                                                    placeholderTextColor="#afb8c2"
                                                />
                                            </View>
                                        </View>
                                    </View>

                                    <LinearGradient
                                        colors={[darkGreen, '#3a9f43']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={{ borderRadius: 12, paddingHorizontal: 24, elevation: 2, marginTop: 35, width: '95%', }}
                                    >
                                        <TouchableOpacity onPress={handleSendOtpPress} style={{ gap: 5, height: 47, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            {loading ? (
                                                <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.5), fontWeight: '600' }}>Sending OTP ...</Text>
                                            ) : (
                                                <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.5), fontWeight: '600' }}>Send OTP</Text>
                                            )}
                                            {!loading && <Icon4 name="arrowright" size={23} color='#fff' />}
                                        </TouchableOpacity>
                                    </LinearGradient>
                                </View>

                                {/* OTP */}
                                <View style={{ flexDirection: 'column', alignItems: 'center', width: screenWidth }}>
                                    {/* Heading */}
                                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                        <Text style={{ color: '#000', fontWeight: '500', fontSize: responsiveFontSize(2) }}>We have sent a verification code to</Text>
                                        <Text style={{ color: '#000', fontWeight: '800', fontSize: responsiveFontSize(2) }}>+91 {`*******${mobileNumber.slice(-3)}`}</Text>
                                    </View>

                                    {/* Sub Heading */}
                                    <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 8 }}>
                                        <Text style={{ color: '#8a8f99', fontWeight: '500', fontSize: responsiveFontSize(1.9) }}>Enter Your OTP Code Below</Text>
                                    </View>

                                    {/* OTP Input Boxes */}
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 40 }}>
                                        {otp.map((_, index) => (
                                            <TextInput
                                                key={index}
                                                style={{
                                                    width: 45,
                                                    height: 45,
                                                    borderWidth: 1.8,
                                                    borderRadius: 10,
                                                    borderColor: backIconColor,
                                                    textAlign: 'center',
                                                    fontSize: 18,
                                                    marginHorizontal: 10,
                                                    color: '#000',
                                                    fontWeight: '600'
                                                }}
                                                value={otp[index]}
                                                onChangeText={(text) => handleInputChange(text, index)}
                                                keyboardType="numeric"
                                                maxLength={1}
                                                ref={(ref) => (inputRefs.current[index] = ref)}
                                            />
                                        ))}
                                    </View>

                                    {/* Verify button */}
                                    <LinearGradient
                                        colors={[darkGreen, '#3a9f43']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={{ borderRadius: 12, paddingHorizontal: 24, elevation: 2, marginTop: 40, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                                    >
                                        <TouchableOpacity onPress={handleOTPVerificationSuccess} style={{ gap: 5, height: 47, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '65%' }}>
                                            <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.5), fontWeight: '600', }}>Verify OTP</Text>
                                        </TouchableOpacity>
                                    </LinearGradient>

                                    {/* Resend */}
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', marginTop: 15, gap: 3 }}>
                                        <Text style={{ color: '#000', fontSize: responsiveFontSize(1.5), fontWeight: '500' }}>Didn't receive any code?</Text>
                                        <TouchableOpacity
                                            onPress={handleResendOTP}
                                            disabled={isResendDisabled}
                                        >
                                            <Text style={{
                                                color: isResendDisabled ? offWhite : backIconColor,
                                                fontSize: responsiveFontSize(1.7),
                                                fontWeight: isResendDisabled ? '400' : '600',
                                                textTransform: isResendDisabled ? '' : 'uppercase',
                                            }}>
                                                Resend {isResendDisabled ? `in ${resendTimer}s` : 'code'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Animated.View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default OtpVerification;