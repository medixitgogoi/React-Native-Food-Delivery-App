import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { backIconColor, darkGreen, lightGreen } from '../utils/colors';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import Icon5 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import { logoutUser } from '../redux/UserSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { fetchProducts } from '../utils/fetchProducts';

const Profile = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.user);
    // console.log('userDetails', userDetails);

    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const [writeUp, setWriteUp] = useState(null);

    // Status Bar Modifications
    useFocusEffect(
        useCallback(() => {
            StatusBar.setBackgroundColor(isLoggingOut ? '#adadad' : '#fff');
            StatusBar.setBarStyle('dark-content');
        }, [])
    );

    // Logout Handler
    const logOutHandler = async () => {
        try {
            dispatch(logoutUser());
            await AsyncStorage.removeItem('userDetails');
        } catch {
            Toast.show({
                type: 'error',
                text1: 'Failed to log out',
                text2: `Please try again`,
                position: 'top', // Adjusts to the bottom by default
                topOffset: 35, // Moves the toast 10 units down from the bottom
            });
            setIsLoggingOut(false);
        }
    };

    // fetch products
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchProducts(userDetails);
                console.log('write_up', response);

                if (response?.status) {
                    setWriteUp(response?.app_writeup);
                }
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: "Error fetching data",
                    text2: error.message,
                    position: 'top', // Adjusts to the bottom by default
                    topOffset: 20, // Moves the toast 10 units down from the bottom
                });
            }
        };

        fetchData(); // Call the async function inside useEffect
    }, [userDetails]);

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
                        <View style={{ backgroundColor: darkGreen, width: '100%', borderRadius: 20, elevation: 1, paddingVertical: 25, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                            {/* Initial */}
                            <View style={{ flexDirection: 'column', alignItems: 'center', }}>
                                <View style={{ height: 100, width: 100, backgroundColor: lightGreen, borderRadius: 100, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: backIconColor, fontSize: responsiveFontSize(7), textTransform: 'uppercase' }}>{userDetails[0]?.name.slice(0, 1)}</Text>
                                </View>
                            </View>

                            {/* Name and Email */}
                            <View style={{ flexDirection: 'column', gap: 3, width: '65%' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                    <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '600', color: '#000', textTransform: 'uppercase' }}>{userDetails[0]?.name}</Text>
                                    {userDetails?.[0]?.gender === 'M' && (
                                        <View style={{ width: 20, height: 20, backgroundColor: lightGreen, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                                            <Icon2 name="male" size={15} color={backIconColor} />
                                        </View>
                                    )}

                                    {userDetails?.[0]?.gender === 'F' && (
                                        <View style={{ width: 20, height: 20, backgroundColor: lightGreen, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                                            <Icon2 name="female" size={15} color={backIconColor} />
                                        </View>
                                    )}
                                </View>
                                <Text style={{ fontSize: responsiveFontSize(1.8), color: '#000', fontWeight: '400' }}>{userDetails[0]?.email}</Text>
                            </View>
                        </View>

                        {/* Profile */}
                        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 16, backgroundColor: '#FFFFFF', paddingVertical: 9, paddingHorizontal: 10, borderRadius: 12, elevation: 1 }}>
                            <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightGreen, elevation: 1 }}>
                                <Icon name="person-outline" size={15} color={backIconColor} style={{}} />
                            </View>
                            <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>Your profile</Text>
                            <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                        </TouchableOpacity>

                        {/* Food Orders */}
                        <View style={{ elevation: 1, width: '100%', gap: 8, marginTop: 10, backgroundColor: '#FFFFFF', paddingVertical: 12, borderRadius: 12 }}>
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
                            <TouchableOpacity onPress={() => navigation.navigate('Addresses')} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 10, marginTop: 3, marginBottom: 2 }}>
                                <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightGreen, elevation: 1 }}>
                                    <Icon3 name="address-book-o" size={15} color={backIconColor} />
                                </View>
                                <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>Address Book</Text>
                                <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                            </TouchableOpacity>
                        </View>

                        {/* More */}
                        <View style={{ elevation: 1, width: '100%', gap: 8, marginTop: 10, backgroundColor: '#FFFFFF', paddingVertical: 12, borderRadius: 12 }}>
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

                            {/* Disclaimer */}
                            <TouchableOpacity onPress={() => navigation.navigate('Disclaimer', { data: writeUp?.disclaimer })} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 10, marginTop: 3, marginBottom: 2 }}>
                                <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightGreen, elevation: 1 }}>
                                    <Icon2 name="alert-circle-outline" size={15} color={backIconColor} />
                                </View>
                                <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>Disclaimer</Text>
                                <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                            </TouchableOpacity>

                            {/* Divider */}
                            <View style={{ width: '86%', alignSelf: 'flex-end', backgroundColor: '#f0f1f2', height: 1 }}></View>

                            {/* Privacy Policy */}
                            <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy', { data: writeUp?.privacy_policy })} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 10, marginTop: 3, marginBottom: 2 }}>
                                <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightGreen, elevation: 1 }}>
                                    <Icon2 name="shield-outline" size={15} color={backIconColor} />
                                </View>
                                <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>Privacy Policy</Text>
                                <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                            </TouchableOpacity>

                            {/* Divider */}
                            <View style={{ width: '86%', alignSelf: 'flex-end', backgroundColor: '#f0f1f2', height: 1 }}></View>

                            {/* T&C */}
                            <TouchableOpacity onPress={() => navigation.navigate('TermsAndConditions', { data: writeUp?.terms_condition })} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 10, marginTop: 3, marginBottom: 2 }}>
                                <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightGreen, elevation: 1 }}>
                                    <Icon4 name="filetext1" size={15} color={backIconColor} />
                                </View>
                                <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>Terms and Conditions</Text>
                                <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                            </TouchableOpacity>

                            {/* Divider */}
                            <View style={{ width: '86%', alignSelf: 'flex-end', backgroundColor: '#f0f1f2', height: 1 }}></View>

                            {/* Cancellation */}
                            <TouchableOpacity onPress={() => navigation.navigate('Cancellation', { data: writeUp?.cancellation })} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 10, marginTop: 3, marginBottom: 2 }}>
                                <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightGreen, elevation: 1 }}>
                                    <Icon5 name="cancel" size={15} color={backIconColor} />
                                </View>
                                <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>Cancellation</Text>
                                <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                            </TouchableOpacity>

                            {/* Divider */}
                            <View style={{ width: '86%', alignSelf: 'flex-end', backgroundColor: '#f0f1f2', height: 1 }}></View>

                            {/* Refund and Return Policy */}
                            <TouchableOpacity onPress={() => navigation.navigate('RefundAndReturn', { data: writeUp?.return_refund })} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 10, marginTop: 3, marginBottom: 2 }}>
                                <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightGreen, elevation: 1 }}>
                                    <Icon5 name="cash-refund" size={15} color={backIconColor} />
                                </View>
                                <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>Refund and Return Policy</Text>
                                <Icon name="keyboard-arrow-right" size={20} color={'#818181'} />
                            </TouchableOpacity>

                            {/* Divider */}
                            <View style={{ width: '86%', alignSelf: 'flex-end', backgroundColor: '#f0f1f2', height: 1 }}></View>

                            {/* Contact */}
                            <TouchableOpacity onPress={() => navigation.navigate('Contact', { data: writeUp?.contact_no })} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 10, marginTop: 3, marginBottom: 2 }}>
                                <View style={{ padding: 5, borderRadius: 50, backgroundColor: lightGreen, elevation: 1 }}>
                                    <Icon5 name="phone-outline" size={15} color={backIconColor} />
                                </View>
                                <Text style={{ fontSize: responsiveFontSize(2), flex: 1, color: '#000', fontWeight: '500' }}>Contact</Text>
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
                            <TouchableOpacity onPress={() => setIsLoggingOut(false)} style={{ width: '50%', backgroundColor: lightGreen, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 13, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 5 }}>
                                <Text style={{ color: backIconColor, fontWeight: '600' }}>No, Thank You</Text>
                            </TouchableOpacity>

                            {/* Confirm */}
                            <TouchableOpacity onPress={logOutHandler} style={{ width: '50%', backgroundColor: backIconColor, paddingVertical: 13, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 5 }}>
                                <Text style={{ color: '#fff', fontWeight: '600' }}>Yes, See you again!</Text>
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