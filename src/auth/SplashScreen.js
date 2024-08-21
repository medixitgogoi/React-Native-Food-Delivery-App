import { Text, View, ImageBackground, StatusBar, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { backIconColor } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const SplashScreen = () => {
    return (
        <ImageBackground
            source={require('../assets/splash6.jpeg')} // Replace with your image path
            style={{ flex: 1, opacity: 0.5, backgroundColor: '#0f2811' }}
            resizeMode="cover" // Ensures the image covers the entire screen
        >
            <SafeAreaView style={{ flex: 1, }}>
                <StatusBar
                    translucent={true}
                    backgroundColor="transparent"
                />

                <View style={{ height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../assets/logo.jpg')} style={{ width: 300, height: 300, resizeMode: 'contain' }} />
                    <Text style={{ color: '#fff', fontWeight: '800', fontSize: responsiveFontSize(3.5), textTransform: 'uppercase' }}>SkerCart</Text>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

export default SplashScreen;
