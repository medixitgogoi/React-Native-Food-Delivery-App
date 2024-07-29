import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './AuthStackNavigator';
import GuestStackNavigator from './GuestStackNavigator';
import { useState } from 'react';

const StackNavigation = () => {

    const [isUserLoggedIn, setisUserLoggedIn] = useState(true);

    return (
        <NavigationContainer>
            {isUserLoggedIn ? <GuestStackNavigator /> : <AuthStackNavigator initialRoute="Login" />}
        </NavigationContainer>
    );
}

export default StackNavigation;

const styles = StyleSheet.create({});