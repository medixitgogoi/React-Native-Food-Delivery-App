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

    const [search, setSearch] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const [filteredNames, setFilteredNames] = useState([]);

    const [orders, setOrders] = useState(null);

    const [loading, setLoading] = useState(true);

    // Fetch Orders
    useFocusEffect(
        useCallback(() => {
            const getOrders = async () => {
                try {
                    setLoading(true);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${userDetails[0]?.accessToken}`;

                    const response = await axios.get('/user/order/fetch');
                    console.log('orders', response?.data?.data);

                    setOrders(response?.data?.data || []);
                    setFilteredNames(response?.data?.data || []);
                } catch (error) {
                    Alert.alert("Error", error.message); // Add a title to the alert
                } finally {
                    setLoading(false);
                }
            }
            getOrders();
        }, [])
    );

    const renderOrder = ({ item }) => {

        const timestamp = item?.order_detail[0]?.created_at;

        const dateObj = new Date(timestamp);

        const day = dateObj.getUTCDate();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[dateObj.getUTCMonth()];
        const year = dateObj.getUTCFullYear();
        const formattedDate = `${day} ${month}, ${year}`;

        // Format the time as 'HH:MMam/pm'
        let hours = dateObj.getUTCHours();
        const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0');
        const period = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12 || 12; // Convert to 12-hour format
        const formattedTime = `${hours}:${minutes}${period}`;

        return (
            <TouchableOpacity onPress={() => navigation.navigate('OrderDetails', { detail: item })} style={{ backgroundColor: '#fff', flexDirection: 'column', elevation: 2, overflow: 'hidden', borderRadius: 12, padding: 10 }}>
                {/* Details */}
                <View style={{ flexDirection: 'column', gap: 8, backgroundColor: lightGreen, padding: 10, borderRadius: 12 }}>
                    {item.order_detail.map(it => (
                        <View key={it?.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            {/* Image */}
                            <View style={{ width: 30, height: 30, backgroundColor: background, borderRadius: 8, elevation: 1 }}>
                                <Image source={require('../assets/orange.png')} style={{ resizeMode: 'contain', width: '100%', height: '100%' }} />
                            </View>

                            {/* Details */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <Text style={{ color: '#000', fontWeight: '500', fontSize: responsiveFontSize(1.9) }}>{it?.product_name}</Text>
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
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(1.6), fontWeight: '500' }}>{formattedDate} at {formattedTime}</Text>
                        </View>
                        <View style={{ backgroundColor: darkGreen, paddingVertical: 3, paddingHorizontal: 7, borderRadius: 5 }}>
                            <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.5), fontWeight: '500' }}>Delivered</Text>
                        </View>
                    </View>

                    {/* Price */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '600' }}>₹{item?.total_price}.00</Text>
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
        <SafeAreaView style={{ flex: 1, backgroundColor: background, paddingBottom: 0 }}>
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
                        style={{ paddingVertical: 0, height: 40, color: '#000', fontWeight: '500', letterSpacing: 0.3, width: '87%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}
                        placeholder="Search by dish, cake or grocery"
                        placeholderTextColor="#a0abb7"
                        // onChangeText={handleSearch}
                        onChangeText={setSearch}
                        value={search}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                    />
                </View>
            </View>

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
                        data={filteredNames}
                        renderItem={renderOrder}
                        keyExtractor={item => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20, paddingTop: 3, gap: 12 }}
                    />
                )}
            </View>

        </SafeAreaView>
    )
}

export default OrderHistory;