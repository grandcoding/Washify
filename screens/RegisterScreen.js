import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
  Image
} from "react-native";
import { Feather } from '@expo/vector-icons';
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigation = useNavigation();

  //Main functionality of register data sending back to database
  const register = () => {
    if (email === "" || password === "" || phone === "") {
      Alert.alert(
        "Invalid Details",
        "Please fill all the details",
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

    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      console.log("user credential", userCredential);
      const user = userCredential._tokenResponse.email;
      const myUserUid = auth.currentUser.uid;

      setDoc(doc(db, "users", `${myUserUid}`), {
        email: user,
        phone: phone
      })
    })
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        padding: 10,
      }}
    >
      <KeyboardAvoidingView>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 60,
            }}
          >
            <Text style={{ fontSize: 20, color: "#662d91", fontWeight: "bold" }}>
              Register
            </Text>

            <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>
              Create a new Account
            </Text>
          </View>
          <Image source={require('../assets/mobile-register.gif')} style={{ width: 330, height: 400 }} />
          <View >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color="black"
              />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor="black"
                style={{
                  fontSize: email ? 18 : 18,
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                  marginLeft: 13,
                  width: 300,
                  marginVertical: 10,
                }}
              />
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="key-outline" size={24} color="black" />
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor="black"
                style={{
                  fontSize: password ? 18 : 18,
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                  marginLeft: 13,
                  width: 300,
                  marginVertical: 20,
                }}
              />
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather name="phone" size={24} color="black" />
              <TextInput
                value={phone}
                onChangeText={(text) => setPhone(text)}
                placeholder="Phone No"
                placeholderTextColor="black"
                style={{
                  fontSize: password ? 18 : 18,
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                  marginLeft: 13,
                  width: 300,
                  marginVertical: 10,
                }}
              />
            </View>

            <Pressable
              onPress={register}
              style={{
                width: 200,
                backgroundColor: "#7E57C2",
                padding: 15,
                borderRadius: 7,
                marginTop:15,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
                Register
              </Text>
            </Pressable>

            <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 17,
                  color: "gray",
                  fontWeight: "500",
                }}
              >
                Already have a account? Sign in
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
