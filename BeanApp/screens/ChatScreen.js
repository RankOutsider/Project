import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, ImageBackground, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import SPACING from '../config/SPACING';
import colors from '../config/colors';

const { width, height } = Dimensions.get('window');

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { id: Date.now().toString(), text: input, sender: 'user' }]);
      setInput('');
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          { id: (Date.now() + 1).toString(), text: 'Thank you for your message! We will get back to you soon.', sender: 'bot' }
        ]);
      }, 1000);
    }
  };

  return (
    <ImageBackground source={require('../shared/b1.jpg')} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
          <ScrollView contentContainerStyle={styles.messagesList}>
            {messages.map(item => (
              <View key={item.id} style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.botMessage]}>
                <Text style={item.sender === 'user' ? styles.userMessageText : styles.botMessageText}>{item.text}</Text>
              </View>
            ))}
          </ScrollView>
          <BlurView intensity={30} style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Type your message..."
              placeholderTextColor={colors.darkgreen}
            />
            <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
              <Ionicons name="send" size={24} color={colors.darkgreen} />
            </TouchableOpacity>
          </BlurView>
        </KeyboardAvoidingView>
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
    padding: SPACING,
  },
  messagesList: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageContainer: {
    padding: SPACING,
    borderRadius: SPACING * 2,
    marginVertical: SPACING / 2,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: colors.papa,
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: colors.darkgreen,
    alignSelf: 'flex-start',
  },
  userMessageText: {
    color: colors.darkgreen,
    fontSize: SPACING * 1.5,
  },
  botMessageText: {
    color: colors.papa,
    fontSize: SPACING * 1.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.papa,
    borderRadius: SPACING * 2,
    padding: SPACING,
    marginTop: SPACING,
  },
  input: {
    flex: 1,
    color: colors.darkgreen,
    fontSize: SPACING * 1.5,
  },
  sendButton: {
    marginLeft: SPACING,
  },
});

export default ChatScreen;
