import { StatusBar, StyleSheet, TouchableOpacity, View, Text, TextInput, Image, ScrollView, Dimensions, Animated, Easing } from 'react-native';
import { background, backIconColor, darkGreen, lightGreen, offWhite } from '../utils/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/Octicons';
import Icon3 from 'react-native-vector-icons/dist/AntDesign';
import Icon4 from 'react-native-vector-icons/dist/FontAwesome6';
import { useState, useRef } from 'react';
import { groceries } from '../utils/groceries';
import StarRating from '../components/StarRating';

const { width: screenWidth } = Dimensions.get('window');

const Groceries = () => {

    const navigation = useNavigation();

    const [search, setSearch] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const [slider, setSlider] = useState(false);
    const sliderHeight = useRef(new Animated.Value(0)).current;

    const toggleSlider = () => {
        if (slider) {
            Animated.timing(sliderHeight, {
                toValue: 0,
                duration: 200,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: false,
            }).start(() => setSlider(false));
        } else {
            setSlider(true);
            Animated.timing(sliderHeight, {
                toValue: 40, // Adjust this value based on your content height
                duration: 200,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: false,
            }).start();
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background, paddingBottom: 10 }}>
            <StatusBar
                animated={true}
                backgroundColor={darkGreen}
                barStyle="dark-content"
            />

            {/* header */}
            <View style={{ flexDirection: "column", backgroundColor: darkGreen, elevation: 1, paddingHorizontal: 10, paddingTop: 5, paddingBottom: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%", }}>
                    <View style={{ paddingVertical: 8, flexDirection: "row", alignItems: "center", gap: 6 }}>
                        <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: lightGreen, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 8, elevation: 3 }} onPress={() => navigation.goBack()}>
                            <Icon name="keyboard-arrow-left" size={23} color={backIconColor} />
                        </TouchableOpacity>
                        <Text style={{ color: '#fff', fontWeight: "600", fontSize: responsiveFontSize(2.7), textAlign: 'center', width: '83%', textTransform: 'uppercase' }}>Groceries</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ width: '86%', borderColor: isSearchFocused ? backIconColor : '#F9FAFD', borderWidth: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 11, paddingHorizontal: 8, elevation: 1 }}>
                        <Icon2 name="search" size={16} color={'#687889'} style={{ padding: 5 }} />
                        <TextInput
                            style={{ height: 38, color: '#000', fontWeight: '500', width: '87%' }}
                            placeholder="Search Grocery"
                            placeholderTextColor="#a0abb7"
                            onChangeText={setSearch}
                            value={search}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                        />
                    </View>
                    <TouchableOpacity style={{ backgroundColor: lightGreen, borderRadius: 8, width: 38, height: 38, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={toggleSlider}>
                        <Icon4 name="sliders" size={16} color={backIconColor} />
                    </TouchableOpacity>
                </View>
                {/* <TouchableOpacity style={{ backgroundColor: lightGreen, paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8, flexDirection: 'row', borderColor: backIconColor, borderWidth: 1, alignItems: 'center', gap: 3 }}>
                    <Text style={{ color: backIconColor, fontWeight: '500' }}>Price - low to high</Text>
                    <Icon3 name="close" size={16} color={backIconColor} style={{}} />
                </TouchableOpacity> */}
                <Animated.View style={{ height: sliderHeight, overflow: 'hidden' }}>
                    {slider && (
                        <ScrollView horizontal>
                            <View style={{ width: '100%', flexDirection: 'row', gap: 8, alignItems: 'center', marginTop: 10 }}>
                                <TouchableOpacity style={{ backgroundColor: '#fff', paddingHorizontal: 10, paddingVertical: 7, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                                    <Text style={{ color: '#000', fontWeight: '500' }}>Price - low to high</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: '#fff', paddingHorizontal: 10, paddingVertical: 7, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                                    <Text style={{ color: '#000', fontWeight: '500' }}>Price - high to low</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: '#fff', paddingHorizontal: 10, paddingVertical: 7, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                                    <Text style={{ color: '#000', fontWeight: '500' }}>Rating - high to low</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: '#fff', paddingHorizontal: 10, paddingVertical: 7, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                                    <Icon3 name="star" size={16} color={'#FFA41C'} />
                                    <Text style={{ color: '#000', fontWeight: '500' }}>Rated 4+</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    )}
                </Animated.View>

            </View>

            <ScrollView style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', width: screenWidth, paddingHorizontal: 10, paddingVertical: 6 }}>
                    {groceries.map(item => (
                        <View key={item?.id} style={{ width: screenWidth / 2.2, marginVertical: 6, backgroundColor: '#fff', borderTopLeftRadius: 14, borderTopRightRadius: 14, borderBottomLeftRadius: 14, borderBottomRightRadius: 20, overflow: 'hidden', elevation: 2, }}>

                            <TouchableOpacity style={{ zIndex: 10, backgroundColor: '#c6e6c3', borderRadius: 50, position: 'absolute', top: 8, right: 8, width: 30, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Icon name="favorite-border" size={18} color={'#019934'} />
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
                                <Icon name="add" size={20} color="#fff" />
                            </TouchableOpacity>

                        </View>
                    ))}
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default Groceries;

const styles = StyleSheet.create({});