import axios from "axios";

export const fetchProducts = async (userDetails) => { // Pass userDetails as a parameter
    try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${userDetails[0]?.accessToken}`;
        const response = await axios.get('/user/appload');

        return response?.data; // Return data inside the try block after receiving the response
    } catch (error) {
        console.log('error', error);
        return null; // Return null in case of error
    }
};