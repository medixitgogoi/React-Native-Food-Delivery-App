import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../auth/Login';
import SplashScreen from '../auth/SplashScreen';
import SignUp from '../auth/OtpVerification';
import ForgotPassword from '../auth/ForgotPassword';
import OtpVerification from '../auth/OtpVerification';

const AuthStackNavigator = ({ initialRoute }) => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"SplashScreen"}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="OtpVerification" component={OtpVerification} />
        </Stack.Navigator>
    )
}

export default AuthStackNavigator;

const styles = StyleSheet.create({});