import { useEffect, useState } from 'react';
import { Alert, Dimensions, Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { background, backIconColor, darkGreen, lightGreen, offWhite } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/AntDesign';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome6';
import Icon4 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon6 from 'react-native-vector-icons/dist/Entypo';
import StarRatingDetails from '../components/StarRatingDetails';
import StarRating from '../components/StarRating';
import { addItemToCart, decrementItem, updateProduct } from '../redux/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCakes } from '../utils/fetchCakes';
import { fetchGroceries } from '../utils/fetchGroceries';
import { fetchRestaurants } from '../utils/fetchRestaurants';
import axios from 'axios';

const { width: screenWidth } = Dimensions.get('window');

const ProductDetails = ({ route }) => {

    const product = route?.params?.data;
    // console.log('product', product);

    const type = product?.type;

    const userDetails = useSelector(state => state.user);

    const navigation = useNavigation();

    const dispatch = useDispatch();

    const [cartProducts, setCartProducts] = useState(null);

    const [relatedProducts, setRelatedProducts] = useState(null);

    // const [quantity, setQuantity] = useState(1);

    const [unit, setUnit] = useState(null);

    const [error, setError] = useState(false);

    const [loading, setLoading] = useState(false);

    const [isPresentInTheCart, setIsPresentInTheCart] = useState(null);

    // Error
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(false), 3000); // Hide error after 3 seconds
            return () => clearTimeout(timer); // Cleanup timer if the component unmounts
        }
    }, [error]);

    // Fetch related products
    useEffect(() => {
        const fetchData = async () => {
            try {
                let data = []; // Initialize an empty array to store fetched data

                // Conditionally call the appropriate fetch function based on the type
                if (type === '1') {
                    data = await fetchCakes(userDetails); // Pass userDetails if needed
                } else if (type === '2') {
                    data = await fetchGroceries(userDetails); // Pass userDetails if needed
                } else if (type === '3') {
                    data = await fetchRestaurants(userDetails); // Pass userDetails if needed
                }

                setRelatedProducts(data || []); // Set the fetched data

            } catch (error) {
                Alert.alert("Error fetching related products", error.message); // Log errors if any
            }
        };

        fetchData(); // Call the async function inside useEffect
    }, [userDetails, type]);

    // Fetch cart products
    useEffect(() => {
        const getCartProducts = async () => {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${userDetails[0]?.accessToken}`;
                const response = await axios.get('/user/cart/fetch');

                setCartProducts(response?.data?.data);
            } catch (error) {
                Alert.alert("Error", error.message); // Add a title to the alert
                return null; // Return null in case of error
            }
        }
        getCartProducts();
    }, []);

    useEffect(() => {
        setIsPresentInTheCart(cartProducts?.find(item => item.product_id === product.id))
    }, [addToCart, cartProducts]);

    const discountPercentage = (price, discountedPrice) => {
        const num = (price - discountedPrice) / price;
        return Math.floor(num * 100);
    };

    console.log('isPresentInTheCart', isPresentInTheCart);

    const addToCart = async () => {
        try {
            setLoading(true);
            // Data object as per the API requirement
            const data = {
                product_id: product?.id,
                product_size_id: unit?.id,
                quantity: 1,
            };
            // API Call using axios
            const response = await axios.post(`user/cart/add`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('responseadddd', response?.data?.data);
            setLoading(false);
        } catch (error) {
            // Handle error response
            if (error.response) {
                Alert.alert("Error", error.response.data.message || "Something went wrong. Please try again.");
            } else {
                Alert.alert("Error", "Network error. Please check your internet connection and try again.");
            }
        }
    }

    useEffect(() => {
        if (isPresentInTheCart) {
            setUnit(isPresentInTheCart.units);
        }
    }, []);

    const unitSelector = (item) => {
        if (isPresentInTheCart) {
            setUnit(item);
            dispatch(updateProduct({
                id: isPresentInTheCart.id, // ID of the product you want to update
                updatedUnits: item,
            }));
        } else {
            if (unit?.id === item.id) {
                setUnit(null); // Set to null if the IDs match
            } else {
                setUnit(item); // Otherwise, update unit with the new item
            }
        }
    };

    const decrementQuantity = (item) => {
        if (isPresentInTheCart.qty === 1) {
            return;
        } else {
            dispatch(decrementItem(item));
        }
    };

    const relatedProductsHandler = (item) => {
        navigation.navigate('ProductDetails', { data: item })
        setUnit(null);
    };

    console.log('cartProducts', cartProducts);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
            <StatusBar
                animated={true}
                backgroundColor='#dff1dd'
                barStyle="dark-content"
            />

            {/* Header and Image */}
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
                    <Image source={{ uri: product?.image }} style={{ width: '100%', height: 200, resizeMode: 'contain' }} />
                </View>
            </View>

            {/* Details */}
            <ScrollView>
                <View style={{ paddingTop: 10, flexDirection: 'column', alignItems: 'flex-start', gap: 6, }}>
                    {/* Name */}
                    <View style={{ paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <Text style={{ color: '#000', fontSize: responsiveFontSize(2.6), fontWeight: '700' }}>{product.name}</Text>
                        {product?.type != '2' && (
                            <View style={{ flexDirection: 'row', marginVertical: 6, alignItems: 'center', gap: 3, backgroundColor: '#fff', borderColor: offWhite, borderWidth: 0.8, padding: 5, borderRadius: 7 }}>
                                {product?.veg_type === '1' ? (
                                    <View style={{ width: 17, height: 17, borderColor: '#000', borderWidth: 1.5, borderRadius: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <View style={{ backgroundColor: 'green', width: 9, height: 9, borderRadius: 10, }}>
                                        </View>
                                    </View>
                                ) : (
                                    <View style={{ width: 17, height: 17, borderColor: '#000', borderWidth: 1.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                                        <Icon2 name="caretup" size={12} color={'#cb202d'} style={{ margin: 0, padding: 0, alignSelf: 'center' }} />
                                    </View>
                                )}
                                <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(1.8) }}>{product?.veg_type === '1' ? 'Veg' : 'Non-Veg'}</Text>
                            </View>
                        )}
                    </View>

                    {/* Star rating */}
                    <View style={{ paddingHorizontal: 13, }}>
                        <StarRatingDetails rating={4} />
                        {/* <StarRatingDetails rating={product.starRating} /> */}
                    </View>

                    {/* Price and quantity */}
                    <View style={{ paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 8 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 3 }}>
                            <Text style={{ fontSize: responsiveFontSize(2.8), color: '#019934', fontWeight: '800' }}>₹{product?.min_price}</Text>
                            <Text style={{ fontSize: responsiveFontSize(1.8), color: offWhite, fontWeight: '600', paddingBottom: 2, textDecorationLine: 'line-through' }}>₹{product?.min_mrp}</Text>
                        </View>

                        {/* Quantity */}
                        {/* <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (isPresentInTheCart) {
                                        decrementQuantity(product);
                                    } else if (quantity > 1) {
                                        setQuantity(prev => prev - 1);
                                    }
                                }}
                            >
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
                        </View> */}
                    </View>

                    {/* Unit */}
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ paddingHorizontal: 13, color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.3), textTransform: 'uppercase' }}>Select Unit:</Text>

                        {/* Error message */}
                        {error && (
                            <View style={{ marginHorizontal: 13, paddingLeft: 10, paddingRight: 4, backgroundColor: '#fceced', borderRadius: 7, borderColor: '#cb202d', borderWidth: 0.5, marginTop: 4, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingVertical: 2 }}>
                                <Text style={{ color: '#cb202d', fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>Please select a unit</Text>
                                <TouchableOpacity onPress={() => setError(false)}>
                                    <Icon6 name="squared-cross" size={23} color={'#cb202d'} />
                                </TouchableOpacity>
                            </View>
                        )}

                        <View style={{ paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', paddingTop: 10, justifyContent: product.productSize.length == 2 ? '' : 'space-between', width: screenWidth, gap: product.productSize.length == 2 ? 13 : 0 }}>
                            {product?.productSize?.map(it => (
                                <TouchableOpacity onPress={() => unitSelector(it)} style={{ elevation: 1, backgroundColor: unit?.id === it.id ? darkGreen : '#d8f4f8', width: screenWidth / 3.5, height: screenWidth / 3.5, overflow: 'hidden', borderRadius: 12, flexDirection: 'column', transform: [{ scale: unit?.id === it.id ? 1.07 : 1 }], }} key={it.id}>
                                    <View style={{ height: '22%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: '#000', fontSize: responsiveFontSize(1.6), fontWeight: '600' }}>{discountPercentage(it.mrp, it.price)}% off</Text>
                                    </View>
                                    <View style={{ height: '78%', backgroundColor: unit?.id === it.id ? lightGreen : '#fff', borderRadius: 12, borderColor: unit?.id === it.id ? backIconColor : offWhite, borderWidth: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 3 }}>
                                        <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9), fontWeight: '500' }}>{it.size_name}</Text>
                                        <Text style={{ color: '#000', fontWeight: '800', fontSize: responsiveFontSize(2.2) }}>₹{it.price}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                                            <Text style={{ color: offWhite, fontWeight: '400', fontSize: responsiveFontSize(1.8) }}>MRP</Text>
                                            <Text style={{ color: offWhite, fontWeight: '400', fontSize: responsiveFontSize(1.8), textDecorationLine: 'line-through', }}>₹{it.mrp}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Product details */}
                    <View style={{ paddingHorizontal: 13, marginTop: 20, flexDirection: 'column', gap: 4, width: '100%' }}>
                        <Text style={{ color: '#000', fontSize: responsiveFontSize(2.3), fontWeight: '600', textTransform: 'uppercase' }}>Product Details :</Text>
                        <Text style={{ color: '#a4a4a4', fontWeight: '400', fontSize: responsiveFontSize(1.9), width: '97%' }}>{product.long_description}</Text>
                    </View>

                    {/* Related products */}
                    <View style={{ paddingHorizontal: 13, flexDirection: 'column', gap: 5, marginTop: 20, marginBottom: 55 }}>
                        <Text style={{ fontSize: responsiveFontSize(2.3), fontWeight: '600', color: '#000', textTransform: 'uppercase', marginBottom: 5 }}>Related Products :</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }}>
                            {relatedProducts?.slice(0, 4)?.map(item => (
                                <TouchableOpacity onPress={() => relatedProductsHandler(item)} key={item?.id} style={{ width: '48%', marginVertical: 6, backgroundColor: '#fff', borderTopLeftRadius: 14, borderTopRightRadius: 14, borderBottomLeftRadius: 14, borderBottomRightRadius: 20, overflow: 'hidden', elevation: 2 }}>

                                    {/* Wishlist */}
                                    <TouchableOpacity style={{ zIndex: 10, backgroundColor: '#c6e6c3', borderRadius: 50, position: 'absolute', top: 8, right: 8, width: 30, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon name="favorite-border" size={18} color={'#019934'} />
                                    </TouchableOpacity>

                                    {/* Image */}
                                    <View style={{ backgroundColor: lightGreen, borderRadius: 12, margin: 3 }}>
                                        <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={{ uri: item?.image }} style={{ width: '100%', height: 100, resizeMode: 'contain' }} />
                                        </View>
                                    </View>

                                    <View style={{ padding: 10 }}>
                                        <View style={{ flexDirection: 'column', gap: 3 }}>
                                            <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '600', color: '#000' }} numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                                {/* <StarRating rating={item.starRating} /> */}
                                                <StarRating rating={4} />
                                                <View style={{ backgroundColor: backIconColor, paddingVertical: 2, paddingHorizontal: 4, gap: 2, borderRadius: 5, flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.5), fontWeight: '500' }}>4</Text>
                                                    {/* <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.5), fontWeight: '500' }}>{item.starRating}</Text> */}
                                                    <Icon2 name="star" size={10} color={'#fff'} style={{ margin: 0, padding: 0, alignSelf: 'center' }} />
                                                </View>
                                            </View>
                                        </View>

                                        {type !== '2' && (
                                            <View style={{ flexDirection: 'row', marginVertical: 6, alignItems: 'center', gap: 3 }}>
                                                {item?.veg_type === '1' ? (
                                                    <View style={{ width: 17, height: 17, borderColor: '#000', borderWidth: 1.5, borderRadius: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                        <View style={{ backgroundColor: 'green', width: 9, height: 9, borderRadius: 10, }}>
                                                        </View>
                                                    </View>
                                                ) : (
                                                    <View style={{ width: 17, height: 17, borderColor: '#000', borderWidth: 1.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                                                        <Icon2 name="caretup" size={12} color={'#cb202d'} style={{ margin: 0, padding: 0, alignSelf: 'center' }} />
                                                    </View>
                                                )}
                                                <Text style={{ color: offWhite, fontWeight: '600', fontSize: responsiveFontSize(1.8) }}>{item?.veg_type === '1' ? 'Veg' : 'Non-Veg'}</Text>
                                            </View>
                                        )}

                                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 3, marginTop: type !== '2' ? 0 : 5 }}>
                                            <Text style={{ fontSize: responsiveFontSize(2.3), color: '#019934', fontWeight: '800' }}>₹{item?.min_price}</Text>
                                            <Text style={{ fontSize: responsiveFontSize(1.5), color: offWhite, fontWeight: '600', paddingBottom: 2, textDecorationLine: 'line-through' }}>₹{item?.min_mrp}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={{ paddingHorizontal: 12, position: 'absolute', bottom: 3, width: '100%', backgroundColor: background }}>
                <TouchableOpacity
                    style={{
                        gap: 5,
                        backgroundColor: isPresentInTheCart ? lightGreen : darkGreen,
                        paddingHorizontal: 30,
                        height: 47,
                        borderRadius: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderColor: isPresentInTheCart ? backIconColor : '#000',
                        borderWidth: 1.5,
                        width: '100%',
                        justifyContent: 'center'
                    }}
                    onPress={() => {
                        if (unit !== null) {
                            addToCart();
                        } else {
                            setError(true);
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
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2.5), fontWeight: '500' }}>Add to cart</Text>
                            <Icon name="add-shopping-cart" size={19} color={'#000'} />
                        </View>
                    )}
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default ProductDetails;

{/* Total price */ }
{/* <View style={{ width: '40%', height: '100%', flexDirection: 'column', justifyContent: 'center', gap: 3 }}>
                    <Text style={{ color: '#b0b0b0', fontWeight: '600', fontSize: responsiveFontSize(1.7) }}>Total Price</Text>
                    {isPresentInTheCart ? (
                        <Text style={{ color: '#000', fontSize: responsiveFontSize(3), fontWeight: '600' }}>₹{isPresentInTheCart.units.price * isPresentInTheCart.qty}</Text>
                    ) : (
                        <Text style={{ color: '#000', fontSize: responsiveFontSize(3), fontWeight: '600' }}>₹0</Text>
                    )}
                </View> */}