import { useCallback, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, TextInput, FlatList, Dimensions } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import Icon5 from 'react-native-vector-icons/dist/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { background, backIconColor } from '../utils/colors';
import { orders } from '../utils/orders';

const { width: screenWidth } = Dimensions.get('window');

const OrderHistory = () => {

    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [loading, setLoading] = useState(false);

    // Render each order item
    const renderOrder = ({ item }) => (
        <View
            key={item.id}
            style={{
                backgroundColor: '#fff',
                marginVertical: 6,
                padding: 15,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                elevation: 2,
            }}
        >
            {/* Food Icon */}
            <View style={{ flex: 0.15, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="fastfood" size={30} color={backIconColor} />
            </View>

            {/* Order Details */}
            <View style={{ flex: 0.85, paddingHorizontal: 10 }}>
                {/* Order Name and Date */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '600' }}>Chicken Fried Rice</Text>
                    <Text style={{ color: '#000', fontSize: responsiveFontSize(1.6) }}>30-06-2024</Text>
                </View>

                {/* Quantity and Price */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                    <Text style={{ color: '#000', fontSize: responsiveFontSize(1.8) }}>Qty: 3</Text>
                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>₹1200</Text>
                </View>

                {/* Status */}
                <View style={{ marginTop: 10 }}>
                    <Text
                        style={{
                            color: '#000',
                            fontSize: responsiveFontSize(1.6),
                            fontWeight: '600',
                        }}
                    >
                        Delivered
                    </Text>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background, paddingBottom: 60 }}>
            <StatusBar animated={true} backgroundColor={background} barStyle="dark-content" />

            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 8 }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ paddingVertical: 5, paddingHorizontal: 10, alignSelf: 'flex-start' }}
                >
                    <Icon4 name="arrowleft" size={23} color={'#000'} />
                </TouchableOpacity>
                <Text style={{ color: '#000', fontSize: responsiveFontSize(2.4), fontWeight: '500' }}>Your Orders</Text>
            </View>

            {/* Search Bar */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 12,
                    marginVertical: 8,
                }}
            >
                <View
                    style={{
                        width: '100%',
                        borderColor: isSearchFocused ? backIconColor : '#F9FAFD',
                        borderWidth: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        borderRadius: 11,
                        paddingHorizontal: 8,
                        elevation: 2,
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 40, width: 23 }}>
                        <Icon5 name="search" size={20} color={backIconColor} style={{ margin: 0, padding: 0 }} />
                    </View>
                    <TextInput
                        style={{
                            paddingVertical: 0,
                            height: 40,
                            color: '#000',
                            fontWeight: '500',
                            letterSpacing: 0.3,
                            width: '87%',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        placeholder="Search by dish, cake or grocery"
                        placeholderTextColor="#a0abb7"
                        onChangeText={setSearch}
                        value={search}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                    />
                </View>
            </View>

            {/* Content */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    width: screenWidth,
                }}
            >
                {loading ? (
                    <View>
                        <Text style={{ color: '#000', textAlign: 'center' }}>Loading ...</Text>
                    </View>
                ) : (
                    <FlatList
                        data={orders}
                        renderItem={renderOrder}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 90, paddingTop: 4 }}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

export default OrderHistory;
