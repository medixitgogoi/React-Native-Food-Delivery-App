import React, { useEffect, useRef } from 'react';
import { Text, View, ImageBackground, StatusBar, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { backIconColor, lightGreen } from '../utils/colors';

const SplashScreen = () => {

    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Login');
        }, 1500)
    }, []);

    const scaleAnim = useRef(new Animated.Value(0)).current; // Scale animation for the logo
    const translateYAnim = useRef(new Animated.Value(50)).current; // Position animation for the logo

    // Text animations
    const translateXLeftAnim = useRef(new Animated.Value(-100)).current; // Start "sker" off-screen left
    const translateXRightAnim = useRef(new Animated.Value(100)).current; // Start "cart" off-screen right

    useEffect(() => {
        // Animate the logo
        Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();

        Animated.timing(translateYAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
        }).start();

        // Animate the text "sker" and "cart"
        Animated.parallel([
            Animated.timing(translateXLeftAnim, {
                toValue: 0, // Slide "sker" into its original position
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(translateXRightAnim, {
                toValue: 0, // Slide "cart" into its original position
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();
    }, [scaleAnim, translateYAnim, translateXLeftAnim, translateXRightAnim]);

    return (
        <ImageBackground
            source={require('../assets/splash7.jpeg')} // Replace with your image path
            style={{ flex: 1, opacity: 1 }}
            resizeMode="cover"
        >
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar translucent={true} backgroundColor="transparent" />

                <View style={{ height: '90%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Animated.Image
                        source={require('../assets/logo2.png')}
                        style={{
                            width: 260,
                            height: 260,
                            resizeMode: 'contain',
                            transform: [
                                { scale: scaleAnim },
                                { translateY: translateYAnim },
                            ],
                        }}
                    />

                    {/* Animated Text */}
                    <View style={{ flexDirection: 'row' }}>
                        <Animated.Text
                            style={{
                                color: lightGreen,
                                fontWeight: '600',
                                fontSize: responsiveFontSize(3.5),
                                textTransform: 'uppercase',
                                letterSpacing: 1,
                                transform: [{ translateX: translateXLeftAnim }],
                            }}
                        >
                            sker
                        </Animated.Text>
                        <Animated.Text
                            style={{
                                color: lightGreen,
                                fontWeight: '600',
                                fontSize: responsiveFontSize(3.5),
                                textTransform: 'uppercase',
                                letterSpacing: 1,
                                transform: [{ translateX: translateXRightAnim }],
                            }}
                        >
                            cart
                        </Animated.Text>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default SplashScreen;
