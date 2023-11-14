import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigation from "./src/navigation";
import { Provider, useSelector } from "react-redux";
import store from "./src/store/index";

const Stack = createNativeStackNavigator();

import LoginScreen from "./src/screens/AuthScreens/LoginScreen";
import SignupScreen from "./src/screens/AuthScreens/SignupScreen";

import {Colors} from "./src/constants/styles"

// will carry login screens
function AuthStack() {

    const isAuthenticated = useSelector(state => state.isAuthenticated);
    if(isAuthenticated){
        return null;
    }
    return (
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: 'white',
            contentStyle: { backgroundColor: Colors.primary100 },
          }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
    );
}

// will carry auth screens
function AuthenticatedStack() {
    const isAuthenticated = useSelector(state => state.isAuthenticated);
    if(!isAuthenticated){
        return null;
    }
    return <Navigation />
}

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
            <StatusBar style="auto" />
            <AuthStack /> 
            <AuthenticatedStack />
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
