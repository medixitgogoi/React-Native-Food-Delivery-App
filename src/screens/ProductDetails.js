import { useState } from 'react';
import { Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { background, backIconColor, darkGreen, lightGreen, offWhite } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/AntDesign';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome6';
import Icon4 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon5 from 'react-native-vector-icons/dist/Ionicons';
import StarRatingDetails from '../components/StarRatingDetails';
import { groceries } from '../utils/groceries';
import { restaurants } from '../utils/restaurants';
import { cakes } from '../utils/cakes';
import StarRating from '../components/StarRating';
import { addItemToCart, decrementItem } from '../redux/CartSlice';
import { useDispatch, useSelector } from 'react-redux';

const { width: screenWidth } = Dimensions.get('window');

const ProductDetails = ({ route }) => {

    const product = route?.params?.data;
    // console.log('product', product);

    const navigation = useNavigation();

    const dispatch = useDispatch();

    const cartProducts = useSelector(state => state.cart);
    // console.log('cartProducts', cartProducts);

    const [quantity, setQuantity] = useState(1);

    const [unit, setUnit] = useState(null);

    const [error, setError] = useState(false);

    const grocerySizes = [
        { title: 'kg', },
        { title: 'gm', },
    ];

    const restaurantSizes = [
        { title: 'Half plate', },
        { title: 'Full plate', },
    ];

    const cakeSizes = [
        { title: '1/2 Kg', },
        { title: '1 Kg', },
    ];

    const [selectedSize, setSelectedSize] = useState(null);

    const relatedGroceryProducts = groceries.filter(item => item.id < 5);
    const relatedRestaurantProducts = restaurants.filter(item => item.id < 25);
    const relatedCakeProducts = cakes.filter(item => item.id < 45);

    const renderOrder = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetails')} key={item?.id} style={{ width: screenWidth / 2.2, marginVertical: 6, backgroundColor: '#fff', borderTopLeftRadius: 14, borderTopRightRadius: 14, borderBottomLeftRadius: 14, borderBottomRightRadius: 20, overflow: 'hidden', elevation: 2 }}>

                <TouchableOpacity style={{ zIndex: 10, backgroundColor: '#c6e6c3', borderRadius: 50, position: 'absolute', top: 8, right: 8, width: 30, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="favorite-border" size={18} color={'#019934'} />
                </TouchableOpacity>

                <View style={{ backgroundColor: lightGreen, borderRadius: 12, margin: 3 }}>
                    <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../assets/orange.png')} style={{ width: '100%', height: 100, resizeMode: 'contain' }} />
                    </View>
                </View>

                <View style={{ padding: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '600', color: '#000' }}>{item.name}</Text>
                        <StarRating rating={item.starRating} />
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                        <Text style={{ color: offWhite, fontWeight: '600', fontSize: responsiveFontSize(1.7) }}>{item.subCategory}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                        <Text style={{ fontSize: responsiveFontSize(2.3), color: '#019934', fontWeight: '700' }}>₹{item.price}</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.8), color: '#6c6c6c', fontWeight: '500' }}>/{item.unit}</Text>
                    </View>
                </View>

            </TouchableOpacity>
        )
    }

    const discountPercentage = (price, discountedPrice) => {
        const num = (price - discountedPrice) / price;
        return Math.floor(num * 100);
    }

    const isPresentInTheCart = cartProducts.find(item => item.id === product.id);

    const decrementQuantity = (item) => {
        if (isPresentInTheCart.qty === 1) {
            return;
        } else {
            dispatch(decrementItem(item));
        }
    };

    const unitSelector = (item) => {
        if (unit?.id === item.id) {
            setUnit(null); // Set to null if the IDs match
        } else {
            setUnit(item); // Otherwise, update unit with the new item
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
            <StatusBar
                animated={true}
                backgroundColor='#dff1dd'
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ paddingHorizontal: 10, backgroundColor: '#dff1dd', height: '40%', width: '100%', flexDirection: 'column', paddingVertical: 8, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '13%' }}>
                    <TouchableOpacity style={{ width: 32, height: 32, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 8, elevation: 3 }} onPress={() => navigation.goBack()}>
                        <Icon name="keyboard-arrow-left" size={23} color={'#000'} />
                    </TouchableOpacity>
                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2.4), fontWeight: '600' }}>Details</Text>
                    <TouchableOpacity
                        style={{ backgroundColor: '#fff', width: 32, height: 32, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', elevation: 5 }}
                        onPress={() => navigation.navigate('Cart')}
                    >
                        <Icon4 name="shopping" size={20} color={'#000'} />
                    </TouchableOpacity>
                </View>
                <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '87%' }}>
                    {product.type === 'grocery' ? (
                        <Image source={require('../assets/orange.png')} style={{ width: '100%', height: 200, resizeMode: 'contain' }} />
                    ) : product.type === 'restaurant' ? (
                        <Image source={require('../assets/rice.png')} style={{ width: '100%', height: 200, resizeMode: 'contain' }} />
                    ) : (
                        <Image source={require('../assets/cake.png')} style={{ width: '100%', height: 200, resizeMode: 'contain' }} />
                    )}
                </View>
            </View>

            {/* Details */}
            <ScrollView>
                <View style={{ paddingTop: 10, flexDirection: 'column', alignItems: 'flex-start', gap: 6, }}>
                    {/* name */}
                    <View style={{ paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <Text style={{ color: '#000', fontSize: responsiveFontSize(2.6), fontWeight: '700' }}>{product.name}</Text>
                        {product.type != 'grocery' && (
                            <View style={{ flexDirection: 'row', marginVertical: 6, alignItems: 'center', gap: 3, backgroundColor: '#fff', borderColor: offWhite, borderWidth: 0.8, padding: 5, borderRadius: 7 }}>
                                {product?.subCategory === 'Veg' ? (
                                    <View style={{ width: 17, height: 17, borderColor: '#000', borderWidth: 1.5, borderRadius: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <View style={{ backgroundColor: 'green', width: 9, height: 9, borderRadius: 10, }}>
                                        </View>
                                    </View>
                                ) : (
                                    <View style={{ width: 17, height: 17, borderColor: '#000', borderWidth: 1.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                                        <Icon2 name="caretup" size={12} color={'#cb202d'} style={{ margin: 0, padding: 0, alignSelf: 'center' }} />
                                    </View>
                                )}
                                <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(1.8) }}>{product?.subCategory}</Text>
                            </View>
                        )}
                    </View>

                    <View style={{ paddingHorizontal: 13, }}>
                        <StarRatingDetails rating={product.starRating} />
                    </View>

                    {/* price */}
                    <View style={{ paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 8 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 3 }}>
                            <Text style={{ fontSize: responsiveFontSize(2.8), color: '#019934', fontWeight: '800' }}>₹{product.units[0].discountedPrice}</Text>
                            <Text style={{ fontSize: responsiveFontSize(1.8), color: offWhite, fontWeight: '600', paddingBottom: 2, textDecorationLine: 'line-through' }}>₹{product.units[0].price}</Text>
                            {/* <Text style={{ fontSize: responsiveFontSize(1.8), color: '#6c6c6c', fontWeight: '500' }}>/kg</Text> */}
                        </View>

                        {/* quantity */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <TouchableOpacity onPress={() => {
                                if (isPresentInTheCart) {
                                    decrementQuantity(product);
                                } else if (quantity > 1) {
                                    setQuantity(prev => prev - 1);
                                }
                            }}>
                                <Icon3 name="circle-minus" size={30} color={backIconColor} />
                            </TouchableOpacity>

                            {isPresentInTheCart ? (
                                <Text style={{ color: '#000', fontWeight: '500', fontSize: responsiveFontSize(2.3) }}>{isPresentInTheCart.qty}</Text>
                            ) : (
                                <Text style={{ color: '#000', fontWeight: '500', fontSize: responsiveFontSize(2.3) }}>{quantity}</Text>
                            )}
                            <TouchableOpacity onPress={() => isPresentInTheCart ? dispatch(addItemToCart(product)) : setQuantity(prev => prev + 1)}>
                                <Icon3 name="circle-plus" size={30} color={backIconColor} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* unit */}
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ paddingHorizontal: 13, color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.3), textTransform: 'uppercase' }}>Select Unit:</Text>
                        <View style={{ paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', paddingTop: 10, justifyContent: product.units.length == 2 ? '' : 'space-between', width: screenWidth, gap: product.units.length == 2 ? 13 : 0 }}>

                            {product?.units?.map(it => (
                                <TouchableOpacity onPress={() => unitSelector(it)} style={{ elevation: 1, backgroundColor: unit?.id === it.id ? darkGreen : '#d8f4f8', width: screenWidth / 3.5, height: screenWidth / 3.5, overflow: 'hidden', borderRadius: 12, flexDirection: 'column', transform: [{ scale: unit?.id === it.id ? 1.07 : 1 }], }} key={it.id}>
                                    <View style={{ height: '22%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: '#000', fontSize: responsiveFontSize(1.6), fontWeight: '600' }}>{discountPercentage(it.price, it.discountedPrice)}% off</Text>
                                    </View>
                                    <View style={{ height: '78%', backgroundColor: unit?.id === it.id ? lightGreen : '#fff', borderRadius: 12, borderColor: unit?.id === it.id ? backIconColor : offWhite, borderWidth: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 3 }}>
                                        <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9), fontWeight: '500' }}>{it.unit}</Text>
                                        <Text style={{ color: '#000', fontWeight: '800', fontSize: responsiveFontSize(2.2) }}>₹{it.discountedPrice}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                                            <Text style={{ color: offWhite, fontWeight: '400', fontSize: responsiveFontSize(1.8) }}>MRP</Text>
                                            <Text style={{ color: offWhite, fontWeight: '400', fontSize: responsiveFontSize(1.8), textDecorationLine: 'line-through', }}>₹{it.price}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}

                            {/* <TouchableOpacity style={{ elevation: 1, backgroundColor: lightGreen, width: screenWidth / 3.5, height: screenWidth / 3.5, overflow: 'hidden', borderRadius: 12, flexDirection: 'column' }}>
                                <View style={{ height: '22%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(1.6), fontWeight: '600' }}>10% off</Text>
                                </View>
                                <View style={{ height: '78%', backgroundColor: '#fff', borderRadius: 12, borderColor: backIconColor, borderWidth: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 3 }}>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>1 Kg</Text>
                                    <Text style={{ color: '#000', fontWeight: '800', fontSize: responsiveFontSize(2.2) }}>₹370</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                                        <Text style={{ color: offWhite, fontWeight: '400', fontSize: responsiveFontSize(1.8) }}>MRP</Text>
                                        <Text style={{ color: offWhite, fontWeight: '400', fontSize: responsiveFontSize(1.8), textDecorationLine: 'line-through', }}>₹349</Text>
                                    </View>
                                </View>
                            </TouchableOpacity> */}

                            {/* when selected */}
                            {/* <TouchableOpacity style={{ elevation: 1, backgroundColor: lightGreen, width: 90, height: 90, overflow: 'hidden', borderRadius: 12, flexDirection: 'column' }}>
                                <View style={{ height: '22%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(1.6), fontWeight: '600' }}>10% off</Text>
                                </View>
                                <View style={{ height: '78%', backgroundColor: '#fff', borderRadius: 12, borderColor: backIconColor, borderWidth: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 3 }}>
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9) }}>1 Kg</Text>
                                    <Text style={{ color: '#000', fontWeight: '800', fontSize: responsiveFontSize(2.2) }}>₹370</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                                        <Text style={{ color: offWhite, fontWeight: '400', fontSize: responsiveFontSize(1.8) }}>MRP</Text>
                                        <Text style={{ color: offWhite, fontWeight: '400', fontSize: responsiveFontSize(1.8), textDecorationLine: 'line-through', }}>₹349</Text>
                                    </View>
                                </View>
                            </TouchableOpacity> */}

                        </View>
                    </View>

                    {/* product details */}
                    <View style={{ paddingHorizontal: 13, marginTop: 20, flexDirection: 'column', gap: 4, width: '100%' }}>
                        <Text style={{ color: '#000', fontSize: responsiveFontSize(2.3), fontWeight: '600', textTransform: 'uppercase' }}>Product Details :</Text>
                        <Text style={{ color: '#a4a4a4', fontWeight: '400', fontSize: responsiveFontSize(1.9), width: '97%' }}>{product.description}</Text>
                    </View>

                    {/* related products */}
                    <View style={{ paddingHorizontal: 13, flexDirection: 'column', gap: 5, marginTop: 20, marginBottom: 80 }}>
                        <Text style={{ fontSize: responsiveFontSize(2.3), fontWeight: '600', color: '#000', textTransform: 'uppercase', marginBottom: 5 }}>Related Products :</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap', justifyContent: 'space-between' }}>
                            {product.type === 'grocery' && relatedGroceryProducts.map(item => (
                                <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { data: item })} key={item?.id} style={{ width: screenWidth / 2.23, backgroundColor: '#fff', borderTopLeftRadius: 14, borderTopRightRadius: 14, borderBottomLeftRadius: 14, borderBottomRightRadius: 20, overflow: 'hidden', elevation: 2 }}>

                                    <TouchableOpacity style={{ zIndex: 10, backgroundColor: '#c6e6c3', borderRadius: 50, position: 'absolute', top: 8, right: 8, width: 30, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon name="favorite-border" size={18} color={'#019934'} />
                                    </TouchableOpacity>

                                    <View style={{ backgroundColor: lightGreen, borderRadius: 12, margin: 3 }}>
                                        <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={require('../assets/orange.png')} style={{ width: '100%', height: 100, resizeMode: 'contain' }} />
                                        </View>
                                    </View>

                                    <View style={{ padding: 10 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                            <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '600', color: '#000' }}>{item.name}</Text>
                                            <StarRating rating={item.starRating} />
                                        </View>
                                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                            <Text style={{ color: offWhite, fontWeight: '600', fontSize: responsiveFontSize(1.7) }}>{item.subCategory}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 3 }}>
                                            <Text style={{ fontSize: responsiveFontSize(2.3), color: '#019934', fontWeight: '800' }}>₹{item.units[0].discountedPrice}</Text>
                                            <Text style={{ fontSize: responsiveFontSize(1.5), color: offWhite, fontWeight: '600', paddingBottom: 2, textDecorationLine: 'line-through' }}>₹{item.units[0].price}</Text>
                                        </View>
                                    </View>

                                </TouchableOpacity>
                            ))}

                            {product.type === 'restaurant' && relatedRestaurantProducts.map(item => (
                                <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { data: item })} key={item?.id} style={{ width: screenWidth / 2.2, backgroundColor: '#fff', borderTopLeftRadius: 14, borderTopRightRadius: 14, borderBottomLeftRadius: 14, borderBottomRightRadius: 20, overflow: 'hidden', elevation: 2 }}>

                                    <TouchableOpacity style={{ zIndex: 10, backgroundColor: '#c6e6c3', borderRadius: 50, position: 'absolute', top: 8, right: 8, width: 30, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon name="favorite-border" size={18} color={'#019934'} />
                                    </TouchableOpacity>

                                    <View style={{ backgroundColor: lightGreen, borderRadius: 12, margin: 3 }}>
                                        <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={require('../assets/rice.png')} style={{ width: '100%', height: 100, resizeMode: 'contain' }} />
                                        </View>
                                    </View>

                                    <View style={{ padding: 10 }}>
                                        <View style={{ flexDirection: 'column', gap: 3 }}>
                                            <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '600', color: '#000' }} numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                                <StarRating rating={item.starRating} />
                                                <View style={{ backgroundColor: backIconColor, paddingVertical: 2, paddingHorizontal: 4, gap: 2, borderRadius: 5, flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.5), fontWeight: '500' }}>{item.starRating}</Text>
                                                    <Icon5 name="star" size={10} color={'#fff'} style={{ margin: 0, padding: 0, alignSelf: 'center' }} />
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginVertical: 6, alignItems: 'center', gap: 3 }}>
                                            {item.subCategory === 'Veg' ? (
                                                <View style={{ width: 17, height: 17, borderColor: '#000', borderWidth: 1.5, borderRadius: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                    <View style={{ backgroundColor: 'green', width: 9, height: 9, borderRadius: 10, }}>
                                                    </View>
                                                </View>
                                            ) : (
                                                <View style={{ width: 17, height: 17, borderColor: '#000', borderWidth: 1.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                                                    <Icon2 name="caretup" size={12} color={'#cb202d'} style={{ margin: 0, padding: 0, alignSelf: 'center' }} />
                                                </View>
                                            )}
                                            <Text style={{ color: offWhite, fontWeight: '600', fontSize: responsiveFontSize(1.7) }}>{item.subCategory}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 3 }}>
                                            <Text style={{ fontSize: responsiveFontSize(2.3), color: '#019934', fontWeight: '800' }}>₹{item.units[0].discountedPrice}</Text>
                                            <Text style={{ fontSize: responsiveFontSize(1.5), color: offWhite, fontWeight: '600', paddingBottom: 2, textDecorationLine: 'line-through' }}>₹{item.units[0].price}</Text>
                                        </View>
                                    </View>

                                    {/* <TouchableOpacity style={{ backgroundColor: '#019934', borderTopLeftRadius: 10, width: 35, height: 35, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0, right: 0 }}>
                                        <Icon3 name="add" size={20} color="#fff" />
                                    </TouchableOpacity> */}

                                </TouchableOpacity>
                            ))}

                            {product.type === 'cake' && relatedCakeProducts.map(item => (
                                <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { data: item })} key={item?.id} style={{ width: screenWidth / 2.2, backgroundColor: '#fff', borderTopLeftRadius: 14, borderTopRightRadius: 14, borderBottomLeftRadius: 14, borderBottomRightRadius: 20, overflow: 'hidden', elevation: 2 }}>

                                    <TouchableOpacity style={{ zIndex: 10, backgroundColor: '#c6e6c3', borderRadius: 50, position: 'absolute', top: 8, right: 8, width: 30, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon name="favorite-border" size={18} color={'#019934'} />
                                    </TouchableOpacity>

                                    <View style={{ backgroundColor: lightGreen, borderRadius: 12, margin: 3 }}>
                                        <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={require('../assets/cake.png')} style={{ width: '100%', height: 100, resizeMode: 'contain' }} />
                                        </View>
                                    </View>

                                    <View style={{ padding: 10 }}>
                                        <View style={{ flexDirection: 'column', gap: 3 }}>
                                            <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '600', color: '#000' }} numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                                <StarRating rating={item.starRating} />
                                                <View style={{ backgroundColor: backIconColor, paddingVertical: 2, paddingHorizontal: 4, gap: 2, borderRadius: 5, flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.5), fontWeight: '500' }}>{item.starRating}</Text>
                                                    <Icon5 name="star" size={10} color={'#fff'} style={{ margin: 0, padding: 0, alignSelf: 'center' }} />
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginVertical: 8, alignItems: 'center', gap: 3 }}>
                                            {item.subCategory === 'Veg' ? (
                                                <View style={{ width: 17, height: 16, borderColor: '#000', borderWidth: 1.5, borderRadius: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                    <View style={{ backgroundColor: 'green', width: 9, height: 9, borderRadius: 10, }}></View>
                                                </View>
                                            ) : (
                                                <View style={{ width: 17, height: 16, borderColor: '#000', borderWidth: 1.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                                                    <Icon2 name="caretup" size={12} color={'#cb202d'} style={{ margin: 0, padding: 0, alignSelf: 'center' }} />
                                                </View>
                                            )}
                                            <Text style={{ color: offWhite, fontWeight: '600', fontSize: responsiveFontSize(1.7) }}>{item.subCategory}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 3 }}>
                                            <Text style={{ fontSize: responsiveFontSize(2.3), color: '#019934', fontWeight: '800' }}>₹{item.units[0].discountedPrice}</Text>
                                            <Text style={{ fontSize: responsiveFontSize(1.5), color: offWhite, fontWeight: '600', paddingBottom: 2, textDecorationLine: 'line-through' }}>₹{item.units[0].price}</Text>
                                        </View>
                                    </View>

                                    {/* <TouchableOpacity style={{ backgroundColor: '#019934', borderTopLeftRadius: 10, width: 35, height: 35, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0, right: 0 }}>
                                        <Icon3 name="add" size={20} color="#fff" />
                                    </TouchableOpacity> */}

                                </TouchableOpacity>
                            ))}
                        </View>

                    </View>
                </View>
            </ScrollView>

            {/* Total price and add to cart */}
            <View style={{ backgroundColor: '#fff', position: 'absolute', bottom: 0, width: '100%', height: 70, elevation: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 }}>
                <View style={{ width: '40%', height: '100%', flexDirection: 'column', justifyContent: 'center', gap: 3 }}>
                    <Text style={{ color: '#b0b0b0', fontWeight: '600', fontSize: responsiveFontSize(1.7) }}>Total Price</Text>
                    <Text style={{ color: '#000', fontSize: responsiveFontSize(3), fontWeight: '600' }}>₹1000</Text>
                </View>

                <View style={{ width: '60%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>

                    <TouchableOpacity
                        style={{
                            gap: 5,
                            backgroundColor: isPresentInTheCart ? lightGreen : '#41b24b',
                            paddingHorizontal: 30,
                            height: 43,
                            borderRadius: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderColor: isPresentInTheCart ? backIconColor : '',
                            borderWidth: isPresentInTheCart ? 1.5 : 0
                        }}
                        onPress={() => {
                            if (!isPresentInTheCart) {
                                if (unit !== null) {
                                    dispatch(addItemToCart({ ...product, qty: quantity, units: unit }));
                                } else {
                                    setError(true);
                                }
                            }
                        }}
                        disabled={isPresentInTheCart ? true : false}
                    >
                        {isPresentInTheCart ? (
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                                <Text style={{ color: isPresentInTheCart ? backIconColor : '#fff', fontSize: responsiveFontSize(2.5), fontWeight: '500' }}>Added to cart</Text>
                                <Icon2 name="checkcircle" size={21} color={backIconColor} />
                            </View>
                        ) : (
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                                <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.5), fontWeight: '500' }}>Add to cart</Text>
                                <Icon name="add-shopping-cart" size={19} color={'#fff'} />
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default ProductDetails;

const styles = StyleSheet.create({
    dropdownButtonStyle: {
        width: 110,
        height: 33,
        backgroundColor: darkGreen,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: responsiveFontSize(2),
        fontWeight: '600',
        color: '#000',
    },
    dropdownButtonArrowStyle: {
        fontSize: responsiveFontSize(3),
        color: '#000',
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        // backgroundColor: '#000',
        borderRadius: 10,
        marginTop: 2
    },
    dropdownItemStyle: {
        width: '100%',
        paddingVertical: 7,
        paddingHorizontal: 12,
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: responsiveFontSize(1.9),
        fontWeight: '600',
        color: '#000',
        textAlign: 'center',
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
});