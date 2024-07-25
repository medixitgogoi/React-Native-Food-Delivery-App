import { StyleSheet } from 'react-native';
import Home from '../screens/Home';
import Cart from '../screens/Cart';
import ProductDetails from '../screens/ProductDetails';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const GuestStackNavigator = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Details" component={Cart} />
            <Stack.Screen name="Profile" component={ProductDetails} />
        </Stack.Navigator>
    )
}

export default GuestStackNavigator;

const styles = StyleSheet.create({})