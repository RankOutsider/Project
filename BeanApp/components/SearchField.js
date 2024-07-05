import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../config/colors";
import SPACING from "../config/SPACING";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

const SearchField = ({ onSearch, onClear }) => {
  return (
    <View style={{ borderRadius: SPACING * 2, overflow: "hidden" }}>
      <BlurView intensity={30} style={{ alignItems: "center", justifyContent: "center", height: SPACING * 4.3, overflow: "hidden", flexDirection: 'row' }}>
        <TextInput 
          style={{ width: "80%", color: colors.white, fontSize: SPACING * 1.5, fontFamily: 'Roboto_500Medium', padding: SPACING, paddingLeft: SPACING * 3.5 }}
          placeholder="Find your bean coffee..."
          placeholderTextColor={colors.white}
          onChangeText={onSearch}
        />
        <TouchableOpacity onPress={onClear} style={{ marginLeft: SPACING }}>
          <Ionicons name="close-circle" size={SPACING * 2} color={colors.white} />
        </TouchableOpacity>
        <Ionicons style={{ position: "absolute", left: SPACING }} name="search" size={SPACING * 2} color={colors.white} />
      </BlurView>
    </View>
  );
};

export default SearchField;

const styles = StyleSheet.create({});
