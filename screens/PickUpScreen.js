import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  ScrollView,
  Alert
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import HorizontalDatePicker from '@logisticinfotech/react-native-horizontal-date-picker';

const PickUpScreen = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);
  const [delivery, setDelivery] = useState([]);

  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);


  const deliveryTime = [
    {
      id: "0",
      name: "2-3 Days",
    },
    {
      id: "1",
      name: "3-4 Days",
    },
    {
      id: "2",
      name: "4-5 Days",
    },
    {
      id: "3",
      name: "5-6 Days",
    },
    {
      id: "4",
      name: "Tomorrow",
    },
  ];

  const times = [
    {
      id: "0",
      time: "11:00 PM",
    },
    {
      id: "1",
      time: "12:00 PM",
    },
    {
      id: "2",
      time: "1:00 PM",
    },
    {
      id: "2",
      time: "2:00 PM",
    },
    {
      id: "4",
      time: "3:00 PM",
    },
    {
      id: "5",
      time: "4:00 PM",
    },
  ];

  const navigation = useNavigation();
  const proceedToCart = () => {
    if (selectedDate.length == 0 || selectedTime.length == 0 || delivery.length == 0) {
      Alert.alert(
        "Empty or invalid",
        "Please select all the fields",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }
    else if (selectedDate && selectedTime && delivery) {
      navigation.navigate("Cart", {
        pickUpDate: selectedDate,
        selectedTime: selectedTime,
        no_Of_days: delivery,
      })
    }
  }

  onDateSelected = date => {
    console.log('Selected Date:==>', date);
    setSelectedDate(date);
  }

  onTimeSelected = time => {
    console.log('Selected Time:==>', time);
    setSelectedTime(time);
  }

  return (
    <>
      <SafeAreaView style={{ marginTop: 55 }}>
        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Enter Address
        </Text>
        <TextInput
          style={{
            padding: 10,
            borderColor: "gray",
            borderWidth: 0.7,
            borderRadius: 9,
            margin: 10,
          }}
        />

        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10, marginBottom: 10 }}>
          Pick Up Date & Time
        </Text>

        <HorizontalDatePicker
          pickerType={'datetime'}
          minDate={new Date()}
          defaultSelected={new Date()}
          datePickerBG={require('../assets/bg-flower-1.jpg')}
          dayFormat={'DD'}
          monthFormat={'MMM'}
          yearFormat={'YY'}
          timeFormat={'hh:mm A'}
          timeStep={120}
          returnDateFormat={'Do MMMM YY'}
          returnTimeFormat={'hh:mm A'}
          returnDateTimeFormat={'DD-MM-YYYY HH:mm'}
          onDateSelected={onDateSelected}
          onTimeSelected={onTimeSelected}
          isShowYear={false}
          unSelectedTextStyle={{
            fontWeight: 'bold',
          }}
          SelectedTextStyle={{
            fontWeight: 'bold',
          }}
        />

        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10, marginVertical: 5 }}>
          Delivery Within
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {deliveryTime.map((item, i) => (
            <Pressable
              style={
                delivery.includes(item.name)
                  ? {
                    margin: 10,
                    borderRadius: 7,
                    padding: 15,
                    borderColor: "red",
                    borderWidth: 0.7,
                  }
                  : {
                    margin: 10,
                    borderRadius: 7,
                    padding: 15,
                    borderColor: "gray",
                    borderWidth: 0.7,
                  }
              }
              onPress={() => setDelivery(item.name)}
              key={i}
            >
              <Text>{item.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>

      {total === 0 ? null : (
        <Pressable
          onPress={proceedToCart}
          style={{
            backgroundColor: "#088F8F",
            marginTop: "auto",
            padding: 10,
            marginBottom: 40,
            margin: 15,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "white" }}>
              {cart.length} items |  ₹ {total}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "400",
                color: "white",
                marginVertical: 6,
              }}
            >
              Extra charges might apply
            </Text>
          </View>

          <Text style={{ fontSize: 16, fontWeight: "600", color: "white" }}>
            Proceed to Cart
          </Text>
        </Pressable>
      )}
    </>
  );
};

export default PickUpScreen;

const styles = StyleSheet.create({});
