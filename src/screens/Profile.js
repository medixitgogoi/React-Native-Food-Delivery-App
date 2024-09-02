import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { background, backIconColor, darkGreen, lightGreen, offWhite } from '../utils/colors';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { logout } from '../redux/LoginSlice';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import { deleteAllItemsFromCart } from '../redux/CartSlice';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';

const Profile = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    useFocusEffect(
        useCallback(() => {
            StatusBar.setBackgroundColor(background);
            StatusBar.setBarStyle('dark-content');
        }, [])
    );

    const logOutHandler = () => {
        dispatch(deleteAllItemsFromCart());
        dispatch(logout());
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
            <StatusBar
                animated={true}
                backgroundColor={'#fff'}
                barStyle="dark-content"
            />

            {/* Linear Gradient Background */}
            <LinearGradient
                colors={['#fff', '#c7e6c4']}
                style={{ flex: 1 }}
            >
                {/* Header */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingVertical: 10, paddingHorizontal: 13, alignSelf: 'flex-start' }}>
                    <Icon4 name="arrowleft" size={23} color={'#000'} />
                </TouchableOpacity>

                <ScrollView style={{ flex: 1 }}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', paddingVertical: 5, paddingHorizontal: 12 }}>
                        {/* Details */}
                        <View style={{ backgroundColor: darkGreen, width: '100%', borderRadius: 20, elevation: 1, padding: 20, flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                            {/* Image */}
                            <View style={{ flexDirection: 'column', alignItems: 'center', }}>
                                <View style={{ height: 100, width: 100, backgroundColor: lightGreen, borderRadius: 100, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    {/* <Text style={{ color: '#235c9e', fontSize: responsiveFontSize(7), textTransform: 'uppercase' }}>{loginDetails[0]?.name.slice(0, 1)}</Text> */}
                                    <Text style={{ color: backIconColor, fontSize: responsiveFontSize(7), textTransform: 'uppercase', }}>E</Text>
                                </View>
                            </View>

                            {/* Name and Email */}
                            <View style={{ flexDirection: 'column', gap: 3, width: '65%' }}>
                                <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '600', color: '#000', textTransform: 'uppercase' }}>Example Example</Text>
                                {/* <Text style={{ fontSize: responsiveFontSize(1.8), color: '#656565' }}>{loginDetails[0]?.email}</Text> */}
                                <Text style={{ fontSize: responsiveFontSize(1.8), color: '#000', fontWeight: '400' }}>example@gmail.com</Text>
                            </View>
                        </View>

                        {/* Profile */}
                        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 16, backgroundColor: '#FFFFFF', paddingVertical: 9, paddingHorizontal: 10, borderRadius: 10 }}>
                            <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightGreen, elevation: 1 }}>
                                <Icon name="person-outline" size={15} color="#000" style={{}} />
                            </View>
                            <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>Your profile</Text>
                            <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                        </TouchableOpacity>

                        {/* Order */}
                        <TouchableOpacity onPress={() => navigation.navigate('OrderHistory')} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10, backgroundColor: '#FFFFFF', paddingVertical: 9, paddingHorizontal: 10, borderRadius: 10 }}>
                            <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightGreen, elevation: 1 }}>
                                <Icon name="person-outline" size={15} color="#000" style={{}} />
                            </View>
                            <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>Your Orders</Text>
                            <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                        </TouchableOpacity>

                        <View style={{ width: '100%', gap: 8, marginTop: 16, backgroundColor: '#FFFFFF', paddingVertical: 12, borderRadius: 10 }}>
                            {/* Headline */}
                            <View style={{ borderLeftColor: backIconColor, borderLeftWidth: 3, paddingHorizontal: 10, }}>
                                <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.1) }}>More</Text>
                            </View>

                            {/* About */}
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 10, marginTop: 8, marginBottom: 2 }}>
                                <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightGreen, elevation: 1 }}>
                                    <Icon name="person-outline" size={15} color="#000" style={{}} />
                                </View>
                                <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>About</Text>
                                <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                            </TouchableOpacity>

                            {/* Divider */}
                            <View style={{ width: '86%', alignSelf: 'flex-end', backgroundColor: '#f0f1f2', height: 1 }}></View>

                            {/* Log out */}
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 10, marginTop: 3, marginBottom: 2 }}>
                                <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightGreen, elevation: 1 }}>
                                    <Icon name="person-outline" size={15} color="#000" style={{}} />
                                </View>
                                <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>Log out</Text>
                                <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

                {/* Logout Button */}
                {/* <TouchableOpacity style={{ backgroundColor: backIconColor, alignSelf: 'center', height: 40, marginTop: 10, marginBottom: 10, padding: 5, borderRadius: 10, width: '95%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={logOutHandler}>
                    <Text style={{ color: '#fff', fontWeight: '600' }}>Log Out</Text>
                </TouchableOpacity> */}
            </LinearGradient>
        </SafeAreaView>
    )
}

export default Profile;

const styles = StyleSheet.create({});