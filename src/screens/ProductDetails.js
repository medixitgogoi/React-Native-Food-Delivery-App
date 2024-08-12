import { Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { background, backIconColor, darkGreen, lightGreen, offWhite } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/FontAwesome5';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome6';
import Icon4 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import StarRatingDetails from '../components/StarRatingDetails';
import { groceries } from '../utils/groceries';
import StarRating from '../components/StarRating';
import { useEffect, useState } from 'react';

const { width: screenWidth } = Dimensions.get('window');

const ProductDetails = () => {

    const navigation = useNavigation();

    const renderOrder = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetails')} key={item?.id} style={{ width: screenWidth / 2.2, marginVertical: 6, backgroundColor: '#fff', borderTopLeftRadius: 14, borderTopRightRadius: 14, borderBottomLeftRadius: 14, borderBottomRightRadius: 20, overflow: 'hidden', elevation: 2 }}>

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
                        <Text style={{ color: offWhite, fontWeight: '600', fontSize: responsiveFontSize(1.7) }}>{item.subCategory}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                        <Text style={{ fontSize: responsiveFontSize(2.3), color: '#019934', fontWeight: '700' }}>₹{item.price}</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.8), color: '#6c6c6c', fontWeight: '500' }}>/{item.unit}</Text>
                    </View>
                </View>

            </TouchableOpacity>
)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background, paddingBottom: 75 }}>
            <StatusBar
                animated={true}
                backgroundColor={'#dff1dd'}
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ paddingHorizontal: 10, backgroundColor: '#dff1dd', height: '40%', width: '100%', flexDirection: 'column', paddingVertical: 8, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '13%' }}>
                    <TouchableOpacity style={{ width: 32, height: 32, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 8, elevation: 3 }} onPress={() => navigation.goBack()}>
                        <Icon name="keyboard-arrow-left" size={23} color={'#000'} />
                    </TouchableOpacity>
                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2.4), fontWeight: '600' }}>Details</Text>
                    <TouchableOpacity
                        style={{ backgroundColor: '#fff', width: 32, height: 32, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', elevation: 5 }}
                        onPress={() => navigation.navigate('Cart')}
                    >
                        <Icon4 name="shopping" size={20} color={'#000'} />
                    </TouchableOpacity>
                </View>
                <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '87%' }}>
                    <Image source={require('../assets/orange.png')} style={{ width: '100%', height: 200, resizeMode: 'contain' }} />
                </View>
            </View>

            {/* Details */}
            <ScrollView>
                <View style={{ paddingHorizontal: 10, paddingTop: 10, flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2.6), fontWeight: '700' }}>Fresh Orange</Text>

                    <StarRatingDetails rating={4} />

                    {/* price */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                            <Text style={{ fontSize: responsiveFontSize(2.6), color: '#019934', fontWeight: '700' }}>₹250</Text>
                            <Text style={{ fontSize: responsiveFontSize(1.8), color: '#6c6c6c', fontWeight: '500' }}>/kg</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <TouchableOpacity>
                                <Icon3 name="circle-minus" size={30} color={backIconColor} />
                            </TouchableOpacity>
                            <Text style={{ color: '#8f8f8f', fontWeight: '500', fontSize: responsiveFontSize(2.3) }}>1 KG</Text>
                            <TouchableOpacity>
                                <Icon3 name="circle-plus" size={30} color={backIconColor} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* product details */}
                    <View style={{ marginTop: 12, flexDirection: 'column', gap: 5 }}>
                        <Text style={{ color: '#000', fontSize: responsiveFontSize(2.3), fontWeight: '600', textTransform: 'uppercase' }}>Product Details :</Text>
                        <Text style={{ color: '#c0c0c0', fontWeight: '500', textAlign: 'justify', fontSize: responsiveFontSize(2) }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab aliquam inventore perferendis nulla facere, dolores harum qui rerum facilis alias similique ratione tenetur molestiae nesciunt ducimus explicabo commodi odio error?</Text>
                    </View>

                    {/* related products */}
                    <View style={{ flexDirection: 'column', gap: 5, marginTop: 12, }}>
                        <Text style={{ fontSize: responsiveFontSize(2.3), fontWeight: '600', color: '#000', textTransform: 'uppercase' }}>Related Products :</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            {groceries.map(item => (
                                <TouchableOpacity onPress={() => navigation.navigate('ProductDetails')} key={item?.id} style={{ width: screenWidth / 2.2, marginVertical: 6, backgroundColor: '#fff', borderTopLeftRadius: 14, borderTopRightRadius: 14, borderBottomLeftRadius: 14, borderBottomRightRadius: 20, overflow: 'hidden', elevation: 2 }}>

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
                                            <Text style={{ color: offWhite, fontWeight: '600', fontSize: responsiveFontSize(1.7) }}>{item.subCategory}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                                            <Text style={{ fontSize: responsiveFontSize(2.3), color: '#019934', fontWeight: '700' }}>₹{item.price}</Text>
                                            <Text style={{ fontSize: responsiveFontSize(1.8), color: '#6c6c6c', fontWeight: '500' }}>/{item.unit}</Text>
                                        </View>
                                    </View>

                                </TouchableOpacity>
                            ))}
                        </View>

                    </View>
                </View>
            </ScrollView>

            {/* total price and add to cart */}
            <View style={{ backgroundColor: '#fff', position: 'absolute', bottom: 0, width: '100%', height: 70, elevation: 5, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 }}>
                <View style={{ width: '40%', height: '100%', flexDirection: 'column', justifyContent: 'center', gap: 3 }}>
                    <Text style={{ color: '#b0b0b0', fontWeight: '600', fontSize: responsiveFontSize(1.7) }}>Total Price</Text>
                    <Text style={{ color: '#000', fontSize: responsiveFontSize(3), fontWeight: '600' }}>₹1000</Text>
                </View>

                <View style={{ width: '60%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <TouchableOpacity style={{ gap: 5, backgroundColor: '#41b24b', paddingHorizontal: 30, height: 43, borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.5), fontWeight: '500' }}>Add to cart</Text>
                        <Icon name="add-shopping-cart" size={18} color={'#fff'} />
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default ProductDetails;

const styles = StyleSheet.create({});