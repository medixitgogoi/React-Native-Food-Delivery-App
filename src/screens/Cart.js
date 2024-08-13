import { StatusBar, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import { background, backIconColor, darkGreen, lightGreen, offWhite } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { groceries } from '../utils/groceries';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome6';
import Icon5 from 'react-native-vector-icons/dist/AntDesign';

const Cart = () => {

    const navigation = useNavigation();

    const renderOrder = ({ item }) => {
        <View>
            <Text style={{ color: '#000' }}>{item.name}</Text>
        </View>
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background, paddingBottom: 10 }}>
            <StatusBar
                animated={true}
                backgroundColor={darkGreen}
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ paddingHorizontal: 10, backgroundColor: darkGreen, height: 50, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 8, elevation: 3 }} onPress={() => navigation.goBack()}>
                    <Icon name="keyboard-arrow-left" size={23} color={'#000'} />
                </TouchableOpacity>
                <Text style={{ color: '#fff', fontWeight: "600", fontSize: responsiveFontSize(2.7), textAlign: 'center', textTransform: 'uppercase' }}>Cart</Text>
                <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 8, elevation: 3 }} onPress={() => navigation.navigate('Profile')}>
                    <Icon2 name="account" size={23} color={'#000'} />
                </TouchableOpacity>
            </View>

            <View style={{ padding: 10 }}>

                {/* cart item */}
                <View style={{ paddingHorizontal: 4, backgroundColor: '#fff', borderRadius: 12, elevation: 1, flexDirection: 'row', alignItems: 'center', overflow: 'hidden', height: 100 }}>
                    <View style={{ padding: 10, flexDirection: 'row', borderRadius: 10, alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#e4f4ea', height: 90 }}>
                        <Image source={require('../assets/orange.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                    </View>

                    <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'space-between', paddingLeft: 15, paddingVertical: 12, height: '100%' }}>
                        <Text style={{ color: '#000', fontWeight: '700', fontSize: responsiveFontSize(2.4) }}>Orange</Text>
                        <Text style={{ color: offWhite, fontWeight: '600' }}>Fruit</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 7 }}>
                            <Text style={{ color: darkGreen, fontWeight: '600', fontSize: responsiveFontSize(2.5) }}>₹299</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                <TouchableOpacity>
                                    <Icon3 name="circle-minus" size={30} color={backIconColor} />
                                </TouchableOpacity>
                                <Text style={{ color: '#8f8f8f', fontWeight: '500', fontSize: responsiveFontSize(2.3) }}>1</Text>
                                <TouchableOpacity>
                                    <Icon3 name="circle-plus" size={30} color={backIconColor} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ paddingHorizontal: 4, backgroundColor: '#fff', borderRadius: 12, elevation: 1, flexDirection: 'row', alignItems: 'center', overflow: 'hidden', height: 100, marginTop: 10 }}>
                    <View style={{ padding: 10, flexDirection: 'row', borderRadius: 10, alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#e4f4ea', height: 90 }}>
                        <Image source={require('../assets/rice.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                    </View>

                    <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'space-between', paddingLeft: 15, paddingVertical: 12, height: '100%' }}>
                        <Text style={{ color: '#000', fontWeight: '700', fontSize: responsiveFontSize(2.4) }}>Chicken Fried Rice</Text>
                        <View style={{ flexDirection: 'row', marginVertical: 6, alignItems: 'center', gap: 3 }}>
                            <View style={{ width: 17, height: 16, borderColor: '#000', borderWidth: 1.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                                <Icon5 name="caretup" size={12} color={'#cb202d'} style={{ margin: 0, padding: 0, alignSelf: 'center' }} />
                            </View>
                            <Text style={{ color: offWhite, fontWeight: '600', fontSize: responsiveFontSize(1.7) }}>Non-veg</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 7 }}>
                            <Text style={{ color: darkGreen, fontWeight: '600', fontSize: responsiveFontSize(2.5) }}>₹349</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                <TouchableOpacity>
                                    <Icon3 name="circle-minus" size={30} color={backIconColor} />
                                </TouchableOpacity>
                                <Text style={{ color: '#8f8f8f', fontWeight: '500', fontSize: responsiveFontSize(2.3) }}>1</Text>
                                <TouchableOpacity>
                                    <Icon3 name="circle-plus" size={30} color={backIconColor} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ paddingHorizontal: 4, backgroundColor: '#fff', borderRadius: 12, elevation: 1, flexDirection: 'row', alignItems: 'center', overflow: 'hidden', height: 100, marginTop: 10 }}>
                    <View style={{ padding: 10, flexDirection: 'row', borderRadius: 10, alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#e4f4ea', height: 90 }}>
                        <Image source={require('../assets/cake.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                    </View>

                    <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'space-between', paddingLeft: 15, paddingVertical: 12, height: '100%' }}>
                        <Text style={{ color: '#000', fontWeight: '700', fontSize: responsiveFontSize(2.4) }}>Red Velvet Cake</Text>
                        <View style={{ flexDirection: 'row', marginVertical: 6, alignItems: 'center', gap: 3 }}>
                            <View style={{ width: 17, height: 16, borderColor: '#000', borderWidth: 1.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                                <Icon5 name="caretup" size={12} color={'#cb202d'} style={{ margin: 0, padding: 0, alignSelf: 'center' }} />
                            </View>
                            <Text style={{ color: offWhite, fontWeight: '600', fontSize: responsiveFontSize(1.7) }}>Non-veg</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 7 }}>
                            <Text style={{ color: darkGreen, fontWeight: '600', fontSize: responsiveFontSize(2.5) }}>₹439</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                <TouchableOpacity>
                                    <Icon3 name="circle-minus" size={30} color={backIconColor} />
                                </TouchableOpacity>
                                <Text style={{ color: '#8f8f8f', fontWeight: '500', fontSize: responsiveFontSize(2.3) }}>1</Text>
                                <TouchableOpacity>
                                    <Icon3 name="circle-plus" size={30} color={backIconColor} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ backgroundColor: '#fff' }}>

                </View>

            </View>

            {/* <FlatList
                data={groceries}
                renderItem={renderOrder}
                // keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 90, paddingTop: 4 }}
                // columnWrapperStyle={{ justifyContent: 'space-between' }}
            /> */}

        </SafeAreaView>
    )
}

export default Cart;

const styles = StyleSheet.create({});