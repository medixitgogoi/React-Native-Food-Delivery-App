import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import phonepeSDK from "react-native-phonepe-pg";
import Base64 from "react-native-base64";
import sha256 from 'sha256';
import { darkGreen } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const About = () => {

    const [environment, setEnvironment] = useState("SANDBOX");
    const [merchantId, setMerchantId] = useState('PGTESTPAYUAT');
    const [appId, setAppId] = useState();
    const [enableLogging, setEnableLogging] = useState(true);

    const generateTransactionId = () => {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000000);
        const merchantPrefix = 'D';
        return `${merchantPrefix}${timestamp}${random}`;
    }

    const submitHandler = () => {
        phonepeSDK.init(environment, merchantId, appId, enableLogging).then(resp => {
            const requestBody = {
                "merchantId": "MERCHANTUAT",
                "merchantTransactionId": "MT7850590068188104",
                "merchantUserId": "MUID123",
                "amount": 10000,
                "callbackUrl": "https://webhook.site/callback-url",
                "mobileNumber": "9999999999",
                "paymentInstrument": {
                    "type": "PAY_PAGE"
                }
            }

            const salt_key = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
            const salt_index = 1;
            const payload = JSON.stringify(requestBody);
            const payload_main = Base64.encode(payload);
            const string = payload_main + "/pg/v1/pay" + salt_key;
            const checksum = sha256(string) + "###" + salt_index;

            phonepeSDK.startTransaction(
                payload_main,
                checksum,
                null,
                null
            ).then(res => {
                console.log('Transaction started', res);
            }).catch(err => {
                console.log('Transaction error', err);
            });

        }).catch(err => {
            console.log('error', err)
        })
    }

    return (
        <TouchableOpacity onPress={submitHandler} style={{ width: '95%', alignSelf: 'center', borderRadius: 12, backgroundColor: darkGreen, padding: 10 }}>
            <Text style={{ color: '#000', fontWeight: '500', fontSize: responsiveFontSize(1.8), textAlign: 'center' }}>Pay</Text>
        </TouchableOpacity>
    )
}

export default About;