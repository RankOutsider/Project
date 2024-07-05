import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ImageBackground, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import SPACING from '../config/SPACING';
import colors from '../config/colors';

const { width, height } = Dimensions.get('window');

const ConfirmScreen = ({ route, navigation }) => {
    const { customerName } = route.params;

    return (
        <ImageBackground source={require('../shared/b1.jpg')} style={styles.background}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <Text style={styles.title}>Reservation Confirmed</Text>
                    <Text style={styles.message}>Thank you, {customerName}!</Text>
                    <Text style={styles.message}>Your reservation has been successfully saved to your calendar.</Text>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('HomeScreen')}
                    >
                        <BlurView intensity={30} style={styles.blurView}>
                            <Text style={styles.buttonText}>Back to Home</Text>
                            <Ionicons name="home" size={24} color={colors.papa} />
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING * 2,
    },
    title: {
        fontSize: SPACING * 3,
        fontWeight: 'bold',
        color: colors.papa,
        textAlign: 'center',
        marginBottom: SPACING * 2,
    },
    message: {
        fontSize: SPACING * 2,
        color: colors.papa,
        textAlign: 'center',
        marginBottom: SPACING * 2,
    },
    button: {
        marginTop: SPACING * 2,
        alignSelf: 'center',
        width: '80%',
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

export default ConfirmScreen;
