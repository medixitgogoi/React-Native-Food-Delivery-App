import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { background, backIconColor, darkGreen } from '../utils/colors';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/LoginSlice';
import { createEntityAdapter } from '@reduxjs/toolkit';

const Profile = () => {

    const dispatch = useDispatch();

    const cartProducts = useSelector(state => state.cart);
    console.log('cartProducts', cartProducts);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background, paddingBottom: 10 }}>
            <StatusBar
                animated={true}
                backgroundColor={background}
                barStyle="dark-content"
            />
            <TouchableOpacity style={{ backgroundColor: backIconColor, alignSelf: 'center', height: 40, marginTop: 10, padding: 5, borderRadius: 10, width: '90%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => dispatch(logout())}>
                <Text style={{ color: '#fff', fontWeight: '600' }}>Log Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Profile;

const styles = StyleSheet.create({});