import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { darkGreen, lightGreen, offWhite } from '../utils/colors';
import { useState } from 'react';

const SignUp = () => {

    const navigation = useNavigation();

    const [mobileNumber, setMobileNumber] = useState('');

    const otpHandler = () => {

    }

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
                style={{ flex: 1, paddingHorizontal: 13, }}
            >
                {/* Header */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginVertical: 20 }}>
                    <Icon4 name="arrowleft" size={23} color={'#000'} />
                </TouchableOpacity>

                {/* Content */}
                <View style={{ flexDirection: 'column', paddingTop: 15, }}>
                    {/* <View style={{ flexDirection: 'column', gap: 20 }}>
                        <Text style={{ color: '#000', fontWeight: '800', fontSize: responsiveFontSize(3.5) }}>Let's Register Account</Text>
                        <Text style={{ color: '#737984', fon
                        tWeight: '600', fontSize: responsiveFontSize(2.1) }}>Hello user, create an account to get started with our services</Text>
                    </View> */}

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
                        <Image source={require('../assets/mobile.png')} style={{ width: 200, height: 200, resizeMode: 'contain' }} />
                    </View>

                    <View style={{ flexDirection: 'column', gap: 5 }}>
                        <Text style={{ color: '#000', fontSize: responsiveFontSize(2.3), fontWeight: '700', textAlign: 'center' }}>Enter Your Mobile Number</Text>
                        <Text style={{ color: '#444444', fontSize: responsiveFontSize(2), fontWeight: '400', textAlign: 'center' }}>We'll send a confirmation code to verify it's really you</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                            <View style={{ height: 40, flex: 0.165, borderColor: '#4d4d4d', borderWidth: 1, borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#d9eed7' }}>
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
                    </View>

                    <LinearGradient
                        colors={[darkGreen, '#3a9f43']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ borderRadius: 12, paddingHorizontal: 24, elevation: 2, marginTop: 30 }}
                    >
                        <TouchableOpacity onPress={() => otpHandler()} style={{ gap: 5, width: '100%', height: 47, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.5), fontWeight: '600' }}>Send OTP</Text>
                            <Icon4 name="arrowright" size={23} color='#fff' />
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default SignUp;

const styles = StyleSheet.create({});