import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import colors from "../config/colors";
import * as ImagePicker from 'expo-image-picker';
import * as Camera from 'expo-camera';

const CustomDrawerContent = (props) => {
  const [image, setImage] = useState(null);
  const [activeItem, setActiveItem] = useState('Home');

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.Camera.requestCameraPermissionsAsync();
      const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (cameraStatus !== 'granted' || galleryStatus !== 'granted') {
        Alert.alert('Permission Denied', 'Camera and photo library permissions are needed to use this feature.');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.papa }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.userContainer}>
          <TouchableOpacity onPress={pickImage} style={{ margin: 20, alignItems: 'center' }}>
            {image ? (
              <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 50 }} />
            ) : (
              <Ionicons name="person-circle" size={100} color={colors.darkgreen} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={takePhoto} style={{ margin: 20, alignItems: 'center' }}>
            <Ionicons name="camera" size={24} color={colors.darkgreen} />
          </TouchableOpacity>
          <Text style={ styles.drawerHeader}>Beanie's Zone</Text>
        </View>
        <DrawerContentScrollView {...props}>
          <DrawerItem
            label="Home"
            icon={() => <Ionicons name="home" size={24} color={activeItem === 'Home' ? colors.papa : colors.darkgreen} />}
            focused={activeItem === 'Home'}
            onPress={() => {
              setActiveItem('Home');
              props.navigation.navigate('Home');
            }}
            labelStyle={[styles.drawerLabel, activeItem === 'Home' && styles.activeDrawerLabel]}
            style={[styles.drawerItem, activeItem === 'Home' && styles.drawerItemActive]}
          />
          <DrawerItem
            label="Reservation"
            icon={() => <Ionicons name="calendar" size={24} color={activeItem === 'Reservation' ? colors.papa : colors.darkgreen} />}
            focused={activeItem === 'Reservation'}
            onPress={() => {
              setActiveItem('Reservation');
              props.navigation.navigate('Reservation');
            }}
            labelStyle={[styles.drawerLabel, activeItem === 'Reservation' && styles.activeDrawerLabel]}
            style={[styles.drawerItem, activeItem === 'Reservation' && styles.drawerItemActive]}
          />
          <DrawerItem
            label="Login"
            icon={() => <Ionicons name="person" size={24} color={activeItem === 'Login' ? colors.papa : colors.darkgreen} />}
            focused={activeItem === 'Login'}
            onPress={() => {
              setActiveItem('Login');
              props.navigation.navigate('Login');
            }}
            labelStyle={[styles.drawerLabel, activeItem === 'Login' && styles.activeDrawerLabel]}
            style={[styles.drawerItem, activeItem === 'Login' && styles.drawerItemActive]}
          />
          <DrawerItem
            label="Chat"
            icon={() => <Ionicons name="chatbubbles" size={24} color={activeItem === 'Chat' ? colors.papa : colors.darkgreen} />}
            focused={activeItem === 'Chat'}
            onPress={() => {
              setActiveItem('Chat');
              props.navigation.navigate('Chat');
            }}
            labelStyle={[styles.drawerLabel, activeItem === 'Chat' && styles.activeDrawerLabel]}
            style={[styles.drawerItem, activeItem === 'Chat' && styles.drawerItemActive]}
          />
           <DrawerItem
            label="Favorite"
            icon={() => <Ionicons name="heart" size={24} color={activeItem === 'Favorite' ? colors.papa : colors.darkgreen} />}
            focused={activeItem === 'Favourite'}
            onPress={() => {
              setActiveItem('Favorite');
              props.navigation.navigate('Favorite');
            }}
            labelStyle={[styles.drawerLabel, activeItem === 'Favorite' && styles.activeDrawerLabel]}
            style={[styles.drawerItem, activeItem === 'Favorite' && styles.drawerItemActive]}
          />
          <DrawerItem
            label="Facebook"
            icon={() => <Ionicons name="logo-facebook" size={24} color={activeItem === 'Facebook' ? colors.papa : colors.darkgreen} />}
            focused={activeItem === 'Facebook'}
            onPress={() => Linking.openURL('https://www.facebook.com/nowherebutbeanthere')}
            labelStyle={[styles.drawerLabel, activeItem === 'Facebook' && styles.activeDrawerLabel]}
            style={[styles.drawerItem, activeItem === 'Facebook' && styles.drawerItemActive]}
          />
          <DrawerItem
            label="Instagram HoHaoHon"
            icon={() => <Ionicons name="logo-instagram" size={24} color={activeItem === 'Instagram' ? colors.papa : colors.darkgreen} />}
            focused={activeItem === 'Instagram'}
            onPress={() => Linking.openURL('https://www.instagram.com/beanthere_hohaohon/')}
            labelStyle={[styles.drawerLabel, activeItem === 'Instagram' && styles.activeDrawerLabel]}
            style={[styles.drawerItem, activeItem === 'Instagram' && styles.drawerItemActive]}
          />
          <DrawerItem
            label="Instagram HoangSa"
            icon={() => <Ionicons name="logo-instagram" size={24} color={activeItem === 'Instagram' ? colors.papa : colors.darkgreen} />}
            focused={activeItem === 'Instagram'}
            onPress={() => Linking.openURL('https://www.instagram.com/beanthere_hoangsa/')}
            labelStyle={[styles.drawerLabel, activeItem === 'Instagram' && styles.activeDrawerLabel]}
            style={[styles.drawerItem, activeItem === 'Instagram' && styles.drawerItemActive]}
          />
        </DrawerContentScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  drawerHeader: {
    fontSize: 18,
    fontFamily: 'Roboto_500Medium',
    color: colors.darkgreen,
    textAlign: 'center',
    marginTop: 10,
  },
  drawerLabel: {
    fontFamily: 'Roboto_500Medium',
    color: colors.darkgreen,
  },
  activeDrawerLabel: {
    color: colors.papa,
  },
  drawerItem: {
    color: colors.seagreen,
  },
  drawerItemActive: {
    backgroundColor: colors.darkseagreen,
  },
});

export default CustomDrawerContent;
