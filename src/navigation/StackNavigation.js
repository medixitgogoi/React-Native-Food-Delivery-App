import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './AuthStackNavigator';
import GuestStackNavigator from './GuestStackNavigator';
import { useSelector } from 'react-redux';

const StackNavigation = () => {

    const cartProducts = useSelector(state => state.cart);
    const login = useSelector(state => state.login);

    const cartItemCount = cartProducts.length;

    return (
        <NavigationContainer>
            {login.isUserLoggedIn ? <GuestStackNavigator cartItemCount={cartItemCount} /> : <AuthStackNavigator initialRoute="Login" />}
        </NavigationContainer>
    );
}

export default StackNavigation;

const styles = StyleSheet.create({});