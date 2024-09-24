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
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import debounce from 'lodash.debounce';
import { useSelector } from 'react-redux';
import { fetchRestaurants } from '../utils/fetchRestaurants';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const { width: screenWidth } = Dimensions.get('window');

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const Restaurants = () => {

    const navigation = useNavigation();

    const userDetails = useSelector(state => state.user);

    // Status Bar setter
    useFocusEffect(
        useCallback(() => {
            StatusBar.setBackgroundColor(darkGreen); // Set your cart screen status bar color
            StatusBar.setBarStyle('dark-content'); // Optional: change text color (light/dark)
        }, [])
    );

    const pageSize = 20;

    const [search, setSearch] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const [slider, setSlider] = useState(false);
    const sliderHeight = useRef(new Animated.Value(0)).current;

    const [priceLowToHigh, setPriceLowToHigh] = useState(false);
    const [priceHighToLow, setPriceHighToLow] = useState(false);
    const [ratingHighToLow, setRatingHighToLow] = useState(false);
    const [veg, setVeg] = useState(false);
    const [nonVeg, setNonVeg] = useState(false);

    const [filteredNames, setFilteredNames] = useState([]);

    const [restaurants, setRestaurants] = useState(null);
    const [originalRestaurants, setOriginalRestaurants] = useState([]);

    const [loading, setLoading] = useState(true);

    // Toggle Slider
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

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchRestaurants(userDetails); // Fetch all products
                setOriginalRestaurants(data);
                setRestaurants(data);
                setFilteredNames(data?.slice(0, pageSize)); // Load initial set of restaurants
                setHasMore(data?.length > pageSize); // Check if more data is available
            } catch (error) {
                Alert.alert('Error fetching restaurants:', error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Lazy loading on scroll
    const loadMoreData = () => {
        if (!hasMore || loading || restaurants.length === 0) return; // Check if there is no data to paginate

        setLoading(true);

        const nextPage = page + 1;
        const start = nextPage * pageSize;
        const newRestaurants = restaurants.slice(start, start + pageSize); // Get next set of data

        if (newRestaurants.length > 0) {
            setFilteredNames(prev => [...prev, ...newRestaurants]); // Append new data
            setPage(nextPage);
        } else {
            setHasMore(false); // No more data to load
        }
        setLoading(false);
    };

    // Debounced Search
    const debouncedSearch = useMemo(
        () =>
            debounce((text) => {
                setFilteredNames(
                    restaurants.filter(order =>
                        order.name.toLowerCase().includes(text.toLowerCase())
                    )
                );
            }, 300),
        [restaurants]
    );

    const handleSearch = (text) => {
        setSearch(text);
        debouncedSearch(text);
    };

    // Apply filters and sort logic
    const applyFilterAndSort = () => {
        let filteredData = originalRestaurants;

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

        setRestaurants(filteredData);
        setFilteredNames(filteredData.slice(0, pageSize)); // Reset the paginated data
        setPage(1);
        setHasMore(filteredData.length > pageSize);
    };

    useEffect(() => {
        applyFilterAndSort();
    }, [veg, nonVeg, priceLowToHigh, priceHighToLow]);

    // Handlers for filters
    const vegHandler = () => {
        setVeg(prev => !prev);
        setNonVeg(false); // Disable nonVeg if veg is enabled
    };

    const nonVegHandler = () => {
        setNonVeg(prev => !prev);
        setVeg(false); // Disable veg if nonVeg is enabled
    };

    const priceLowToHighHandler = () => {
        setPriceLowToHigh(prev => !prev);
        setPriceHighToLow(false);
    };

    const priceHighToLowHandler = () => {
        setPriceHighToLow(prev => !prev);
        setPriceLowToHigh(false);
    };

    const addToWishlist = async (id, name) => {
        try {
            const data = { product_id: id };
            const response = await axios.post(`/user/wishlist/add`, data, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response?.data?.status) {
                Toast.show({
                    type: 'success',
                    text1: 'Added item to wishlist',
                    text2: `${name} has been added to your wishlist!`,
                    position: 'top',
                    topOffset: 10,
                });
            }
        } catch (error) {
            Alert.alert("Error", error.message || "Something went wrong.");
        }
    };

    const renderOrder = useCallback(({ item }) => (
        <OrderItem item={item} search={search} />
    ), [search]);

    const OrderItem = ({ item, search }) => {

        // search text
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

        return (
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { data: item })} key={item?.id} style={{ width: screenWidth / 2.2, marginVertical: 6, backgroundColor: '#fff', borderTopLeftRadius: 14, borderTopRightRadius: 14, borderBottomLeftRadius: 14, borderBottomRightRadius: 20, overflow: 'hidden', elevation: 2 }}>

                {/* Wishlist */}
                <TouchableOpacity onPress={() => addToWishlist(item?.id, item?.name)} style={{ zIndex: 10, backgroundColor: '#c6e6c3', borderRadius: 50, position: 'absolute', top: 8, right: 8, width: 30, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
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
                    <View style={{ flexDirection: 'row', marginVertical: 6, alignItems: 'center', gap: 3 }}>
                        {item.veg_type === '1' ? (
                            <View style={{ width: 17, height: 17, borderColor: '#000', borderWidth: 1.5, borderRadius: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ backgroundColor: 'green', width: 9, height: 9, borderRadius: 10, }}>
                                </View>
                            </View>
                        ) : (
                            <View style={{ width: 17, height: 17, borderColor: '#000', borderWidth: 1.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
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

    // const ratingHighToLowHandler = () => {
    //     setRatingHighToLow(prev => !prev);
    // };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background, paddingBottom: slider ? 55 : 20 }}>
            <StatusBar
                animated={true}
                backgroundColor={darkGreen}
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ flexDirection: "column", backgroundColor: darkGreen, elevation: 1, paddingHorizontal: 10, paddingTop: 5, paddingBottom: 5 }}>
                {/* Headline */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%", }}>
                    <View style={{ paddingVertical: 8, flexDirection: "row", alignItems: "center", gap: 6 }}>
                        <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 8, elevation: 3 }} onPress={() => navigation.goBack()}>
                            <Icon name="keyboard-arrow-left" size={23} color={backIconColor} />
                        </TouchableOpacity>
                        <Text style={{ color: '#fff', fontWeight: "600", fontSize: responsiveFontSize(2.7), textAlign: 'center', width: '83%', textTransform: 'uppercase' }}>Restaurants</Text>
                    </View>
                </View>

                {/* Searchbar */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ width: '86%', borderColor: isSearchFocused ? backIconColor : '#F9FAFD', borderWidth: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 11, paddingHorizontal: 8, elevation: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 35, width: 23, }}>
                            <Icon5 name="search" size={20} color={backIconColor} style={{ margin: 0, padding: 0 }} />
                        </View>
                        <TextInput
                            style={{ paddingVertical: 0, height: 35, color: '#000', fontWeight: '400', width: '87%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}
                            placeholder="Search for dishes, snacks or drinks"
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

                {/* Sliders */}
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

                                {/* <TouchableOpacity style={{ backgroundColor: ratingHighToLow ? '#eaf6e9' : '#fff', paddingHorizontal: 10, height: 30, paddingVertical: 7, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 3, borderColor: ratingHighToLow ? backIconColor : '', borderWidth: ratingHighToLow ? 0.4 : 0 }} onPress={ratingHighToLowHandler}>
                                    <Icon3 name="star" size={16} color={'#FFA41C'} />
                                    <Text style={{ color: ratingHighToLow ? backIconColor : '#000', fontWeight: '500', fontSize: responsiveFontSize(1.8) }}>Rating - high to low</Text>
                                    {ratingHighToLow && (
                                        <Icon5 name="close" size={16} color={'#cb202d'} />
                                    )}
                                </TouchableOpacity> */}

                                <TouchableOpacity style={{ backgroundColor: veg ? '#eaf6e9' : '#fff', paddingHorizontal: 10, paddingVertical: 7, height: 30, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 3, borderColor: veg ? backIconColor : '', borderWidth: veg ? 0.4 : 0 }} onPress={vegHandler}>
                                    <View style={{ width: 17, height: 16, borderColor: '#000', borderWidth: 1.5, borderRadius: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <View style={{ backgroundColor: 'green', width: 9, height: 9, borderRadius: 10, }}>
                                        </View>
                                    </View>
                                    <Text style={{ color: veg ? backIconColor : '#000', fontWeight: '500', fontSize: responsiveFontSize(1.8) }}>Veg</Text>
                                    {veg && (
                                        <Icon5 name="close" size={16} color={'#cb202d'} />
                                    )}
                                </TouchableOpacity>

                                <TouchableOpacity style={{ backgroundColor: nonVeg ? '#eaf6e9' : '#fff', paddingHorizontal: 10, paddingVertical: 7, height: 30, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 3, borderColor: nonVeg ? backIconColor : '', borderWidth: nonVeg ? 0.4 : 0 }} onPress={nonVegHandler}>
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
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', width: screenWidth }}>
                {loading ? (
                    <FlatList
                        data={[1, 1, 1, 1, 1, 1]}
                        renderItem={() => {
                            return (
                                <View style={{ width: screenWidth / 2.2, marginVertical: 6, backgroundColor: '#fff', borderRadius: 14, padding: 3, elevation: 1 }}>
                                    <ShimmerPlaceHolder autoRun={true} style={{ width: '100%', height: 140, borderRadius: 14 }} />
                                    <ShimmerPlaceHolder autoRun={true} style={{ width: '70%', height: 20, marginTop: 10, borderRadius: 8, marginLeft: 5 }} />
                                    <ShimmerPlaceHolder autoRun={true} style={{ width: '50%', height: 20, marginVertical: 5, borderRadius: 8, marginLeft: 5 }} />
                                    <ShimmerPlaceHolder autoRun={true} style={{ width: '30%', height: 20, marginVertical: 5, borderRadius: 8, marginLeft: 5 }} />
                                </View>
                            )
                        }}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 90, paddingTop: 4 }}
                        columnWrapperStyle={{ justifyContent: 'space-between' }} // Adds space between columns
                        key={2}
                    />
                ) : (
                    <FlatList
                        data={filteredNames}
                        renderItem={renderOrder}
                        keyExtractor={item => item.id.toString()}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 100, paddingTop: 4 }}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        key={2}
                        onEndReached={loadMoreData}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={hasMore && <ActivityIndicator size="small" color={darkGreen} />}
                    />
                )}
            </View>
        </SafeAreaView>
    )
}

export default Restaurants;

const styles = StyleSheet.create({});