import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './AuthStackNavigator';
import GuestStackNavigator from './GuestStackNavigator';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const StackNavigation = () => {

    const cartProducts = useSelector(state => state.cart);

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    const cartItemCount = cartProducts.length;

    return (
        <NavigationContainer>
            {isUserLoggedIn ? <GuestStackNavigator cartItemCount={cartItemCount} /> : <AuthStackNavigator initialRoute="Login" />}
        </NavigationContainer>
    );
}

export default StackNavigation;

const styles = StyleSheet.create({});