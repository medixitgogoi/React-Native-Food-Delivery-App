import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { background } from '../utils/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const Restaurants = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background, paddingBottom: 10 }}>
            <StatusBar
                animated={true}
                backgroundColor={background}
                barStyle="dark-content"
            />
            <Text style={{ color: '#000' }}>Restaurants</Text>
        </SafeAreaView>
    )
}

export default Restaurants;

const styles = StyleSheet.create({})
