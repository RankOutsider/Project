import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, ImageBackground, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SPACING from '../config/SPACING';
import colors from '../config/colors';
import { useIsFocused } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const FavoriteScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const isFocused = useIsFocused();

  const loadFavorites = async () => {
    const storedFavorites = await AsyncStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadFavorites();
    }
  }, [isFocused]);

  return (
    <ImageBackground source={require('../shared/b1.jpg')} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          {favorites.length > 0 ? (
            favorites.map((item, index) => (
              <View key={index} style={styles.favoriteItem}>
                <BlurView intensity={95} tint="dark" style={styles.blurView}>
                  <Image source={item.image} style={styles.image} />
                  <Text style={styles.title}>{item.cafeName}</Text>
                  <Text style={styles.price}>{item.price}</Text>
                </BlurView>
              </View>
            ))
          ) : (
            <Text style={styles.noFavoritesText}>No favorites yet.</Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  container: {
    padding: SPACING,
  },
  favoriteItem: {
    marginBottom: SPACING,
    borderRadius: SPACING * 2,
    overflow: 'hidden',
    width: width * 0.9,
    alignSelf: 'center',
  },
  blurView: {
    padding: SPACING,
    paddingVertical: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: SPACING * 2,
  },
  title: {
    color: colors.papa,
    fontSize: SPACING * 2,
    fontWeight: '600',
    marginTop: SPACING,
  },
  price: {
    color: colors.papa,
    fontSize: SPACING * 2,
  },
  noFavoritesText: {
    color: colors.papa,
    fontSize: SPACING * 2,
    textAlign: 'center',
    marginTop: SPACING * 2,
  },
});

export default FavoriteScreen;
