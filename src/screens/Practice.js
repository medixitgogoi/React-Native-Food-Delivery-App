import { useNavigation } from '@react-navigation/native';
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import { background, darkGreen } from '../utils/colors';

const SignUp = () => {

    const navigation = useNavigation();

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
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginVertical: 20, paddingHorizontal: 13 }}>
                    <Icon4 name="arrowleft" size={23} color={'#000'} />
                </TouchableOpacity>

                <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: responsiveFontSize(3.5), fontWeight: 'bold', color: '#000', marginBottom: 10 }}>Let's Register Account</Text>
                    <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '400', color: '#333', marginBottom: 30 }}>Hello user, you have a greatful journey</Text>

                    {/* Input Fields */}
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: '#ccc',
                            padding: 12,
                            borderRadius: 8,
                            marginBottom: 15,
                            fontSize: responsiveFontSize(2),
                            color: '#000'
                        }}
                        placeholder="Name"
                        placeholderTextColor="#999"
                    />

                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: '#ccc',
                            padding: 12,
                            borderRadius: 8,
                            marginBottom: 15,
                            fontSize: responsiveFontSize(2),
                            color: '#000'
                        }}
                        placeholder="Business name"
                        placeholderTextColor="#999"
                    />

                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: '#ccc',
                            padding: 12,
                            borderRadius: 8,
                            marginBottom: 15,
                            fontSize: responsiveFontSize(2),
                            color: '#000'
                        }}
                        placeholder="Phone"
                        placeholderTextColor="#999"
                        keyboardType="phone-pad"
                    />

                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: '#ccc',
                            padding: 12,
                            borderRadius: 8,
                            marginBottom: 15,
                            fontSize: responsiveFontSize(2),
                            color: '#000'
                        }}
                        placeholder="Email"
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                    />

                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: '#ccc',
                            padding: 12,
                            borderRadius: 8,
                            marginBottom: 25,
                            fontSize: responsiveFontSize(2),
                            color: '#000'
                        }}
                        placeholder="Password"
                        placeholderTextColor="#999"
                        secureTextEntry={true}
                    />

                    {/* Sign Up Button */}
                    <TouchableOpacity style={{ backgroundColor: '#6c63ff', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginBottom: 20 }}>
                        <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.5), fontWeight: '600' }}>Sign Up</Text>
                    </TouchableOpacity>

                    {/* Already have an account */}
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ color: '#333', fontSize: responsiveFontSize(1.8) }}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={{ color: '#6c63ff', fontSize: responsiveFontSize(1.8), fontWeight: '600' }}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>

        </SafeAreaView>
    );
};

export default SignUp;
