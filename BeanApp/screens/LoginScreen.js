import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ImageBackground, Dimensions, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import SPACING from '../config/SPACING';
import colors from '../config/colors';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Validation Error', 'Please enter both username/email and password.');
      return;
    }
    navigation.navigate('LoginSuccessful', { username });
  };

  return (
    <ImageBackground source={require('../shared/b1.jpg')} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>Hello Beanies</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email or Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your email or username"
              placeholderTextColor={colors.black}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor={colors.black}
              secureTextEntry
            />
          </View>
          <TouchableOpacity 
            style={styles.button}
            onPress={handleLogin}
          >
            <BlurView intensity={30} style={styles.blurView}>
              <Text style={styles.buttonText}>Login</Text>
              <Ionicons name="arrow-forward" size={24} color={colors.papa} />
            </BlurView>
          </TouchableOpacity>
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
    padding: SPACING * 2,
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: SPACING * 3,
    fontWeight: 'bold',
    color: colors.papa,
    textAlign: 'center',
    marginBottom: SPACING * 2,
  },
  inputContainer: {
    marginBottom: SPACING * 2,
  },
  label: {
    fontSize: SPACING * 2,
    color: colors.papa,
    marginBottom: SPACING / 2,
  },
  input: {
    backgroundColor: colors.papa,
    padding: SPACING,
    borderRadius: SPACING * 2,
    fontSize: SPACING * 2,
    color: colors.black,
  },
  button: {
    marginTop: SPACING * 2,
    alignSelf: 'center',
    width: '100%',
    borderRadius: SPACING * 2,
    overflow: 'hidden',
    backgroundColor: colors.darkseagreen,
  },
  blurView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING,
  },
  buttonText: {
    fontSize: SPACING * 2,
    color: colors.papa,
    marginRight: SPACING,
  },
});

export default LoginScreen;
