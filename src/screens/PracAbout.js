import { StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import phonepeSDK from 'react-native-phonepe-pg';
import Base64 from 'react-native-base64';
import sha256 from 'sha256';
import { responsiveHeight, responsiveFontSize } from "react-native-responsive-dimensions";

const DonateForm = () => {

    const [statusBarStyle, setStatusBarStyle] = useState();
    const navigation = useNavigation();
    const [environment, setenvironment] = useState("SANDBOX");
    const [merchantId, setmerchantId] = useState("PGTESTPAYUAT86");
    const [appId, setappId] = useState(null);
    const [enableLogging, setenableLogging] = useState(true);

    const [data, setData] = useState({
        name: "",
        mobile: "",
        email: "",
        amount: "",
    })

    const generatetransactionId = () => {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000000);
        const merchantPrefix = "T";
        return `${merchantPrefix}${timestamp}${random}`
    }

    const Submithandler = async () => {
        try {
            console.log('Initializing PhonePe SDK...');
            const initResponse = await phonepeSDK.init(environment, merchantId, appId, enableLogging);
            console.log('PhonePe SDK initialized:', initResponse);

            const requestBody = {
                merchantId: merchantId,
                merchantTransactionId: generatetransactionId(),
                merchantUserId: "",
                amount: (data.amount * 100),
                callbackurl: "",
                mobileNumber: data.mobile,
                paymentInstrument: {
                    type: "PAY_PAGE",
                },
            }
            const salt_key = "96434309-7796-489d-8924-ab56988a6076";
            const salt_Index = 1;
            const payload = JSON.stringify(requestBody);
            console.log('payload: ', payload);
            const payload_main = Base64.encode(payload);
            console.log('payload_main: ', payload_main);
            const string = payload_main + "/pg/v1/pay" + salt_key;

            const checksum = sha256(string) + "###" + salt_Index;

            console.log('checksum: ', checksum);
            console.log('Starting transaction with payload: ', payload_main);

            const transactionResponse = await phonepeSDK.startTransaction(
                payload_main,
                checksum,
                null,
                null
            );

            console.log('Transaction response: ', transactionResponse);

        } catch (err) {
            console.error('Error during PhonePe transaction: ', err);
        }
    }

    console.log("pppp", data)
    return (
        <View style={{ flex: 1, backgroundColor: "#302c51", justifyContent: "center" }}>
            <StatusBar
                animated={true}
                backgroundColor="#302c51"
                barStyle={statusBarStyle}
            />

            <View style={{}}>
                <View style={{ width: "100%", paddingHorizontal: 15 }}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ color: "#F29D38", fontSize: responsiveFontSize(2.8), fontWeight: "400", fontStyle: 'italic' }}>Donate Here</Text>
                    </View>


                    {/* name */}
                    <View style={{ paddingTop: responsiveHeight(5) }}>

                        <Text style={{ color: "#F29D38", fontSize: responsiveFontSize(2), fontWeight: "200", fontStyle: 'italic' }}>
                            Name
                        </Text>
                        <TextInput
                            placeholder="Enter Your Name"
                            placeholderTextColor={'#fff'}
                            onChangeText={(txt) => setData({ ...data, name: txt })}
                            style={{
                                width: '100%',
                                borderBottomWidth: 0.29,
                                borderBottomColor: "#a1bdc8",
                                marginTop: 5,

                                padding: 0,
                                fontSize: responsiveFontSize(1.85),
                                color: '#fff',
                                fontWeight: '200',
                                fontStyle: 'italic'
                            }}
                        />

                    </View>

                    {/* Mobile */}
                    <View style={{ paddingTop: 10 }}>
                        <Text style={{ color: "#F29D38", fontSize: responsiveFontSize(2), fontWeight: "200", fontStyle: 'italic' }}>
                            Mobile Number
                        </Text>
                        <TextInput
                            placeholder="Enter Your Mobile Number"
                            placeholderTextColor={'#fff'}
                            onChangeText={(txt) => setData({ ...data, mobile: txt })}
                            style={{
                                width: '100%',
                                borderBottomWidth: 0.29,
                                borderBottomColor: "#a1bdc8",
                                marginTop: 5,

                                padding: 0,
                                fontSize: responsiveFontSize(1.85),
                                color: '#fff',
                                fontWeight: '200',
                                fontStyle: 'italic'
                            }}
                        />

                    </View>


                    {/* Email */}
                    <View style={{ paddingTop: 10 }}>
                        <Text style={{ color: "#F29D38", fontSize: responsiveFontSize(2), fontWeight: "200", fontStyle: 'italic' }}>
                            Email
                        </Text>
                        <TextInput
                            placeholder="Enter Email Id"
                            placeholderTextColor={'#fff'}
                            onChangeText={(txt) => setData({ ...data, email: txt })}
                            style={{
                                width: '100%',
                                borderBottomWidth: 0.29,
                                borderBottomColor: "#a1bdc8",
                                marginTop: 5,

                                padding: 0,
                                fontSize: responsiveFontSize(1.85),
                                color: '#fff',
                                fontWeight: '200',
                                fontStyle: 'italic'
                            }}
                        />

                    </View>

                    {/* amount */}
                    <View style={{ paddingTop: 10 }}>
                        <Text style={{ color: "#F29D38", fontSize: responsiveFontSize(2), fontWeight: "200", fontStyle: 'italic' }}>
                            Amount You Want to Donate
                        </Text>
                        <TextInput
                            placeholder="Enter Amount"
                            placeholderTextColor={'#fff'}
                            onChangeText={(txt) => setData({ ...data, amount: txt })}
                            style={{
                                width: '100%',
                                borderBottomWidth: 0.29,
                                borderBottomColor: "#a1bdc8",
                                marginTop: 5,

                                padding: 0,
                                fontSize: responsiveFontSize(1.85),
                                color: '#fff',
                                fontWeight: '200',
                                fontStyle: 'italic'
                            }}
                        />

                    </View>


                    <TouchableOpacity
                        style={{
                            marginTop: responsiveHeight(10),
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            paddingHorizontal: 10

                        }}>
                        <TouchableOpacity
                            onPress={() => Submithandler()}

                            style={{
                                backgroundColor: '#F29D38', borderRadius: 15,
                                padding: 10,
                                alignItems: "center",
                                width: "100%",
                                justifyContent: "center",

                            }}>
                            <Text style={{ color: '#fff', fontSize: responsiveFontSize(2), paddingHorizontal: 35 }}>Pay Now</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>

                </View>
            </View>

        </View>

    )
}

export default DonateForm;

const styles = StyleSheet.create({})