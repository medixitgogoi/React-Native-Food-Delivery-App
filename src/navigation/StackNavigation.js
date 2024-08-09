import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './AuthStackNavigator';
import GuestStackNavigator from './GuestStackNavigator';
import { useState } from 'react';

const StackNavigation = () => {

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

    // take the value from redux
    const cartItemCount = 0;

    return (
        <NavigationContainer>
            {isUserLoggedIn ? <GuestStackNavigator cartItemCount={cartItemCount} /> : <AuthStackNavigator initialRoute="Login" />}
        </NavigationContainer>
    );
}

export default StackNavigation;

const styles = StyleSheet.create({});