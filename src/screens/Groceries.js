import { StatusBar, StyleSheet, View } from 'react-native';
import { background } from '../utils/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const Groceries = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background, paddingBottom: 10 }}>
            <StatusBar
                animated={true}
                backgroundColor={background}
                barStyle="dark-content"
            />

            {/* header */}
            <View>

            </View>

        </SafeAreaView>
    )
}

export default Groceries;

const styles = StyleSheet.create({});