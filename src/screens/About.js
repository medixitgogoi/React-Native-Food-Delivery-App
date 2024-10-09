import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';

const About = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar
                animated={true}
                backgroundColor={'#fff'}
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
                    <Icon4 name="arrowleft" size={22} color={'#000'} />
                </TouchableOpacity>
                <View style={{ position: 'absolute', left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', }}>
                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2.4), fontWeight: '500' }}>About</Text>
                </View>
            </View>

            {/* Content */}
            <ScrollView>
                <View style={{ flexDirection: 'column', paddingHorizontal: 12, marginTop: 10 }}>
                    <Text style={{ color: '#000' }}>
                        Welcome to Sker Cart, the first hyper-local app-based food and grocery delivery service in the region! The word "Sker" means commodities and is derived from the local/Ethnic dialect of Ribhoi in Meghalaya, reflecting our deep-rooted connection to the community. Our mission is to provide the best service that our customers deserve while supporting local vendors and businesses. We believe in helping these small enterprises reach a larger customer base through our innovative app. At our core, we believe in the principle of "For Local, By Local and Of Local." We are passionate about connecting our community through products and services that are crafted with care and authenticity. Our mission is to support local businesses, and individuals, fostering a sense of belonging and pride within our area. By choosing us, you’re not just making a purchase; you’re making an investment in the local economy and helping to sustain the vibrant culture that makes our community unique.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default About;