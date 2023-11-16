import { useState, useCallback } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Colors } from '../../../constants/styles';
import Button from '../Button';

const AuthLogout = ({logout}) => {


    return (
        <View>
            <Button onPress={logout}>Logout</Button>
        </View>
    )
    
}

export default AuthLogout
