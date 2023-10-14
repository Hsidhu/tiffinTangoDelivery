import { useContext, useState } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../../components/containers/Auth/AuthContent';
import LoadingOverlay from '../../components/ui/LoadingOverlay';

const SignupScreen = () => {

    const [isAuthenticating, setIsAuthenticating] = useState(false);


  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        'Authentication failed',
        'Could not create user, please check your input and try again later.'
      );
      setIsAuthenticating(false);
    }
  }

    return <AuthContent />;
}

export default SignupScreen;

