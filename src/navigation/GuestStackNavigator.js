import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Cart from '../screens/Cart';
import ProductDetails from '../screens/ProductDetails';
import Profile from '../screens/Profile';
import Groceries from '../screens/Groceries';
import Restaurants from '../screens/Restaurants';
import Cakes from '../screens/Cakes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Wishlist from '../screens/Wishlist';
import SearchScreen from '../screens/SearchScreen';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Checkout from '../screens/Checkout';
import { backIconColor, darkGreen } from '../utils/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Home = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
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

                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Cart') {
                        iconName = 'shopping';
                    } else if (route.name === 'Profile') {
                        iconName = 'account';
                    } else if (route.name === 'Wishlist') {
                        iconName = 'heart';
                    }

                    return (
                        <View style={styles.iconContainer}>
                            <Icon name={iconName} size={22} color={color} />
                            {route.name === 'Cart' && cartItemCount > 0 && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>{cartItemCount}</Text>
                                </View>
                            )}
                        </View>
                    );
                },
                tabBarLabel: ({ focused, color }) => (
                    <View style={styles.tabLabelContainer}>
                        <Text style={[styles.tabLabel, { color }]}>{route.name}</Text>
                    </View>
                ),
                tabBarActiveTintColor: '#318538',
                tabBarInactiveTintColor: '#000',
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#f8fcf7',
                    display: route.name === 'Cart' ? 'none' : 'flex', // Hide the tab bar on the Cart page
                },
            })}
        >
            <Tab.Screen name="Home" component={Home} />
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
            <Stack.Screen name="Checkout" component={Checkout} />
            {/* Add other screens that are independent of the tab navigator */}
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        alignItems: 'center',
    },
    tabLabelContainer: {
        marginTop: -8, // Adjust this value to minimize the gap
        alignItems: 'center',
        marginBottom: 2,
    },
    tabLabel: {
        fontSize: responsiveFontSize(1.4), // Adjust font size as needed
        marginBottom: 3, // Ensure there's no extra margin below the text
        fontWeight: '500'
    },
    badge: {
        position: 'absolute',
        right: -8,
        top: -3,
        backgroundColor: darkGreen,
        borderRadius: 6,
        paddingHorizontal: 5,
        paddingVertical: 2,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 15,
    },
    badgeText: {
        color: '#000',
        fontSize: 10,
        fontWeight: 'bold',
    },
});

export default GuestStackNavigator;