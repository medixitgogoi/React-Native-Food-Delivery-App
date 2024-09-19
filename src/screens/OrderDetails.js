import { View, Text } from 'react-native';

const OrderDetails = ({ route }) => {

    console.log('route', route?.params?.detail);

    return (
        <View>
            <Text>OrderDetails</Text>
        </View>
    )
}

export default OrderDetails;