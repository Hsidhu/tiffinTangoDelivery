import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { useContext, useState } from 'react';

import AuthContent from '../../components/containers/Auth/AuthContent';

const LoginScreen = () => {

    return (
        <View style={styles.container}>
            <AuthContent isLogin />
        </View>
    )
}

export default LoginScreen


const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      paddingVertical: 30,
      backgroundColor: "white",
      paddingHorizontal: 20,
    }
});