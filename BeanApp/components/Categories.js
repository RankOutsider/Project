import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import categories from "../config/categories";
import colors from "../config/colors";
import SPACING from "../config/SPACING";
import { Icon } from "react-native-elements";

const Categories = ({ onChange }) => {
  const [activeCategoryType, setActiveCategoryType] = useState(null);

  const handlePress = (type) => {
    const newType = type === activeCategoryType ? null : type;
    setActiveCategoryType(newType);
    onChange(newType);
  };

  return (
    <FlatList
    
      horizontal={true}
      data={categories}
      keyExtractor={(item) => item.type}
      contentContainerStyle={{ marginVertical: SPACING }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handlePress(item.type)}
          style={{ marginRight: SPACING * 3, alignItems: "center", marginVertical: 4  }}
        >
          <Text
            style={[
              styles.categoryText,
              activeCategoryType === item.type && styles.activeCategoryText,
              item.type === "drink" && activeCategoryType === null && styles.defaultCategoryText,
              item.type === "about" && activeCategoryType === null && styles.defaultCategoryText,
              item.type === "diy" && activeCategoryType === null && styles.defaultCategoryText,
              item.type === "promotion" && activeCategoryType === null && styles.defaultCategoryText,
            ]}
          >

            {item.name}
          </Text>
          {(activeCategoryType === item.type) && (
            <View
              style={{
                height: SPACING,
                width: SPACING,
                backgroundColor: colors.seagreen,
                borderRadius: SPACING / 2,
                marginTop: SPACING / 2,
              }}
            />
          )}
        </TouchableOpacity>
      )}

    />
    
  );
};

const styles = StyleSheet.create({
  categoryText: {
    marginTop: 4,
    color: colors.papa,
    fontSize: SPACING * 1.8,
    fontFamily: 'Roboto_400Medium', 
  },
  activeCategoryText: {
    color: colors.white,
  },
});

export default Categories;


