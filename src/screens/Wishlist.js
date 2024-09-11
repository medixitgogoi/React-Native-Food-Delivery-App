import { StatusBar, StyleSheet, Text, SafeAreaView } from 'react-native';
import { background } from '../utils/colors';
import { useSelector } from 'react-redux';

const Wishlist = () => {

    const wishlistProducts = useSelector(state => state.wishlist);
    console.log('wishlistProducts', wishlistProducts);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
            <StatusBar
                animated={true}
                backgroundColor={background}
                barStyle="dark-content"
            />
            <Text style={{ color: '#000' }}>Wishlist</Text>
        </SafeAreaView>
    )
}

export default Wishlist

const styles = StyleSheet.create({});