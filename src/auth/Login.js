import { useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, StatusBar, Animated, TouchableOpacity, Dimensions, TextInput, Alert } from 'react-native';
import { darkGreen, lightGreen } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');

const Login = () => {

    const [showOtpLogin, setShowOtpLogin] = useState(false);
    const translateX = useRef(new Animated.Value(0)).current;

    const handleGetStarted = () => {
        Animated.timing(translateX, {
            toValue: -screenWidth, // Move off the screen to the left
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setShowOtpLogin(true);
        });
    };

    const [mobileNumber, setMobileNumber] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLoginSubmit = () => {
        if (mobileNumber.length < 10) {
            Alert.alert('Invalid Number', 'Please enter a valid 10-digit mobile number.');
            return;
        }
        setLoading(true);
        // Add mobile number submission logic here
        // After submission, setLoading(false);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: lightGreen }}>
            <StatusBar
                animated={true}
                backgroundColor={lightGreen}
                barStyle="dark-content"
                translucent={true}
            />
            <View style={{ flexDirection: 'column', height: '100%' }}>

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: lightGreen, flex: 0.6 }}>
                    <Image source={require("../assets/login3.png")} style={{ width: '100%', height: '100%' }} resizeMode='contain' />
                </View>

                {/* changes to be made */}
                <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 50, borderTopRightRadius: 50, flex: 0.4, }}>
                    <Animated.View style={{ flexDirection: 'row', transform: [{ translateX }], width: screenWidth * 2, height: '100%' }}>

                        {/* Get Started */}
                        <View style={{ width: screenWidth, height: '100%', padding: 30 }}>
                            {!showOtpLogin && (
                                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', gap: 20, height: '100%', paddingTop: 20 }}>

                                    <View style={{ flexDirection: 'column', gap: 15 }}>
                                        <View>
                                            <Text style={{ color: '#000', fontSize: responsiveFontSize(3.5), fontWeight: 900, textAlign: 'center' }}>Everything You Need: Groceries, Cakes, and More</Text>
                                        </View>

                                        <View>
                                            <Text style={{ color: '#afb8c2', fontSize: responsiveFontSize(2), fontWeight: 500, textAlign: 'center' }}>Order delicious cakes, fresh groceries, and meals from your favorite restaurants — all in one convenient app!</Text>
                                        </View>
                                    </View>

                                    <LinearGradient
                                        colors={[darkGreen, '#3a9f43']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={{ borderRadius: 50, paddingVertical: 18, paddingHorizontal: 24 }}
                                    >
                                        <TouchableOpacity onPress={handleGetStarted} style={{ borderRadius: 50 }}>
                                            <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.5), fontWeight: '500' }}>
                                                Get started
                                            </Text>
                                        </TouchableOpacity>
                                    </LinearGradient>

                                </View>
                            )}
                        </View>

                        {/* Login Form */}
                        <View style={{ width: screenWidth, padding: 20, justifyContent: 'center', flex: 1 }}>
                            <Text style={{
                                fontSize: responsiveFontSize(3),
                                fontWeight: 'bold',
                                textAlign: 'center',
                                marginBottom: 10,
                                color: '#000'
                            }}>
                                Enter Mobile Number
                            </Text>
                            <Text style={{
                                fontSize: responsiveFontSize(2),
                                textAlign: 'center',
                                marginBottom: 20,
                                color: '#afb8c2',
                                fontWeight: 500,
                            }}>
                                We’ll send you an OTP to verify your number.
                            </Text>

                            <TextInput
                                style={{
                                    height: 50,
                                    borderColor: '#ddd',
                                    borderWidth: 1,
                                    borderRadius: 8,
                                    paddingHorizontal: 15,
                                    fontSize: responsiveFontSize(2),
                                    marginBottom: 20,
                                    color: '#000'
                                }}
                                placeholder="1234567890"
                                keyboardType="numeric"
                                maxLength={10}
                                value={mobileNumber}
                                onChangeText={setMobileNumber}
                                placeholderTextColor="#afb8c2"
                            />

                            <TouchableOpacity
                                onPress={handleLoginSubmit}
                                style={{
                                    backgroundColor: '#70c068',
                                    borderRadius: 50,
                                    paddingVertical: 15,
                                    alignItems: 'center',
                                    marginBottom: 10
                                }}
                                disabled={loading}
                            >
                                <Text style={{
                                    color: '#fff',
                                    fontSize: responsiveFontSize(2.5),
                                    fontWeight: '500'
                                }}>
                                    {loading ? 'Sending OTP...' : 'Send OTP'}
                                </Text>
                            </TouchableOpacity>

                            {/* <TouchableOpacity
                               
                                style={{ alignItems: 'center', marginVertical: 5 }}
                            >
                                <Text style={{
                                    color: '#70c068',
                                    fontSize: responsiveFontSize(2),
                                    textDecorationLine: 'underline'
                                }}>
                                    Back to Login
                                </Text>
                            </TouchableOpacity> */}
                        </View>

                    </Animated.View>
                </View>

            </View>
        </SafeAreaView>
    );
}

export default Login;

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000'
    },
});

// Order cakes, groceries, and restaurant meals all in one place!
