import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import SPACING from '../config/SPACING';
import colors from '../config/colors';

const { width, height } = Dimensions.get('window');

const LoginSuccessfulScreen = ({ route, navigation }) => {
  const { username } = route.params;

  return (
    <ImageBackground source={require('../shared/b1.jpg')} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.navigate('HomeScreen')}
          >
            <BlurView intensity={30} style={styles.blurView}>
              <Ionicons name="arrow-back" size={SPACING * 3} color={colors.papa} />
            </BlurView>
          </TouchableOpacity>
          <Ionicons name="checkmark-circle" size={100} color={colors.darkgreen} />
          <Text style={styles.title}>Login Successful</Text>
          <Text style={styles.message}>Welcome, {username}!</Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: width,
    height: height,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING * 2,
  },
  backButton: {
    position: 'absolute',
    top: SPACING * 3,
    left: SPACING * 2,
    zIndex : 1,
  },
  blurView: {
    borderRadius: SPACING *3,
    padding: SPACING / 2,
  },
  title: {
    fontSize: SPACING * 3,
    fontWeight: 'bold',
    color: colors.papa,
    textAlign: 'center',
    marginTop: SPACING * 2,
  },
  message: {
    fontSize: SPACING * 2,
    color: colors.papa,
    textAlign: 'center',
    marginTop: SPACING,
  },
});

export default LoginSuccessfulScreen;
