import { SafeAreaView, StatusBar, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { darkGreen, lightGreen } from '../utils/colors';
import Icon2 from 'react-native-vector-icons/dist/Octicons';
import Icon3 from 'react-native-vector-icons/dist/MaterialIcons';
import Icon4 from 'react-native-vector-icons/dist/Ionicons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const Home = () => {

    const navigation = useNavigation();

    const [search, setSearch] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F9FAFD", paddingVertical: 10 }}>
            <StatusBar
                animated={true}
                backgroundColor={'#F9FAFD'}
                barStyle="dark-content"
            />

            {/* header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, paddingHorizontal: 12 }}>
                <View style={{flexDirection: 'column'}}>
                    <Text style={{ color: '#a0abb7', fontWeight: '500', fontSize: responsiveFontSize(1.9) }}>Welcome</Text>
                    <Text style={{ fontSize: responsiveFontSize(2.4), fontWeight: '600', color: '#000' }}>Neymar Jr.</Text>
                </View>
                <TouchableOpacity style={{ backgroundColor: lightGreen, width: 35, height: 35, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('Profile')}>
                    <Icon name="user-alt" size={15} color={'#000'} />
                </TouchableOpacity>
            </View>

            {/* searchbar and location */}
            <View style={{ paddingHorizontal: 12, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, paddingVertical: 5 }}>
                <View style={{ width: '70%', borderColor: isSearchFocused ? darkGreen : '#f2f9f1', borderWidth: isSearchFocused ? 1 : 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 5 }}>
                    <View style={{ borderRadius: 10, alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                        <Icon2 name="search" size={15} color={'#000'} />
                    </View>
                    <TextInput
                        style={{
                            height: 40,
                            color: '#000',
                            fontWeight: '500'
                        }}
                        placeholder="Search Grocery"
                        placeholderTextColor="#a0abb7"
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                    />
                </View>
                <View style={{ width: '29%', height: 40, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ width: '30%', justifyContent: 'flex-start' }}>
                        <Icon3 name="location-pin" size={30} color={'#cb202d'} />
                    </View>
                    <View style={{ width: '70%', flexDirection: 'column', }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(1.9), fontWeight: '600' }}>Nongpoh</Text>
                            <Icon4 name="caret-down-outline" size={15} color={'#000'} style={{}} />
                        </View>
                        <Text style={{ color: '#a0abb7', fontWeight: '600', fontSize: responsiveFontSize(1.5) }}>Meghalaya</Text>
                    </View>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 }}>
                {['ALL', 'Grocery', 'Cakes', 'Restaurant'].map((category, index) => (
                    <Text key={index} style={{ color: index === 0 ? '#00f' : '#000' }}>
                        {category}
                    </Text>
                ))}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
                <View style={{ width: '48%', backgroundColor: '#f9f9f9', borderRadius: 8, padding: 16 }}>
                    <Image
                        style={{ width: '100%', height: 100, borderRadius: 8, marginBottom: 8 }}
                        source={{ uri: 'https://via.placeholder.com/100' }}
                    />
                    <Text style={{ fontSize: responsiveFontSize(1.8), fontWeight: 'bold', color: '#000', marginBottom: 4 }}>Orange Fruit</Text>
                    <Text style={{ fontSize: responsiveFontSize(1.6), color: '#888', marginBottom: 4 }}>Fruit</Text>
                    <Text style={{ fontSize: responsiveFontSize(1.8), fontWeight: 'bold', color: '#000' }}>$14.99</Text>
                </View>
                <View style={{ width: '48%', backgroundColor: '#f9f9f9', borderRadius: 8, padding: 16 }}>
                    <Image
                        style={{ width: '100%', height: 100, borderRadius: 8, marginBottom: 8 }}
                        source={{ uri: 'https://via.placeholder.com/100' }}
                    />
                    <Text style={{ fontSize: responsiveFontSize(1.8), fontWeight: 'bold', color: '#000', marginBottom: 4 }}>Broccoli Vegetable</Text>
                    <Text style={{ fontSize: responsiveFontSize(1.6), color: '#888', marginBottom: 4 }}>Vegetable</Text>
                    <Text style={{ fontSize: responsiveFontSize(1.8), fontWeight: 'bold', color: '#000' }}>$29.99</Text>
                </View>
            </View>
            <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: responsiveFontSize(1.8), fontWeight: 'bold', color: '#000', marginBottom: 8 }}>Recent Shop</Text>
                <View style={{ flexDirection: 'row', backgroundColor: '#f9f9f9', borderRadius: 8, padding: 16, alignItems: 'center' }}>
                    <Image
                        style={{ width: 40, height: 40, borderRadius: 8, marginRight: 16 }}
                        source={{ uri: 'https://via.placeholder.com/40' }}
                    />
                    <View>
                        <Text style={{ fontSize: responsiveFontSize(1.8), fontWeight: 'bold', color: '#000', marginBottom: 4 }}>Celery Vegetable</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.6), color: '#888', marginBottom: 4 }}>Vegetable</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.8), fontWeight: 'bold', color: '#000' }}>$10.99</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView >
    );
};

export default Home;