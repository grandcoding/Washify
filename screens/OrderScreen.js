import { StyleSheet, Text, View, SafeAreaView, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { cleanCart } from "../CartReducer";

const OrderScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={{ backgroundColor: 'white', height: 1500, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <View>
        <Image source={require('../assets/order-succesful.gif')} style={{ width: 350, height: 350 }} />
        <Text
          style={{
            marginTop: 40,
            fontSize: 19,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Your order has been placed
        </Text>
        <Text
          style={{
            fontSize: 19,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          We'll pick up your clothes soon 🤝
        </Text>

        <Pressable
          onPress={() => {
            dispatch(cleanCart());
            navigation.navigate("Home")
          }}
          style={{
            width: 300,
            backgroundColor: "#7E57C2",
            padding: 15,
            borderRadius: 7,
            marginTop: 15,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
            Let's wash more clothes
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
