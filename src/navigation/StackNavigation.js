import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './AuthStackNavigator';
import GuestStackNavigator from './GuestStackNavigator';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addUser } from '../redux/UserSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchCartProducts } from '../utils/fetchCartProducts';
import { setCartItems } from '../redux/CartSlice';
import { setWishlist } from '../redux/WishlistSlice';
import Toast from 'react-native-toast-message';

axios.defaults.baseURL = 'https://grocery.panditenterprise.in/public/api/';

const StackNavigation = () => {

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.user);

    const cartProducts = useSelector(state => state.cart.items); // Use cart items from Redux

    const isUserLoggedIn = userDetails?.length > 0 && userDetails?.some(item => item.accessToken);

    const [isLoading, setIsLoading] = useState(true);

    // Fetch Cart Products from API and update Redux
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchCartProducts(userDetails);
                dispatch(setCartItems(data)); // Dispatch action to update cart in Redux
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Error fetching groceries',
                    text2: error.message,
                    position: 'top',
                    topOffset: 20,
                });
            }
        };

        if (isUserLoggedIn) {
            fetchData(); // Fetch data only if user is logged in
        }
    }, [dispatch, userDetails, isUserLoggedIn]); // Include dependencies that may change

    // Fetch Wishlist Products from API and update Redux
    useEffect(() => {
        const fetchWishlistProducts = async () => {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${userDetails[0]?.accessToken}`;
                const response = await axios.get('/user/wishlist/fetch');

                if (response?.data?.status) {
                    dispatch(setWishlist(response?.data?.data));
                }
            } catch (error) {
                Alert.alert("Error", error.message);
            }
        };

        if (isUserLoggedIn) {
            fetchWishlistProducts(); // Fetch data only if user is logged in
        }
    }, [dispatch, userDetails, isUserLoggedIn]); // Include dependencies that may change

    // Load login details from AsyncStorage
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
    };

    return (
        <NavigationContainer>
            {isUserLoggedIn ? ( 
                <GuestStackNavigator cartItemCount={cartProducts?.length} />
            ) : (
                <AuthStackNavigator initialRoute="Login" />
            )}
        </NavigationContainer>
    );
};

export default StackNavigation;