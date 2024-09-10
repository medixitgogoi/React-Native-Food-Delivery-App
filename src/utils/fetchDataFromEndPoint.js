import axios from "axios";
import { Alert } from "react-native";

export const fetchDataFromEndpoint = async (endpoint, userDetails) => {
    try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${userDetails[0]?.accessToken}`;
        const response = await axios.get(endpoint);
        return response.data; // Assuming each endpoint returns data directly
    } catch (error) {
        Alert.alert("Error", error.message);
        return null; // Return null in case of error
    }
};