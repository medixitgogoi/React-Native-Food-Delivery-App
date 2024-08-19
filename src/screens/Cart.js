import { StatusBar, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Image, Animated, ScrollView } from 'react-native';
import { background, backIconColor, darkGreen, lightGreen, offWhite } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { groceries } from '../utils/groceries';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome6';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import Icon5 from 'react-native-vector-icons/dist/AntDesign';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const Cart = () => {

    const navigation = useNavigation();

    const moveAnim = useRef(new Animated.Value(0)).current;

    const cartProducts = useSelector(state => state.cart);
    console.log('cartProducts', cartProducts);

    useEffect(() => {
        const startAnimation = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(moveAnim, {
                        toValue: 10, // Move to the right by 10 units
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(moveAnim, {
                        toValue: 0, // Move back to the left
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        };

        startAnimation();
    }, [moveAnim]);

    const renderOrder = ({ item }) => {
        <View>
            <Text style={{ color: '#000' }}>{item.name}</Text>
        </View>
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background, paddingBottom: 10 }}>
            <StatusBar
                animated={true}
                backgroundColor={darkGreen}
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ paddingHorizontal: 10, backgroundColor: darkGreen, height: 50, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 8, elevation: 3 }} onPress={() => navigation.goBack()}>
                    <Icon name="keyboard-arrow-left" size={23} color={'#000'} />
                </TouchableOpacity>
                <Text style={{ color: '#fff', fontWeight: "600", fontSize: responsiveFontSize(2.7), textAlign: 'center', textTransform: 'uppercase' }}>Cart</Text>
                <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 8, elevation: 3 }} onPress={() => navigation.navigate('Profile')}>
                    <Icon2 name="account" size={23} color={'#000'} />
                </TouchableOpacity>
            </View>

            <ScrollView>
                <View style={{ padding: 10 }}>

                    {/* cart item */}
                    <View style={{ paddingHorizontal: 4, backgroundColor: '#fff', borderRadius: 12, elevation: 1, flexDirection: 'row', alignItems: 'center', overflow: 'hidden', height: 90 }}>
                        <View style={{ padding: 10, flexDirection: 'row', borderRadius: 10, alignItems: 'center', justifyContent: 'center', flex: 0.9, backgroundColor: '#e4f4ea', height: 80 }}>
                            <Image source={require('../assets/orange.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                        </View>

                        <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'space-between', paddingLeft: 15, paddingVertical: 12, height: '100%' }}>
                            <Text style={{ color: '#000', fontWeight: '700', fontSize: responsiveFontSize(2.2) }}>Orange</Text>
                            <Text style={{ color: offWhite, fontWeight: '600', fontSize: responsiveFontSize(1.9) }}>Fruit</Text>
                            {/* <Text style={{ color: offWhite, fontWeight: '600', fontSize: responsiveFontSize(1.9) }}>500 gm</Text> */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 7 }}>
                                <Text style={{ color: '#019934', fontWeight: '700', fontSize: responsiveFontSize(2.4) }}>₹299</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                    <TouchableOpacity>
                                        <Icon3 name="circle-minus" size={28} color={backIconColor} />
                                    </TouchableOpacity>
                                    <Text style={{ color: '#000', fontWeight: '500', fontSize: responsiveFontSize(2.2) }}>1</Text>
                                    <TouchableOpacity>
                                        <Icon3 name="circle-plus" size={28} color={backIconColor} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ paddingHorizontal: 4, backgroundColor: '#fff', borderRadius: 12, elevation: 1, flexDirection: 'row', alignItems: 'center', overflow: 'hidden', height: 100, marginTop: 8 }}>
                        <View style={{ padding: 10, flexDirection: 'row', borderRadius: 10, alignItems: 'center', justifyContent: 'center', flex: 0.9, backgroundColor: '#e4f4ea', height: 90 }}>
                            <Image source={require('../assets/rice.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                        </View>

                        <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'space-between', paddingLeft: 15, paddingTop: 10, paddingBottom: 10, height: '100%' }}>
                            <Text style={{ color: '#000', fontWeight: '700', fontSize: responsiveFontSize(2.4) }}>Chicken Fried Rice</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                                <View style={{ width: 17, height: 17, borderColor: '#000', borderWidth: 1.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                                    <Icon5 name="caretup" size={12} color={'#cb202d'} style={{ margin: 0, padding: 0, alignSelf: 'center' }} />
                                </View>
                                <Text style={{ color: offWhite, fontWeight: '600', fontSize: responsiveFontSize(1.7) }}>Non-veg</Text>
                            </View>
                            {/* <Text style={{ color: '#000', fontWeight: '700', fontSize: responsiveFontSize(2.4) }}>Half plate</Text> */}

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 7, marginTop: 3 }}>
                                <Text style={{ color: '#019934', fontWeight: '700', fontSize: responsiveFontSize(2.4) }}>₹349</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                    <TouchableOpacity>
                                        <Icon3 name="circle-minus" size={28} color={backIconColor} />
                                    </TouchableOpacity>
                                    <Text style={{ color: '#000', fontWeight: '500', fontSize: responsiveFontSize(2.3) }}>1</Text>
                                    <TouchableOpacity>
                                        <Icon3 name="circle-plus" size={28} color={backIconColor} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ paddingHorizontal: 4, backgroundColor: '#fff', borderRadius: 12, elevation: 1, flexDirection: 'row', alignItems: 'center', overflow: 'hidden', height: 100, marginTop: 8 }}>
                        <View style={{ padding: 10, flexDirection: 'row', borderRadius: 10, alignItems: 'center', justifyContent: 'center', flex: 0.9, backgroundColor: '#e4f4ea', height: 90 }}>
                            <Image source={require('../assets/cake.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                        </View>

                        <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'space-between', paddingLeft: 15, paddingTop: 10, paddingBottom: 10, height: '100%' }}>
                            <Text style={{ color: '#000', fontWeight: '700', fontSize: responsiveFontSize(2.4) }}>Red Velvet Cake</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                                <View style={{ width: 17, height: 17, borderColor: '#000', borderWidth: 1.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                                    <Icon5 name="caretup" size={12} color={'#cb202d'} style={{ margin: 0, padding: 0, alignSelf: 'center' }} />
                                </View>
                                <Text style={{ color: offWhite, fontWeight: '600', fontSize: responsiveFontSize(1.7) }}>Non-veg</Text>
                            </View>
                            {/* <Text style={{ color: '#000', fontWeight: '700', fontSize: responsiveFontSize(2.4) }}>1 Kg</Text> */}

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 7, marginTop: 3 }}>
                                <Text style={{ color: '#019934', fontWeight: '700', fontSize: responsiveFontSize(2.4) }}>₹499</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                    <TouchableOpacity>
                                        <Icon3 name="circle-minus" size={28} color={backIconColor} />
                                    </TouchableOpacity>
                                    <Text style={{ color: '#000', fontWeight: '500', fontSize: responsiveFontSize(2.3) }}>1</Text>
                                    <TouchableOpacity>
                                        <Icon3 name="circle-plus" size={28} color={backIconColor} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Cart Total */}
                    <View style={{ backgroundColor: '#fff', marginTop: 20, elevation: 1, borderRadius: 12, overflow: 'hidden' }}>
                        <View style={{ backgroundColor: backIconColor, paddingTop: 10, }}>
                            <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(2.5), fontWeight: '700', textTransform: 'uppercase', color: '#fff', marginBottom: 10 }}>Cart Total</Text>
                        </View>

                        <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%', marginTop: 5, gap: 4, paddingHorizontal: 20, padding: 8 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#838a94', fontWeight: '500', fontSize: responsiveFontSize(2) }}>Sub Total</Text>
                                <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.1) }}>₹590.00</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#838a94', fontWeight: '500', fontSize: responsiveFontSize(2) }}>Delivery Charges</Text>
                                <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.1) }}>₹50.00</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#838a94', fontWeight: '500', fontSize: responsiveFontSize(2) }}>Discount</Text>
                                <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.1) }}>₹120.00</Text>
                            </View>
                            <View style={{ borderStyle: 'dashed', borderWidth: 0.6, borderColor: offWhite, marginVertical: 5 }}></View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between', paddingVertical: 5 }}>
                                <Text style={{ color: '#60666f', fontWeight: '500', fontSize: responsiveFontSize(2.1) }}>Final Total</Text>
                                <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.2) }}>₹410.00</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </ScrollView>

            {/* checkout button */}
            <View style={{ position: 'absolute', bottom: 0, backgroundColor: lightGreen, width: '100%', height: 65, elevation: 2, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1.2, flexDirection: 'column', paddingHorizontal: 20, gap: 1 }}>
                    <Text style={{ color: '#838a94', fontWeight: '500', fontSize: responsiveFontSize(2) }}>Total Price</Text>
                    <Text style={{ color: '#000', fontWeight: '800', fontSize: responsiveFontSize(2.8) }}>₹1300</Text>
                </View>
                <View style={{ flex: 3, height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 10 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Checkout')} style={{ backgroundColor: backIconColor, borderRadius: 50, width: '90%', padding: 10, height: 45, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                        <Text style={{ color: '#fff', fontWeight: '700', textAlign: 'center', fontSize: responsiveFontSize(2.3) }}>Checkout</Text>
                        <Animated.View style={{ transform: [{ translateX: moveAnim }] }}>
                            <Icon4 name="arrowright" size={23} color={'#fff'} />
                        </Animated.View>
                    </TouchableOpacity>
                </View>
            </View>

            {/* <FlatList
                data={groceries}
                renderItem={renderOrder}
                // keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 90, paddingTop: 4 }}
                // columnWrapperStyle={{ justifyContent: 'space-between' }}
            /> */}

        </SafeAreaView>
    )
}

export default Cart;

const styles = StyleSheet.create({});