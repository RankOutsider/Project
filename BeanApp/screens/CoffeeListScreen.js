import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import coffees from '../config/coffees';

const CoffeeListScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('CoffeeDetails', { coffeesId: item.id })}
    >
    
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={coffees}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

export default CoffeeListScreen;
