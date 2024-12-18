import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { background, backIconColor, darkGreen, lightGreen, offWhite } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/AntDesign';
import Icon5 from 'react-native-vector-icons/dist/Ionicons';
import Icon6 from 'react-native-vector-icons/dist/Entypo';
import StarRatingDetails from '../components/StarRatingDetails';
import StarRating from '../components/StarRating';
import { addItemToCart } from '../redux/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCakes } from '../utils/fetchCakes';
import { fetchGroceries } from '../utils/fetchGroceries';
import { fetchRestaurants } from '../utils/fetchRestaurants';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import axios from 'axios';
import { addItemToWishlist } from '../redux/WishlistSlice';
import Toast from 'react-native-toast-message';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const { width: screenWidth } = Dimensions.get('window');

const ProductDetails = ({ route }) => {

    const dispatch = useDispatch();

    const productId = route?.params?.data;
    // console.log('productId', productId);

    const [product, setProduct] = useState(null);

    const userDetails = useSelector(state => state.user);
    // console.log('userDetails', userDetails);

    const [cartProducts, setCartProducts] = useState([]);
    const [wishlistProducts, setWishlistProducts] = useState([]);

    const [isPresentInTheCart, setIsPresentInTheCart] = useState({});
    const [isPresentInTheWishlist, setIsPresentInTheWishlist] = useState({});

    const type = product?.type;

    const navigation = useNavigation();

    const [addToCartTrigger, setAddToCartTrigger] = useState(false);
    const [addToWishlistTrigger, setAddToWishlistTrigger] = useState(false);

    const [relatedProducts, setRelatedProducts] = useState(null);

    const [unit, setUnit] = useState(null);

    const [error, setError] = useState(false);

    const [loading, setLoading] = useState(false);
    const [addToCartLoading, setAddToCartLoading] = useState(false);
    const [addToWishlistLoading, setAddToWishlistLoading] = useState(false);

    // fetch Product details
    const getProductDetails = async () => {
        try {
            setLoading(true);
            axios.defaults.headers.common['Authorization'] = `Bearer ${userDetails[0]?.accessToken}`;

            const data = {
                product_id: productId,
            };

            const response = await axios.post(`/user/product/details`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('productDetails', response);

            if (response?.data?.status) {
                setProduct(response?.data?.data);
            }
        } catch (error) {
            Alert.alert('Error', error.message || 'Failed to fetch product details.');
        } finally {
            setLoading(false);
        }
    };

    // getProductDetails useFocusEffect()
    useFocusEffect(
        useCallback(() => {
            getProductDetails();
        }, [userDetails, productId])
    );

    // error handling
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(false), 2000); // Hide error after 3 seconds
            return () => clearTimeout(timer); // Cleanup timer if the component unmounts
        }
    }, [error]);

    // fetch related products
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

                setRelatedProducts(data.filter(item => item.id !== productId) || []); // Set the fetched data
            } catch (error) {
                console.log('error', error);
            }
        };

        fetchData(); // Call the async function inside useEffect
    }, [userDetails, type, productId]);

    // AddToCart
    const addToCart = async () => {
        try {
            setAddToCartLoading(true);

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

            console.log('productDetails', response)

            // Handle success response
            if (response?.data?.status) {
                const cartItem = response?.data?.data; // Extract the cart item from the response

                // Update the cart in Redux
                dispatch(addItemToCart(cartItem)); // Dispatch the action to update the cart in the Redux store

                // Update local states if necessary
                setIsPresentInTheCart(cartItem);
                setUnit(isPresentInTheCart);
            }
        } catch (error) {
            console.log('error add to cart: ', error)
            // Handle error response
            if (error?.response) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: error?.response?.data?.message || "Something went wrong. Please try again.",
                    position: 'top',
                    topOffset: 50,
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: "Network error. Please check your internet connection and try again.",
                    position: 'top',
                    topOffset: 50,
                });
            }
        } finally {
            setAddToCartLoading(false);
        }
    };

    // Get cart products
    useEffect(() => {
        const getCartProducts = async () => {
            try {
                setLoading(true);
                axios.defaults.headers.common['Authorization'] = `Bearer ${userDetails[0]?.accessToken}`;
                const response = await axios.get('/user/cart/fetch');

                setCartProducts(response?.data?.data);
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: error.message,
                    position: 'top',
                    topOffset: 50,
                });
                return null; // Return null in case of error
            } finally {
                setLoading(false);
            }
        }
        getCartProducts();
    }, [addToCartTrigger, productId]);

    // is Present In The Cart
    useFocusEffect(
        useCallback(() => {
            setIsPresentInTheCart(cartProducts?.find(it => it?.product_id === product?.id));
            setUnit(isPresentInTheCart);
        }, [cartProducts, addToCartTrigger, productId]) // Dependencies for the callback
    );

    // Get wishlist products
    useEffect(() => {
        const getWishlistedProducts = async () => {
            try {
                setLoading(true);
                axios.defaults.headers.common['Authorization'] = `Bearer ${userDetails[0]?.accessToken}`;
                const response = await axios.get('/user/wishlist/fetch');
                console.log('wishlistProducts', response?.data?.data);
                setWishlistProducts(response?.data?.data || []);
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: error.message,
                    position: 'top',
                    topOffset: 50,
                });
            } finally {
                setLoading(false);
            }
        };
        getWishlistedProducts();
    }, [addToWishlistTrigger, productId])

    // is Present In The Wishlist
    useFocusEffect(
        useCallback(() => {
            setIsPresentInTheWishlist(wishlistProducts?.find(it => it?.product_id === product?.id));
        }, [wishlistProducts, addToWishlistTrigger, productId]) // Dependencies for the callback
    );

    // Discount Percentage
    const discountPercentage = (price, discountedPrice) => {
        const num = (price - discountedPrice) / price;
        return Math.floor(num * 100);
    };

    // Unit Selector
    const unitSelector = (item) => {
        if (isPresentInTheCart) {
            setUnit({ isPresentInTheCart });
        } else {
            if (unit?.id === item.id) {
                setUnit(null); // Set to null if the IDs match
            } else {
                setUnit(item); // Otherwise, update unit with the new item
            }
        }
    };

    // RelatedProductsHandler
    const relatedProductsHandler = (item) => {
        navigation.navigate('ProductDetails', { data: item?.id })
        setUnit(null);
    };

    // add To Wishlist
    const addToWishlist = async () => {
        try {
            setAddToWishlistLoading(true);
            const data = { product_id: productId };

            const response = await axios.post(`/user/wishlist/add`, data, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            console.log('wislssdsddsdsd', response?.data?.data);

            if (response?.data?.status) {
                const wishlistItem = response?.data?.data; // Extract the cart item from the response

                dispatch(addItemToWishlist(wishlistItem));
                setIsPresentInTheWishlist(wishlistItem);
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message || "Something went wrong.",
                position: 'top',
                topOffset: 50,
            });
        } finally {
            setAddToWishlistLoading(false);
        }
    };

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
                        onPress={addToWishlist}
                        disabled={isPresentInTheWishlist ? true : false}
                    >
                        {addToWishlistLoading ? (
                            <ActivityIndicator color={backIconColor} size="small" />
                        ) : (
                            isPresentInTheWishlist ? (
                                <Icon5 name="heart" size={20} color={'#3ea947'} />
                            ) : (
                                <Icon name="favorite-border" size={20} color={'#019934'} />
                            )
                        )}
                    </TouchableOpacity>
                </View>

                {loading && (
                    <View style={{ height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size={'large'} color={backIconColor} />
                    </View>
                )}

                {!loading && product != null && (
                    <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '87%' }}>
                        <Image source={{ uri: product?.image }} style={{ width: '100%', height: 200, resizeMode: 'contain' }} />
                    </View>
                )}
            </View>

            {/* Details */}
            <ScrollView>
                {/* Loading */}
                {loading && (
                    <View style={{ paddingTop: 10 }}>
                        {/* Name */}
                        <View style={{ paddingHorizontal: 13, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <ShimmerPlaceHolder
                                style={{ width: 150, height: 30, borderRadius: 5 }}
                                autoRun={true}
                                visible={false} // Set to true when data is loaded
                            >
                            </ShimmerPlaceHolder>
                        </View>

                        {/* Star rating */}
                        <View style={{ paddingHorizontal: 13, marginVertical: 10 }}>
                            <ShimmerPlaceHolder
                                style={{ width: 100, height: 20, borderRadius: 5 }}
                                autoRun={true}
                                visible={false}
                            >
                            </ShimmerPlaceHolder>
                        </View>

                        {/* Price and quantity */}
                        <View style={{ paddingHorizontal: 13, flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 8 }}>
                            <ShimmerPlaceHolder
                                style={{ width: 80, height: 30, borderRadius: 5 }}
                                autoRun={true}
                                visible={false}
                            >
                            </ShimmerPlaceHolder>
                            <ShimmerPlaceHolder
                                style={{ width: 50, height: 20, borderRadius: 5 }}
                                autoRun={true}
                                visible={false}
                            >
                            </ShimmerPlaceHolder>
                        </View>

                        {/* Units */}
                        <View style={{ paddingHorizontal: 13, flexDirection: 'row', marginTop: 20 }}>
                            {product?.productSize?.map(it => (
                                <ShimmerPlaceHolder
                                    key={it.id}
                                    style={{ width: 100, height: 100, borderRadius: 10, marginRight: 10 }}
                                    autoRun={true}
                                    visible={false}
                                >
                                    <TouchableOpacity onPress={() => unitSelector(it)} disabled={isPresentInTheCart}>
                                    </TouchableOpacity>
                                </ShimmerPlaceHolder>
                            ))}
                        </View>

                        {/* Product Details */}
                        <View style={{ paddingHorizontal: 13, marginTop: 20 }}>
                            <ShimmerPlaceHolder
                                style={{ width: '80%', height: 20, borderRadius: 5 }}
                                autoRun={true}
                                visible={false}
                            >
                            </ShimmerPlaceHolder>
                            <ShimmerPlaceHolder
                                style={{ width: '100%', height: 50, marginTop: 10, borderRadius: 5 }}
                                autoRun={true}
                                visible={false}
                            >
                            </ShimmerPlaceHolder>
                        </View>

                        {/* Name */}
                        <View style={{ paddingHorizontal: 13, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <ShimmerPlaceHolder
                                style={{ width: 150, height: 30, borderRadius: 5 }}
                                autoRun={true}
                                visible={false} // Set to true when data is loaded
                            >
                            </ShimmerPlaceHolder>
                        </View>

                        {/* Star rating */}
                        <View style={{ paddingHorizontal: 13, marginVertical: 10 }}>
                            <ShimmerPlaceHolder
                                style={{ width: 100, height: 20, borderRadius: 5 }}
                                autoRun={true}
                                visible={false}
                            >
                            </ShimmerPlaceHolder>
                        </View>

                        {/* Price and quantity */}
                        <View style={{ paddingHorizontal: 13, flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 8 }}>
                            <ShimmerPlaceHolder
                                style={{ width: 80, height: 30, borderRadius: 5 }}
                                autoRun={true}
                                visible={false}
                            >
                            </ShimmerPlaceHolder>
                            <ShimmerPlaceHolder
                                style={{ width: 50, height: 20, borderRadius: 5 }}
                                autoRun={true}
                                visible={false}
                            >
                            </ShimmerPlaceHolder>
                        </View>

                        {/* Units */}
                        <View style={{ paddingHorizontal: 13, flexDirection: 'row', marginTop: 20 }}>
                            {product?.productSize?.map(it => (
                                <ShimmerPlaceHolder
                                    key={it.id}
                                    style={{ width: 100, height: 100, borderRadius: 10, marginRight: 10 }}
                                    autoRun={true}
                                    visible={false}
                                >
                                    <TouchableOpacity onPress={() => unitSelector(it)} disabled={isPresentInTheCart}>
                                    </TouchableOpacity>
                                </ShimmerPlaceHolder>
                            ))}
                        </View>

                        {/* Product Details */}
                        <View style={{ paddingHorizontal: 13, marginTop: 20 }}>
                            <ShimmerPlaceHolder
                                style={{ width: '80%', height: 20, borderRadius: 5 }}
                                autoRun={true}
                                visible={false}
                            >
                            </ShimmerPlaceHolder>
                            <ShimmerPlaceHolder
                                style={{ width: '100%', height: 50, marginTop: 10, borderRadius: 5 }}
                                autoRun={true}
                                visible={false}
                            >
                            </ShimmerPlaceHolder>
                        </View>
                    </View>
                )}

                {!loading && product != null && (
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

                        {/* Price and quantity */}
                        <View style={{ paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 8 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 3 }}>
                                <Text style={{ fontSize: responsiveFontSize(2.8), color: '#019934', fontWeight: '800' }}>₹{product?.min_price}</Text>
                                <Text style={{ fontSize: responsiveFontSize(1.8), color: offWhite, fontWeight: '600', paddingBottom: 2, textDecorationLine: 'line-through' }}>₹{product?.min_mrp}</Text>
                            </View>
                        </View>

                        {/* Unit */}
                        <View style={{ marginTop: 10 }}>
                            {/* Heading */}
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

                            {/* Units */}
                            <View style={{ paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', paddingTop: 10, justifyContent: product.productSize.length == 2 ? '' : 'space-between', width: screenWidth, gap: product.productSize.length == 2 ? 13 : 0 }}>
                                {product?.productSize?.map(it => (
                                    <TouchableOpacity disabled={isPresentInTheCart ? true : false} onPress={() => unitSelector(it)} style={{ elevation: 1, backgroundColor: unit?.id === it.id || isPresentInTheCart?.mrp === it.mrp ? darkGreen : '#d8f4f8', width: screenWidth / 3.5, height: screenWidth / 3.5, overflow: 'hidden', borderRadius: 12, flexDirection: 'column', transform: [{ scale: unit?.id === it.id || isPresentInTheCart?.mrp === it.mrp ? 1.07 : 1 }], }} key={it.id}>
                                        <View style={{ height: '22%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ color: '#000', fontSize: responsiveFontSize(1.6), fontWeight: '600' }}>{discountPercentage(it.mrp, it.price)}% off</Text>
                                        </View>

                                        <View style={{ height: '78%', backgroundColor: unit?.id === it.id || isPresentInTheCart?.mrp === it.mrp ? lightGreen : '#fff', borderRadius: 12, borderColor: unit?.id === it.id ? backIconColor : offWhite, borderWidth: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 3 }}>
                                            <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9), fontWeight: '500' }}>{it.size_name}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 5 }}>
                                                <Text style={{ color: '#000', fontWeight: '800', fontSize: responsiveFontSize(2.1) }}>₹{it.price}</Text>
                                                {product.type !== '3' && <Text style={{ color: offWhite, fontWeight: '500', fontSize: responsiveFontSize(1.7), textDecorationLine: 'line-through', paddingBottom: 1 }}>₹{it.mrp}</Text>}
                                            </View>
                                            {product.type !== '3' ? (
                                                <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 3 }}>
                                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(1.6), fontWeight: '400' }}>Available:</Text>
                                                    <Text style={{ color: backIconColor, fontSize: responsiveFontSize(1.8), fontWeight: '700' }}>{it?.stock}</Text>
                                                </View>
                                            ) : (
                                                <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 3 }}>
                                                    <Text style={{ color: offWhite, fontSize: responsiveFontSize(1.8), fontWeight: '400' }}>MRP</Text>
                                                    <Text style={{ color: offWhite, fontSize: responsiveFontSize(1.8), fontWeight: '600', textDecorationLine: 'line-through' }}>₹{it?.mrp}</Text>
                                                </View>
                                            )}
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
                        <View style={{ paddingHorizontal: 13, flexDirection: 'column', gap: 5, marginTop: 20, marginBottom: 60 }}>
                            <Text style={{ fontSize: responsiveFontSize(2.3), fontWeight: '600', color: '#000', textTransform: 'uppercase', marginBottom: 5 }}>Related Products : </Text>

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
                )}
            </ScrollView>

            {/* Add to cart button */}
            <View style={{ backgroundColor: '#fff' }}>
                <TouchableOpacity
                    style={{
                        gap: 5,
                        backgroundColor: isPresentInTheCart || addToCartLoading ? lightGreen : '#41b24b',
                        paddingHorizontal: 30,
                        height: 48,
                        borderRadius: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: backIconColor,
                        borderWidth: 1.5,
                        position: 'absolute',
                        bottom: 2,
                        width: '96%',
                        alignSelf: 'center',
                    }}
                    onPress={() => {
                        if (isPresentInTheCart) {
                            navigation.navigate('Cart')
                        } else {
                            if (unit) {
                                addToCart();
                            } else {
                                setError(true);
                            }
                        }
                    }}
                >
                    {addToCartLoading ? (
                        <ActivityIndicator color={backIconColor} size="small" />
                    ) : (
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                            <Text style={{ color: isPresentInTheCart ? backIconColor : '#fff', fontSize: responsiveFontSize(2.6), fontWeight: '500' }}>{`${isPresentInTheCart ? 'Go to cart' : 'Add to cart'}`}</Text>
                            {isPresentInTheCart ? (
                                <Icon2 name="arrowright" size={23} color={backIconColor} />
                            ) : (
                                <Icon name="add-shopping-cart" size={19} color={'#fff'} />
                            )}
                        </View>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ProductDetails;