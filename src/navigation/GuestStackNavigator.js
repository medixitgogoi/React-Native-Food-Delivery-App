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
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { backIconColor } from '../utils/colors';

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

// not in use
const CartStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Cart" component={Cart} />
        {/* Add other screens related to Cart here as needed */}
    </Stack.Navigator>
);
// not in use
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
                        iconName = 'shopping';
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
                tabBarActiveTintColor: backIconColor,
                tabBarInactiveTintColor: '#000',
                headerShown: false,
            })}
        >
            <Tab.Screen name="HomeStack" component={HomeStack} />
            <Tab.Screen name="Cart" component={Cart} />
            <Tab.Screen name="Wishlist" component={Wishlist} options={{ tabBarBadge: 3 }} />
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
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 2,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 15,
    },
    badgeText: {
        color: '#fff',
        fontSize: responsiveFontSize(1.2),
        fontWeight: '600',
    },
});

export default GuestStackNavigator;