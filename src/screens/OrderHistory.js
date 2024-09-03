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

    const renderOrder = ({ item }) => {
        <View key={item.id}>
            <Text>{item.name}</Text>
        </View>
    }

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