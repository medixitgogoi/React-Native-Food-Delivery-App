import { StatusBar, StyleSheet, TouchableOpacity, View, Text, TextInput, Image, ScrollView, Dimensions, Animated, Easing, FlatList, Alert, ActivityIndicator } from 'react-native';
import { background, backIconColor, darkGreen, lightGreen, offWhite } from '../utils/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon3 from 'react-native-vector-icons/dist/AntDesign';
import Icon4 from 'react-native-vector-icons/dist/FontAwesome6';
import Icon5 from 'react-native-vector-icons/dist/Ionicons';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import StarRating from '../components/StarRating';
import LinearGradient from 'react-native-linear-gradient';
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCakes } from '../utils/fetchCakes';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import axios from 'axios';
import { addItemToWishlist } from '../redux/WishlistSlice';
import Toast from 'react-native-toast-message';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const { width: screenWidth } = Dimensions.get('window');

const Cakes = () => {

    const navigation = useNavigation();

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.user);
    const wishlistProductsFromRedux = useSelector(state => state.wishlist.items);

    // Status bar setters
    useFocusEffect(
        useCallback(() => {
            StatusBar.setBackgroundColor(darkGreen); // Set your cart screen status bar color
            StatusBar.setBarStyle('dark-content'); // Optional: change text color (light/dark)
        }, [])
    );

    const pageSize = 20;

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const [search, setSearch] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const [slider, setSlider] = useState(false);
    const sliderHeight = useRef(new Animated.Value(0)).current;

    const [priceLowToHigh, setPriceLowToHigh] = useState(false);
    const [priceHighToLow, setPriceHighToLow] = useState(false);
    const [ratingHighToLow, setRatingHighToLow] = useState(false);
    const [veg, setVeg] = useState(false);
    const [nonVeg, setNonVeg] = useState(false);
    const [clicked, setClicked] = useState(false);

    const [ids, setIds] = useState([]);

    const [filteredNames, setFilteredNames] = useState([]);

    // const [wishlistProducts, setWishlistProducts] = useState([]);

    const [cakes, setCakes] = useState(null);
    const [originalCakes, setOriginalCakes] = useState([]);

    const [loading, setLoading] = useState(true);
    const [searching, setSearching] = useState(false);

    // Debounced Search
    const debouncedSearch = useMemo(
        () =>
            debounce((text) => {
                setSearching(true); // Set searching to true when the search begins

                if (text.trim() === '') {
                    // If search is cleared, reset to full data or initial page data
                    setFilteredNames(cakes.slice(0, pageSize));
                    setHasMore(cakes.length > pageSize);
                } else {
                    // Filter cakes based on search query
                    const filtered = cakes.filter(order =>
                        order.name.toLowerCase().includes(text.toLowerCase())
                    );
                    setFilteredNames(filtered);
                    setHasMore(false); // Disable load more data during search
                }

                setSearching(false); // Set searching to false after search completes
            }, 300),
        [cakes, pageSize]
    );

    const handleSearch = (text) => {
        setSearch(text);
        debouncedSearch(text);
    };

    const toggleSlider = () => {
        if (slider) {
            Animated.timing(sliderHeight, {
                toValue: 0,
                duration: 300,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: false,
            }).start(() => setSlider(false));
        } else {
            setSlider(true);
            Animated.timing(sliderHeight, {
                toValue: 42, // Adjust this value based on your content height
                duration: 300,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: false,
            }).start();
        }
    };

    const ratingHighToLowHandler = () => {
        setRatingHighToLow(prev => !prev);
    };

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchCakes(userDetails); // Fetch all products
                // console.log('cakes', data);
                setOriginalCakes(data);
                setCakes(data);
                setFilteredNames(data?.slice(0, pageSize)); // Load initial set of restaurants
                setHasMore(data?.length > pageSize); // Check if more data is available
            } catch (error) {
                Alert.alert('Error fetching cakes:', error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [clicked]);

    // Load more data when scrolling to the end
    const loadMoreData = useCallback(() => {
        if (!hasMore || loading || searching) return; // Prevent loading more if in search mode

        setLoading(true);

        const nextPage = page + 1;
        const start = nextPage * pageSize;
        const newCakes = cakes.slice(start, start + pageSize);

        if (newCakes.length > 0) {
            setFilteredNames(prev => [...prev, ...newCakes]);
            setPage(nextPage);
            setHasMore(newCakes.length === pageSize);
        } else {
            setHasMore(false);
        }

        setLoading(false);
    }, [hasMore, loading, page, pageSize, cakes, searching]);

    // Apply filters and sort logic
    const applyFilterAndSort = () => {
        let filteredData = originalCakes;

        // Filter by veg/non-veg
        if (veg) {
            filteredData = filteredData.filter(item => item.veg_type === '1');
        } else if (nonVeg) {
            filteredData = filteredData.filter(item => item.veg_type === '2');
        }

        // Sort by price
        if (priceLowToHigh) {
            filteredData.sort((a, b) => a.min_price - b.min_price);
        } else if (priceHighToLow) {
            filteredData.sort((a, b) => b.min_price - a.min_price);
        }

        setCakes(filteredData);
        setFilteredNames(filteredData.slice(0, pageSize)); // Reset the paginated data
        setPage(1);
        setHasMore(filteredData.length > pageSize);
    };

    // vegHandler
    const vegHandler = () => {
        setVeg(prev => !prev);
        setNonVeg(false); // Disable nonVeg if veg is enabled
    };

    // nonVegHandler
    const nonVegHandler = () => {
        setNonVeg(prev => !prev);
        setVeg(false); // Disable veg if nonVeg is enabled
    };

    // priceLowToHighHandler
    const priceLowToHighHandler = () => {
        setPriceLowToHigh(prev => !prev);
        setPriceHighToLow(false);
    };

    // priceHighToLowHandler
    const priceHighToLowHandler = () => {
        setPriceHighToLow(prev => !prev);
        setPriceLowToHigh(false);
    };

    // applyFilterAndSort useEffect
    useEffect(() => {
        applyFilterAndSort();
    }, [veg, nonVeg, priceLowToHigh, priceHighToLow]);

    // const addToWishlist = async (id, name) => {
    //     try {
    //         const data = { product_id: id };
    //         const response = await axios.post(`/user/wishlist/add`, data, {
    //             headers: { 'Content-Type': 'application/json' },
    //         });

    //         if (response?.data?.status) {
    //             Toast.show({
    //                 type: 'info',
    //                 text1: 'Added item to wishlist',
    //                 text2: `${name} has been added to your wishlist!`,
    //                 position: 'top',
    //                 topOffset: 10,
    //             });
    //         }
    //     } catch (error) {
    //         Alert.alert("Error", error.message || "Something went wrong.");
    //     }
    // };

    const addToWishlist = async (id) => {
        try {
            const data = { product_id: id };
            const response = await axios.post(`/user/wishlist/add`, data, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            console.log('wislssdsddsdsd', response?.data?.data);

            if (response?.data?.status) {
                dispatch(addItemToWishlist(response?.data?.data));
            }
        } catch (error) {
            Alert.alert("Error: ", error.message || "Something went wrong.");
        } finally {
            setClicked(true);
        }
    };

    // console.log('wishlist products', wishlistProducts);

    // const deleteFromWishlist = useCallback(async (id) => {
    //     try {
    //         setLoading(true);
    //         const data = { wishlist_id: id };
    //         const response = await axios.post(`/user/wishlist/delete`, data, {
    //             headers: { 'Content-Type': 'application/json' },
    //         });
    //         // console.log('delete', response);
    //     } catch (error) {
    //         Alert.alert("Error", error.message || "Something went wrong.");
    //     } finally {
    //         setLoading(false);
    //     }
    // }, []);

    const renderOrder = useCallback(({ item }) => (
        <OrderItem item={item} search={search} />
    ), [search]);

    const OrderItem = ({ item, search }) => {

        // Search text
        const getHighlightedText = (text, highlight) => {
            const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
            return (
                <Text>
                    {parts.map((part, index) =>
                        part.toLowerCase() === highlight.toLowerCase() ? (
                            <Text key={index} style={{ backgroundColor: 'yellow' }}>{part}</Text>
                        ) : (
                            <Text key={index}>{part}</Text>
                        )
                    )}
                </Text>
            );
        };

        const product = wishlistProductsFromRedux.find(it => it.product_id === item.id);
        if (product) {
            console.log('product', product);
        }

        return (
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { data: item?.id })} key={item?.id} style={{ width: screenWidth / 2.2, marginVertical: 6, backgroundColor: '#fff', borderTopLeftRadius: 14, borderTopRightRadius: 14, borderBottomLeftRadius: 14, borderBottomRightRadius: 20, overflow: 'hidden', elevation: 2 }}>
                {/* Wishlist */}
                <View style={{ zIndex: 10, backgroundColor: '#c6e6c3', borderRadius: 50, position: 'absolute', top: 8, right: 8, width: 30, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    {product?.product_id === item?.id ? (
                        <TouchableOpacity>
                            <Icon5 name="heart" size={18} color={'#3ea947'} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => addToWishlist(item?.id)} >
                            <Icon name="favorite-border" size={18} color={'#019934'} />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Image */}
                <View style={{ backgroundColor: lightGreen, borderRadius: 12, margin: 3 }}>
                    <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={{ uri: item?.image }} style={{ width: '100%', height: 100, resizeMode: 'contain' }} />
                    </View>
                </View>

                {/* Details */}
                <View style={{ padding: 10 }}>
                    <View style={{ flexDirection: 'column', gap: 3 }}>
                        <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '600', color: '#000' }} numberOfLines={1} ellipsizeMode='tail'>{getHighlightedText(item.name, search)}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                            {/* <StarRating rating={item.starRating} /> */}
                            <StarRating rating={4} />
                            <View style={{ backgroundColor: backIconColor, paddingVertical: 2, paddingHorizontal: 4, gap: 2, borderRadius: 5, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.5), fontWeight: '500' }}>4</Text>
                                {/* <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.5), fontWeight: '500' }}>{item.starRating}</Text> */}
                                <Icon3 name="star" size={10} color={'#fff'} style={{ margin: 0, padding: 0, alignSelf: 'center' }} />
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginVertical: 8, alignItems: 'center', gap: 3 }}>
                        {item.veg_type === '1' ? (
                            <View style={{ width: 17, height: 16, borderColor: '#000', borderWidth: 1.5, borderRadius: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ backgroundColor: 'green', width: 9, height: 9, borderRadius: 10, }}></View>
                            </View>
                        ) : (
                            <View style={{ width: 17, height: 16, borderColor: '#000', borderWidth: 1.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                                <Icon3 name="caretup" size={12} color={'#cb202d'} style={{ margin: 0, padding: 0, alignSelf: 'center' }} />
                            </View>
                        )}
                        <Text style={{ color: offWhite, fontWeight: '600', fontSize: responsiveFontSize(1.8) }}>{item.veg_type === '1' ? 'Veg' : 'Non-Veg'}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 3 }}>
                        <Text style={{ fontSize: responsiveFontSize(2.3), color: '#019934', fontWeight: '800' }}>₹{item?.min_price}</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.5), color: offWhite, fontWeight: '600', paddingBottom: 2, textDecorationLine: 'line-through' }}>₹{item?.min_mrp}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    console.log('wishlistProductsFromRedux', wishlistProductsFromRedux);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background, }}>
            <StatusBar
                animated={true}
                backgroundColor={darkGreen}
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ flexDirection: "column", backgroundColor: darkGreen, elevation: 1, paddingHorizontal: 10, paddingTop: 5, paddingBottom: 5 }}>
                {/* headline */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%", }}>
                    <View style={{ paddingVertical: 8, flexDirection: "row", alignItems: "center", gap: 6 }}>
                        <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 8, elevation: 3 }} onPress={() => navigation.goBack()}>
                            <Icon name="keyboard-arrow-left" size={23} color={backIconColor} />
                        </TouchableOpacity>
                        <Text style={{ color: '#fff', fontWeight: "600", fontSize: responsiveFontSize(2.7), textAlign: 'center', width: '83%', textTransform: 'uppercase' }}>Cakes</Text>
                    </View>
                </View>

                {/* searchbar */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ width: '86%', borderColor: isSearchFocused ? backIconColor : '#F9FAFD', borderWidth: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 11, paddingHorizontal: 8, elevation: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 35, width: 23, }}>
                            <Icon5 name="search" size={20} color={backIconColor} style={{ margin: 0, padding: 0 }} />
                        </View>
                        <TextInput
                            style={{ paddingVertical: 0, height: 35, color: '#000', fontWeight: '400', width: '87%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}
                            placeholder="Search for cakes"
                            placeholderTextColor="#a0abb7"
                            onChangeText={handleSearch}
                            value={search}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                        />
                    </View>
                    <TouchableOpacity style={{ backgroundColor: '#fff', borderRadius: 8, width: 38, height: 35, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={toggleSlider}>
                        <Icon4 name="sliders" size={16} color={backIconColor} />
                    </TouchableOpacity>
                </View>

                {/* sliders */}
                <Animated.View style={{ height: sliderHeight, overflow: 'hidden', marginTop: 5 }}>
                    {slider && (
                        <ScrollView horizontal>
                            <View style={{ width: '100%', flexDirection: 'row', gap: 8, alignItems: 'center' }}>

                                <TouchableOpacity style={{ backgroundColor: priceLowToHigh ? '#eaf6e9' : '#fff', paddingHorizontal: 10, height: 30, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 5, borderColor: priceLowToHigh ? backIconColor : '', borderWidth: priceLowToHigh ? 0.4 : 0 }} onPress={priceLowToHighHandler}>
                                    <Icon4 name="arrow-trend-up" size={16} color={'#FF6F61'} />
                                    <Text style={{ color: priceLowToHigh ? backIconColor : '#000', fontWeight: '500', fontSize: responsiveFontSize(1.8) }}>Price - low to high</Text>
                                    {priceLowToHigh && (
                                        <Icon5 name="close" size={16} color={'#cb202d'} />
                                    )}
                                </TouchableOpacity>

                                <TouchableOpacity style={{ backgroundColor: priceHighToLow ? '#eaf6e9' : '#fff', paddingHorizontal: 10, height: 30, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 5, borderColor: priceHighToLow ? backIconColor : '', borderWidth: priceHighToLow ? 0.4 : 0 }} onPress={priceHighToLowHandler}>
                                    <Icon4 name="arrow-trend-down" size={16} color={'#FF6F61'} />
                                    <Text style={{ color: priceHighToLow ? backIconColor : '#000', fontWeight: '500', fontSize: responsiveFontSize(1.8) }}>Price - high to low</Text>
                                    {priceHighToLow && (
                                        <Icon5 name="close" size={16} color={'#cb202d'} />
                                    )}
                                </TouchableOpacity>

                                <TouchableOpacity style={{ backgroundColor: ratingHighToLow ? '#eaf6e9' : '#fff', paddingHorizontal: 10, paddingVertical: 7, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 3, borderColor: ratingHighToLow ? backIconColor : '', borderWidth: ratingHighToLow ? 0.4 : 0 }} onPress={ratingHighToLowHandler}>
                                    <Icon3 name="star" size={16} color={'#FFA41C'} />
                                    <Text style={{ color: ratingHighToLow ? backIconColor : '#000', fontWeight: '500', fontSize: responsiveFontSize(1.8) }}>Rating - high to low</Text>
                                    {ratingHighToLow && (
                                        <Icon5 name="close" size={16} color={'#cb202d'} />
                                    )}
                                </TouchableOpacity>

                                <TouchableOpacity style={{ backgroundColor: veg ? '#eaf6e9' : '#fff', paddingHorizontal: 10, paddingVertical: 7, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 3, borderColor: veg ? backIconColor : '', borderWidth: veg ? 0.4 : 0 }} onPress={vegHandler}>
                                    <View style={{ width: 17, height: 16, borderColor: '#000', borderWidth: 1.5, borderRadius: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <View style={{ backgroundColor: 'green', width: 9, height: 9, borderRadius: 10, }}>
                                        </View>
                                    </View>
                                    <Text style={{ color: veg ? backIconColor : '#000', fontWeight: '500', fontSize: responsiveFontSize(1.8) }}>Veg</Text>
                                    {veg && (
                                        <Icon5 name="close" size={16} color={'#cb202d'} />
                                    )}
                                </TouchableOpacity>

                                <TouchableOpacity style={{ backgroundColor: nonVeg ? '#eaf6e9' : '#fff', paddingHorizontal: 10, paddingVertical: 7, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 3, borderColor: nonVeg ? backIconColor : '', borderWidth: nonVeg ? 0.4 : 0 }} onPress={nonVegHandler}>
                                    <View style={{ width: 17, height: 16, borderColor: '#000', borderWidth: 1.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                                        <Icon3 name="caretup" size={12} color={'#cb202d'} style={{ margin: 0, padding: 0, alignSelf: 'center' }} />
                                    </View>
                                    <Text style={{ color: nonVeg ? backIconColor : '#000', fontWeight: '500', fontSize: responsiveFontSize(1.8) }}>Non-veg</Text>
                                    {nonVeg && (
                                        <Icon5 name="close" size={16} color={'#cb202d'} />
                                    )}
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    )}
                </Animated.View>
            </View>

            {/* Content */}
            <View style={{ flex: 1 }}>
                {/* Show ActivityIndicator if searching is true */}
                {searching && (
                    <ActivityIndicator
                        size="large"
                        color={darkGreen}
                        style={{ marginTop: 20, alignSelf: 'center' }}
                    />
                )}

                {loading ? (
                    <FlatList
                        data={[1, 1, 1, 1, 1, 1]}
                        renderItem={() => {
                            return (
                                <View style={{ width: screenWidth / 2.2, marginVertical: 6, backgroundColor: '#fff', borderRadius: 14, padding: 3, elevation: 1 }}>
                                    <ShimmerPlaceHolder autoRun={true} visible={!loading} style={{ width: '100%', height: 140, borderRadius: 14 }} />
                                    <ShimmerPlaceHolder autoRun={true} visible={!loading} style={{ width: '70%', height: 20, marginTop: 10, borderRadius: 8, marginLeft: 5 }} />
                                    <ShimmerPlaceHolder autoRun={true} visible={!loading} style={{ width: '50%', height: 20, marginVertical: 5, borderRadius: 8, marginLeft: 5 }} />
                                    <ShimmerPlaceHolder autoRun={true} visible={!loading} style={{ width: '30%', height: 20, marginVertical: 5, borderRadius: 8, marginLeft: 5 }} />
                                </View>
                            )
                        }}
                        numColumns={2}
                        key={2}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 90, paddingTop: 4 }}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                    />
                ) : (
                    !searching && (
                        <FlatList
                            data={filteredNames}
                            renderItem={filteredNames?.length > 0 ? renderOrder : null} // Only render items if available
                            keyExtractor={item => item.id.toString()}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 100, paddingTop: 4 }}
                            columnWrapperStyle={{ justifyContent: 'space-between' }}
                            key={2}
                            onEndReached={!hasMore || searching ? null : loadMoreData} // Disable loadMore during search
                            onEndReachedThreshold={0.5}
                            ListFooterComponent={hasMore && !searching && <ActivityIndicator size="small" color={darkGreen} />}
                            ListEmptyComponent={!loading && !searching && (
                                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 20, }}>
                                    <Image source={require('../assets/fallback_search.png')} style={{ width: 200, height: 200, resizeMode: 'contain' }} />
                                    <Text style={{ textAlign: 'center', marginTop: 20, fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '500' }}>
                                        No products match your search.
                                    </Text>
                                </View>
                            )}
                        />
                    )
                )}
            </View>
        </SafeAreaView>
    )
}

export default Cakes;

const styles = StyleSheet.create({});