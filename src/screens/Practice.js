import { StatusBar, Text, View, SafeAreaView, TouchableOpacity, Image, Animated, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { background, backIconColor, darkGreen, lightGreen, offWhite } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome6';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import Toast from 'react-native-toast-message';
import { removeItemFromCart } from '../redux/CartSlice';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const Cart = ({ route }) => {

    const reorderedProducts = route.params.data || [];  // Get the reordered products from route params
    console.log('reorderedProducts', reorderedProducts);

    const dispatch = useDispatch();

    const navigation = useNavigation();

    const userDetails = useSelector(state => state.user);

    const moveAnim = useRef(new Animated.Value(0)).current;

    const [loading, setLoading] = useState(true);

    const [cartProducts, setCartProducts] = useState([]);

    const [changeQuantityId, setChangeQuantityId] = useState(null);
    const [quantityLoading, setQuantityLoading] = useState(false);

    const [deletingProductId, setDeletingProductId] = useState(null);

    // Status Bar setters
    useFocusEffect(
        useCallback(() => {
            StatusBar.setBackgroundColor(background); // Set your cart screen status bar color
            StatusBar.setBarStyle('dark-content'); // Optional: change text color (light/dark)
        }, [])
    );

    // Get Cart Products
    const getCartProducts = useCallback(async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${userDetails[0]?.accessToken}`;

            const response = await axios.get('/user/cart/fetch');

            if (response?.data?.status) {
                setCartProducts(response?.data?.data);
            }

            console.log('Cart Products', response?.data?.data);
        } catch (error) {
            Alert.alert('Error', error.message || 'Failed to fetch cart data.');
        } finally {
            setQuantityLoading(false);
            setLoading(false);
        }
    }, [userDetails]);

    // getCartProducts useFocusEffect()
    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            getCartProducts();
        }, [userDetails, setCartProducts, getCartProducts, deleteItemFromCart])
    );

    // Animation for the continue button
    useEffect(() => {
        const startAnimation = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(moveAnim, {
                        toValue: 10,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(moveAnim, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        };

        startAnimation();
    }, [moveAnim]);

    // CartProductsSubTotal
    const cartProductsSubTotal = () => {
        return cartProducts?.reduce((total, item) => total + item.quantity * item.mrp, 0);
    };

    // TotalDiscount
    const totalDiscount = () => {
        return cartProducts.reduce((total, item) => total + ((item.mrp - item.price) * item.quantity), 0);
    };

    // DeleteItemFromCart
    const deleteItemFromCart = async (id) => {
        try {
            setLoading(true);
            setDeletingProductId(id);

            const data = {
                cart_id: id,
            };

            const response = await axios.post(`/user/cart/delete`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response?.data?.status) {
                getCartProducts();
                dispatch(removeItemFromCart(id));
            }
        } catch (error) {
            if (error.response) {
                Alert.alert("Error", error.response.data.message || "Something went wrong. Please try again.");
            } else {
                Alert.alert("Error", "Network error. Please check your internet connection and try again.");
            }
        }
    };

    // DecrementQuantity
    const decrementQuantity = async (id, quantity) => {
        try {
            setChangeQuantityId(id);
            setQuantityLoading(true);

            const data = {
                cart_id: id,
                quantity: parseInt(quantity) - 1,
            };

            const response = await axios.post(`/user/cart/update`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('responseQuantityMinus', response);
            if (response?.data?.status) {
                getCartProducts();
            }
        } catch (error) {
            if (error.response) {
                Alert.alert("Error", error.response.data.message || "Something went wrong. Please try again.");
            } else {
                Alert.alert("Error", "Network error. Please check your internet connection and try again.");
            }
        }
    }

    // IncrementQuantity
    const incrementQuantity = async (id, quantity, stock, name) => {
        if (parseInt(quantity) + 1 > parseInt(stock)) {
            Toast.show({
                type: 'error',
                text1: 'Stock Limit Reached',
                text2: `You can only add up to ${stock} units of ${name}.`,
                position: 'top', // Adjusts to the bottom by default
                topOffset: 10, // Moves the toast 10 units down from the bottom
            });
        } else {
            try {
                setChangeQuantityId(id);
                setQuantityLoading(true);

                const data = {
                    cart_id: id,
                    quantity: parseInt(quantity) + 1,
                };

                const response = await axios.post(`/user/cart/update`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                console.log('responseQuantityPlus', response);
                if (response?.data?.status) {
                    getCartProducts();
                }
            } catch (error) {
                if (error?.response) {
                    Alert.alert("Error", error.response.data.message || "Something went wrong. Please try again.");
                } else {
                    Alert.alert("Error", "Network error. Please check your internet connection and try again.");
                }
            }
        }

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background, paddingBottom: loading ? 0 : 50 }}>
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
                {/* Fallback image */}
                {!loading && cartProducts?.length === 0 && (
                    <View style={{ height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
                        <Image source={require('../assets/fallback.png')} style={{ width: 250, height: 250, resizeMode: 'contain' }} />
                        <Text style={{ color: '#818791', textAlign: 'center', fontWeight: '500', fontSize: responsiveFontSize(2) }}>Looks like you haven't added any items yet. Start shopping now to fill your cart!</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ elevation: 2, marginTop: 20, backgroundColor: darkGreen, paddingVertical: 10, gap: 8, paddingHorizontal: 20, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon4 name="arrowleft" size={20} color={'#000'} />
                            <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2) }}>Go to Home</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Cart products */}
                <View style={{ paddingHorizontal: 10, paddingTop: 5 }}>
                    {/* Skeleton loader */}
                    {loading && [1, 1, 1, 1, 1].map((item, index) => (
                        <View key={index} style={{ flex: 1, flexDirection: 'column', height: '100%', justifyContent: 'space-between', elevation: 2, marginVertical: 5, backgroundColor: '#fff', padding: 10, borderRadius: 12, marginHorizontal: 1, marginVertical: 5 }}>
                            {/* Title Shimmer */}
                            <ShimmerPlaceHolder
                                LinearGradient={LinearGradient}
                                style={{ width: '60%', height: 20, marginBottom: 10, borderRadius: 4 }}
                            />

                            {/* Detail Lines Shimmer */}
                            <ShimmerPlaceHolder
                                LinearGradient={LinearGradient}
                                style={{ width: '40%', height: 15, marginBottom: 5, borderRadius: 4 }}
                            />
                            <ShimmerPlaceHolder
                                LinearGradient={LinearGradient}
                                style={{ width: '50%', height: 15, marginBottom: 5, borderRadius: 4 }}
                            />

                            {/* Quantity Buttons and Price */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                                <ShimmerPlaceHolder
                                    LinearGradient={LinearGradient}
                                    style={{ width: 80, height: 30, borderRadius: 6 }}
                                />
                                <ShimmerPlaceHolder
                                    LinearGradient={LinearGradient}
                                    style={{ width: 50, height: 30, borderRadius: 6 }}
                                />
                            </View>
                        </View>
                    ))}

                    {/* Content */}
                    {!loading && cartProducts?.map(item => (
                        <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { data: item?.product_id })} key={item.id} style={{ marginBottom: 12, padding: 5, backgroundColor: '#fff', borderRadius: 12, elevation: 1, flexDirection: 'row', alignItems: 'center', overflow: 'hidden' }}>
                            {/* Image */}
                            <View style={{ padding: 10, flexDirection: 'row', borderRadius: 10, alignItems: 'center', justifyContent: 'center', flex: 1.2, backgroundColor: '#e4f4ea' }}>
                                <Image source={{ uri: item?.image }} style={{ width: '100%', height: 90, resizeMode: 'contain' }} />
                            </View>

                            {/* Details */}
                            <View style={{ flex: 3, flexDirection: 'column', height: '100%', paddingHorizontal: 10, paddingVertical: 6 }}>
                                {/* Name */}
                                <View style={{ flex: 0.8, width: '92%' }}>
                                    <Text style={{ color: '#000', fontWeight: '700', fontSize: responsiveFontSize(2.1) }} numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>
                                </View>

                                {/* To be changed */}
                                <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingTop: 3 }}>
                                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                                        {/* Type */}
                                        <View style={{ flexDirection: 'column', gap: 3 }}>
                                            {item?.type != "2" && (
                                                item?.veg_type === '1' ? (
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                                                        <View style={{ width: 12, height: 12, borderColor: '#000', borderWidth: 1.2, borderRadius: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                            <View style={{ backgroundColor: 'green', width: 5, height: 5, borderRadius: 10, }}>
                                                            </View>
                                                        </View>
                                                        <Text style={{ color: offWhite, fontWeight: '600', fontSize: responsiveFontSize(1.6) }}>Veg</Text>
                                                    </View>
                                                ) : (
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                                                        <View style={{ width: 12, height: 12, borderColor: '#000', borderWidth: 1.2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                                                            <Icon4 name="caretup" size={8} color={'#cb202d'} style={{ margin: 0, paddingTop: 1, alignSelf: 'center' }} />
                                                        </View>
                                                        <Text style={{ color: offWhite, fontWeight: '600', fontSize: responsiveFontSize(1.6) }}>Non-veg</Text>
                                                    </View>
                                                ))
                                            }
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                                                <Icon2 name="scale-bathroom" size={14} color={'#000'} style={{ marginLeft: -1.5 }} />
                                                <Text style={{ color: offWhite, fontWeight: '600', fontSize: responsiveFontSize(1.6) }}>{item?.size} {item?.unit}</Text>
                                            </View>
                                        </View>

                                        {/* Quantity updations */}
                                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                            {/* Minus */}
                                            <TouchableOpacity disabled={item?.quantity === 1} onPress={() => decrementQuantity(item?.id, item?.quantity)} style={{ paddingVertical: 4, paddingHorizontal: 6, borderRadius: 6, borderColor: backIconColor, borderWidth: 1.3, backgroundColor: lightGreen, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                                <Icon3 name="minus" size={13} color={'#000'} />
                                            </TouchableOpacity>

                                            {/* Quantity */}
                                            <View style={{ width: 27, justifyContent: 'center', alignItems: 'center' }}>
                                                {quantityLoading && item?.quantity != 1 && changeQuantityId === item?.id ? (
                                                    <ActivityIndicator size='small' color={darkGreen} />
                                                ) : (
                                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2.1), fontWeight: '700' }}>
                                                        {item?.quantity}
                                                    </Text>
                                                )}
                                            </View>

                                            {/* Plus */}
                                            <TouchableOpacity onPress={() => incrementQuantity(item?.id, item?.quantity, item?.in_stock, item?.name)} style={{ paddingVertical: 4, paddingHorizontal: 6, borderRadius: 6, borderColor: backIconColor, borderWidth: 1.3, backgroundColor: lightGreen, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                                <Icon3 name="plus" size={13} color={'#000'} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    {/* Price */}
                                    <View style={{ flexDirection: 'column', justifyContent: 'flex-start', paddingBottom: 25 }}>
                                        <Text style={{ color: '#000', fontWeight: '800', fontSize: responsiveFontSize(2.2) }}>₹{item?.price * item?.quantity}.00</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Delete button */}
                            <TouchableOpacity onPress={() => deleteItemFromCart(item.id)} style={{ elevation: 2, position: 'absolute', width: 27, height: 27, backgroundColor: '#fceced', top: 0, right: 0, borderBottomLeftRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                {deletingProductId === item?.id ? (
                                    <ActivityIndicator size='small' color={'#cb202d'} />
                                ) : (
                                    <Icon name="delete" size={18} color={'#cb202d'} />
                                )}
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Cart Total */}
                {!loading && cartProducts?.length != 0 && (
                    <View style={{ backgroundColor: '#fff', marginTop: 10, elevation: 1, borderRadius: 12, overflow: 'hidden', margin: 10 }}>
                        {/* Heading */}
                        <View style={{ backgroundColor: darkGreen, paddingTop: 10, flexDirection: 'row', alignItems: 'flex-end', gap: 4, justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(2), fontWeight: '600', textTransform: 'uppercase', color: '#000', marginBottom: 10 }}>Price Details</Text>
                            <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(1.9), fontWeight: '500', color: '#000', marginBottom: 10 }}>({cartProducts?.length} {cartProducts?.length === 1 ? 'item' : 'items'})</Text>
                        </View>

                        {/* Total Details */}
                        <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%', marginTop: 5, gap: 4, paddingHorizontal: 20, padding: 7 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#000', fontWeight: '400', fontSize: responsiveFontSize(1.8) }}>Total MRP</Text>
                                <Text style={{ color: '#000', fontWeight: '500', fontSize: responsiveFontSize(1.9) }}>₹{cartProductsSubTotal()}.00</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#000', fontWeight: '400', fontSize: responsiveFontSize(1.8) }}>Discount on MRP</Text>
                                <Text style={{ color: '#000', fontWeight: '500', fontSize: responsiveFontSize(1.9) }}>₹{totalDiscount()}.00</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#000', fontWeight: '400', fontSize: responsiveFontSize(1.8) }}>Delivery Charges</Text>
                                <Text style={{ color: '#000', fontWeight: '500', fontSize: responsiveFontSize(1.9) }}>₹20.00</Text>
                            </View>
                            {/* <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#000', fontWeight: '400', fontSize: responsiveFontSize(1.8) }}>Additional Charges</Text>
                                <Text style={{ color: '#000', fontWeight: '500', fontSize: responsiveFontSize(1.9) }}>₹20.00</Text>
                            </View> */}
                            <View style={{ borderStyle: 'dashed', borderWidth: 0.6, borderColor: offWhite, marginVertical: 5 }}></View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between', paddingVertical: 3 }}>
                                <Text style={{ color: '#000', fontWeight: '700', fontSize: responsiveFontSize(2.1) }}>Total Amount</Text>
                                <Text style={{ color: '#000', fontWeight: '700', fontSize: responsiveFontSize(2.1) }}>₹{cartProductsSubTotal() + 20 - totalDiscount()}.00</Text>
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* Continue button */}
            {!loading && cartProducts?.length !== 0 && (
                <TouchableOpacity onPress={() => navigation.navigate('Checkout')} style={{ alignSelf: 'center', position: 'absolute', bottom: 10, backgroundColor: lightGreen, borderRadius: 12, width: '95%', padding: 10, height: 45, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, borderColor: backIconColor, borderWidth: 1.3 }}>
                    <Text style={{ color: backIconColor, fontWeight: '700', textAlign: 'center', fontSize: responsiveFontSize(2.2), textTransform: 'uppercase' }}>Continue</Text>
                    <Animated.View style={{ transform: [{ translateX: moveAnim }] }}>
                        <Icon4 name="arrowright" size={20} color={backIconColor} />
                    </Animated.View>
                </TouchableOpacity>
            )}
        </SafeAreaView>
    )
}

export default Cart;