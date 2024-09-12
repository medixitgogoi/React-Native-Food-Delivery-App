{/* Total price and add to cart button */ }
<View style={{ backgroundColor: '#fff', position: 'absolute', bottom: 0, width: '100%', height: 70, elevation: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 }}>
    {/* Add to cart button */}
    <View style={{ width: '100%', height: '100%', flexDirection: 'row', alignItems: 'center', }}>
        <TouchableOpacity
            style={{
                gap: 5,
                backgroundColor: isPresentInTheCart ? lightGreen : '#41b24b',
                paddingHorizontal: 30,
                height: 43,
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: isPresentInTheCart ? backIconColor : '',
                borderWidth: isPresentInTheCart ? 1.5 : 0
            }}
            onPress={() => {
                if (unit !== null) {
                    addToCart();
                    // dispatch(addItemToCart({ ...product, qty: quantity, units: unit }));
                } else {
                    setError(true);
                }
            }}
            disabled={isPresentInTheCart ? true : false}
        >
            {isPresentInTheCart ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                    <Text style={{ color: isPresentInTheCart ? backIconColor : '#fff', fontSize: responsiveFontSize(2.5), fontWeight: '500' }}>Added to cart</Text>
                    <Icon2 name="checkcircle" size={21} color={backIconColor} />
                </View>
            ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.5), fontWeight: '500' }}>Add to cart</Text>
                    <Icon name="add-shopping-cart" size={19} color={'#fff'} />
                </View>
            )}
        </TouchableOpacity>
    </View>
</View>