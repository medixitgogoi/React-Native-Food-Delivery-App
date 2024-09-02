import { ActivityIndicator, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { background, backIconColor, darkGreen, lightGreen, offWhite } from '../utils/colors';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome';
import { logout } from '../redux/LoginSlice';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import { deleteAllItemsFromCart } from '../redux/CartSlice';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';

const Profile = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useFocusEffect(
        useCallback(() => {
            StatusBar.setBackgroundColor(background);
            StatusBar.setBarStyle('dark-content');
        }, [])
    );

    const logOutHandler = () => {
        dispatch(deleteAllItemsFromCart());
        dispatch(logout());
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                animated={true}
                backgroundColor={isLoggingOut ? '#adadad' : '#fff'}
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
                                <Icon name="person-outline" size={15} color={backIconColor} style={{}} />
                            </View>
                            <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>Your profile</Text>
                            <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                        </TouchableOpacity>

                        {/* Food Orders */}
                        <View style={{ width: '100%', gap: 8, marginTop: 10, backgroundColor: '#FFFFFF', paddingVertical: 12, borderRadius: 10 }}>
                            {/* Headline */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 9 }}>
                                <View style={{ backgroundColor: backIconColor, height: 24, width: 3, borderTopRightRadius: 20, borderBottomRightRadius: 20 }}></View>
                                <Text style={{ color: '#000', fontWeight: '700', fontSize: responsiveFontSize(2.1) }}>Food Orders</Text>
                            </View>

                            {/* Orders */}
                            <TouchableOpacity onPress={() => navigation.navigate('OrderHistory')} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 10, marginTop: 5, marginBottom: 2 }}>
                                <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightGreen, elevation: 1 }}>
                                    <Icon2 name="receipt-outline" size={15} color={backIconColor} />
                                </View>
                                <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>Your Orders</Text>
                                <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                            </TouchableOpacity>

                            {/* Divider */}
                            <View style={{ width: '86%', alignSelf: 'flex-end', backgroundColor: '#f0f1f2', height: 1 }}></View>

                            {/* Address Book */}
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 10, marginTop: 3, marginBottom: 2 }}>
                                <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightGreen, elevation: 1 }}>
                                    <Icon3 name="address-book-o" size={15} color={backIconColor} />
                                </View>
                                <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>Address Book</Text>
                                <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                            </TouchableOpacity>
                        </View>

                        {/* More */}
                        <View style={{ width: '100%', gap: 8, marginTop: 10, backgroundColor: '#FFFFFF', paddingVertical: 12, borderRadius: 10 }}>
                            {/* Headline */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 9 }}>
                                <View style={{ backgroundColor: backIconColor, height: 24, width: 3, borderTopRightRadius: 20, borderBottomRightRadius: 20 }}></View>
                                <Text style={{ color: '#000', fontWeight: '700', fontSize: responsiveFontSize(2.1) }}>More</Text>
                            </View>

                            {/* About */}
                            <TouchableOpacity onPress={() => navigation.navigate('About')} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 10, marginTop: 5, marginBottom: 2 }}>
                                <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightGreen, elevation: 1 }}>
                                    <Icon2 name="information-circle-outline" size={15} color={backIconColor} />
                                </View>
                                <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>About</Text>
                                <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                            </TouchableOpacity>

                            {/* Divider */}
                            <View style={{ width: '86%', alignSelf: 'flex-end', backgroundColor: '#f0f1f2', height: 1 }}></View>

                            {/* FAQ */}
                            <TouchableOpacity onPress={() => navigation.navigate('Faq')} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 10, marginTop: 3, marginBottom: 2 }}>
                                <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightGreen, elevation: 1 }}>
                                    <Icon name="help-outline" size={15} color={backIconColor} />
                                </View>
                                <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>Frequently Asked Questions</Text>
                                <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                            </TouchableOpacity>

                            {/* Divider */}
                            <View style={{ width: '86%', alignSelf: 'flex-end', backgroundColor: '#f0f1f2', height: 1 }}></View>

                            {/* Log out */}
                            <TouchableOpacity onPress={() => setIsLoggingOut(true)} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 10, marginTop: 3, marginBottom: 2 }}>
                                <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightGreen, elevation: 1 }}>
                                    <Icon2 name="power" size={15} color={backIconColor} />
                                </View>
                                <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>Log out</Text>
                                <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>

            {/* Log out confirm */}
            {isLoggingOut && (
                <View style={{ position: 'absolute', alignItems: 'center', height: '100%', flexDirection: 'row', justifyContent: 'center', width: '100%', backgroundColor: '#00000050' }}>
                    <View style={{ backgroundColor: '#fff', overflow: 'hidden', paddingTop: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 10, width: '80%' }}>
                        <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.2), marginBottom: 30 }}>Are you sure you want to log out?</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                            {/* Cancel */}
                            <TouchableOpacity onPress={() => setIsLoggingOut(false)} style={{ width: '50%', backgroundColor: lightGreen, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 13, paddingHorizontal: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 5 }}>
                                <Text style={{ color: backIconColor, fontWeight: '600' }}>Cancel</Text>
                            </TouchableOpacity>

                            {/* Confirm */}
                            <TouchableOpacity onPress={logOutHandler} style={{ width: '50%', backgroundColor: backIconColor, paddingVertical: 13, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 5 }}>
                                <Text style={{ color: '#fff', fontWeight: '600' }}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}

        </SafeAreaView>
    )
}

export default Profile;

const styles = StyleSheet.create({});