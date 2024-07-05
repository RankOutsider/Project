import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen';
import HomeScreen from "./screens/HomeScreen"
import CoffeeDetailsScreen from "./screens/CoffeeDetailsScreen";
import PromotionsDetailScreen from "./screens/PromotionsDetailScreen";
import AboutBeanDetailScreen from "./screens/AboutBeanDetailScreen";
import ReservationScreen from "./screens/ReservationScreen";
import LoginScreen from './screens/LoginScreen';
import ConfirmScreen from './screens/ConfirmSreen';
import CustomDrawerContent from './components/CustomerDrawerContent'; 
import LoginSuccessfulScreen from './screens/LoginSuccessfulScreen';
import ChatScreen from './screens/ChatScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import { Ionicons } from "@expo/vector-icons";
import colors from "./config/colors";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

SplashScreen.preventAutoHideAsync();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="CoffeeDetails" component={CoffeeDetailsScreen} />
    <Stack.Screen name="PromotionsDetail" component={PromotionsDetailScreen} />
    <Stack.Screen name="AboutBeanDetail" component={AboutBeanDetailScreen} />
    <Stack.Screen name="ReservationScreen" component={ReservationScreen} />
    <Stack.Screen name="Confirm" component={ConfirmScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="LoginSuccessful" component={LoginSuccessfulScreen} />
    <Stack.Screen name="Chat" component={ChatScreen} />
    <Stack.Screen name="Favorite" component={FavoriteScreen} />
  </Stack.Navigator>
);

const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={{
      drawerActiveTintColor: colors.darkgreen,
      drawerInactiveTintColor: colors.papa,
      drawerLabelStyle: {
        fontFamily: 'Roboto_500Medium',
      },
    }}
  >
    <Drawer.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
    <Drawer.Screen name="Reservation" component={ReservationScreen} options={{ headerShown: false }} />
    <Drawer.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
    <Drawer.Screen name="Favorite" component={FavoriteScreen} options={{ headerShown: false }} />
  </Drawer.Navigator>
);

const App = () => {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    margin: 20,
    fontSize: 18,
    fontFamily: 'Roboto_500Medium',
    color: colors.papa,
  },
  drawerLabel: {
    fontFamily: 'Roboto_500Medium',
    color: colors.darkgreen,
  },
  activeDrawerLabel: {
    color: colors.papa,
  },
  drawerItem: {
    color: colors.seagreen,
  },
  drawerItemActive: {
    backgroundColor: colors.darkseagreen,
  },
});

export default App;
