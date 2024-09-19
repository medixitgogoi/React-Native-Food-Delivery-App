import { SafeAreaView, StatusBar, Text, TextInput, View, Image, TouchableOpacity, Dimensions, FlatList, ScrollView, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { background, backIconColor, darkGreen, lightGreen, offWhite } from '../utils/colors';
import Icon3 from 'react-native-vector-icons/dist/MaterialIcons';
import Icon4 from 'react-native-vector-icons/dist/Ionicons';
import Icon5 from 'react-native-vector-icons/dist/AntDesign';
import { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import StarRating from '../components/StarRating';
import { useDispatch, useSelector } from 'react-redux';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { fetchProducts } from '../utils/fetchProducts';
import { addItemToWishlist, removeItemFromWishlist } from '../redux/WishlistSlice';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const { width: screenWidth } = Dimensions.get('window');

const Home = () => {

    const navigation = useNavigation();

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.user);
    const wishlistProducts = useSelector(state => state.wishlist);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const [cakes, setCakes] = useState(null);
    const [restaurants, setRestaurants] = useState(null);
    const [groceries, setGroceries] = useState(null);

    // Status bar setters
    useFocusEffect(
        useCallback(() => {
            StatusBar.setBackgroundColor(darkGreen); // Set your cart screen status bar color
            StatusBar.setBarStyle('dark-content'); // Optional: change text color (light/dark)
        }, [])
    );

    // fetch products
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchProducts(userDetails);
                console.log('response', response);

                setGroceries(response?.grocery?.slice(0, 15) || []);
                setRestaurants(response?.resturants?.slice(0, 15) || []);
                setCakes(response?.cakes?.slice(0, 15) || []);

            } catch (error) {
                Alert.alert("Error fetching data", error.message);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchData(); // Call the async function inside useEffect
    }, [userDetails]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
            <StatusBar
                animated={true}
                backgroundColor={darkGreen}
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ backgroundColor: darkGreen, paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, paddingHorizontal: 12 }}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ color: '#25642a', fontWeight: '500', fontSize: responsiveFontSize(2) }}>Welcome</Text>
                    <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '600', color: '#000' }}>{userDetails?.[0]?.name}</Text>
                </View>
                <TouchableOpacity
                    style={{ backgroundColor: lightGreen, width: 35, height: 35, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', elevation: 5 }}
                    onPress={() => navigation.navigate('Profile')}
                >
                    <Icon name="user-alt" size={15} color={'#000'} />
                </TouchableOpacity>
            </View>

            {/* Searchbar and location */}
            <LinearGradient
                colors={[darkGreen, background]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                locations={[0, 0.99]}
                style={{ paddingBottom: 20, }}
            >

                {/* Searchbar and location */}
                <View style={{ paddingHorizontal: 12, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, paddingVertical: 5 }}>
                    <View style={{ width: '70%', borderColor: isSearchFocused ? '#3a9d43' : '#F9FAFD', borderWidth: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 11, paddingHorizontal: 8, elevation: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 38, width: 23, }}>
                            <Icon4 name="search" size={20} color={backIconColor} style={{ margin: 0, padding: 0 }} />
                        </View>
                        <TextInput
                            style={{ height: 40, color: '#000', fontWeight: '500', width: '88%' }}
                            placeholder="I'd like to have ..."
                            placeholderTextColor="#909dac"
                            onChangeText={setSearch}
                            value={search}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                        />
                    </View>

                    <View style={{ width: '29%', height: 40, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Icon3 name="location-pin" size={30} color={'#cb202d'} />
                        <TouchableOpacity style={{ width: '70%', flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9), fontWeight: '600' }}>Nongpoh</Text>
                                <Icon4 name="caret-down-outline" size={15} color={'#000'} />
                            </View>
                            <Text style={{ color: '#768697', fontWeight: '600', fontSize: responsiveFontSize(1.5) }}>Meghalaya</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </LinearGradient>

            {/* Content */}
            <ScrollView>
                {/* for you */}
                <View style={{ marginTop: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: '#ebedf0', }}>___________ </Text>
                        <Text style={{ color: '#8593a2', fontWeight: '500', fontSize: responsiveFontSize(1.9), textTransform: 'uppercase', letterSpacing: 1.1 }}> What are you looking for ? </Text>
                        <Text style={{ color: '#ebedf0', }}>___________ </Text>
                    </View>
                    <View style={{ padding: 12, width: screenWidth, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TouchableOpacity style={{ width: screenWidth / 3.5, height: screenWidth / 3.5, borderRadius: 16, overflow: 'hidden' }} onPress={() => navigation.navigate('Groceries')}>
                            <Image source={require("../assets/grocery.jpeg")} style={{ width: '100%', height: '100%' }} resizeMode='cover' />
                            <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                                <LinearGradient
                                    colors={['#00000000', '#000']}
                                    style={{ width: '100%', height: 60, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 8 }}
                                >
                                    <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '600', color: '#fff', textAlign: 'center', letterSpacing: 0.4 }}>Groceries</Text>
                                </LinearGradient>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ width: screenWidth / 3.5, height: screenWidth / 3.5, borderRadius: 16, overflow: 'hidden' }} onPress={() => navigation.navigate('Restaurants')}>
                            <Image source={require("../assets/restaurant.jpeg")} style={{ width: '100%', height: '100%' }} resizeMode='cover' />
                            <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                                <LinearGradient
                                    colors={['#00000000', '#000']}
                                    style={{ width: '100%', height: 60, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 8 }}
                                >
                                    <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '600', color: '#fff', textAlign: 'center', letterSpacing: 0.4 }}>Restaurants</Text>
                                </LinearGradient>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ width: screenWidth / 3.5, height: screenWidth / 3.5, borderRadius: 16, overflow: 'hidden' }} onPress={() => navigation.navigate('Cakes')}>
                            <Image source={require("../assets/cakeThumbnail.jpeg")} style={{ width: '100%', height: '100%' }} resizeMode='cover' />
                            <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                                <LinearGradient
                                    colors={['#00000000', '#000']}
                                    style={{ width: '100%', height: 60, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 8 }}
                                >
                                    <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '600', color: '#fff', textAlign: 'center', letterSpacing: 0.4 }}>Cakes</Text>
                                </LinearGradient>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* explore */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                    <Text style={{ color: '#ebedf0', }}>________________________ </Text>
                    <Text style={{ color: '#8593a2', fontWeight: '500', fontSize: responsiveFontSize(1.9), textTransform: 'uppercase', letterSpacing: 1.1 }}> Explore </Text>
                    <Text style={{ color: '#ebedf0', }}>________________________ </Text>
                </View>

                {/* Groceries */}
                <View style={{ marginTop: 8 }}>
                    {/* Heading */}
                    <TouchableOpacity style={{ marginHorizontal: 12, marginBottom: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} onPress={() => navigation.navigate('Groceries')}>
                        <Text style={{ textTransform: 'uppercase', color: '#000', fontSize: responsiveFontSize(2.4), fontWeight: '700' }}>Groceries</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 3 }}>
                            <Text style={{ color: backIconColor, fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>View More</Text>
                            <Icon3 name="chevron-right" size={18} color={darkGreen} style={{ margin: 0, padding: 0 }} />
                        </View>
                    </TouchableOpacity>

                    <ScrollView horizontal>
                        {/* Skeleton loader */}
                        {loading && (
                            <View style={{ paddingHorizontal: 11, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', width: screenWidth }}>
                                <FlatList
                                    data={[1, 1]}
                                    renderItem={() => {
                                        return (
                                            <View style={{ width: screenWidth / 2.2, marginVertical: 6, backgroundColor: '#fff', borderRadius: 14, padding: 3, elevation: 1, marginHorizontal: 1 }}>
                                                <ShimmerPlaceHolder autoRun={true} visible={!loading} style={{ width: '100%', height: 120, borderRadius: 14 }} />
                                                <ShimmerPlaceHolder autoRun={true} visible={!loading} style={{ width: '70%', height: 18, marginTop: 10, borderRadius: 8, marginLeft: 5 }} />
                                                <ShimmerPlaceHolder autoRun={true} visible={!loading} style={{ width: '50%', height: 18, marginVertical: 5, borderRadius: 8, marginLeft: 5 }} />
                                                <ShimmerPlaceHolder autoRun={true} visible={!loading} style={{ width: '30%', height: 18, marginVertical: 5, borderRadius: 8, marginLeft: 5 }} />
                                            </View>
                                        )
                                    }}
                                    numColumns={2}
                                    key={2}
                                    showsVerticalScrollIndicator={false}
                                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                                />
                            </View>
                        )}

                        {/* Content */}
                        <View style={{ paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            {!loading && groceries?.map(item => {

                                const product = wishlistProducts.find(it => it.id === item.id);

                                return (
                                    <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { data: item })} key={item?.id} style={{ width: screenWidth / 2.2, marginVertical: 6, backgroundColor: '#fff', borderTopLeftRadius: 14, borderTopRightRadius: 14, borderBottomLeftRadius: 14, borderBottomRightRadius: 20, overflow: 'hidden', elevation: 2, }}>
                                        {/* Wishlist */}
                                        {product?.id === item.id ? (
                                            <TouchableOpacity onPress={() => dispatch(removeItemFromWishlist(item))} style={{ zIndex: 10, backgroundColor: '#c6e6c3', borderRadius: 50, position: 'absolute', top: 8, right: 8, width: 27, height: 27, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <Icon4 name="heart" size={18} color={'#3ea947'} />
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity onPress={() => dispatch(addItemToWishlist(item))} style={{ zIndex: 10, backgroundColor: '#c6e6c3', borderRadius: 50, position: 'absolute', top: 8, right: 8, width: 27, height: 27, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <Icon4 name="heart-outline" size={18} color={'#019934'} />
                                            </TouchableOpacity>
                                        )}

                                        {/* Image */}
                                        <View style={{ backgroundColor: lightGreen, borderRadius: 12, margin: 3 }}>
                                            <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                {loading ? (
                                                    <Image source={require('../assets/grocery_fallback.png')} style={{ width: '100%', height: 100, resizeMode: 'contain' }} />
                                                ) : (
                                                    <Image source={{ uri: item?.image }} style={{ width: '100%', height: 100, resizeMode: 'contain' }} />
                                                )}
                                            </View>
                                        </View>

                                        {/* Details */}
                                        <View style={{ padding: 10 }}>
                                            <View style={{ flexDirection: 'column', gap: 3 }}>
                                                <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '600', color: '#000' }} numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>
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

                                            {/* <View style={{ flexDirection: 'row', marginBottom: 5, marginTop: 2 }}>
                                                <Text style={{ color: offWhite, fontWeight: '600', fontSize: responsiveFontSize(1.8) }}>{item.subCategory}</Text>
                                            </View> */}

                                            {/* Price */}
                                            <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 3, marginTop: 5 }}>
                                                <Text style={{ fontSize: responsiveFontSize(2.3), color: '#019934', fontWeight: '800' }}>₹{item?.min_price}</Text>
                                                <Text style={{ fontSize: responsiveFontSize(1.5), color: offWhite, fontWeight: '600', paddingBottom: 2, textDecorationLine: 'line-through' }}>₹{item?.min_mrp}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>

                {/* Restaurants */}
                <View style={{ marginTop: 15 }}>
                    {/* Heading */}
                    <TouchableOpacity style={{ marginHorizontal: 12, marginBottom: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} onPress={() => navigation.navigate('Restaurants')}>
                        <Text style={{ textTransform: 'uppercase', color: '#000', fontSize: responsiveFontSize(2.4), fontWeight: '700' }}>Restaurants</Text>
                        <View style={{ borderRadius: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingLeft: 8, paddingVertical: 3, paddingRight: 2 }}>
                            <Text style={{ color: backIconColor, fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>View More</Text>
                            <Icon3 name="chevron-right" size={18} color={darkGreen} style={{ margin: 0, padding: 0 }} />
                        </View>
                    </TouchableOpacity>

                    <ScrollView horizontal>
                        {/* Loading */}
                        {loading && (
                            <View style={{ paddingHorizontal: 11, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', width: screenWidth }}>
                                <FlatList
                                    data={[1, 1]}
                                    renderItem={() => {
                                        return (
                                            <View style={{ width: screenWidth / 2.2, marginVertical: 6, backgroundColor: '#fff', borderRadius: 14, padding: 3, elevation: 1, marginHorizontal: 1 }}>
                                                <ShimmerPlaceHolder autoRun={true} visible={!loading} style={{ width: '100%', height: 120, borderRadius: 14 }} />
                                                <ShimmerPlaceHolder autoRun={true} visible={!loading} style={{ width: '70%', height: 18, marginTop: 10, borderRadius: 8, marginLeft: 5 }} />
                                                <ShimmerPlaceHolder autoRun={true} visible={!loading} style={{ width: '50%', height: 18, marginVertical: 5, borderRadius: 8, marginLeft: 5 }} />
                                                <ShimmerPlaceHolder autoRun={true} visible={!loading} style={{ width: '30%', height: 18, marginVertical: 5, borderRadius: 8, marginLeft: 5 }} />
                                            </View>
                                        )
                                    }}
                                    numColumns={2}
                                    key={2}
                                    showsVerticalScrollIndicator={false}
                                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                                />
                            </View>
                        )}

                        {/* Products */}
                        <View style={{ paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            {!loading && restaurants?.map(item => {

                                const product = wishlistProducts.find(it => it.id === item.id);

                                return (
                                    <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { data: item })} key={item?.id} style={{ width: screenWidth / 2.2, marginVertical: 6, backgroundColor: '#fff', borderTopLeftRadius: 14, borderTopRightRadius: 14, borderBottomLeftRadius: 14, borderBottomRightRadius: 20, overflow: 'hidden', elevation: 2 }}>
                                        {/* Wishlist */}
                                        {product?.id === item.id ? (
                                            <TouchableOpacity onPress={() => dispatch(removeItemFromWishlist(item))} style={{ zIndex: 10, backgroundColor: '#c6e6c3', borderRadius: 50, position: 'absolute', top: 8, right: 8, width: 27, height: 27, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <Icon4 name="heart" size={18} color={'#3ea947'} />
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity onPress={() => dispatch(addItemToWishlist(item))} style={{ zIndex: 10, backgroundColor: '#c6e6c3', borderRadius: 50, position: 'absolute', top: 8, right: 8, width: 27, height: 27, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <Icon4 name="heart-outline" size={18} color={'#019934'} />
                                            </TouchableOpacity>
                                        )}

                                        {/* Image */}
                                        <View style={{ backgroundColor: lightGreen, borderRadius: 12, margin: 3 }}>
                                            <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                {loading ? (
                                                    <Image source={require('../assets/res_fallback.png')} style={{ width: '100%', height: 100, resizeMode: 'contain' }} />
                                                ) : (
                                                    <Image source={{ uri: item?.image }} style={{ width: '100%', height: 100, resizeMode: 'contain' }} />
                                                )}
                                            </View>
                                        </View>

                                        {/* Details */}
                                        <View style={{ padding: 10 }}>
                                            <View style={{ flexDirection: 'column', gap: 3 }}>
                                                <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '600', color: '#000' }} numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>
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
                                                        <Icon5 name="caretup" size={12} color={'#cb202d'} style={{ margin: 0, padding: 0, alignSelf: 'center' }} />
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
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>

                {/* Cakes */}
                <View style={{ marginTop: 15 }}>
                    {/* Heading */}
                    <TouchableOpacity style={{ marginHorizontal: 12, marginBottom: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} onPress={() => navigation.navigate('Cakes')}>
                        <Text style={{ textTransform: 'uppercase', color: '#000', fontSize: responsiveFontSize(2.4), fontWeight: '700' }}>Cakes</Text>
                        <View style={{ borderRadius: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingLeft: 8, paddingVertical: 3, paddingRight: 2 }}>
                            <Text style={{ color: backIconColor, fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>View More</Text>
                            <Icon3 name="chevron-right" size={18} color={darkGreen} style={{ margin: 0, padding: 0 }} />
                        </View>
                    </TouchableOpacity>

                    <ScrollView horizontal>
                        {/* Loading */}
                        {loading && (
                            <View style={{ paddingHorizontal: 11, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', width: screenWidth }}>
                                <FlatList
                                    data={[1, 1]}
                                    renderItem={() => {
                                        return (
                                            <View style={{ width: screenWidth / 2.2, marginVertical: 6, backgroundColor: '#fff', borderRadius: 14, padding: 3, elevation: 1, marginHorizontal: 1 }}>
                                                <ShimmerPlaceHolder autoRun={true} visible={!loading} style={{ width: '100%', height: 120, borderRadius: 14 }} />
                                                <ShimmerPlaceHolder autoRun={true} visible={!loading} style={{ width: '70%', height: 18, marginTop: 10, borderRadius: 8, marginLeft: 5 }} />
                                                <ShimmerPlaceHolder autoRun={true} visible={!loading} style={{ width: '50%', height: 18, marginVertical: 5, borderRadius: 8, marginLeft: 5 }} />
                                                <ShimmerPlaceHolder autoRun={true} visible={!loading} style={{ width: '30%', height: 18, marginVertical: 5, borderRadius: 8, marginLeft: 5 }} />
                                            </View>
                                        )
                                    }}
                                    numColumns={2}
                                    key={2}
                                    showsVerticalScrollIndicator={false}
                                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                                />
                            </View>
                        )}

                        <View style={{ paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            {cakes?.map(item => {
                                const product = wishlistProducts.find(it => it.id === item.id);

                                return (
                                    <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { data: item })} key={item?.id} style={{ width: screenWidth / 2.2, marginVertical: 6, backgroundColor: '#fff', borderTopLeftRadius: 14, borderTopRightRadius: 14, borderBottomLeftRadius: 14, borderBottomRightRadius: 20, overflow: 'hidden', elevation: 2 }}>
                                        {/* Wishlist */}
                                        {product?.id === item.id ? (
                                            <TouchableOpacity onPress={() => dispatch(removeItemFromWishlist(item))} style={{ zIndex: 10, backgroundColor: '#c6e6c3', borderRadius: 50, position: 'absolute', top: 8, right: 8, width: 27, height: 27, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <Icon4 name="heart" size={18} color={'#3ea947'} />
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity onPress={() => dispatch(addItemToWishlist(item))} style={{ zIndex: 10, backgroundColor: '#c6e6c3', borderRadius: 50, position: 'absolute', top: 8, right: 8, width: 27, height: 27, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <Icon4 name="heart-outline" size={18} color={'#019934'} />
                                            </TouchableOpacity>
                                        )}

                                        {/* Image */}
                                        <View style={{ backgroundColor: lightGreen, borderRadius: 12, margin: 3 }}>
                                            <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                {loading ? (
                                                    <Image source={require('../assets/cake_fallback.png')} style={{ width: '100%', height: 100, resizeMode: 'contain' }} />
                                                ) : (
                                                    <Image source={{ uri: item?.image }} style={{ width: '100%', height: 100, resizeMode: 'contain' }} />
                                                )}
                                            </View>
                                        </View>

                                        {/* Details */}
                                        <View style={{ padding: 10 }}>
                                            <View style={{ flexDirection: 'column', gap: 3 }}>
                                                <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '600', color: '#000' }} numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>
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
                                                        <Icon5 name="caretup" size={12} color={'#cb202d'} style={{ margin: 0, padding: 0, alignSelf: 'center' }} />
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
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;