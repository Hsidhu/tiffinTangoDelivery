import { useState } from 'react';
import { Alert, StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AuthForm from './AuthForm';
import FlatButton from '../FlatButton';
import LoadingOverlay from '../LoadingOverlay'

import { Colors } from '../../../constants/styles'

import { login as loginHandler } from '../../../store/Auth/actions'

const AuthContent = ({ isLogin, createUser, setAuthenticate, authToken, isAuthenticated }) => {

    const navigation = useNavigation();

    const [isAuthenticating, setIsAuthenticating] = useState(false);

    // for new users
    const [credentialsInvalid, setCredentialsInvalid] = useState({
        email: false,
        password: false,
        confirmEmail: false,
        confirmPassword: false,
    });

    function switchAuthModeHandler() {
        if (isLogin) {
            navigation.replace('Signup');
        } else {
            navigation.replace('Login');
        }
    }

    // validate newUser submit
    function submitHandler(credentials) {
        let { email, confirmEmail, password, confirmPassword } = credentials;

        email = email.trim();
        password = password.trim();

        const emailIsValid = email.includes('@');
        const passwordIsValid = password.length > 4;
        const emailsAreEqual = email === confirmEmail;
        const passwordsAreEqual = password === confirmPassword;

        if (
            !emailIsValid ||
            !passwordIsValid ||
            (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
        ) {
            Alert.alert('Invalid input', 'Please check your entered credentials.');
            setCredentialsInvalid({
                email: !emailIsValid,
                confirmEmail: !emailIsValid || !emailsAreEqual,
                password: !passwordIsValid,
                confirmPassword: !passwordIsValid || !passwordsAreEqual,
            });
            return;
        }
        if (isLogin) {
            triggerLoginActions(email, password);
        }
        else {
            triggerNewUserActions(email, password);
        }
    }

    const triggerLoginActions = async (email, password) => {
        setIsAuthenticating(true);
        try {
            const token = await loginHandler(email, password);
            setAuthenticate(token);
        } catch (error) {
            console.log(error)
            Alert.alert(
                'Authentication failed!',
                'Could not log you in. Please check your credentials or try again later!'
            );
            setIsAuthenticating(false);
        }
    }

    const triggerNewUserActions = async (email, password) => {
        setIsAuthenticating(true);
        try {
            const token = await createUser(email, password);
            setAuthenticate(token);
        } catch (error) {
            Alert.alert(
                'Authentication failed',
                'Could not create user, please check your input and try again later.'
            );
            setIsAuthenticating(false);
        }
    }

    if (isAuthenticating) {
        console.log(authToken, isAuthenticated)
        return <LoadingOverlay message={isLogin ? 'Login...' : 'Creating user...'} />
    }

    return (
        <View style={styles.authContent}>
            <AuthForm
                isLogin={isLogin}
                onSubmit={submitHandler}
                credentialsInvalid={credentialsInvalid}
            />
            <View style={styles.buttons}>
                <FlatButton onPress={switchAuthModeHandler}>
                    {isLogin ? 'Create a new user' : 'Log in instead'}
                </FlatButton>
            </View>
        </View>
    );
}


export default AuthContent;

const styles = StyleSheet.create({
    authContent: {
        marginTop: 64,
        marginHorizontal: 32,
        padding: 16,
        borderRadius: 8,
        backgroundColor: Colors.primary800,
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
    },
    buttons: {
        marginTop: 8,
    },
});
