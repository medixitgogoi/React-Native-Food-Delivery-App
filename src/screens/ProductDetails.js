import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { background, darkGreen, lightGreen } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

const ProductDetails = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background, paddingBottom: 10 }}>
            <StatusBar
                animated={true}
                backgroundColor={'#dff1dd'}
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ paddingHorizontal: 10, backgroundColor: '#dff1dd', height: '40%', width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8,  }}>
                <TouchableOpacity style={{ width: 32, height: 32, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 8, elevation: 3 }} onPress={() => navigation.goBack()}>
                    <Icon name="keyboard-arrow-left" size={23} color={'#000'} />
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default ProductDetails;

const styles = StyleSheet.create({});