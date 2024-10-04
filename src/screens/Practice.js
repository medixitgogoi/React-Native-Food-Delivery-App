<View style={{ width: '100%' }}>
    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', }}>
        <View style={{ backgroundColor: 'white', borderRadius: 30, paddingBottom: 100, alignItems: 'center', justifyContent: 'center' }}>
            {/* Name Input */}
            <View style={{ marginTop: 50, position: 'relative', width: '100%', alignItems: 'center' }}>
                <Text style={{ position: 'absolute', top: -10, left: 20, backgroundColor: 'white', paddingHorizontal: 5, color: '#aaa', fontStyle: 'italic', zIndex: 1 }}>Name</Text>
                <TextInput style={{ height: 50, borderColor: 'gray', borderWidth: 1, width: '95%', borderRadius: 10, paddingLeft: 10, backgroundColor: 'white' }} />
            </View>

            {/* Mobile Input */}
            <View style={{ marginTop: 30, position: 'relative', width: '100%', alignItems: 'center' }}>
                <Text style={{ position: 'absolute', top: -10, left: 20, backgroundColor: 'white', paddingHorizontal: 5, color: '#aaa', fontStyle: 'italic', zIndex: 1 }}>Mobile</Text>
                <TextInput style={{ height: 50, borderColor: 'gray', borderWidth: 1, width: '95%', borderRadius: 10, paddingLeft: 10, backgroundColor: 'white' }} />
            </View>

            {/* Email Input */}
            <View style={{ marginTop: 30, position: 'relative', width: '100%', alignItems: 'center' }}>
                <Text style={{ position: 'absolute', top: -10, left: 20, backgroundColor: 'white', paddingHorizontal: 5, color: '#aaa', fontStyle: 'italic', zIndex: 1 }}>Email</Text>
                <TextInput style={{ height: 50, borderColor: 'gray', borderWidth: 1, width: '95%', borderRadius: 10, paddingLeft: 10, backgroundColor: 'white' }} />
            </View>

            {/* Date of Birth Input */}
            <View style={{ marginTop: 30, position: 'relative', width: '100%', alignItems: 'center' }}>
                <Text style={{ position: 'absolute', top: -10, left: 20, backgroundColor: '#fff', paddingHorizontal: 5, color: '#aaa', fontStyle: 'italic', zIndex: 1 }}>Date of Birth</Text>
                <TextInput style={{ height: 50, borderColor: 'gray', borderWidth: 1, width: '95%', borderRadius: 10, paddingLeft: 10, backgroundColor: 'white' }} />
            </View>

            {/* Anniversary Input */}
            <View style={{ marginTop: 30, position: 'relative', width: '100%', alignItems: 'center' }}>
                <TextInput style={{ height: 50, borderColor: 'gray', borderWidth: 1, width: '95%', borderRadius: 10, paddingLeft: 10, fontStyle: 'italic', backgroundColor: 'white' }} placeholder="Anniversary" placeholderTextColor="#aaa" />
            </View>

            {/* Gender Input */}
            <View style={{ marginTop: 30, position: 'relative', width: '100%', alignItems: 'center' }}>
                <Text style={{ position: 'absolute', top: -10, left: 20, backgroundColor: 'white', paddingHorizontal: 5, color: '#aaa', fontStyle: 'italic', zIndex: 1 }}>Gender</Text>
                <TextInput style={{ height: 50, borderColor: 'gray', borderWidth: 1, width: '95%', borderRadius: 10, paddingLeft: 10, backgroundColor: 'white' }} />
            </View>
        </View>
    </ScrollView>

    {/* 
                <View style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', height: '8%', marginTop: 5, borderRadius: 20, width: '95%' }}>
                    <TouchableOpacity style={{ alignItems: 'center', width: '95%', height: '95%', backgroundColor: '#C4D7FF', justifyContent: 'center', borderRadius: 20 }}>
                        <Text style={{ color: 'white', fontStyle: 'italic' }}>Update Profile</Text>
                    </TouchableOpacity>
                </View> */}
</View>