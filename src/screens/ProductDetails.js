import { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { background, backIconColor, darkGreen, lightGreen, modalBackColor, offWhite } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/AntDesign';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome6';
import Icon4 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon5 from 'react-native-vector-icons/dist/Ionicons';
import StarRatingDetails from '../components/StarRatingDetails';
import { groceries } from '../utils/groceries';
import { restaurants } from '../utils/restaurants';
import { cakes } from '../utils/cakes';
import StarRating from '../components/StarRating';
import Modal from 'react-native-modal';
import { RadioButton } from 'react-native-paper';

const { width: screenWidth } = Dimensions.get('window');

const ProductDetails = ({ route }) => {

    const product = route?.params?.data;
    console.log('product', product);

    const navigation = useNavigation();

    const relatedGroceryProducts = groceries.filter(item => item.id < 5);
    const relatedRestaurantProducts = restaurants.filter(item => item.id < 5);
    const relatedCakeProducts = cakes.filter(item => item.id < 5);

    const [modalVisible, setModalVisible] = useState(false);
    const [checked, setChecked] = useState('kg');

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
        <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
            <StatusBar
                animated={true}
                backgroundColor={modalVisible ? "#747474" : '#dff1dd'}
                barStyle="dark-content"
            />

            {/* header */}
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
                    {product.type === 'grocery' ? (
                        <Image source={require('../assets/orange.png')} style={{ width: '100%', height: 200, resizeMode: 'contain' }} />
                    ) : product.type === 'restaurant' ? (
                        <Image source={require('../assets/rice.png')} style={{ width: '100%', height: 200, resizeMode: 'contain' }} />
                    ) : (
                        <Image source={require('../assets/cake.png')} style={{ width: '100%', height: 200, resizeMode: 'contain' }} />
                    )}
                </View>
            </View>

            {/* Details */}
            <ScrollView>
                <View style={{ paddingHorizontal: 10, paddingTop: 10, flexDirection: 'column', alignItems: 'flex-start', gap: 6, }}>
                    {/* name */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <Text style={{ color: '#000', fontSize: responsiveFontSize(2.6), fontWeight: '700' }}>{product.name}</Text>
                        {product.type != 'grocery' && (
                            <View style={{ flexDirection: 'row', marginVertical: 6, alignItems: 'center', gap: 3, backgroundColor: '#fff', borderColor: offWhite, borderWidth: 0.8, padding: 5, borderRadius: 7 }}>
                                {product?.subCategory === 'Veg' ? (
                                    <View style={{ width: 17, height: 17, borderColor: '#000', borderWidth: 1.5, borderRadius: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <View style={{ backgroundColor: 'green', width: 9, height: 9, borderRadius: 10, }}>
                                        </View>
                                    </View>
                                ) : (
                                    <View style={{ width: 17, height: 17, borderColor: '#000', borderWidth: 1.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                                        <Icon2 name="caretup" size={12} color={'#cb202d'} style={{ margin: 0, padding: 0, alignSelf: 'center' }} />
                                    </View>
                                )}
                                <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(1.8) }}>{product?.subCategory}</Text>
                            </View>
                        )}
                    </View>

                    <StarRatingDetails rating={product.starRating} />

                    {/* price */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                            <Text style={{ fontSize: responsiveFontSize(2.6), color: '#019934', fontWeight: '700' }}>₹{product.price}</Text>
                            {/* <Text style={{ fontSize: responsiveFontSize(1.8), color: '#6c6c6c', fontWeight: '500' }}>/kg</Text> */}
                        </View>
                        {/* <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <TouchableOpacity>
                                <Icon3 name="circle-minus" size={30} color={backIconColor} />
                            </TouchableOpacity>
                            <Text style={{ color: '#8f8f8f', fontWeight: '500', fontSize: responsiveFontSize(2.3) }}>1</Text>
                            <TouchableOpacity>
                                <Icon3 name="circle-plus" size={30} color={backIconColor} />
                            </TouchableOpacity>
                        </View> */}
                    </View>

                    {/* product details */}
                    <View style={{ marginTop: 12, flexDirection: 'column', gap: 4 }}>
                        <Text style={{ color: '#000', fontSize: responsiveFontSize(2.3), fontWeight: '600', textTransform: 'uppercase' }}>Product Details :</Text>
                        <Text style={{ color: '#898989', fontWeight: '400', textAlign: 'justify', fontSize: responsiveFontSize(2) }}>{product.description}</Text>
                    </View>

                    {/* related products */}
                    <View style={{ flexDirection: 'column', gap: 5, marginTop: 12, marginBottom: 80 }}>
                        <Text style={{ fontSize: responsiveFontSize(2.3), fontWeight: '600', color: '#000', textTransform: 'uppercase', marginBottom: 5 }}>Related Products :</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                            {product.type === 'grocery' && relatedGroceryProducts.map(item => (
                                <TouchableOpacity onPress={() => navigation.navigate('ProductDetails')} key={item?.id} style={{ width: screenWidth / 2.2, backgroundColor: '#fff', borderTopLeftRadius: 14, borderTopRightRadius: 14, borderBottomLeftRadius: 14, borderBottomRightRadius: 20, overflow: 'hidden', elevation: 2 }}>

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

                            {product.type === 'restaurant' && relatedRestaurantProducts.map(item => (
                                <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { data: item })} key={item?.id} style={{ width: screenWidth / 2.2, backgroundColor: '#fff', borderTopLeftRadius: 14, borderTopRightRadius: 14, borderBottomLeftRadius: 14, borderBottomRightRadius: 20, overflow: 'hidden', elevation: 2 }}>

                                    <TouchableOpacity style={{ zIndex: 10, backgroundColor: '#c6e6c3', borderRadius: 50, position: 'absolute', top: 8, right: 8, width: 30, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon name="favorite-border" size={18} color={'#019934'} />
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
                                                <View style={{ width: 17, height: 17, borderColor: '#000', borderWidth: 1.5, borderRadius: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                    <View style={{ backgroundColor: 'green', width: 9, height: 9, borderRadius: 10, }}>
                                                    </View>
                                                </View>
                                            ) : (
                                                <View style={{ width: 17, height: 17, borderColor: '#000', borderWidth: 1.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                                                    <Icon2 name="caretup" size={12} color={'#cb202d'} style={{ margin: 0, padding: 0, alignSelf: 'center' }} />
                                                </View>
                                            )}
                                            <Text style={{ color: offWhite, fontWeight: '600', fontSize: responsiveFontSize(1.7) }}>{item.subCategory}</Text>
                                        </View>
                                        <Text style={{ fontSize: responsiveFontSize(2.3), color: '#019934', fontWeight: '700', marginTop: 2 }}>₹{item.price}</Text>
                                    </View>

                                    {/* <TouchableOpacity style={{ backgroundColor: '#019934', borderTopLeftRadius: 10, width: 35, height: 35, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0, right: 0 }}>
                                        <Icon3 name="add" size={20} color="#fff" />
                                    </TouchableOpacity> */}

                                </TouchableOpacity>
                            ))}

                            {product.type === 'cake' && relatedCakeProducts.map(item => (
                                <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { data: item })} key={item?.id} style={{ width: screenWidth / 2.2, backgroundColor: '#fff', borderTopLeftRadius: 14, borderTopRightRadius: 14, borderBottomLeftRadius: 14, borderBottomRightRadius: 20, overflow: 'hidden', elevation: 2 }}>

                                    <TouchableOpacity style={{ zIndex: 10, backgroundColor: '#c6e6c3', borderRadius: 50, position: 'absolute', top: 8, right: 8, width: 30, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon name="favorite-border" size={18} color={'#019934'} />
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
                                                    <Icon2 name="caretup" size={12} color={'#cb202d'} style={{ margin: 0, padding: 0, alignSelf: 'center' }} />
                                                </View>
                                            )}
                                            <Text style={{ color: offWhite, fontWeight: '600', fontSize: responsiveFontSize(1.7) }}>{item.subCategory}</Text>
                                        </View>
                                        <Text style={{ fontSize: responsiveFontSize(2.3), color: '#019934', fontWeight: '700', marginTop: 2 }}>₹{item.price}</Text>
                                    </View>

                                    {/* <TouchableOpacity style={{ backgroundColor: '#019934', borderTopLeftRadius: 10, width: 35, height: 35, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0, right: 0 }}>
                                        <Icon3 name="add" size={20} color="#fff" />
                                    </TouchableOpacity> */}

                                </TouchableOpacity>
                            ))}
                        </View>

                    </View>
                </View>
            </ScrollView>

            {/* total price and add to cart */}
            <View style={{ backgroundColor: '#fff', position: 'absolute', bottom: 0, width: '100%', height: 70, elevation: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 }}>
                <View style={{ width: '40%', height: '100%', flexDirection: 'column', justifyContent: 'center', gap: 3 }}>
                    <Text style={{ color: '#b0b0b0', fontWeight: '600', fontSize: responsiveFontSize(1.7) }}>Total Price</Text>
                    <Text style={{ color: '#000', fontSize: responsiveFontSize(3), fontWeight: '600' }}>₹1000</Text>
                </View>

                <View style={{ width: '60%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={{ gap: 5, backgroundColor: '#41b24b', paddingHorizontal: 30, height: 43, borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.5), fontWeight: '500' }}>Add to cart</Text>
                        <Icon name="add-shopping-cart" size={18} color={'#fff'} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* modal */}
            <Modal
                isVisible={modalVisible}
                onBackdropPress={() => setModalVisible(false)}
                onSwipeComplete={() => setModalVisible(false)}
                onRequestClose={() => setModalVisible(false)}
                animationType="slide"
                swipeDirection={['down']}
                backdropOpacity={0.5}
                style={{ justifyContent: 'flex-end', margin: 0, }}
            >

                <View style={{ width: "100%", height: '100%', justifyContent: 'flex-end' }}>
                    {/* Close Button */}
                    <TouchableOpacity style={{ alignSelf: 'center', backgroundColor: '#000', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 35, height: 35, borderRadius: 50, marginBottom: 10 }} onPress={() => setModalVisible(false)}>
                        <Icon5 name="close" size={20} style={{ color: '#fff' }} />
                    </TouchableOpacity>

                    {/* unit */}
                    <View style={{ backgroundColor: modalBackColor, borderTopLeftRadius: 17, borderTopRightRadius: 17, elevation: 1, paddingHorizontal: 14, paddingVertical: 8 }}>
                        {/* Headline */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, marginBottom: 15, marginTop: 5 }}>
                            <Text style={{ textAlign: 'center', color: '#383838', fontWeight: '600', fontSize: responsiveFontSize(2.2), }}>Fill up the details below</Text>
                        </View>

                        <View style={{ flexDirection: 'column', backgroundColor: '#fff', borderRadius: 14, paddingHorizontal: 15, paddingVertical: 12, gap: 3 }}>
                            <Text style={{ color: '#517c84', fontWeight: '500', fontSize: responsiveFontSize(2.3), marginBottom: 4 }}>Select Unit :</Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center', height: 25 }}>
                                <RadioButton
                                    value="kg"
                                    status={checked === 'kg' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('kg')}
                                    color={backIconColor}
                                />
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ color: '#000', fontWeight: '600' }}>kg</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', height: 25 }}>
                                <RadioButton
                                    value="gm"
                                    status={checked === 'gm' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('gm')}
                                    color={backIconColor}
                                />
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ color: '#000', fontWeight: '600' }}>gm</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* add button */}
                    <View style={{ backgroundColor: '#fff', height: 65, paddingHorizontal: 12, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: lightGreen, height: 42, width: '32%', justifyContent: 'center', borderRadius: 8, borderColor: backIconColor, borderWidth: 0.5 }}>
                            <TouchableOpacity>
                                <Icon3 name="circle-minus" size={25} color={backIconColor} />
                            </TouchableOpacity>
                            <Text style={{ color: '#8f8f8f', fontWeight: '500', fontSize: responsiveFontSize(2.3) }}>1</Text>
                            <TouchableOpacity>
                                <Icon3 name="circle-plus" size={25} color={backIconColor} />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={{ width: '65%', height: 42, backgroundColor: darkGreen, borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                                <Text style={{ color: '#fff', fontWeight: '500', fontSize: responsiveFontSize(2.3) }}>Add item</Text>
                                <Text style={{ color: '#fff', fontWeight: '500', fontSize: responsiveFontSize(2.3) }}>₹1000</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    )
}

export default ProductDetails;

const styles = StyleSheet.create({});