import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { background, backIconColor, darkGreen } from '../utils/colors';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/LoginSlice';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import { deleteAllItemsFromCart } from '../redux/CartSlice';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

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
        <SafeAreaView style={{ flex: 1, backgroundColor: background, paddingBottom: 10 }}>
            <StatusBar
                animated={true}
                backgroundColor={background}
                barStyle="dark-content"
            />

            {/* Header */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingVertical: 10, paddingHorizontal: 13, alignSelf: 'flex-start' }}>
                <Icon4 name="arrowleft" size={23} color={'#000'} />
            </TouchableOpacity>

            <TouchableOpacity style={{ backgroundColor: backIconColor, alignSelf: 'center', height: 40, marginTop: 10, padding: 5, borderRadius: 10, width: '90%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={logOutHandler}>
                <Text style={{ color: '#fff', fontWeight: '600' }}>Log Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Profile;

const styles = StyleSheet.create({});