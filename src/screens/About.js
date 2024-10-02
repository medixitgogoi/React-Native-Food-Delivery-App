import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

const About = () => {

    const wishlistItems = useSelector(state => state.wishlist.items);
    console.log('wishlistItems', wishlistItems);

    return (
        <View>
            <Text style={{ color: '#000' }}>About</Text>
        </View>
    )
}

export default About;