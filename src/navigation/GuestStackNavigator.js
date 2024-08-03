import { StyleSheet } from 'react-native';
import Home from '../screens/Home';
import Cart from '../screens/Cart';
import ProductDetails from '../screens/ProductDetails';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../screens/Profile';
import Groceries from '../screens/Groceries';
import Restaurants from '../screens/Restaurants';
import Cakes from '../screens/Cakes';

const GuestStackNavigator = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Groceries" component={Groceries} />
            <Stack.Screen name="Restaurants" component={Restaurants} />
            <Stack.Screen name="Cakes" component={Cakes} />
        </Stack.Navigator>
    )
}

export default GuestStackNavigator;

const styles = StyleSheet.create({})