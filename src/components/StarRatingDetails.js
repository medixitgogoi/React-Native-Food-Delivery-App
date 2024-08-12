import { View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

const StarRatingDetails = ({ rating }) => {

    const stars = [];
    const starSize = 17;
    const starColor = "#FFA41C";

    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars.push(<Icon key={i} name="star" size={starSize} color={starColor} />);
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars.push(<Icon key={i} name="star-half" size={starSize} color={starColor} />);
        } else {
            stars.push(<Icon key={i} name="star-border" size={starSize} color={starColor} />);
        }
    }

    return (
        <View style={{ flexDirection: 'row', backgroundColor: '#ffecd0', paddingVertical: 2, paddingHorizontal: 5, borderRadius: 4, alignItems: 'center' }}>
            {stars}
        </View>
    );
}

export default StarRatingDetails;