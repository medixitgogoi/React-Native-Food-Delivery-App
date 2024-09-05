import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './AuthStackNavigator';
import GuestStackNavigator from './GuestStackNavigator';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage from npm package
import { addUser } from '../redux/UserSlice';

axios.defaults.baseURL = 'https://grocery.panditenterprise.in/public/api/';

const StackNavigation = () => {

    const dispatch = useDispatch();

    const cartProducts = useSelector((state) => state.cart);
    const userDetails = useSelector((state) => state.user);

    const [isLoading, setIsLoading] = useState(true);

    const cartItemCount = cartProducts.length;

    useEffect(() => {
        const loadLoginDetails = async () => {
            try {
                const storedLoginDetails = await AsyncStorage.getItem('userDetails');
                if (storedLoginDetails) {
                    dispatch(addUser(JSON.parse(storedLoginDetails)));
                }
            } catch (error) {
                Alert.alert(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadLoginDetails();
    }, [dispatch]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        // Show a loading indicator while checking the login status
        return null; // You can replace this with a loading spinner component if needed
    }

    return (
        <NavigationContainer>
            {userDetails?.[0]?.accessToken ? (
                <GuestStackNavigator cartItemCount={cartItemCount} />
            ) : (
                <AuthStackNavigator initialRoute="Login" />
            )}
        </NavigationContainer>
    );
};

export default StackNavigation;