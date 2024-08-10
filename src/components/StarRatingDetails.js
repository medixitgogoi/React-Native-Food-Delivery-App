import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const StarRatingDetails = ({ rating }) => {

    const stars = [];
    const starSize = 18;
    const starColor = "#FFA41C";

    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars.push(<Icon key={i} name="star" size={starSize} color={starColor} />);
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars.push(<Icon key={i} name="star-half" size={starSize} color={starColor} />);
        } else {
            stars.push(<Icon key={i} name="star-o" size={starSize} color={starColor} />);
        }
    }

    return (
        <View style={{ flexDirection: 'row', paddingVertical: 2, paddingRight: 5, borderRadius: 4, alignItems: 'center' , gap: 3}}>
            {stars}
        </View>
    );
}

export default StarRatingDetails;

const styles = StyleSheet.create({});