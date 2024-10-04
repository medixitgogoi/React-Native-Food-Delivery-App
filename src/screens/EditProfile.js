import { View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import { background, backIconColor, darkGreen, lightGreen } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

const EditProfile = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: darkGreen }}>
            <StatusBar
                animated={true}
                backgroundColor={darkGreen}
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
                    <Icon4 name="arrowleft" size={22} color={'#000'} />
                </TouchableOpacity>
                <View style={{ position: 'absolute', left: 0, right: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2.4), fontWeight: '500' }}>Edit Profile</Text>
                </View>
            </View>

            <ScrollView style={{ flex: 1 }}>
                <View style={{ marginHorizontal: 10, backgroundColor: '#fff', borderRadius: 20 }}>
                    {/* Name Input */}
                    <View style={{ position: 'relative', width: '100%', alignItems: 'center' }}>
                        <Text style={{ position: 'absolute', top: -10, left: 20, backgroundColor: '#fff', paddingHorizontal: 5, color: '#aaa', fontStyle: 'italic', zIndex: 1 }}>Name</Text>
                        <TextInput style={{ height: 50, borderColor: 'gray', borderWidth: 1, width: '95%', borderRadius: 10, paddingLeft: 10, backgroundColor: 'white' }} />
                    </View>

                    {/* Mobile Input */}
                    <View style={{ marginTop: 30, position: 'relative', width: '100%', alignItems: 'center' }}>
                        <Text style={{ position: 'absolute', top: -10, left: 20, backgroundColor: 'white', paddingHorizontal: 5, color: '#aaa', fontStyle: 'italic', zIndex: 1 }}>Mobile</Text>
                        <TextInput style={{ height: 50, borderColor: 'gray', borderWidth: 1, width: '95%', borderRadius: 10, paddingLeft: 10, backgroundColor: 'white' }} />
                    </View>

                    {/* Email Input */}
                    <View style={{ marginTop: 30, position: 'relative', width: '100%', alignItems: 'center' }}>
                        <Text style={{ position: 'absolute', top: -10, left: 20, backgroundColor: 'white', paddingHorizontal: 5, color: '#aaa', fontStyle: 'italic', zIndex: 1 }}>Email</Text>
                        <TextInput style={{ height: 50, borderColor: 'gray', borderWidth: 1, width: '95%', borderRadius: 10, paddingLeft: 10, backgroundColor: 'white' }} />
                    </View>

                    {/* Gender Input */}
                    <View style={{ marginTop: 30, position: 'relative', width: '100%', alignItems: 'center' }}>
                        <Text style={{ position: 'absolute', top: -10, left: 20, backgroundColor: 'white', paddingHorizontal: 5, color: '#aaa', fontStyle: 'italic', zIndex: 1 }}>Gender</Text>
                        <TextInput style={{ height: 50, borderColor: 'gray', borderWidth: 1, width: '95%', borderRadius: 10, paddingLeft: 10, backgroundColor: 'white' }} />
                    </View>
                </View>
            </ScrollView>


        </SafeAreaView>
    );
};

export default EditProfile;