import axios from "axios";
import Toast from "react-native-toast-message";

export const fetchProducts = async (userDetails) => { // Pass userDetails as a parameter
    try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${userDetails[0]?.accessToken}`;
        const response = await axios.get('/user/appload');

        return response?.data; // Return data inside the try block after receiving the response
    } catch (error) {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: error.message,
            position: 'top', // Adjusts to the bottom by default
            topOffset: 20, // Moves the toast 10 units down from the bottom
        });
        return null; // Return null in case of error
    }
};