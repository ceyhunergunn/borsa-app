import React from "react";
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import HomeScreen from "../screens/Home/HomeScreen";
import ProfileScreen from "../screens/Home/ProfileScreen";
import VeriScreen from "../screens/Home/VeriScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabStack= () => {
    return(
        <Tab.Navigator 
            initialRouteName="HomeScreen" 
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: '#555',
                tabBarInactiveTintColor: '#fff',
                headerShown: false,
                tabBarStyle:{
                    height:50,
                    backgroundColor:'#000',
                    padding: 20,
                },
                tabBarLabelStyle:{
                    textAlign: 'center',
                    fontSize: 14,
                }
            })} >
            <Tab.Screen 
                name="HomeScreen" 
                component={HomeScreen} 
                options={{
                    tabBarLabel: 'Ana Sayfa',
                    tabBarIcon:({color,size})=> (
                    <Icon name="home" color={color} size={size}/>)
                }} />
                
            <Tab.Screen 
                name="VeriScreen" 
                component={VeriScreen} 
                options={{
                    tabBarLabel: 'Piyasalar',
                    tabBarIcon:({color,size})=> (
                    <Icon name="home" color={color} size={size}/>)
                }} />

            <Tab.Screen 
                name="ProfileScreen" 
                component={ProfileScreen} 
                options={{
                    tabBarLabel: 'Profil',
                    tabBarIcon:({color,size})=> (
                    <Icon name="home" color={color} size={size}/>)
                }} />


            </Tab.Navigator>
    )
}
const HomeStack = () => {
    return(
        <Stack.Navigator 
            initialRouteName="BottomTabStack">
            <Stack.Screen name="BottomTabStack"
            component={BottomTabStack}
            options={{
                headerShown: false,
            }}/>

        </Stack.Navigator>
    )
}

export default HomeStack;