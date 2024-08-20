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

{/* <SelectDropdown
        data={product.type === 'grocery' ? grocerySizes : product.type === 'restaurant' ? restaurantSizes : cakeSizes}
        onSelect={(selectedItem, index) => {
            setSelectedSize(selectedItem);
            console.log(selectedItem, index);
        }}
        renderButton={(selectedItem, isOpened) => {
            return (
                <View style={styles.dropdownButtonStyle}>
                    <Text style={styles.dropdownButtonTxtStyle}>
                        {(selectedItem && selectedItem.title) || 'Select size'}
                    </Text>
                    <Icon4 name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                </View>
            );
        }}
        renderItem={(item, isSelected) => {
            return (
                <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: darkGreen }) }}>
                    <Text style={{ ...styles.dropdownItemTxtStyle, ...(isSelected && { color: '#000' }) }}>{item.title}</Text>
                </View>
            );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
    /> */}


{/* cart item */ }
<View style={{ paddingHorizontal: 4, backgroundColor: '#fff', borderRadius: 12, elevation: 1, flexDirection: 'row', alignItems: 'center', overflow: 'hidden', height: 90 }}>
    <View style={{ padding: 10, flexDirection: 'row', borderRadius: 10, alignItems: 'center', justifyContent: 'center', flex: 0.9, backgroundColor: '#e4f4ea', height: 80 }}>
        <Image source={require('../assets/orange.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
    </View>

    <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'space-between', paddingLeft: 15, paddingVertical: 12, height: '100%' }}>
        <Text style={{ color: '#000', fontWeight: '700', fontSize: responsiveFontSize(2.2) }}>Orange</Text>
        <Text style={{ color: offWhite, fontWeight: '600', fontSize: responsiveFontSize(1.9) }}>Fruit</Text>
        {/* <Text style={{ color: offWhite, fontWeight: '600', fontSize: responsiveFontSize(1.9) }}>500 gm</Text> */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 7 }}>
            <Text style={{ color: '#019934', fontWeight: '700', fontSize: responsiveFontSize(2.4) }}>₹299</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <TouchableOpacity>
                    <Icon3 name="circle-minus" size={28} color={backIconColor} />
                </TouchableOpacity>
                <Text style={{ color: '#000', fontWeight: '500', fontSize: responsiveFontSize(2.2) }}>1</Text>
                <TouchableOpacity>
                    <Icon3 name="circle-plus" size={28} color={backIconColor} />
                </TouchableOpacity>
            </View>
        </View>
    </View>
</View>

{/* cart item 2 */ }
<View style={{ paddingHorizontal: 4, backgroundColor: '#fff', borderRadius: 12, elevation: 1, flexDirection: 'row', alignItems: 'center', overflow: 'hidden', height: 100, marginTop: 8 }}>
    <View style={{ padding: 10, flexDirection: 'row', borderRadius: 10, alignItems: 'center', justifyContent: 'center', flex: 0.9, backgroundColor: '#e4f4ea', height: 90 }}>
        <Image source={require('../assets/rice.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
    </View>

    <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'space-between', paddingLeft: 15, paddingTop: 10, paddingBottom: 10, height: '100%' }}>
        <Text style={{ color: '#000', fontWeight: '700', fontSize: responsiveFontSize(2.4) }}>Chicken Fried Rice</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
            <View style={{ width: 17, height: 17, borderColor: '#000', borderWidth: 1.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                <Icon4 name="caretup" size={12} color={'#cb202d'} style={{ margin: 0, padding: 0, alignSelf: 'center' }} />
            </View>
            <Text style={{ color: offWhite, fontWeight: '600', fontSize: responsiveFontSize(1.7) }}>Non-veg</Text>
        </View>

        {/* <Text style={{ color: '#000', fontWeight: '700', fontSize: responsiveFontSize(2.4) }}>Half plate</Text> */}

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 7, marginTop: 3 }}>
            <Text style={{ color: '#019934', fontWeight: '700', fontSize: responsiveFontSize(2.4) }}>₹349</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <TouchableOpacity>
                    <Icon3 name="circle-minus" size={28} color={backIconColor} />
                </TouchableOpacity>
                <Text style={{ color: '#000', fontWeight: '500', fontSize: responsiveFontSize(2.3) }}>1</Text>
                <TouchableOpacity>
                    <Icon3 name="circle-plus" size={28} color={backIconColor} />
                </TouchableOpacity>
            </View>
        </View>
    </View>
</View>

{/* cart item 3 */ }
<View style={{ paddingHorizontal: 4, backgroundColor: '#fff', borderRadius: 12, elevation: 1, flexDirection: 'row', alignItems: 'center', overflow: 'hidden', height: 100, marginTop: 8 }}>
    <View style={{ padding: 10, flexDirection: 'row', borderRadius: 10, alignItems: 'center', justifyContent: 'center', flex: 0.9, backgroundColor: '#e4f4ea', height: 90 }}>
        <Image source={require('../assets/cake.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
    </View>

    <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'space-between', paddingLeft: 15, paddingTop: 10, paddingBottom: 10, height: '100%' }}>
        <Text style={{ color: '#000', fontWeight: '700', fontSize: responsiveFontSize(2.4) }}>Red Velvet Cake</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
            <View style={{ width: 17, height: 17, borderColor: '#000', borderWidth: 1.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                <Icon4 name="caretup" size={12} color={'#cb202d'} style={{ margin: 0, padding: 0, alignSelf: 'center' }} />
            </View>
            <Text style={{ color: offWhite, fontWeight: '600', fontSize: responsiveFontSize(1.7) }}>Non-veg</Text>
        </View>
        {/* <Text style={{ color: '#000', fontWeight: '700', fontSize: responsiveFontSize(2.4) }}>1 Kg</Text> */}

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 7, marginTop: 3 }}>
            <Text style={{ color: '#019934', fontWeight: '700', fontSize: responsiveFontSize(2.4) }}>₹499</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <TouchableOpacity>
                    <Icon3 name="circle-minus" size={28} color={backIconColor} />
                </TouchableOpacity>
                <Text style={{ color: '#000', fontWeight: '500', fontSize: responsiveFontSize(2.3) }}>1</Text>
                <TouchableOpacity>
                    <Icon3 name="circle-plus" size={28} color={backIconColor} />
                </TouchableOpacity>
            </View>
        </View>
    </View>
</View>