{/* modal */ }
<Modal
    isVisible={modalVisible}
    onBackdropPress={() => setModalVisible(false)}
    onSwipeComplete={() => setModalVisible(false)}
    onRequestClose={() => setModalVisible(false)}
    animationType="slide"
    swipeDirection={['down']}
    backdropOpacity={0.5}
    style={{ justifyContent: 'flex-end', margin: 0, }}
>

    <View style={{ width: "100%", height: '100%', justifyContent: 'flex-end' }}>
        {/* Close Button */}
        <TouchableOpacity style={{ alignSelf: 'center', backgroundColor: '#000', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 35, height: 35, borderRadius: 50, marginBottom: 10 }} onPress={() => setModalVisible(false)}>
            <Icon5 name="close" size={20} style={{ color: '#fff' }} />
        </TouchableOpacity>

        {product.type === 'grocery' && (
            <View style={{ backgroundColor: modalBackColor, borderTopLeftRadius: 17, borderTopRightRadius: 17, elevation: 1, paddingHorizontal: 14, paddingVertical: 8 }}>
                {/* Headline */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, marginBottom: 15, marginTop: 5 }}>
                    <Text style={{ textAlign: 'center', color: '#383838', fontWeight: '600', fontSize: responsiveFontSize(2.2), }}>Fill up the details below</Text>
                </View>

                <View style={{ flexDirection: 'column', backgroundColor: '#fff', borderRadius: 14, paddingHorizontal: 15, paddingVertical: 12, gap: 3 }}>
                    <Text style={{ color: '#517c84', fontWeight: '500', fontSize: responsiveFontSize(2.3), marginBottom: 4 }}>Select Unit :</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 25 }}>
                        <RadioButton
                            value="kg"
                            status={checked === 'kg' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('kg')}
                            color={backIconColor}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: '#000', fontWeight: '600' }}>kg</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 25 }}>
                        <RadioButton
                            value="gm"
                            status={checked === 'gm' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('gm')}
                            color={backIconColor}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: '#000', fontWeight: '600' }}>gm</Text>
                        </View>
                    </View>
                </View>
            </View>
        )}

        {product.type === 'restaurant' && (
            <View style={{ backgroundColor: modalBackColor, borderTopLeftRadius: 17, borderTopRightRadius: 17, elevation: 1, paddingHorizontal: 14, paddingVertical: 8 }}>
                {/* Headline */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, marginBottom: 15, marginTop: 5 }}>
                    <Text style={{ textAlign: 'center', color: '#383838', fontWeight: '600', fontSize: responsiveFontSize(2.2), }}>Fill up the details below</Text>
                </View>

                <View style={{ flexDirection: 'column', backgroundColor: '#fff', borderRadius: 14, paddingHorizontal: 15, paddingVertical: 12, gap: 3 }}>
                    <Text style={{ color: '#517c84', fontWeight: '500', fontSize: responsiveFontSize(2.3), marginBottom: 4 }}>Select any one option below :</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 25 }}>
                        <RadioButton
                            value="Half"
                            status={checked === 'Half' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('Half')}
                            color={backIconColor}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%' }}>
                            <Text style={{ color: '#000', fontWeight: '500' }}>Half</Text>
                            <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.2) }}>₹{product.price}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 25 }}>
                        <RadioButton
                            value="Full"
                            status={checked === 'Full' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('Full')}
                            color={backIconColor}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%' }}>
                            <Text style={{ color: '#000', fontWeight: '500' }}>Full</Text>
                            <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.2) }}>₹{Math.floor(product.price * 1.5)}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )}

        {product.type === 'cake' && (
            <View style={{ backgroundColor: modalBackColor, borderTopLeftRadius: 17, borderTopRightRadius: 17, elevation: 1, paddingHorizontal: 14, paddingVertical: 8 }}>
                {/* Headline */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, marginBottom: 15, marginTop: 5 }}>
                    <Text style={{ textAlign: 'center', color: '#383838', fontWeight: '600', fontSize: responsiveFontSize(2.2), }}>Fill up the details below</Text>
                </View>

                <View style={{ flexDirection: 'column', backgroundColor: '#fff', borderRadius: 14, paddingHorizontal: 15, paddingVertical: 12, gap: 3 }}>
                    <Text style={{ color: '#517c84', fontWeight: '500', fontSize: responsiveFontSize(2.3), marginBottom: 4 }}>Select any one option below :</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 25 }}>
                        <RadioButton
                            value="1/2 Kg"
                            status={checked === '1/2 Kg' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('1/2 Kg')}
                            color={backIconColor}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%' }}>
                            <Text style={{ color: '#000', fontWeight: '500' }}>1/2 Kg</Text>
                            <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.2) }}>₹{product.price}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 25 }}>
                        <RadioButton
                            value="1 Kg"
                            status={checked === '1 Kg' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('1 Kg')}
                            color={backIconColor}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%' }}>
                            <Text style={{ color: '#000', fontWeight: '500' }}>1 Kg</Text>
                            <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.2) }}>₹{Math.floor(product.price * 1.5)}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )}

        {/* add button */}
        <View style={{ backgroundColor: '#fff', height: 65, paddingHorizontal: 12, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: lightGreen, height: 42, width: '32%', justifyContent: 'center', borderRadius: 8, borderColor: backIconColor, borderWidth: 0.5 }}>
                <TouchableOpacity>
                    <Icon3 name="circle-minus" size={25} color={backIconColor} />
                </TouchableOpacity>
                <Text style={{ color: '#8f8f8f', fontWeight: '500', fontSize: responsiveFontSize(2.3) }}>1</Text>
                <TouchableOpacity>
                    <Icon3 name="circle-plus" size={25} color={backIconColor} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={{ width: '65%', height: 42, backgroundColor: darkGreen, borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                    <Text style={{ color: '#fff', fontWeight: '500', fontSize: responsiveFontSize(2.3) }}>Add item</Text>
                    <Text style={{ color: '#fff', fontWeight: '500', fontSize: responsiveFontSize(2.3) }}>₹1000</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
</Modal>