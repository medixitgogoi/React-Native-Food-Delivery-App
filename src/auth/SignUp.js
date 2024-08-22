import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { offWhite } from '../utils/colors';

const SignUp = () => {

    const navigation = useNavigation();

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
                colors={['#fff', '#afb8c2']}
                style={{ flex: 1, paddingHorizontal: 13, }}
            >
                {/* Header */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginVertical: 20 }}>
                    <Icon4 name="arrowleft" size={23} color={'#000'} />
                </TouchableOpacity>

                {/* Content */}
                <View style={{ flexDirection: 'column', paddingTop: 20 }}>
                    <View style={{flexDirection: 'column', gap: 20}}>
                        <Text style={{ color: '#000', fontWeight: '800', fontSize: responsiveFontSize(3.5) }}>Let's Register Account</Text>
                        <Text style={{ color: '#737984', fontWeight: '600', fontSize: responsiveFontSize(2.1) }}>Hello user, create an account to get started with our services</Text>
                    </View>

                    <View>

                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default SignUp;

const styles = StyleSheet.create({});