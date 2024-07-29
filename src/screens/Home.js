import { SafeAreaView, StatusBar, Text, TextInput, View, Image } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const Home = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", padding: 16 }}>
            <StatusBar
                animated={true}
                backgroundColor={'#fff'}
                barStyle="dark-content"
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <View>
                    <Text style={{ fontSize: responsiveFontSize(1.8), color: '#000' }}>Welcome</Text>
                    <Text style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold', color: '#000' }}>Nafiu Ibrahim</Text>
                </View>
                <Image
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                    source={{ uri: 'https://via.placeholder.com/40' }}
                />
            </View>
            <TextInput
                style={{
                    height: 40,
                    borderColor: '#B0B0B0',
                    borderWidth: 1,
                    borderRadius: 8,
                    paddingHorizontal: 16,
                    marginBottom: 16
                }}
                placeholder="Search Grocery"
                placeholderTextColor="#B0B0B0"
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 }}>
                {['ALL', 'Fruit', 'Vegetable', 'Meat', 'Dairy'].map((category, index) => (
                    <Text key={index} style={{ color: index === 0 ? '#00f' : '#000' }}>
                        {category}
                    </Text>
                ))}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
                <View style={{ width: '48%', backgroundColor: '#f9f9f9', borderRadius: 8, padding: 16 }}>
                    <Image
                        style={{ width: '100%', height: 100, borderRadius: 8, marginBottom: 8 }}
                        source={{ uri: 'https://via.placeholder.com/100' }}
                    />
                    <Text style={{ fontSize: responsiveFontSize(1.8), fontWeight: 'bold', color: '#000', marginBottom: 4 }}>Orange Fruit</Text>
                    <Text style={{ fontSize: responsiveFontSize(1.6), color: '#888', marginBottom: 4 }}>Fruit</Text>
                    <Text style={{ fontSize: responsiveFontSize(1.8), fontWeight: 'bold', color: '#000' }}>$14.99</Text>
                </View>
                <View style={{ width: '48%', backgroundColor: '#f9f9f9', borderRadius: 8, padding: 16 }}>
                    <Image
                        style={{ width: '100%', height: 100, borderRadius: 8, marginBottom: 8 }}
                        source={{ uri: 'https://via.placeholder.com/100' }}
                    />
                    <Text style={{ fontSize: responsiveFontSize(1.8), fontWeight: 'bold', color: '#000', marginBottom: 4 }}>Broccoli Vegetable</Text>
                    <Text style={{ fontSize: responsiveFontSize(1.6), color: '#888', marginBottom: 4 }}>Vegetable</Text>
                    <Text style={{ fontSize: responsiveFontSize(1.8), fontWeight: 'bold', color: '#000' }}>$29.99</Text>
                </View>
            </View>
            <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: responsiveFontSize(1.8), fontWeight: 'bold', color: '#000', marginBottom: 8 }}>Recent Shop</Text>
                <View style={{ flexDirection: 'row', backgroundColor: '#f9f9f9', borderRadius: 8, padding: 16, alignItems: 'center' }}>
                    <Image
                        style={{ width: 40, height: 40, borderRadius: 8, marginRight: 16 }}
                        source={{ uri: 'https://via.placeholder.com/40' }}
                    />
                    <View>
                        <Text style={{ fontSize: responsiveFontSize(1.8), fontWeight: 'bold', color: '#000', marginBottom: 4 }}>Celery Vegetable</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.6), color: '#888', marginBottom: 4 }}>Vegetable</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.8), fontWeight: 'bold', color: '#000' }}>$10.99</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Home;