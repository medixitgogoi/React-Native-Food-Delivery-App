import { StatusBar, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Image, Animated, ScrollView } from 'react-native';
import { background, backIconColor, darkGreen, lightGreen, offWhite } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome6';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, decrementItem, removeItemFromCart } from '../redux/CartSlice';

const Cart = () => {

    const navigation = useNavigation();

    const moveAnim = useRef(new Animated.Value(0)).current;

    const dispatch = useDispatch();

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

    const cartProductsSubTotal = () => {
        return cartProducts.reduce((total, item) => total + item.qty * item.units.discountedPrice, 0);
    };

    const renderOrder = ({ item }) => {
        <View style={{ marginBottom: 8, padding: 4, backgroundColor: '#fff', borderRadius: 12, elevation: 1, flexDirection: 'row', alignItems: 'center', overflow: 'hidden' }}>
            <View style={{ padding: 10, flexDirection: 'row', borderRadius: 10, alignItems: 'center', justifyContent: 'center', flex: 1.2, backgroundColor: '#e4f4ea' }}>
                <Image source={require('../assets/orange.png')} style={{ width: '100%', height: 90, resizeMode: 'contain' }} />
            </View>
            <View style={{ flex: 3, flexDirection: 'column', height: '100%', paddingHorizontal: 10, paddingVertical: 6 }}>
                <View style={{ flex: 0.8 }}>
                    <Text style={{ color: '#000', fontWeight: '700', fontSize: responsiveFontSize(2.2) }}>{item.name}</Text>
                </View>
                <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingTop: 3 }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                        <View style={{ flexDirection: 'column', gap: 1 }}>
                            <Text style={{ color: offWhite, fontWeight: '600', fontSize: responsiveFontSize(1.9) }}>Fruit</Text>
                            <Text style={{ color: backIconColor, fontWeight: '600', fontSize: responsiveFontSize(1.9) }}>500 gm</Text>
                        </View>
                        <View style={{ backgroundColor: lightGreen, borderColor: backIconColor, borderWidth: 0.6, flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 5, paddingHorizontal: 5, borderRadius: 7 }}>
                            <TouchableOpacity style={{ width: 20, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                <Icon3 name="minus" size={13} color={'#000'} />
                            </TouchableOpacity>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2.1), fontWeight: '700' }}>0</Text>
                            <TouchableOpacity style={{ width: 20, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                <Icon3 name="plus" size={13} color={'#000'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'flex-start', paddingBottom: 25 }}>
                        <Text style={{ color: '#000', fontWeight: '800', fontSize: responsiveFontSize(2.4) }}>₹299.00</Text>
                    </View>
                </View>
            </View>
        </View>
    };

    useFocusEffect(
        useCallback(() => {
            StatusBar.setBackgroundColor(background); // Set your cart screen status bar color
            StatusBar.setBarStyle('dark-content'); // Optional: change text color (light/dark)
        }, [])
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background, paddingBottom: 10 }}>
            <StatusBar
                animated={true}
                backgroundColor={background}
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ paddingHorizontal: 10, height: 50, width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 8, elevation: 3 }} onPress={() => navigation.goBack()}>
                    <Icon name="keyboard-arrow-left" size={23} color={'#000'} />
                </TouchableOpacity>

                <View style={{ flex: 0.9, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#000', fontWeight: "600", fontSize: responsiveFontSize(2.5), textTransform: 'uppercase' }}>
                        Your Food Cart
                    </Text>
                </View>
            </View>

            {/* Content */}
            <ScrollView>

                {cartProducts.length === 0 && (
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
                        <Image source={require('../assets/fallback.png')} style={{ width: 250, height: 250, resizeMode: 'contain' }} />
                        <Text style={{ color: '#818791', textAlign: 'center', fontWeight: '500', fontSize: responsiveFontSize(2) }}>Looks like you haven't added any items yet. Start shopping now to fill your cart!</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={{ elevation: 2, marginTop: 20, backgroundColor: darkGreen, paddingVertical: 10, gap: 5, paddingHorizontal: 20, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2) }}>Go to Home</Text>
                            <Icon4 name="arrowright" size={20} color={'#000'} />
                        </TouchableOpacity>
                    </View>
                )}

                <View style={{ paddingHorizontal: 10, paddingTop: 5 }}>
                    {cartProducts?.map(item => (
                        <View key={item.id} style={{ marginBottom: 8, padding: 5, backgroundColor: '#fff', borderRadius: 12, elevation: 1, flexDirection: 'row', alignItems: 'center', overflow: 'hidden' }}>
                            <View style={{ padding: 10, flexDirection: 'row', borderRadius: 10, alignItems: 'center', justifyContent: 'center', flex: 1.2, backgroundColor: '#e4f4ea' }}>
                                <Image source={require('../assets/orange.png')} style={{ width: '100%', height: 90, resizeMode: 'contain' }} />
                            </View>

                            <View style={{ flex: 3, flexDirection: 'column', height: '100%', paddingHorizontal: 10, paddingVertical: 6 }}>
                                <View style={{ flex: 0.8 }}>
                                    <Text style={{ color: '#000', fontWeight: '700', fontSize: responsiveFontSize(2.2) }}>{item.name}</Text>
                                </View>

                                <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingTop: 3 }}>
                                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                                        <View style={{ flexDirection: 'column', gap: 3 }}>
                                            {item.type === 'grocery' ? (
                                                <Text style={{ color: offWhite, fontWeight: '600', fontSize: responsiveFontSize(1.9) }}>Fruit</Text>
                                            ) : (
                                                item.subCategory === 'Veg' ? (
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                                                        <View style={{ width: 15, height: 15, borderColor: '#000', borderWidth: 1.2, borderRadius: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                            <View style={{ backgroundColor: 'green', width: 8, height: 8, borderRadius: 10, }}>
                                                            </View>
                                                        </View>
                                                        <Text style={{ color: offWhite, fontWeight: '600', fontSize: responsiveFontSize(1.7) }}>Veg</Text>
                                                    </View>
                                                ) : (
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                                                        <View style={{ width: 15, height: 15, borderColor: '#000', borderWidth: 1.2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                                                            <Icon4 name="caretup" size={9} color={'#cb202d'} style={{ margin: 0, padding: 0, alignSelf: 'center' }} />
                                                        </View>
                                                        <Text style={{ color: offWhite, fontWeight: '600', fontSize: responsiveFontSize(1.7) }}>Non-veg</Text>
                                                    </View>
                                                )
                                            )}
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                                                {/* <View style={{ borderColor: '#000', borderWidth: 1.2, borderRadius: 3, width: 15, height: 15, alignItems: 'center', justifyContent: 'center' }}> */}
                                                <Icon2 name="cube-outline" size={16} color={'#000'} />
                                                {/* </View> */}
                                                <Text style={{ color: backIconColor, fontWeight: '600', fontSize: responsiveFontSize(1.7) }}>{item.units.unit}</Text>
                                            </View>
                                        </View>
                                        <View style={{ backgroundColor: lightGreen, borderColor: backIconColor, borderWidth: 0.6, flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 5, paddingHorizontal: 5, borderRadius: 7 }}>
                                            <TouchableOpacity disabled={item.qty === 1} onPress={() => dispatch(decrementItem(item))} style={{ width: 20, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                                <Icon3 name="minus" size={13} color={'#000'} />
                                            </TouchableOpacity>
                                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2.1), fontWeight: '700' }}>{item.qty}</Text>
                                            <TouchableOpacity onPress={() => dispatch(addItemToCart(item))} style={{ width: 20, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                                <Icon3 name="plus" size={13} color={'#000'} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'column', justifyContent: 'flex-start', paddingBottom: 25 }}>
                                        <Text style={{ color: '#000', fontWeight: '800', fontSize: responsiveFontSize(2.4) }}>₹{item.units.discountedPrice}.00</Text>
                                    </View>
                                </View>
                            </View>

                            <TouchableOpacity onPress={() => dispatch(removeItemFromCart(item))} style={{ elevation: 2, position: 'absolute', width: 30, height: 30, backgroundColor: '#fceced', top: 0, right: 0, borderBottomLeftRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <Icon name="delete" size={20} color={'#cb202d'} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                {/* Cart Total */}
                {cartProducts?.length !== 0 && (
                    <View style={{ backgroundColor: '#fff', marginTop: 10, elevation: 1, borderRadius: 12, overflow: 'hidden', margin: 10 }}>
                        <View style={{ backgroundColor: backIconColor, paddingTop: 10, }}>
                            <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(2.5), fontWeight: '700', textTransform: 'uppercase', color: '#fff', marginBottom: 10 }}>Cart Total</Text>
                        </View>

                        <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%', marginTop: 5, gap: 4, paddingHorizontal: 20, padding: 8 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#A0A0A0', fontWeight: '500', fontSize: responsiveFontSize(2) }}>Sub Total</Text>
                                <Text style={{ color: '#000', fontWeight: '500', fontSize: responsiveFontSize(2) }}>₹{cartProductsSubTotal()}.00</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#A0A0A0', fontWeight: '500', fontSize: responsiveFontSize(2) }}>Delivery Charges</Text>
                                <Text style={{ color: '#000', fontWeight: '500', fontSize: responsiveFontSize(2) }}>₹50.00</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#A0A0A0', fontWeight: '500', fontSize: responsiveFontSize(2) }}>Discount</Text>
                                <Text style={{ color: '#000', fontWeight: '500', fontSize: responsiveFontSize(2) }}>₹120.00</Text>
                            </View>
                            <View style={{ borderStyle: 'dashed', borderWidth: 0.6, borderColor: offWhite, marginVertical: 5 }}></View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between', paddingVertical: 5 }}>
                                <Text style={{ color: '#000', fontWeight: '700', fontSize: responsiveFontSize(2.3) }}>Final Total</Text>
                                <Text style={{ color: '#000', fontWeight: '700', fontSize: responsiveFontSize(2.3) }}>₹{cartProductsSubTotal() + 50 - 120}.00</Text>
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* Continue button */}
            {cartProducts?.length !== 0 && (
                <View style={{ position: 'absolute', bottom: 0, backgroundColor: lightGreen, width: '100%', height: 65, elevation: 2, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1.2, flexDirection: 'column', paddingHorizontal: 20, gap: 1 }}>
                        <Text style={{ color: '#838a94', fontWeight: '500', fontSize: responsiveFontSize(2) }}>Total Price</Text>
                        <Text style={{ color: '#000', fontWeight: '800', fontSize: responsiveFontSize(2.8) }}>₹{cartProductsSubTotal() + 50 - 120}.00</Text>
                    </View>
                    <View style={{ flex: 3, height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 10 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Checkout')} style={{ backgroundColor: backIconColor, borderRadius: 50, width: '90%', padding: 10, height: 45, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                            <Text style={{ color: '#fff', fontWeight: '700', textAlign: 'center', fontSize: responsiveFontSize(2.3) }}>Continue</Text>
                            <Animated.View style={{ transform: [{ translateX: moveAnim }] }}>
                                <Icon4 name="arrowright" size={23} color={'#fff'} />
                            </Animated.View>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </SafeAreaView>
    )
}

export default Cart;

const styles = StyleSheet.create({});

{/* 
    <FlatList
        data={cartProducts}
        renderItem={renderOrder}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 10 }}
    /> 
*/}