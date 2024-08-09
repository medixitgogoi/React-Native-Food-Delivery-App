import { SafeAreaView, StatusBar, Text, TextInput, View, Image, TouchableOpacity, Dimensions, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { background, backIconColor, darkGreen, lightGreen, offWhite } from '../utils/colors';
import Icon2 from 'react-native-vector-icons/dist/Octicons';
import Icon3 from 'react-native-vector-icons/dist/MaterialIcons';
import Icon4 from 'react-native-vector-icons/dist/Ionicons';
import Icon5 from 'react-native-vector-icons/dist/AntDesign';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { groceries } from '../utils/groceries';
import StarRating from '../components/StarRating';
import { restaurants } from '../utils/restaurants';
import { cakes } from '../utils/cakes';

const { width: screenWidth } = Dimensions.get('window');

const Home = () => {

    const navigation = useNavigation();

    const [search, setSearch] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
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
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 38, width: 23, }}>
                            <Icon4 name="search" size={20} color={backIconColor} style={{ margin: 0, padding: 0 }} />
                        </View>
                        <TextInput
                            style={{ height: 40, color: '#000', fontWeight: '400', width: '88%' }}
                            placeholder="Search your favorite food item"
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

            <ScrollView>
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
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                    <Text style={{ color: '#ebedf0', }}>________________________ </Text>
                    <Text style={{ color: '#8593a2', fontWeight: '500', fontSize: responsiveFontSize(1.9), textTransform: 'uppercase', letterSpacing: 1.1 }}> Explore </Text>
                    <Text style={{ color: '#ebedf0', }}>________________________ </Text>
                </View>

                {/* Groceries */}
                <View style={{ marginTop: 8 }}>
                    <View style={{ marginHorizontal: 12, marginBottom: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ textTransform: 'uppercase', color: '#000', fontSize: responsiveFontSize(2.4), fontWeight: '700' }}>Groceries</Text>
                        <TouchableOpacity style={{ borderRadius: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingLeft: 8, paddingVertical: 3, paddingRight: 2 }} onPress={() => navigation.navigate('Groceries')}>
                            <Text style={{ color: backIconColor, fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>View All</Text>
                            <View style={{ padding: 0, margin: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Icon3 name="chevron-right" size={18} color={darkGreen} style={{ margin: 0, padding: 0 }} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal>
                        <View style={{ paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            {groceries.map(item => (
                                <TouchableOpacity onPress={() => navigation.navigate('ProductDetails')} key={item?.id} style={{ width: screenWidth / 2.2, marginVertical: 6, backgroundColor: '#fff', borderTopLeftRadius: 14, borderTopRightRadius: 14, borderBottomLeftRadius: 14, borderBottomRightRadius: 20, overflow: 'hidden', elevation: 2 }}>

                                    <TouchableOpacity style={{ zIndex: 10, backgroundColor: '#c6e6c3', borderRadius: 50, position: 'absolute', top: 8, right: 8, width: 30, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon3 name="favorite-border" size={18} color={'#019934'} />
                                    </TouchableOpacity>

                                    <View style={{ backgroundColor: lightGreen, borderRadius: 12, margin: 3 }}>
                                        <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={require('../assets/orange.png')} style={{ width: '100%', height: 100, resizeMode: 'contain' }} />
                                        </View>
                                    </View>

                                    <View style={{ padding: 10 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                            <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '600', color: '#000' }}>{item.name}</Text>
                                            <StarRating rating={item.starRating} />
                                        </View>
                                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                            <Text style={{ color: offWhite, fontWeight: '600', fontSize: responsiveFontSize(1.8) }}>{item.subCategory}</Text>
                                        </View>
                                        <Text style={{ fontSize: 16, color: '#019934', fontWeight: '700' }}>₹{item.price}</Text>
                                    </View>

                                    <TouchableOpacity style={{ backgroundColor: '#019934', borderTopLeftRadius: 10, width: 35, height: 35, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0, right: 0 }}>
                                        <Icon3 name="add" size={20} color="#fff" />
                                    </TouchableOpacity>

                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>

                {/* Restaurants */}
                <View style={{ marginTop: 12 }}>
                    <View style={{ marginHorizontal: 12, marginBottom: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ textTransform: 'uppercase', color: '#000', fontSize: responsiveFontSize(2.4), fontWeight: '700' }}>Restaurants</Text>
                        <TouchableOpacity style={{ borderRadius: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingLeft: 8, paddingVertical: 3, paddingRight: 2 }} onPress={() => navigation.navigate('Restaurants')}>
                            <Text style={{ color: backIconColor, fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>View All</Text>
                            <View style={{ padding: 0, margin: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Icon3 name="chevron-right" size={18} color={darkGreen} style={{ margin: 0, padding: 0 }} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal>
                        <View style={{ paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            {restaurants.map(item => (
                                <TouchableOpacity onPress={() => navigation.navigate('ProductDetails')} key={item?.id} style={{ width: screenWidth / 2.2, marginVertical: 6, backgroundColor: '#fff', borderTopLeftRadius: 14, borderTopRightRadius: 14, borderBottomLeftRadius: 14, borderBottomRightRadius: 20, overflow: 'hidden', elevation: 2 }}>

                                    <TouchableOpacity style={{ zIndex: 10, backgroundColor: '#c6e6c3', borderRadius: 50, position: 'absolute', top: 8, right: 8, width: 30, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon3 name="favorite-border" size={18} color={'#019934'} />
                                    </TouchableOpacity>

                                    <View style={{ backgroundColor: lightGreen, borderRadius: 12, margin: 3 }}>
                                        <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={require('../assets/rice.png')} style={{ width: '100%', height: 100, resizeMode: 'contain' }} />
                                        </View>
                                    </View>

                                    <View style={{ padding: 10 }}>
                                        <View style={{ flexDirection: 'column', gap: 3 }}>
                                            <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '600', color: '#000' }} numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                                <StarRating rating={item.starRating} />
                                                <View style={{ backgroundColor: backIconColor, paddingVertical: 2, paddingHorizontal: 4, gap: 2, borderRadius: 5, flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.5), fontWeight: '500' }}>{item.starRating}</Text>
                                                    <Icon5 name="star" size={10} color={'#fff'} style={{ margin: 0, padding: 0, alignSelf: 'center' }} />
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginVertical: 6, alignItems: 'center', gap: 3 }}>
                                            {item.subCategory === 'Veg' ? (
                                                <View style={{ width: 17, height: 16, borderColor: '#000', borderWidth: 1.5, borderRadius: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                    <View style={{ backgroundColor: 'green', width: 9, height: 9, borderRadius: 10, }}>
                                                    </View>
                                                </View>
                                            ) : (
                                                <View style={{ width: 17, height: 16, borderColor: '#000', borderWidth: 1.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                                                    <Icon5 name="caretup" size={12} color={'#cb202d'} style={{ margin: 0, padding: 0, alignSelf: 'center' }} />
                                                </View>
                                            )}
                                            <Text style={{ color: offWhite, fontWeight: '600', fontSize: responsiveFontSize(1.8) }}>{item.subCategory}</Text>
                                        </View>
                                        <Text style={{ fontSize: 16, color: '#019934', fontWeight: '700', marginTop: 2 }}>₹{item.price}</Text>
                                    </View>

                                    <TouchableOpacity style={{ backgroundColor: '#019934', borderTopLeftRadius: 10, width: 35, height: 35, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0, right: 0 }}>
                                        <Icon3 name="add" size={20} color="#fff" />
                                    </TouchableOpacity>

                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>

                {/* Cakes */}
                <View style={{ marginTop: 12 }}>
                    <View style={{ marginHorizontal: 12, marginBottom: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ textTransform: 'uppercase', color: '#000', fontSize: responsiveFontSize(2.4), fontWeight: '700' }}>Cakes</Text>
                        <TouchableOpacity style={{ borderRadius: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingLeft: 8, paddingVertical: 3, paddingRight: 2 }} onPress={() => navigation.navigate('Cakes')}>
                            <Text style={{ color: backIconColor, fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>View All</Text>
                            <View style={{ padding: 0, margin: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Icon3 name="chevron-right" size={18} color={darkGreen} style={{ margin: 0, padding: 0 }} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* but the cards that are coming two in a row are rendered adjacent to each other. I want that there should be space between them just like justifyContent: 'spce-between' */}

                    <ScrollView horizontal>
                        <View style={{ paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            {cakes.map(item => (
                                <TouchableOpacity onPress={() => navigation.navigate('ProductDetails')} key={item?.id} style={{ width: screenWidth / 2.2, marginVertical: 6, backgroundColor: '#fff', borderTopLeftRadius: 14, borderTopRightRadius: 14, borderBottomLeftRadius: 14, borderBottomRightRadius: 20, overflow: 'hidden', elevation: 2 }}>

                                    <TouchableOpacity style={{ zIndex: 10, backgroundColor: '#c6e6c3', borderRadius: 50, position: 'absolute', top: 8, right: 8, width: 30, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon3 name="favorite-border" size={18} color={'#019934'} />
                                    </TouchableOpacity>

                                    <View style={{ backgroundColor: lightGreen, borderRadius: 12, margin: 3 }}>
                                        <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={require('../assets/cake.png')} style={{ width: '100%', height: 100, resizeMode: 'contain' }} />
                                        </View>
                                    </View>

                                    <View style={{ padding: 10 }}>
                                        <View style={{ flexDirection: 'column', gap: 3 }}>
                                            <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '600', color: '#000' }} numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                                <StarRating rating={item.starRating} />
                                                <View style={{ backgroundColor: backIconColor, paddingVertical: 2, paddingHorizontal: 4, gap: 2, borderRadius: 5, flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.5), fontWeight: '500' }}>{item.starRating}</Text>
                                                    <Icon5 name="star" size={10} color={'#fff'} style={{ margin: 0, padding: 0, alignSelf: 'center' }} />
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginVertical: 8, alignItems: 'center', gap: 3 }}>

                                            {item.subCategory === 'Veg' ? (
                                                <View style={{ width: 17, height: 16, borderColor: '#000', borderWidth: 1.5, borderRadius: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                    <View style={{ backgroundColor: 'green', width: 9, height: 9, borderRadius: 10, }}>

                                                    </View>
                                                </View>
                                            ) : (
                                                <View style={{ width: 17, height: 16, borderColor: '#000', borderWidth: 1.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                                                    <Icon5 name="caretup" size={12} color={'#cb202d'} style={{ margin: 0, padding: 0, alignSelf: 'center' }} />
                                                </View>
                                            )}
                                            <Text style={{ color: offWhite, fontWeight: '600', fontSize: responsiveFontSize(1.8) }}>{item.subCategory}</Text>
                                        </View>
                                        <Text style={{ fontSize: 16, color: '#019934', fontWeight: '700', marginTop: 2 }}>₹{item.price}</Text>
                                    </View>

                                    <TouchableOpacity style={{ backgroundColor: '#019934', borderTopLeftRadius: 10, width: 35, height: 35, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0, right: 0 }}>
                                        <Icon3 name="add" size={20} color="#fff" />
                                    </TouchableOpacity>

                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>

        </SafeAreaView>
    );
};

export default Home;