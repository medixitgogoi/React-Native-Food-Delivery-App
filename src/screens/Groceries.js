import { StatusBar, StyleSheet, TouchableOpacity, View, Text, TextInput, Image, ScrollView, Dimensions } from 'react-native';
import { background, backIconColor, darkGreen, lightGreen, offWhite } from '../utils/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/Octicons';
import Icon4 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { useState } from 'react';
import { groceries } from '../utils/groceries';

const { width: screenWidth } = Dimensions.get('window');

const Groceries = () => {

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
            <View style={{ flexDirection: "column", backgroundColor: darkGreen, elevation: 1, paddingHorizontal: 10, paddingTop: 5, paddingBottom: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%", }}>
                    <View style={{ paddingVertical: 8, flexDirection: "row", alignItems: "center", gap: 6 }}>
                        <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 8, elevation: 3 }} onPress={() => navigation.goBack()}>
                            <Icon name="keyboard-arrow-left" size={23} color={backIconColor} />
                        </TouchableOpacity>
                        <Text style={{ color: '#fff', fontWeight: "600", fontSize: responsiveFontSize(2.7), textAlign: 'center', width: '83%', textTransform: 'uppercase' }}>Groceries</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ width: '85%', borderColor: isSearchFocused ? backIconColor : '#F9FAFD', borderWidth: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 11, paddingHorizontal: 8, elevation: 1 }}>
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
                    <TouchableOpacity style={{ backgroundColor: '#fff', borderRadius: 8, width: 38, height: 38, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon4 name="filter-menu-outline" size={20} color={backIconColor} />
                    </TouchableOpacity>
                </View>

            </View>

            <ScrollView style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', width: screenWidth, paddingHorizontal: 10, paddingVertical: 6 }}>
                    {groceries.map(item => (
                        <View key={item?.id} style={{ width: screenWidth / 2.2, marginVertical: 6, backgroundColor: '#fff', borderTopLeftRadius: 14, borderTopRightRadius: 14, borderBottomLeftRadius: 14, borderBottomRightRadius: 20, overflow: 'hidden', elevation: 2, }}>

                            <TouchableOpacity style={{ zIndex: 10, backgroundColor: '#c6e6c3', borderRadius: 50, position: 'absolute', top: 8, right: 8, width: 30, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Icon name="favorite-border" size={20} color="green" />
                            </TouchableOpacity>

                            <View style={{ backgroundColor: lightGreen, borderRadius: 12, margin: 3 }}>
                                <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={require('../assets/orange.png')} style={{ width: '100%', height: 100, resizeMode: 'contain' }} />
                                </View>
                            </View>

                            <View style={{ padding: 10 }}>
                                <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '600', color: '#000' }}>{item.name}</Text>
                                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                    <Text style={{ color: offWhite, fontWeight: '600', fontSize: responsiveFontSize(1.8) }}>{item.subCategory}</Text>
                                </View>
                                <Text style={{ fontSize: 16, color: 'green', fontWeight: '700' }}>₹{item.price}</Text>
                                {/* <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                                    {[...Array(4)].map((_, index) => (
                                        <Icon key={index} name="star" size={16} color="#FFA41C" />
                                    ))}
                                    <Icon name="star-border" size={16} color="#FFA41C" />
                                </View> */}
                            </View>

                            <TouchableOpacity style={{ backgroundColor: 'green', borderTopLeftRadius: 10, width: 35, height: 35, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0, right: 0 }}>
                                <Icon name="add" size={20} color="white" />
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