import { StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import StackNavigation from './src/navigation/StackNavigation';
import { Provider } from 'react-redux';
import { store } from './src/redux/Store';
import { useEffect } from 'react';

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
    })

    return (
        <Provider store={store}>
            <StackNavigation />
        </Provider>
    )
}

export default App;

const styles = StyleSheet.create({});