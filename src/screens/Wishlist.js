import { StatusBar, StyleSheet, Text, SafeAreaView } from 'react-native';
import { background } from '../utils/colors';

const Wishlist = () => {
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