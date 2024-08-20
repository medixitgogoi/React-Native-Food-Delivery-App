import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { background, darkGreen } from '../utils/colors';
import { useSelector } from 'react-redux';

const Profile = () => {

    const cartProducts = useSelector(state => state.cart);
    console.log('cartProducts', cartProducts);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background, paddingBottom: 10 }}>
            <StatusBar
                animated={true}
                backgroundColor={background}
                barStyle="dark-content"
            />
            <Text style={{ color: '#000' }}>Profile screen</Text>
            {/* <TouchableOpacity style={{ backgroundColor: darkGreen, alignSelf: 'center', padding: 5, borderRadius: 10 }} onPress={() => dispatch(logoutUser())}>
                <Text style={{ color: '#fff' }}>Log Out</Text>
            </TouchableOpacity> */}
        </SafeAreaView>
    )
}

export default Profile;

const styles = StyleSheet.create({});