import { useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, StatusBar, Animated, TouchableOpacity, Dimensions, TextInput, Alert, ActivityIndicator } from 'react-native';
import { darkGreen, lightGreen, backIconColor } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';
import Icon from 'react-native-vector-icons/dist/Feather';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { login } from '../redux/LoginSlice';

const { width: screenWidth } = Dimensions.get('window');

const Login = () => {

    const navigation = useNavigation();

    const [showOtpLogin, setShowOtpLogin] = useState(false);
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(true);

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

    const dispatch = useDispatch();

    const handleLoginSubmit = () => {
        setLoading(true)
        dispatch(login());
        setLoading(false);
        // setTimeout(() => {
        // }, 1000);
        // if (mobileNumber.length < 10) {
        //     Alert.alert('Invalid Number', 'Please enter a valid 10-digit mobile number.');
        //     return;
        // } else {
        //     dispatch(login());
        // }
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

                {/* Image */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: lightGreen, flex: 0.58 }}>
                    <Image source={require("../assets/login3.png")} style={{ width: '100%', height: '100%' }} resizeMode='contain' />
                </View>

                {/* Content */}
                <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 50, borderTopRightRadius: 50, flex: 0.42 }}>
                    <Animated.View style={{ flexDirection: 'row', transform: [{ translateX }], width: screenWidth * 2, height: '100%' }}>
                        {/* Get Started */}
                        <View style={{ width: screenWidth, height: '100%', padding: 30 }}>
                            {!showOtpLogin && (
                                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', gap: 20, height: '100%', paddingTop: 20 }}>

                                    <View style={{ flexDirection: 'column', gap: 20 }}>
                                        <View>
                                            <Text style={{ color: '#000', fontSize: responsiveFontSize(3.5), fontWeight: 900, textAlign: 'center' }}>Everything You Need: Groceries, Cakes and More</Text>
                                        </View>

                                        <View>
                                            <Text style={{ color: '#444444', fontSize: responsiveFontSize(2), fontWeight: 500, textAlign: 'center' }}>Order delicious cakes, fresh groceries, and meals from your favorite restaurants — all in one convenient app!</Text>
                                        </View>
                                    </View>

                                    <LinearGradient
                                        colors={[darkGreen, '#3a9f43']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={{ borderRadius: 12, paddingVertical: 15, paddingHorizontal: 24, width: '100%', elevation: 2 }}
                                    >
                                        <TouchableOpacity onPress={handleGetStarted}>
                                            <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.6), fontWeight: '500', textAlign: 'center' }}>
                                                Get started
                                            </Text>
                                        </TouchableOpacity>
                                    </LinearGradient>

                                </View>
                            )}
                        </View>

                        {/* Login Form */}
                        <View style={{ width: screenWidth, padding: 25, justifyContent: 'space-between', flex: 1, flexDirection: 'column', }}>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2.5), fontWeight: 800, textAlign: 'center' }}>Hi There, Welcome Back 👋</Text>

                            <View style={{ flexDirection: 'column', gap: 3 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 3, marginBottom: 8 }}>
                                    <Text style={{ color: '#e4e7ea' }}>_________________________ </Text>
                                    <Text style={{ color: '#000', textAlign: 'center', color: '#555555', textTransform: 'uppercase', fontWeight: 600, marginTop: 10, fontSize: responsiveFontSize(1.8) }}> Log in </Text>
                                    <Text style={{ color: '#e4e7ea' }}>_________________________ </Text>
                                </View>

                                {/* Phone Number */}
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ height: 40, flex: 0.165, borderColor: '#4d4d4d', borderWidth: 1, borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: lightGreen }}>
                                        <Text style={{ color: '#000', fontWeight: '700', fontSize: responsiveFontSize(2) }}>+91</Text>
                                    </View>
                                    <View style={{ flex: 0.8 }}>
                                        <TextInput
                                            style={{ height: 40, borderColor: '#4d4d4d', fontWeight: "500", borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, fontSize: responsiveFontSize(2), color: '#000', backgroundColor: '#fff' }}
                                            placeholder="Enter Phone Number"
                                            keyboardType="numeric"
                                            maxLength={10}
                                            value={mobileNumber}
                                            onChangeText={setMobileNumber}
                                            placeholderTextColor="#afb8c2"
                                        />
                                    </View>
                                </View>

                                {/* Password */}
                                <View style={{ marginTop: 10 }}>
                                    <TextInput
                                        style={{ height: 40, borderColor: '#4d4d4d', fontWeight: "500", borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, fontSize: responsiveFontSize(2), color: '#000', backgroundColor: '#fff' }}
                                        placeholder="Enter Password"
                                        value={password}
                                        onChangeText={setPassword}
                                        placeholderTextColor="#afb8c2"
                                        secureTextEntry={show}
                                    />
                                    <View style={{ position: 'absolute', right: 5, top: 12 }}>
                                        <Icon
                                            name={show ? 'eye-off' : 'eye'}
                                            onPress={() => setShow(!show)}
                                            style={{
                                                color: backIconColor,
                                                fontSize: responsiveFontSize(2.2),
                                                width: 28,
                                                height: 28,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        />
                                    </View>
                                </View>

                                {/* Don't have account */}
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 5 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                        <Text style={{ color: '#000', fontSize: responsiveFontSize(1.6) }}>Don't have an account?</Text>
                                        <TouchableOpacity style={{ paddingHorizontal: 3 }} onPress={() => navigation.navigate('OtpVerification', { to: 'signup' })}>
                                            <Text style={{ color: backIconColor, fontSize: responsiveFontSize(1.6), fontWeight: '600' }}>Register now</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity style={{ paddingLeft: 5 }} onPress={() => navigation.navigate('OtpVerification', { to: 'forgotPassword' })}>
                                        <Text style={{ color: '#000', fontSize: responsiveFontSize(1.5), fontWeight: '600', textDecorationLine: 'underline' }}>Forgot password?</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <LinearGradient
                                colors={[darkGreen, '#3a9f43']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ borderRadius: 12, paddingVertical: 13, paddingHorizontal: 24, elevation: 2, marginTop: 30 }}
                            >
                                <TouchableOpacity
                                    onPress={handleLoginSubmit}
                                    disabled={loading}
                                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}
                                >
                                    {loading ? (
                                        <View>
                                            <ActivityIndicator size='small' color={'#fff'} />
                                        </View>
                                    ) : (
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                            <Text style={{ textAlign: 'center', color: '#fff', fontSize: responsiveFontSize(2.5), fontWeight: '600', textTransform: 'uppercase' }}>Login</Text>
                                            <Icon2 name="login" size={23} color={'#fff'} />
                                        </View>
                                    )}
                                    {/* <Text style={{ textAlign: 'center', color: '#fff', fontSize: responsiveFontSize(2.5), fontWeight: '600' }}>Continue</Text> */}
                                </TouchableOpacity>
                            </LinearGradient>
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