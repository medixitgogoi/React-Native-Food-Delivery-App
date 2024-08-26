import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../auth/Login';
import SplashScreen from '../auth/SplashScreen';
import SignUp from '../auth/SignUp';
import ForgotPassword from '../auth/ForgotPassword';
import OtpVerification from '../auth/OtpVerification';
import TermsAndConditions from '../auth/TermsAndConditions';
import PrivacyPolicy from '../auth/PrivacyPolicy';

const AuthStackNavigator = ({ initialRoute }) => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"SplashScreen"}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="OtpVerification" component={OtpVerification} />
            <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        </Stack.Navigator>
    )
}

export default AuthStackNavigator;

const styles = StyleSheet.create({});