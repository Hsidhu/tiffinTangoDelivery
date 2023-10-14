import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigation from "./src/navigation";
import { Provider } from "react-redux";
import store from "./src/store/index";

const Stack = createNativeStackNavigator();

import LoginScreen from "./src/screens/AuthScreens/LoginScreen";
import SignupScreen from "./src/screens/AuthScreens/SignupScreen";

import {Colors} from "./src/constants/styles"

// will carry login screens
function AuthStack() {
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
    return <Navigation />
}


export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
            <StatusBar style="auto" />
            {store.getState().isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
