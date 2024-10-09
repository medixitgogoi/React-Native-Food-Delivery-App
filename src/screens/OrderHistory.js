import { View, Text, TouchableOpacity, StatusBar, TextInput, Alert, Image, FlatList } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { background, backIconColor, darkGreen, lightGreen, offWhite } from '../utils/colors';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon5 from 'react-native-vector-icons/dist/Ionicons';
import { useCallback, useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const OrderHistory = () => {

    const navigation = useNavigation();

    const userDetails = useSelector(state => state.user);

    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const [filteredNames, setFilteredNames] = useState([]);

    const [orders, setOrders] = useState(null);

    const [loading, setLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [filteredOrders, setFilteredOrders] = useState([]); // State for filtered results
    const [debouncedQuery, setDebouncedQuery] = useState(''); // State for debounced query

    // Handle search input and debounce it
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery); // Set debounced query after delay
        }, 300); // 300ms delay

        return () => {
            clearTimeout(handler); // Clear the timeout if user types again
        };
    }, [searchQuery]); // Effect runs when searchQuery changes

    // Filter orders based on debounced query
    useEffect(() => {
        if (debouncedQuery.trim() === '') {
            setFilteredOrders(orders); // If search query is empty, show all orders
            return;
        }

        const filtered = orders.filter(order =>
            order.order_detail.some(product =>
                product.product_name.toLowerCase().includes(debouncedQuery.toLowerCase())
            )
        );

        setFilteredOrders(filtered); // Update state with filtered orders
    }, [debouncedQuery, orders]); // Effect runs when debouncedQuery or orders change

    // Function to highlight matching text
    const highlightText = (text, query) => {
        if (!query) return <Text>{text}</Text>; // If no query, return plain text

        const regex = new RegExp(`(${query})`, 'gi'); // Case-insensitive regex for query
        const parts = text.split(regex); // Split text by matching query

        return (
            <Text>
                {parts.map((part, index) =>
                    part.toLowerCase() === query.toLowerCase() ? (
                        <Text key={index} style={{ backgroundColor: 'yellow' }}>{part}</Text>
                    ) : (
                        <Text key={index}>{part}</Text>
                    )
                )}
            </Text>
        );
    };

    // Fetch Orders
    useFocusEffect(
        useCallback(() => {
            const getOrders = async () => {
                try {
                    setLoading(true);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${userDetails[0]?.accessToken}`;

                    const response = await axios.get('/user/order/fetch');
                    console.log('orders', response?.data?.data);

                    setOrders(response?.data?.data);
                    setFilteredNames(response?.data?.data);
                } catch (error) {
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: error?.message,
                        position: 'top',
                        topOffset: 50,
                    });
                } finally {
                    setLoading(false);
                }
            }
            getOrders();
        }, [])
    );

    // Render Order
    const renderOrder = ({ item }) => {

        const apiDate = item?.created_at; // Input date from API
        const dateParts = apiDate.split("/"); // Split the date into parts

        // Create a new Date object (Month is 0-based in JavaScript)
        const formattedDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

        // Options for formatting
        const options = { day: 'numeric', month: 'short', year: 'numeric' };

        // Format the date
        const result = formattedDate.toLocaleDateString('en-GB', options);

        const finalResult = result.replace(/(\w{3}) (\d{4})/, '$1, $2');

        return (
            <TouchableOpacity onPress={() => navigation.navigate('OrderDetails', { detail: item })} style={{ backgroundColor: '#fff', flexDirection: 'column', elevation: 2, overflow: 'hidden', borderRadius: 12, padding: 10 }}>
                {/* Details */}
                <View style={{ flexDirection: 'column', gap: 8, backgroundColor: lightGreen, padding: 10, borderRadius: 12 }}>
                    {item.order_detail.map(it => (
                        <View key={it?.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            {/* Image */}
                            <View style={{ width: 30, height: 30, backgroundColor: background, borderRadius: 8, elevation: 1, overflow: 'hidden', borderColor: backIconColor, borderWidth: 0.3 }}>
                                <Image source={{ uri: it?.image }} resizeMode='cover' style={{ width: '100%', height: '100%' }} />
                            </View>

                            {/* Details */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, width: '79%' }}>
                                <Text style={{ color: '#000', fontWeight: '500', fontSize: responsiveFontSize(1.9) }}>{highlightText(it.product_name, debouncedQuery)}</Text>
                                <Text style={{ color: offWhite, fontWeight: '500', fontSize: responsiveFontSize(2) }}>x {it?.quantity}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Date, status, price */}
                <View style={{ backgroundColor: '#fff', flexDirection: 'row', paddingTop: 14, alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(1.6), fontWeight: '500' }}>Order placed on</Text>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(1.6), fontWeight: '500' }}>{finalResult}</Text>
                        </View>
                        {
                            item?.status === '1' ? (
                                // Status = 1 (New)
                                <View style={{ backgroundColor: lightGreen, paddingVertical: 3, paddingHorizontal: 8, borderRadius: 5, borderColor: backIconColor, borderWidth: 0.7 }}>
                                    <Text style={{ color: backIconColor, fontSize: responsiveFontSize(1.4), fontWeight: '500' }}>New</Text>
                                </View>
                            ) : item?.status === '2' ? (
                                // Status = 2 (Accepted)
                                <View style={{ backgroundColor: '#FFA500', paddingVertical: 3, paddingHorizontal: 8, borderRadius: 5, borderColor: '#FF8C00', borderWidth: 0.7 }}>
                                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.4), fontWeight: '500' }}>Accepted</Text>
                                </View>
                            ) : item?.status === '3' ? (
                                // Status = 3 (Dispatched)
                                <View style={{ backgroundColor: '#1E90FF', paddingVertical: 3, paddingHorizontal: 8, borderRadius: 5, borderColor: '#1C86EE', borderWidth: 0.7 }}>
                                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.4), fontWeight: '500' }}>Dispatched</Text>
                                </View>
                            ) : item?.status === '4' ? (
                                // Status = 4 (Delivered)
                                <View style={{ backgroundColor: darkGreen, paddingVertical: 3, paddingHorizontal: 7, borderRadius: 5 }}>
                                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.5), fontWeight: '500' }}>Delivered</Text>
                                </View>
                            ) : item?.status === '5' ? (
                                // Status = 5 (Cancelled)
                                <View style={{ backgroundColor: '#cb202d', paddingVertical: 3, paddingHorizontal: 8, borderRadius: 5, borderColor: '#CD3700', borderWidth: 0.7 }}>
                                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.4), fontWeight: '500' }}>Cancelled</Text>
                                </View>
                            ) : null
                        }
                    </View>

                    {/* Price */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '600' }}>₹{item?.total_price + item?.delivery_charge + item?.addl_charge}.00</Text>
                        <Icon name="keyboard-arrow-right" size={19} color={'#000'} />
                    </View>
                </View>

                {/* Divider */}
                <View style={{ height: 1, width: '100%', backgroundColor: '#f0f0f0', marginVertical: 12 }}></View>

                {/* Reorder button */}
                <LinearGradient
                    colors={['#76cd7d', '#3a9f43']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ borderRadius: 12, paddingHorizontal: 24, elevation: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                >
                    <TouchableOpacity style={{ gap: 3, height: 40, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <Icon name="replay" size={22} color={'#fff'} />
                        <Text style={{ color: '#fff', fontWeight: '600', fontSize: responsiveFontSize(2.1) }}>Reorder</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </TouchableOpacity>
        )
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
            <StatusBar
                animated={true}
                backgroundColor={background}
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 8 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingVertical: 5, paddingHorizontal: 10, alignSelf: 'flex-start' }}>
                    <Icon4 name="arrowleft" size={23} color={'#000'} />
                </TouchableOpacity>
                <Text style={{ color: '#000', fontSize: responsiveFontSize(2.4), fontWeight: '500' }}>Your Orders</Text>
            </View>

            {/* Searchbar */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, marginTop: 5, marginBottom: 12 }}>
                <View style={{ width: '100%', borderColor: isSearchFocused ? backIconColor : '#F9FAFD', borderWidth: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 11, paddingHorizontal: 8, elevation: 2 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 40, width: 23, }}>
                        <Icon5 name="search" size={20} color={backIconColor} style={{ margin: 0, padding: 0 }} />
                    </View>
                    <TextInput
                        style={{ height: 40, color: '#000', fontWeight: '500', letterSpacing: 0.3, width: '87%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}
                        placeholder="Search by dish, cake or grocery"
                        placeholderTextColor="#a0abb7"
                        value={searchQuery}
                        onChangeText={setSearchQuery} // Handle text input directly
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                    />
                </View>
            </View>

            {/* Fallback image */}
            {!loading && orders.length === 0 && (
                <View style={{ flexDirection: 'column', alignItems: 'center', gap: 30, flex: 1, marginTop: 30 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../assets/orders-fallback.png')} style={{ width: 200, height: 200, resizeMode: 'contain' }} />
                    </View>
                    <View style={{ width: '90%' }}>
                        <Text style={{ fontSize: responsiveFontSize(1.9), textAlign: 'center', color: '#000', fontWeight: '500' }}>
                            You haven't placed any orders yet! Hungry? Explore our menu and start your first order now.
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ elevation: 2, backgroundColor: darkGreen, paddingVertical: 10, gap: 8, paddingHorizontal: 20, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon4 name="arrowleft" size={20} color={'#000'} />
                        <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2) }}>Go to Home</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Content */}
            <View style={{ flex: 1 }}>
                {loading ? (
                    <FlatList
                        data={[1, 1, 1, 1, 1]}
                        renderItem={({ index }) => (
                            <View key={index} style={{ backgroundColor: '#fff', flexDirection: 'column', elevation: 2, overflow: 'hidden', borderRadius: 12, padding: 10 }}>
                                {/* Details */}
                                <View style={{ flexDirection: 'column', gap: 8, backgroundColor: '#EDF7EC', padding: 10, borderRadius: 12 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                        <ShimmerPlaceHolder
                                            style={{ width: 30, height: 30, backgroundColor: '#F9FAFD', borderRadius: 8 }}
                                            autoRun={true}
                                            visible={false} // Set to true when data is loaded
                                        />
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                            <ShimmerPlaceHolder
                                                style={{ width: '90%', height: 20, backgroundColor: '#F9FAFD', borderRadius: 5 }}
                                                autoRun={true}
                                                visible={false}
                                            />
                                        </View>
                                    </View>
                                </View>

                                {/* Date, status, price */}
                                <View style={{ backgroundColor: '#fff', flexDirection: 'row', paddingTop: 14, alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                                            <ShimmerPlaceHolder
                                                style={{ width: '90%', height: 20, backgroundColor: '#F9FAFD', borderRadius: 5 }}
                                                autoRun={true}
                                                visible={false}
                                            />
                                        </View>
                                        <ShimmerPlaceHolder
                                            style={{ width: 80, height: 20, backgroundColor: '#F9FAFD', borderRadius: 5 }}
                                            autoRun={true}
                                            visible={false}
                                        />
                                    </View>
                                </View>

                                {/* Divider */}
                                <View style={{ height: 1, width: '100%', backgroundColor: '#f0f0f0', marginVertical: 12 }} />

                                {/* Reorder button */}
                                <ShimmerPlaceHolder
                                    style={{ borderRadius: 10, height: 35, width: '100%', paddingHorizontal: 0, elevation: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                                    autoRun={true}
                                    visible={false}
                                />
                            </View>
                        )}
                        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20, paddingTop: 3, gap: 12 }}
                        keyExtractor={(item, index) => String(index)}
                    />
                ) : (
                    <FlatList
                        data={filteredOrders}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderOrder}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20, paddingTop: 3, gap: 12 }}
                    />
                )}
            </View>
        </SafeAreaView>
    )
}

export default OrderHistory;