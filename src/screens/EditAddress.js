import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, ActivityIndicator, TextInput } from 'react-native';
import { background, backIconColor, darkGreen, lightGreen, offWhite } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon2 from 'react-native-vector-icons/dist/FontAwesome6';
import Icon3 from 'react-native-vector-icons/dist/AntDesign';
import Icon4 from 'react-native-vector-icons/dist/FontAwesome5';
import Icon5 from 'react-native-vector-icons/dist/Ionicons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';

const EditAddress = ({ route }) => {

    const { data: address } = route?.params;

    const navigation = useNavigation();

    const userDetails = useSelector(state => state.user);

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');

    useEffect(() => {
        setName(address?.name);
        setContact(address?.mobile);
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background, paddingBottom: 10 }}>
            <StatusBar
                animated={true}
                backgroundColor={background}
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ paddingHorizontal: 10, height: 50, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 8, elevation: 3 }} onPress={() => navigation.goBack()}>
                    <Icon name="keyboard-arrow-left" size={23} color={'#000'} />
                </TouchableOpacity>
                <Text style={{ color: '#000', fontWeight: "600", fontSize: responsiveFontSize(2.5), textAlign: 'center', textTransform: 'uppercase', position: 'absolute', left: 0, right: 0 }}>Edit Address</Text>
            </View>

            <ScrollView>
                {/* Name and contact */}
                <View style={{ backgroundColor: lightGreen, paddingHorizontal: 13, paddingVertical: 12, flexDirection: 'column', elevation: 2, borderRadius: 12, gap: 6 }}>
                    {/* Receiver's Name */}
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ color: '#9297a0', fontWeight: '500', fontSize: responsiveFontSize(1.9), marginBottom: 8 }}>Receiver’s name</Text>
                        <TextInput
                            style={{ height: 40, borderColor: offWhite, fontWeight: "500", borderWidth: 1.2, borderRadius: 8, paddingHorizontal: 15, fontSize: responsiveFontSize(2), color: '#000', backgroundColor: '#fff' }}
                            placeholder="Enter Name"
                            value={name}
                            onChangeText={setName}
                            placeholderTextColor={'#c8cacf'}
                        />
                    </View>

                    {/* Receiver's Contact */}
                    <View style={{}}>
                        <Text style={{ color: '#9297a0', fontWeight: '500', fontSize: responsiveFontSize(1.9), marginBottom: 8 }}>Receiver’s contact</Text>
                        <View style={{ height: 40, width: '100%', flexDirection: 'row', alignItems: 'center', borderRadius: 8, borderColor: offWhite, borderWidth: 1.2, paddingHorizontal: 10, justifyContent: 'flex-start', backgroundColor: '#fff' }}>
                            <View style={{ height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: 1, backgroundColor: '#fff' }}>
                                <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2), marginRight: 2, }}>+91</Text>
                            </View>
                            <TextInput
                                style={{ fontWeight: "500", fontSize: responsiveFontSize(2), color: '#000', width: '80%', backgroundColor: '#fff' }}
                                placeholder="Enter Contact No"
                                keyboardType='numeric'
                                maxLength={10}
                                value={contact}
                                onChangeText={setContact}
                                placeholderTextColor={'#c8cacf'}
                            />
                        </View>
                        <Text style={{ fontSize: responsiveFontSize(1.5), color: '#5c5c5c', marginTop: 2, textAlign: 'right' }}>*May be used to assist delivery</Text>
                    </View>
                </View>

            </ScrollView>

        </SafeAreaView>
    )
}

export default EditAddress;