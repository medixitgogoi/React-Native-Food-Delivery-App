import { StyleSheet, PermissionsAndroid, Platform, Text } from 'react-native';
import StackNavigation from './src/navigation/StackNavigation';
import { Provider } from 'react-redux';
import { store } from './src/redux/Store';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { backIconColor, lightGreen } from './src/utils/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {

    const requestLocationPermission = async () => {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "Location Permission",
                        message:
                            "This app needs access to your location " +
                            "so you can use location-based features.",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("Location permission granted");
                } else {
                    console.log("Location permission denied");
                }
            }
        } catch (err) {
            console.warn(err);
        }
    };

    useEffect(() => {
        requestLocationPermission();
    });

    const toastConfig = {
        customToast: ({ text1, text2 }) => (
            <SafeAreaView
                style={{
                    height: 60,
                    width: '95%',
                    padding: 10,
                    backgroundColor: lightGreen, // Custom background color
                    alignSelf: 'center',
                    borderLeftColor: '#c23817',      // Red left border
                    borderLeftWidth: 5,          // Thicker left border
                    borderTopColor: '#000',      // Black border on top
                    borderTopWidth: 1,
                    borderRightColor: '#000',    // Black border on right
                    borderRightWidth: 1,
                    borderBottomColor: '#000',   // Black border on bottom
                    borderBottomWidth: 1,
                    justifyContent: 'center',    // Center content vertically
                    borderRadius: 10,
                    flexDirection: 'column',
                    gap: 3
                }}
            >
                <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: 'bold', color: backIconColor }}>
                    {text1}
                </Text>
                <Text style={{ fontSize: responsiveFontSize(1.6), color: '#000' }}>
                    {text2}
                </Text>
            </SafeAreaView>
        ),
    };


    return (
        <Provider store={store}>
            <StackNavigation />
            <Toast config={toastConfig} />
        </Provider>
    )
}

export default App;

const styles = StyleSheet.create({});