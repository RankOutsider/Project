import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ImageBackground, Keyboard, StatusBar, Alert, Dimensions, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from '@react-native-picker/picker';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import SPACING from '../config/SPACING';
import colors from '../config/colors';
import * as Calendar from 'expo-calendar';

const { width, height } = Dimensions.get('window');

const ReservationScreen = ({ navigation }) => {
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [time, setTime] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [numberOfPeople, setNumberOfPeople] = useState('');
    const [smoking, setSmoking] = useState('No');
    const [reservationType, setReservationType] = useState('Table');
    const [location, setLocation] = useState('Beanthere I - HoHaoHon');
    const [customerName, setCustomerName] = useState('');
    const [contactMethod, setContactMethod] = useState('Email');
    const [contactDetail, setContactDetail] = useState('');

    useEffect(() => {
        const getCalendarPermission = async () => {
            const { status } = await Calendar.requestCalendarPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Error', 'Calendar permission is required.');
            }
        };
        getCalendarPermission();
    }, []);

    const handleDateChange = (selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    const handleTimeChange = (selectedTime) => {
        const currentTime = selectedTime || time;
        setShowTimePicker(false);
        setTime(currentTime);
    };

    const handleConfirm = async () => {
        if (!customerName) {
            Alert.alert('Validation Error', 'Customer name is required.');
            return;
        }
        if (contactMethod === 'Email' && !/\S+@\S+\.\S+/.test(contactDetail)) {
            Alert.alert('Validation Error', 'Please enter a valid email address.');
            return;
        }
        if (contactMethod === 'Phone' && (contactDetail.length < 10 || contactDetail.length > 11)) {
            Alert.alert('Validation Error', 'Please enter a valid phone number (10-11 digits).');
            return;
        }

        const details = {
            title: `Reservation for ${customerName}`,
            startDate: new Date(date),
            endDate: new Date(new Date(date).getTime() + 2 * 60 * 60 * 1000),
            notes: `Number of People: ${numberOfPeople}, Smoking: ${smoking}, Reservation Type: ${reservationType}, Location: ${location}`,
            timeZone: 'GMT+7',
        };

        try {
            const defaultCalendarSource = await Calendar.getDefaultCalendarAsync();
            const calendarId = defaultCalendarSource.id;

            await Calendar.createEventAsync(calendarId, details);
            Alert.alert('Success', 'Reservation confirmed and saved to your calendar.');
            navigation.navigate('Confirm', { customerName });
        } catch (e) {
            Alert.alert('Calendar Error', 'An error occurred while saving to your calendar.');
        }
    };

    return (
        <ImageBackground source={require('../shared/b1.jpg')} style={styles.background}>
            <SafeAreaView style={styles.safeArea}>
                <StatusBar hidden={false} />
                <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <Text style={styles.title}>Make a Reservation</Text>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Reservation Details</Text>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Number of People</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={styles.input}
                                        keyboardType="numeric"
                                        value={numberOfPeople}
                                        onChangeText={setNumberOfPeople}
                                        placeholder="Enter number"
                                        placeholderTextColor={colors.black}
                                    />
                                    {numberOfPeople !== '' && (
                                        <TouchableOpacity onPress={() => { alert(`Number of people: ${numberOfPeople}`); Keyboard.dismiss(); }} style={styles.acceptButton}>
                                            <Ionicons name="checkmark-circle" size={SPACING * 2} color={colors.black} />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Date</Text>
                                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                                    <Text style={styles.dateInput}>{date.toDateString()}</Text>
                                </TouchableOpacity>
                                <DateTimePickerModal
                                    isVisible={showDatePicker}
                                    mode="date"
                                    onConfirm={handleDateChange}
                                    onCancel={() => setShowDatePicker(false)}
                                    textColor={colors.black}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Time</Text>
                                <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                                    <Text style={styles.dateInput}>{time.toLocaleTimeString()}</Text>
                                </TouchableOpacity>
                                <DateTimePickerModal
                                    isVisible={showTimePicker}
                                    mode="time"
                                    onConfirm={handleTimeChange}
                                    onCancel={() => setShowTimePicker(false)}
                                    textColor={colors.black}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Location</Text>
                                <View style={styles.pickerContainer}>
                                    <Picker
                                        selectedValue={location}
                                        style={styles.picker}
                                        itemStyle={styles.pickerItem}
                                        onValueChange={(itemValue) => setLocation(itemValue)}
                                    >
                                        <Picker.Item label="Beanthere I - HoHaoHon" value="Beanthere I - HoHaoHon" />
                                        <Picker.Item label="Beanthere II - HoangSa" value="Beanthere II - HoangSa" />
                                    </Picker>
                                </View>
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Smoking</Text>
                                <View style={styles.pickerContainer}>
                                    <Picker
                                        selectedValue={smoking}
                                        style={styles.picker}
                                        itemStyle={styles.pickerItem}
                                        onValueChange={(itemValue) => setSmoking(itemValue)}
                                    >
                                        <Picker.Item label="No" value="No" />
                                        <Picker.Item label="Yes" value="Yes" />
                                    </Picker>
                                </View>
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Reservation Type</Text>
                                <View style={styles.pickerContainer}>
                                    <Picker
                                        selectedValue={reservationType}
                                        style={styles.picker}
                                        itemStyle={styles.pickerItem}
                                        onValueChange={(itemValue) => setReservationType(itemValue)}
                                    >
                                        <Picker.Item label="Table" value="Table" />
                                        <Picker.Item label="DIY" value="DIY" />
                                    </Picker>
                                </View>
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Customer Information</Text>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Beanies Name</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={styles.input}
                                        value={customerName}
                                        onChangeText={setCustomerName}
                                        placeholder="Enter your name"
                                        placeholderTextColor={colors.black}
                                    />
                                </View>
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Contact Method</Text>
                                <View style={styles.pickerContainer}>
                                    <Picker
                                        selectedValue={contactMethod}
                                        style={styles.picker}
                                        itemStyle={styles.pickerItem}
                                        onValueChange={(itemValue) => setContactMethod(itemValue)}
                                    >
                                        <Picker.Item label="Email" value="Email" />
                                        <Picker.Item label="Phone" value="Phone" />
                                    </Picker>
                                </View>
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>{contactMethod === 'Email' ? 'Email Address' : 'Phone Number'}</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={styles.input}
                                        value={contactDetail}
                                        onChangeText={setContactDetail}
                                        placeholder={contactMethod === 'Email' ? 'Enter your email' : 'Enter your phone number'}
                                        placeholderTextColor={colors.black}
                                        keyboardType={contactMethod === 'Phone' ? 'numeric' : 'default'}
                                    />
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity 
                            style={styles.button}
                            onPress={handleConfirm}
                        >
                            <BlurView intensity={30} style={styles.blurView}>
                                <Text style={styles.buttonText}>Reserve Now</Text>
                                <Ionicons name="arrow-forward" size={24} color={colors.papa} />
                            </BlurView>
                        </TouchableOpacity>
                    </ScrollView>
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
    scrollContainer: {
        flexGrow: 1,
        padding: SPACING * 2,
    },
    container: {
        flex: 1,
        flexGrow: 1,
    },
    title: {
        fontSize: SPACING * 3,
        fontWeight: 'bold',
        color: colors.papa,
        textAlign: 'center',
        marginBottom: SPACING * 2,
    },
    section: {
        marginBottom: SPACING * 4,
    },
    sectionTitle: {
        fontSize: SPACING * 2.5,
        fontWeight: 'bold',
        color: colors.papa,
        marginBottom: SPACING * 2,
    },
    inputContainer: {
        marginBottom: SPACING * 2,
    },
    label: {
        fontSize: SPACING * 2,
        color: colors.papa,
        marginBottom: SPACING / 2,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.papa,
        borderRadius: SPACING * 2,
        paddingRight: SPACING,
    },
    input: {
        flex: 1,
        padding: SPACING,
        fontSize: SPACING * 2,
        color: colors.black,
    },
    acceptButton: {
        marginLeft: SPACING / 2,
    },
    touchableContainer: {
        borderRadius: SPACING * 3, 
        overflow: 'hidden', 
    },
    dateInput: {
        backgroundColor: colors.papa,
        padding: SPACING,
        borderRadius: SPACING * 3,
        fontSize: SPACING * 2,
        color: colors.black,
    },
    pickerContainer: {
        backgroundColor: colors.papa,
        borderRadius: SPACING * 2,
        overflow: 'hidden',
    },
    picker: {
        height: 50, 
        width: '100%', 
    },
    pickerItem: {
        height: 50, 
        fontSize: SPACING * 2, 
    },
    button: {
        marginTop: SPACING * 2,
        alignSelf: 'center',
        width: '100%',
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

export default ReservationScreen;
