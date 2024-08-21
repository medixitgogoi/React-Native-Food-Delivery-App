import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { background } from '../utils/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUp = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background, paddingBottom: 10 }}>
            <StatusBar
                animated={true}
                backgroundColor={background}
                barStyle="dark-content"
            />

            <View style={{ paddingHorizontal: 13 }}>

            </View>

        </SafeAreaView>
    )
}

export default SignUp;

const styles = StyleSheet.create({});