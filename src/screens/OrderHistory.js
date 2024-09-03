import { View, Text, TouchableOpacity, StatusBar, TextInput, ScrollView, Dimensions, FlatList } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { background, backIconColor } from '../utils/colors';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon4 from 'react-native-vector-icons/dist/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Icon5 from 'react-native-vector-icons/dist/Ionicons';
import { useCallback, useMemo, useState } from 'react';
import { orders } from '../utils/orders';

const { width: screenWidth } = Dimensions.get('window');

const OrderHistory = () => {

    const navigation = useNavigation();

    const [search, setSearch] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const [loading, setLoading] = useState(false);

    const [filteredNames, setFilteredNames] = useState([]);

    const debouncedSearch = useMemo(() => debounce((text) => {
        setFilteredNames(orders.filter(order => order.name.toLowerCase().includes(text.toLowerCase())));
    }, 300), [data]);

    const handleSearch = (text) => {
        setSearch(text);
        debouncedSearch(text);
    };

    const renderOrder = useCallback(({ item }) => (
        <OrderItem item={item} search={search} />
    ), [search]);

    const OrderItem = ({ item, search }) => {

        // search text
        // const getHighlightedText = (text, highlight) => {
        //     const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        //     return (
        //         <Text>
        //             {parts.map((part, index) =>
        //                 part.toLowerCase() === highlight.toLowerCase() ? (
        //                     <Text key={index} style={{ backgroundColor: 'yellow' }}>{part}</Text>
        //                 ) : (
        //                     <Text key={index}>{part}</Text>
        //                 )
        //             )}
        //         </Text>
        //     );
        // };

        return (
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { data: item })} key={item?.id} style={{ width: screenWidth / 2.2, marginVertical: 6, backgroundColor: '#fff', borderTopLeftRadius: 14, borderTopRightRadius: 14, borderBottomLeftRadius: 14, borderBottomRightRadius: 20, overflow: 'hidden', elevation: 2, }}>

                <TouchableOpacity style={{ zIndex: 10, backgroundColor: '#c6e6c3', borderRadius: 50, position: 'absolute', top: 8, right: 8, width: 30, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="favorite-border" size={18} color={'#019934'} />
                </TouchableOpacity>

                <View style={{ backgroundColor: lightGreen, borderRadius: 12, margin: 3 }}>
                    <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../assets/orange.png')} style={{ width: '100%', height: 100, resizeMode: 'contain' }} />
                    </View>
                </View>

                <View style={{ padding: 10 }}>
                    <View style={{ flexDirection: 'column', gap: 3 }}>
                        <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '600', color: '#000' }} numberOfLines={1} ellipsizeMode='tail'>{getHighlightedText(item.name, search)}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                            <StarRating rating={item.starRating} />
                            <View style={{ backgroundColor: backIconColor, paddingVertical: 2, paddingHorizontal: 4, gap: 2, borderRadius: 5, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.5), fontWeight: '500' }}>{item.starRating}</Text>
                                <Icon3 name="star" size={10} color={'#fff'} style={{ margin: 0, padding: 0, alignSelf: 'center' }} />
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 5, marginTop: 2 }}>
                        <Text style={{ color: offWhite, fontWeight: '600', fontSize: responsiveFontSize(1.8) }}>{item.subCategory}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 3 }}>
                        <Text style={{ fontSize: responsiveFontSize(2.3), color: '#019934', fontWeight: '800' }}>₹{item.units[0].discountedPrice}</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.5), color: offWhite, fontWeight: '600', paddingBottom: 2, textDecorationLine: 'line-through' }}>₹{item.units[0].price}</Text>
                    </View>
                </View>

                {/* <TouchableOpacity style={{ backgroundColor: '#019934', borderTopLeftRadius: 10, width: 35, height: 35, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0, right: 0 }}>
                    <Icon name="add" size={20} color="#fff" />
                </TouchableOpacity> */}

            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background, paddingBottom: 60 }}>
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

            {/* searchbar */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, marginVertical: 8 }}>
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
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', width: screenWidth }}>
                {loading ? (
                    <View>
                        <Text style={{ color: '#000', textAlign: 'center' }}>Loading ...</Text>
                    </View>
                ) : (
                    <FlatList
                        data={orders}
                        renderItem={renderOrder}
                        keyExtractor={item => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 90, paddingTop: 4 }}
                        // columnWrapperStyle={{ justifyContent: 'space-between' }}
                    />
                )}
            </View>

        </SafeAreaView>
    )
}

export default OrderHistory;