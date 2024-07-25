import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../auth/Login';
import SplashScreen from '../auth/SplashScreen';

const AuthStackNavigator = ({ initialRoute }) => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute ? initialRoute : "Login"}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
        </Stack.Navigator>
    )
}

export default AuthStackNavigator;

const styles = StyleSheet.create({});