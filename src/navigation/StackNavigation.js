import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './AuthStackNavigator';
import GuestStackNavigator from './GuestStackNavigator';
import { useSelector } from 'react-redux';
import axios from 'axios';

axios.defaults.baseURL = 'https://grocery.panditenterprise.in/public/api/';

const StackNavigation = () => {

    const cartProducts = useSelector(state => state.cart);
    const userDetails = useSelector(state => state.user);

    const cartItemCount = cartProducts.length;

    // const isUserLoggedIn = true;

    return (
        <NavigationContainer>
            {userDetails?.[0]?.accessToken ? <GuestStackNavigator cartItemCount={cartItemCount} /> : <AuthStackNavigator initialRoute="Login" />}
        </NavigationContainer>
    );
}

export default StackNavigation;

const styles = StyleSheet.create({});