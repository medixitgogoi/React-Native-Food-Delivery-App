import { SafeAreaView, StatusBar, Text, TextInput, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { background, darkGreen, lightGreen } from '../utils/colors';
import Icon2 from 'react-native-vector-icons/dist/Octicons';
import Icon3 from 'react-native-vector-icons/dist/MaterialIcons';
import Icon4 from 'react-native-vector-icons/dist/Ionicons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');

const Home = () => {

    const navigation = useNavigation();

    const [search, setSearch] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background, paddingBottom: 10 }}>
            <StatusBar
                animated={true}
                backgroundColor={darkGreen}
                barStyle="dark-content"
            />

            {/* header */}
            <View style={{ backgroundColor: darkGreen, paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, paddingHorizontal: 12 }}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ color: '#25642a', fontWeight: '500', fontSize: responsiveFontSize(2) }}>Welcome</Text>
                    <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '600', color: '#000' }}>Neymar Jr.</Text>
                </View>
                <TouchableOpacity
                    style={{ backgroundColor: lightGreen, width: 35, height: 35, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', elevation: 5 }}
                    onPress={() => navigation.navigate('Profile')}
                >
                    <Icon name="user-alt" size={15} color={'#000'} />
                </TouchableOpacity>
            </View>

            {/* searchbar and location */}
            <LinearGradient
                colors={[darkGreen, '#F9FAFD']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                locations={[0, 0.99]}
                style={{ paddingBottom: 20, }}
            >

                {/* searchbar and location */}
                <View style={{ paddingHorizontal: 12, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, paddingVertical: 5 }}>
                    <View style={{ width: '70%', borderColor: isSearchFocused ? '#3a9d43' : '#F9FAFD', borderWidth: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 11, paddingHorizontal: 8, elevation: 1 }}>
                        <Icon2 name="search" size={16} color={'#687889'} style={{ padding: 5 }} />
                        <TextInput
                            style={{ height: 40, color: '#000', fontWeight: '500', width: '87%' }}
                            placeholder="Search Grocery"
                            placeholderTextColor="#a0abb7"
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

            {/* for you */}
            <View>

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
                        <Image source={require("../assets/cake.jpeg")} style={{ width: '100%', height: '100%' }} resizeMode='cover' />
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
            <View style={{ marginTop: 5 }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#ebedf0', }}>________________________ </Text>
                    <Text style={{ color: '#8593a2', fontWeight: '500', fontSize: responsiveFontSize(1.9), textTransform: 'uppercase', letterSpacing: 1.1 }}> Explore </Text>
                    <Text style={{ color: '#ebedf0', }}>________________________ </Text>
                </View>


            </View>

            {/* exclusive offer */}
            <View style={{ marginTop: 5 }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#ebedf0', }}>________________________ </Text>
                    <Text style={{ color: '#8593a2', fontWeight: '500', fontSize: responsiveFontSize(1.9), textTransform: 'uppercase', letterSpacing: 1.1 }}> Exclusive Offer </Text>
                    <Text style={{ color: '#ebedf0', }}>________________________ </Text>
                </View>


            </View>

            {/* best selling */}
            <View style={{ marginTop: 5 }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#ebedf0', }}>________________________ </Text>
                    <Text style={{ color: '#8593a2', fontWeight: '500', fontSize: responsiveFontSize(1.9), textTransform: 'uppercase', letterSpacing: 1.1 }}> Best Selling </Text>
                    <Text style={{ color: '#ebedf0', }}>________________________ </Text>
                </View>


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