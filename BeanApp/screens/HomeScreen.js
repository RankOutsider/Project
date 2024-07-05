import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, ImageBackground } from "react-native";
import React, { useState, useCallback } from "react";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import SPACING from "../config/SPACING";
import colors from "../config/colors";
import SearchField from "../components/SearchField";
import Categories from "../components/Categories";
import COFFEES from "../config/coffees";
import promotions from "../config/promotions";
import diy from "../config/diy"; 
import bean from "../config/bean"; 

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation();
  const [activeCategoryType, setActiveCategoryType] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const getDataToDisplay = useCallback(() => {
    let data = [];
    if (activeCategoryType === 'promotion') {
      data = promotions;
    } else if (activeCategoryType === 'diy') {
      data = diy;
    } else if (activeCategoryType === 'about') {
      data = bean;
    } else {
      data = COFFEES;
    }

    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      return data.filter(item => {
        const name = item.name || item.promotionsName || item.diyName || item.beanName;
        return name.toLowerCase().includes(lowercasedQuery);
      });
    }

    return data;
  }, [activeCategoryType, searchQuery]);

  const renderItem = (item) => {
    const key = item.coffeesId || item.promotionsId || item.diyId || item.beanId || item.id;
    if (!key) {
      console.warn("Item is missing 'coffeesId', 'promotionsId', 'diyId', 'beanId', or 'id':", item);
      return null; 
    }

    const customStyles = {
      promotion: {
        container: {
          backgroundColor: colors.darkseagreen,
        },
        image: {
          width: "100%", 
          height: "100%", 
          borderRadius: SPACING * 2,
        },
        text: {
          color: colors.darkgreen,
        },
      },
      drink: {
        container: {
          backgroundColor: colors.darkseagreen, 
        },
        image: {
          width: "100%", 
          height: "100%", 
          borderRadius: SPACING * 2,
        },
        text: {
          color: colors.papa,
        },
      },
      diy: {
        container: {
          backgroundColor: colors.darkseagreen,
          width: "100%",
          height: 500,
          padding: SPACING * 2, 
          borderRadius: SPACING * 5,
        },
        image: {
          width: "105%", 
          height: "100%", 
          borderRadius: SPACING * 2,
          alignSelf: 'center',
          justifyContent: 'center',
          marginTop: 5,
        },
        text: {
          color: colors.papa,
        },
      },
      about: {
        container: {
          width: "100%",
          backgroundColor: colors.darkseagreen, 
        },
        image: {
          width: "100%", 
          height: "100%", 
          borderRadius: SPACING * 2,
        },
        text: {
          color: colors.darkblue,
        },
      },
    };

    const category = activeCategoryType || 'drink';
    const stylesToApply = customStyles[category];

    return (
      <View
        key={key.toString()}
        style={{
          width: width * 0.9,
          marginBottom: SPACING,
          borderRadius: SPACING * 2,
          overflow: "hidden",
          marginTop: SPACING,
          alignSelf: "center",
        }}
      >
        <BlurView intensity={95} tint="dark" style={[{ padding: SPACING, paddingVertical: 10 }, stylesToApply.container]}>
          <TouchableOpacity
            style={{ width: "100%", height: 200 }}
            onPress={() => {
              if (activeCategoryType === 'promotion') {
                navigation.navigate('PromotionsDetail', { promotion: item });
              } else if (activeCategoryType === 'about') {
                navigation.navigate('AboutBeanDetail', { bean: item });
              } else if (activeCategoryType !== 'diy') {
                navigation.navigate('CoffeeDetails', { coffeeId: item.coffeesId });
              }
            }}
          >
            <Image source={item.image || item.promotionsImage || item.diyImage || item.beanImage} style={stylesToApply.image} />
            <Text style={[{ fontSize: 23, fontWeight: "600", marginTop: SPACING, fontFamily: 'Roboto_700Bold' }, stylesToApply.text]}>
              {item.name || item.promotionsName || item.diyName || item.beanName}
            </Text>
            <Text style={[{ fontSize: SPACING * 1.5, marginTop: SPACING, fontFamily: 'Roboto_500Medium' }, stylesToApply.text]}>
              {item.description || item.promotionsDescription || item.diyDescription || item.beanDescription}
            </Text>
            {item.diyPrice && <Text style={[{ fontSize: SPACING * 1.5, marginTop: SPACING * 2 }, stylesToApply.text]}>
              Price: {item.diyPrice}
            </Text>}
            {item.diyLocation && <Text style={[{ fontSize: SPACING * 1.5, marginTop: SPACING * 2 }, stylesToApply.text]}>
              Location: {item.diyLocation}
            </Text>}
          </TouchableOpacity>
        </BlurView>
      </View>
    );
  };

  const dataToDisplay = getDataToDisplay();

  return (
    <ImageBackground source={require('../shared/b1.jpg')} style={styles.background}>
      <SafeAreaView>
        <ScrollView style={{ padding: SPACING }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TouchableOpacity 
              style={{ borderRadius: SPACING, overflow: "hidden", width: SPACING * 4, height: SPACING * 4 }}
              onPress={() => navigation.toggleDrawer()}>
              <BlurView style={{ height: "100%", justifyContent: "center", alignItems: "center" }}>
                <Ionicons name="menu" size={SPACING * 2.5} color={colors.papa} />
              </BlurView>
            </TouchableOpacity>
            <View style={{ width: SPACING * 4, height: SPACING * 4, overflow: "hidden", borderRadius: SPACING }}>
              <BlurView style={{ height: "100%", padding: SPACING / 2 }}>
                <Image style={{ height: "100%", width: "100%", borderRadius: SPACING }} source={require("../shared/logo.jpg")} />
              </BlurView>
            </View>
          </View>

          <View style={{ width: "80%", marginVertical: SPACING * 3 }}>
            <Text style={{ color: colors.papa, fontSize: SPACING * 3.5, fontWeight: "600", fontFamily: 'Roboto_500Medium' }}>
              Welcome to Beanthere Cafe
            </Text>
            <Text style={{ color: colors.papa, fontFamily: 'Roboto_500Medium' }}>Nowhere but Beanthere</Text>
          </View>
          <SearchField 
            onSearch={setSearchQuery}
            onClear={() => setSearchQuery('')}
          />

          <Categories onChange={(type) => setActiveCategoryType(type)} />
          
          {activeCategoryType === null ? (
            <View style={{ alignItems: "center", marginTop: SPACING * 2 }}>
              <Image source={require('../shared/beanies1.jpg')} style={{ marginTop: SPACING / 10, width: "110%", height: 300, borderRadius: SPACING * 2 }} />
            </View>
          ) : (
            dataToDisplay.map(item => renderItem(item))
          )}

          {activeCategoryType === 'diy' && (
            <BlurView style={{ marginTop: SPACING, overflow: "hidden", width: "100%", borderRadius: SPACING * 2 }}> 
              <View style={{ left: 10, marginTop: SPACING, flexDirection: "row" }}>
                <Text style={{ color: colors.papa, fontSize: SPACING * 3, fontWeight: "600", fontFamily: 'Roboto_500Medium' }}>Bean's DIY</Text>
                <Ionicons name="heart" size={SPACING * 2.5} color={colors.papa} style={{ left: SPACING, marginTop: SPACING / 2 }} />
              </View>
              <Text style={{ marginBottom: SPACING * 2, left: 7, color: colors.papa, fontSize: SPACING * 2, marginTop: SPACING, fontFamily: 'Roboto_500Medium' }}>
                The Bean family asks for permission to charge a surcharge of 50,000VND on weekends.
              </Text>
            </BlurView>
          )}

          {activeCategoryType === 'about' && (
            <View style={{ marginTop: SPACING }}>
              <Text style={{ color: colors.papa, fontSize: SPACING * 3, fontWeight: "600", fontFamily: 'Roboto_500Medium' }}>About Bean</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
