import { StatusBar, StyleSheet, Text, SafeAreaView, TouchableOpacity, View, FlatList, Dimensions, Image } from 'react-native';
import { background, lightGreen, backIconColor, offWhite } from '../utils/colors';
import { useDispatch, useSelector } from 'react-redux';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import Icon3 from 'react-native-vector-icons/dist/AntDesign';
import Icon4 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import StarRating from '../components/StarRating';
import { addItemToWishlist, removeItemFromWishlist } from '../redux/WishlistSlice';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const { width: screenWidth } = Dimensions.get('window');

const Wishlist = () => {

    const navigation = useNavigation();

    // const wishlistProducts = useSelector(state => state.wishlist);
    const userDetails = useSelector(state => state.user);

    const dispatch = useDispatch();

    const [wishlistProducts, setWishlistProducts] = useState(null);

    const [loading, setLoading] = useState(false);

    const [clciked, setClciked] = useState(false);

    const getWishlistedProducts = useCallback(async () => {
        try {
            setLoading(true);
            axios.defaults.headers.common['Authorization'] = `Bearer ${userDetails[0]?.accessToken}`;
            const response = await axios.get('/user/wishlist/fetch');
            console.log('wishlistProducts', response?.data?.data)
            setWishlistProducts(response?.data?.data || []);
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteFromWishlist = useCallback(async (id) => {
        setClciked(true);
        try {
            const data = { wishlist_id: id };
            const response = await axios.post(`/user/wishlist/delete`, data, {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log('delete', response);
        } catch (error) {
            Alert.alert("Error", error.message || "Something went wrong.");
        } finally {
            setClciked(false);
        }
    }, []);

    useEffect(() => {
        getWishlistedProducts();
    }, [clciked])

    useFocusEffect(
        useCallback(() => {
            getWishlistedProducts();
        }, [])
    );

    const OrderItem = ({ item }) => {

        const product = wishlistProducts?.find(it => it.id === item.id);

        return (
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { data: item })} key={item?.id} style={{ width: screenWidth / 2.2, marginVertical: 6, backgroundColor: '#fff', borderTopLeftRadius: 14, borderTopRightRadius: 14, borderBottomLeftRadius: 14, borderBottomRightRadius: 20, overflow: 'hidden', elevation: 2, }}>
                {/* Wishlist */}
                <TouchableOpacity onPress={() => deleteFromWishlist(product?.id)} style={{ zIndex: 10, backgroundColor: '#c6e6c3', borderRadius: 50, position: 'absolute', top: 8, right: 8, width: 27, height: 27, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon2 name="heart" size={18} color={'#3ea947'} />
                </TouchableOpacity>

                {/* Image */}
                <View style={{ backgroundColor: lightGreen, borderRadius: 12, margin: 3 }}>
                    <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={{ uri: item?.image }} style={{ width: '100%', height: 100, resizeMode: 'contain' }} />
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
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
            <StatusBar
                animated={true}
                backgroundColor={background}
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ paddingHorizontal: 10, height: 50, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 8, elevation: 3 }} onPress={() => navigation.goBack()}>
                    <Icon name="keyboard-arrow-left" size={23} color={'#000'} />
                </TouchableOpacity>
                <Text style={{ color: '#000', fontWeight: "600", fontSize: responsiveFontSize(2.5), textAlign: 'center', textTransform: 'uppercase' }}>Your Wishlist</Text>
                <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 8, elevation: 3 }} onPress={() => navigation.navigate('Cart')}>
                    <Icon4 name="shopping" size={20} color={'#000'} />
                </TouchableOpacity>
            </View>

            {/* Content */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', width: screenWidth }}>
                {/* Products */}
                {loading ? (
                    <FlatList
                        data={[1, 1, 1, 1, 1, 1, 1]}
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
                    <FlatList
                        data={wishlistProducts}
                        renderItem={OrderItem}
                        keyExtractor={item => item.id.toString()}
                        numColumns={2}
                        key={2}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 55, paddingTop: 5 }}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                    />
                )}
            </View>

        </SafeAreaView>
    )
}

export default Wishlist;

const styles = StyleSheet.create({});