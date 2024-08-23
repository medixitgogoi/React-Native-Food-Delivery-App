import { Alert, Animated, Dimensions, Image, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { backIconColor, darkGreen, offWhite } from '../utils/colors';
import { useState, useRef, useEffect } from 'react';

const { width: screenWidth } = Dimensions.get('window'); // Get the screen width

const OtpVerification = ({ route }) => {

    const to = route?.params?.to;
    const navigation = useNavigation();
    const [mobileNumber, setMobileNumber] = useState('443435353535');
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef([]);
    const [resendTimer, setResendTimer] = useState(30);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [showOtpSection, setShowOtpSection] = useState(false);

    const slideAnim = useRef(new Animated.Value(0)).current; // Initial value for the slide animation

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

    const handleOTPVerificationSuccess = () => {
        if (mobileNumber.length < 10) {
            Alert.alert('Invalid Number', 'Please enter a valid 10-digit mobile number.');
            return;
        } else {
            if (to === 'signup') {
                navigation.navigate('SignUp');
            } else if (to === 'forgotPassword') {
                navigation.navigate('ForgotPassword');
            }
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

    const handleSendOtpPress = () => {
        // Start the slide animation
        setShowOtpSection(true);
        Animated.timing(slideAnim, {
            toValue: -screenWidth, // Slide left by the screen width
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                animated={true}
                backgroundColor="#fff"
                barStyle="dark-content"
                translucent={true}
            />

            {/* Linear Gradient Background */}
            <LinearGradient
                colors={['#fff', '#c7e6c4']}
                style={{ flex: 1, paddingHorizontal: 13 }}
            >
                {/* Header */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginVertical: 20 }}>
                    <Icon4 name="arrowleft" size={23} color={'#000'} />
                </TouchableOpacity>

                {/* Your Task */}
                <Animated.View
                    style={{
                        flexDirection: 'row',
                        width: screenWidth * 2, // The total width (2 sections)
                        transform: [{ translateX: slideAnim }], // Apply the sliding animation
                    }}
                >
                    {/* Enter Mobile Number Section */}
                    <View style={{ width: screenWidth, paddingTop: 15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
                            <Image source={require('../assets/mobile.png')} style={{ width: 200, height: 200, resizeMode: 'contain' }} />
                        </View>

                        {/* Enter mobile number */}
                        <View>
                            <View style={{ flexDirection: 'column', gap: 1 }}>
                                <Text style={{ color: '#000', fontSize: responsiveFontSize(2.5), fontWeight: '700', textAlign: 'center' }}>Enter Your Mobile Number</Text>
                                <Text style={{ color: '#444444', fontSize: responsiveFontSize(1.9), fontWeight: '500', textAlign: 'center' }}>We'll send a confirmation code to verify it's really you</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 30 }}>
                                    <View style={{ height: 45, flex: 0.14, borderColor: '#4d4d4d', borderWidth: 1, borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#d9eed7' }}>
                                        <Text style={{ color: '#000', fontWeight: '700', fontSize: responsiveFontSize(2) }}>+91</Text>
                                    </View>
                                    <View style={{ flex: 0.82 }}>
                                        <TextInput
                                            style={{ height: 45, borderColor: '#4d4d4d', fontWeight: "500", borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, fontSize: responsiveFontSize(2), color: '#000', backgroundColor: '#fff' }}
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
                                style={{ borderRadius: 12, paddingHorizontal: 24, elevation: 2, marginTop: 35 }}
                            >
                                <TouchableOpacity onPress={handleSendOtpPress} style={{ gap: 5, width: '100%', height: 47, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.5), fontWeight: '600' }}>Send OTP</Text>
                                    <Icon4 name="arrowright" size={23} color='#fff' />
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    </View>

                    {/* OTP Section */}
                    <View style={{ width: screenWidth, paddingTop: 15 }}>
                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                            {/* Heading */}
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={{ color: '#000', fontWeight: '500', fontSize: responsiveFontSize(2) }}>We have sent a verification code to</Text>
                                <Text style={{ color: '#000', fontWeight: '800', fontSize: responsiveFontSize(2) }}>+91 {mobileNumber}</Text>
                            </View>

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
                                            marginHorizontal: 8,
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
                                style={{ borderRadius: 12, paddingHorizontal: 24, elevation: 2, marginTop: 35, width: '100%' }}
                            >
                                <TouchableOpacity onPress={handleOTPVerificationSuccess} style={{ gap: 5, width: '100%', height: 47, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.5), fontWeight: '600' }}>Verify</Text>
                                    <Icon4 name="arrowright" size={23} color='#fff' />
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>

                        {/* Resend OTP Button */}
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                            <Text style={{ color: '#000', fontWeight: '500', fontSize: responsiveFontSize(1.9) }}>
                                Didn't receive the OTP?{' '}
                            </Text>
                            <TouchableOpacity onPress={handleResendOTP} disabled={isResendDisabled}>
                                <Text style={{ color: isResendDisabled ? '#c7c7c7' : darkGreen, fontWeight: '500', fontSize: responsiveFontSize(1.9) }}>
                                    {isResendDisabled ? `Resend in ${resendTimer}s` : 'Resend OTP'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>

            </LinearGradient>
        </SafeAreaView>
    );
};

export default OtpVerification;