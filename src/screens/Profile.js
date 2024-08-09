import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { background, darkGreen } from '../utils/colors';

const Profile = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background, paddingBottom: 10 }}>
            <StatusBar
                animated={true}
                backgroundColor={darkGreen}
                barStyle="dark-content"
            />
            <Text style={{ color: '#000' }}>Profile</Text>
        </SafeAreaView>
    )
}

export default Profile;

const styles = StyleSheet.create({});
