import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './AuthStackNavigator';
import GuestStackNavigator from './GuestStackNavigator';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addUser } from '../redux/UserSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchCartProducts } from '../utils/fetchCartProducts';
import { addItemToCart } from '../redux/CartSlice';

axios.defaults.baseURL = 'https://grocery.panditenterprise.in/public/api/';

const StackNavigation = () => {

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.user);
    const cartProducts = useSelector(state => state.cart);

    const [isLoading, setIsLoading] = useState(true);

    const isUserLoggedIn = userDetails?.length > 0 && userDetails?.some(item => item.accessToken);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchCartProducts(userDetails); // Await the fetchProducts function

                if (data) {
                    dispatch(addItemToCart(data));
                }
                // console.log('cartProducts', cartProducts);

                // console.log('cartData', data); // Log fetched data
            } catch (error) {
                Alert.alert("Error fetching groceries:", error.message); // Log errors if any
            }
        };

        fetchData(); // Call the async function inside useEffect
    }, []); // Dependency array should include userDetails if it might change

    const cartItemCount = cartProducts?.length;
    console.log('cartItemCount', cartItemCount);

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
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <NavigationContainer>
                <AuthStackNavigator initialRoute="SplashScreen" />
            </NavigationContainer>
        );
    }

    console.log('cartProducts', cartProducts);

    return (
        <NavigationContainer>
            {isUserLoggedIn ? <GuestStackNavigator cartItemCount={cartItemCount} /> : <AuthStackNavigator initialRoute="Login" />}
        </NavigationContainer>
    );
};

export default StackNavigation;