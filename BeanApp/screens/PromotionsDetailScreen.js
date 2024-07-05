import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, SafeAreaView, ImageBackground, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import SPACING from '../config/SPACING';
import colors from '../config/colors';


const { width, height } = Dimensions.get("window");

const PromotionsDetailScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { promotion } = route.params;
  return (
    <ImageBackground source={require('../shared/b1.jpg')} style={styles.background}>
        <SafeAreaView style = {{flex : 1}}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity
                style={{ position: 'absolute', top: SPACING * 2, left: SPACING * 2, zIndex: 1, borderRadius: SPACING, overflow: "hidden", width: SPACING * 4, height: SPACING * 4 }}
                onPress={() => navigation.goBack()}>
                    <BlurView style={{ height: "100%", justifyContent: "center", alignItems: "center" }}>
                        <Ionicons name="arrow-back" color={colors.papa} size={SPACING * 2.5} />
                    </BlurView>
                </TouchableOpacity>

                <Image source={promotion.promotionsImage} style={styles.image} />
                <View style={styles.container}>
                    <Text style={styles.title}>{promotion.promotionsName}</Text>
                    <Text style={styles.description}>{promotion.promotionsDescription}</Text>
                    <Text style={styles.location}>{promotion.promotionsLocation}</Text>
                </View>
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING * 2,
  },
  image: {
    marginTop: 50,
    width: width * 0.9,
    height: height * 0.4,
    borderRadius: SPACING * 2,
    marginBottom: SPACING * 2,
  },
  container: {
    width: width * 0.9,
    padding: SPACING * 2,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    borderRadius: SPACING * 2,
  },
  title: {
    fontSize: SPACING * 2,
    fontWeight: 'bold',
    color: colors.papa,
    marginBottom: SPACING,
  },
  description: {
    fontSize: SPACING * 1.7,
    color: colors.papa,
    marginBottom: SPACING,
  },
  location: {
    fontSize: SPACING * 1.7,
    color: colors.papa,
  },
});

export default PromotionsDetailScreen;
