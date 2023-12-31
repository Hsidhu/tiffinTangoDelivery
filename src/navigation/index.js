import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import RestaurantDetailsScreen from '../screens/RestaurantDetailsScreen';
import DishDetailsScreen from '../screens/DishDetailsScreen';
import BasketScreen from '../screens/BasketScreen';
import OrdersScreen from '../screens/OrdersScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DeliveryProofScreen from '../screens/DeliveryProofScreen';
import MapScreen from '../screens/MapScreen';

import { getUserDetails } from '../store/Auth/actions';
import { getTodaysDeliveries } from '../store/Deliveries/actions';

const Stack = createNativeStackNavigator();

const Navigation = () => {

    const dispatcher = useDispatch();

    useEffect(() => {
        dispatcher(getUserDetails())
        dispatcher(getTodaysDeliveries())
    },[])

    return (
        <Stack.Navigator 
            initialRouteName='Home' 
            screenOptions={{ 
                headerShown: 'false',
            }}
        >
            <Stack.Screen
                name="TabNavigation" 
                component={TabNavigation}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="Dish" 
                component={DishDetailsScreen} 
            />
            <Stack.Screen 
                name="Basket" 
                component={BasketScreen} 
            />
            <Stack.Screen 
                name="Orders" 
                component={OrdersScreen} 
            />
            <Stack.Screen 
                name="OrderDetails" 
                component={OrderDetailsScreen} 
            />
            <Stack.Screen 
                name="DeliveryProofScreen" 
                component={DeliveryProofScreen} 
            />
            <Stack.Screen 
                name="MapScreen"
                component={MapScreen} 
            />
        </Stack.Navigator>
    );
}

const Tab = createMaterialBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator 
            barStyle={{
                backgroundColor: '#151515',
            }}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="Orders"
                component={OrdersScreen}
                options={{
                    tabBarLabel: 'Orders',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="clipboard-list" color={color} size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="Basket"
                component={BasketScreen}
                options={{
                    tabBarLabel: 'In progress',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="basket" color={color} size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'My profile',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="DeliveryProofScreen"
                component={DeliveryProofScreen}
                options={{
                    tabBarLabel: 'DeliveryProofScreen',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={24} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <HomeStack.Screen 
                name="Start" 
                component={HomeScreen}
                options={{
                    headerShown: false
                }}
            />
            <HomeStack.Screen 
                name="Restaurant"
                component={RestaurantDetailsScreen}
                options={{
                    headerShown: false
                }}
            />
        </HomeStack.Navigator>
    );
}

export default Navigation;