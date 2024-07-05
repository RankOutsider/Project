import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Dimensions, Image, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";
import SPACING from "../config/SPACING";
import { BlurView } from "expo-blur";
import drinkdetails from "../config/drinkdetails";
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get("window");

const CoffeeDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { coffeeId } = route.params;
  const coffeeDetails = drinkdetails.filter(detail => detail.coffeeId === coffeeId);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    };
    loadFavorites();
  }, []);

  const isFavorite = (detail) => {
    return favorites.some(favorite => favorite.drinkId === detail.drinkId);
  };

  const handleFavorite = async (detail) => {
    const updatedFavorites = isFavorite(detail)
      ? favorites.filter(favorite => favorite.drinkId !== detail.drinkId)
      : [...favorites, detail];
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    Alert.alert(isFavorite(detail) ? "Removed from favorites" : "Added to favorites");
  };

  return (
    <ImageBackground source={require('../shared/b1.jpg')} style={styles.background}>
      <ScrollView>
        <SafeAreaView>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TouchableOpacity
              style={{ borderRadius: SPACING, overflow: "hidden", width: SPACING * 4, height: SPACING * 4 }}
              onPress={() => navigation.goBack()}
            >
              <BlurView style={{ height: "100%", justifyContent: "center", alignItems: "center" }}>
                <Ionicons name="arrow-back" color={colors.papa} size={SPACING * 2.5} />
              </BlurView>
            </TouchableOpacity>
          </View>
          <View style={{ padding: SPACING }}>
            {coffeeDetails.map(detail => (
              <View
                key={detail.drinkId.toString()}
                style={{
                  width: width * 0.9,
                  marginBottom: SPACING,
                  borderRadius: SPACING * 2,
                  overflow: "hidden",
                  marginTop: SPACING,
                  alignSelf: "center",
                }}
              >
                <View style={{ position: 'relative' }}>
                  <Image source={detail.image} style={{ width: "100%", height: 200, borderRadius: SPACING * 2 }} />
                  <TouchableOpacity
                    onPress={() => handleFavorite(detail)}
                    style={styles.heartIcon}
                  >
                    <Ionicons name={isFavorite(detail) ? "heart" : "heart-outline"} size={SPACING * 3} color={colors.papa} />
                  </TouchableOpacity>
                </View>
                <BlurView intensity={95} tint="dark" style={{ padding: SPACING, paddingVertical: 10 }}>
                  <Text style={{ color: colors.papa, fontSize: SPACING * 2, fontWeight: "600", marginTop: SPACING }}>{detail.cafeName}</Text>
                  <Text style={{ color: colors.papa, fontSize: SPACING * 2 }}>{detail.price}</Text>
                  <Text style={{ color: colors.papa, fontSize: SPACING * 2, marginTop: SPACING }}>{detail.description}</Text>
                  <Text style={{ color: colors.papa, fontSize: SPACING * 2, marginTop: SPACING }}>{detail.included}</Text>
                </BlurView>
              </View>
            ))}
          </View>
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
};

export default CoffeeDetailsScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  heartIcon: {
    position: 'absolute',
    top: SPACING,
    right: SPACING,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: SPACING / 2,
    borderRadius: SPACING * 1.5,
  },
});
