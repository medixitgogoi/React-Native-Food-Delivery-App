import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Cart from '../screens/Cart';
import ProductDetails from '../screens/ProductDetails';
import Profile from '../screens/Profile';
import Groceries from '../screens/Groceries';
import Restaurants from '../screens/Restaurants';
import Cakes from '../screens/Cakes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Wishlist from '../screens/Wishlist';
import SearchScreen from '../screens/SearchScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Groceries" component={Groceries} />
        <Stack.Screen name="Restaurants" component={Restaurants} />
        <Stack.Screen name="Cakes" component={Cakes} />
        {/* Add other screens here as needed */}
    </Stack.Navigator>
);

const CartStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Cart" component={Cart} />
        {/* Add other screens related to Cart here as needed */}
    </Stack.Navigator>
);

const ProfileStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Profile" component={Profile} />
        {/* Add other screens related to Profile here as needed */}
    </Stack.Navigator>
);

const BottomTabNavigator = ({ cartItemCount }) => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'HomeStack') {
                        iconName = 'home';
                    } else if (route.name === 'Cart') {
                        iconName = 'cart';
                    } else if (route.name === 'Profile') {
                        iconName = 'account';
                    } else if (route.name === 'Wishlist') {
                        iconName = 'heart';
                    }

                    if (route.name === 'Cart') {
                        return (
                            <View>
                                <Icon name={iconName} size={size} color={color} />
                                {/* {cartItemCount > 0 && ( */}
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>3</Text>
                                </View>
                                {/* )} */}
                            </View>
                        );
                    } else {
                        return <Icon name={iconName} size={size} color={color} />;
                    }
                },
                tabBarActiveTintColor: '#5EC467',
                tabBarInactiveTintColor: '#b5b9bf',
                headerShown: false,
            })}
        >
            <Tab.Screen name="HomeStack" component={HomeStack} />
            <Tab.Screen name="Cart" component={Cart} />
            <Tab.Screen name="Wishlist" component={Wishlist} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
};

const GuestStackNavigator = ({ cartItemCount }) => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="BottomTabs">
            <Stack.Screen name="BottomTabs">
                {(props) => <BottomTabNavigator {...props} cartItemCount={cartItemCount} />}
            </Stack.Screen>
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            {/* Add other screens that are independent of the tab navigator */}
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        right: -6,
        top: -3,
        backgroundColor: '#ff0000',
        borderRadius: 6,
        paddingHorizontal: 5,
        paddingVertical: 2,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 15,
    },
    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
});

export default GuestStackNavigator;