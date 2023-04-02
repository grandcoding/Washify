import { ScrollView, Text, StyleSheet, View, Pressable, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from "@expo/vector-icons";
import Carousel from '../components/Carousel';
import Services from '../components/Services';
import DressItem from '../components/DressItem';
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../ProductReducer";
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../Firebase';

const HomeScreen = () => {
  //Navigation Management
  const navigation = useNavigation();

  //Cart Reducer
  const cart = useSelector((state) => state.cart.cart);
  const [items, setItems] = useState([]);

  const total = cart.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0);
  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();

  useEffect(() => {
    if (product.length > 0) return;

    const fetchProducts = async () => {
      const colRef = collection(db, "types");
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach((doc) => {
        items.push(doc.data());
      });
      items?.map((service) => dispatch(getProducts(service)));
    };
    fetchProducts();
  }, []);

  // console.log(product);
  // console.log(cart);

  // ============================
  // Setting up User Location

  const [locationServicesEnabled, setlocationServicesEnabled] = useState(false);
  const [displayCurrentAddress, setdisplayCurrentAddress] = useState(
    "We are loading your live location..."
  );
  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location services not enabled",
        "Please enable the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    } else {
      setlocationServicesEnabled(enabled);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "allow the app to use the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }

    const { coords } = await Location.getCurrentPositionAsync();

    // console.log(coords)

    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        setdisplayCurrentAddress(address);
      }
    }
  };
  // =================================
  //User Location Set Up Ended


  //===============================
  //Services List begins here

  //=================================

  return (
    <>
      <ScrollView style={{ backgroundColor: "white", marginTop: 50 }}>

        {/* Location and Profile Segment (Top) */}
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <MaterialIcons name="location-on" size={30} color="#7E57C2" />
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
            <Text>{displayCurrentAddress}</Text>
          </View>

          <Pressable onPress={() => navigation.navigate("Profile")} style={{ marginLeft: "auto", marginRight: 7 }}>
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{
                uri: "https://lh3.googleusercontent.com/-r93ozlQSrBU/AAAAAAAAAAI/AAAAAAAAAAA/AN6ncHiZIzFB68mbgh-lJS0or4gLezJ8_Q/photo.jpg?sz=46",
              }}
            />
          </Pressable>
        </View>

        {/* Search Bar */}
        <View
          style={{
            padding: 10,
            margin: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderWidth: 0.8,
            borderColor: "#C0C0C0",
            borderRadius: 7,
          }}
        >
          <TextInput placeholder="Search for items or More" />
          <Feather name="search" size={24} color="#7E57C2" />
        </View>

        {/* Image Carousel */}
        <Carousel />

        {/* Services Component */}
        <Services />

        {/* Render all the Products */}
        {product.map((item, index) => (
          <DressItem item={item} key={index} />
        ))}

      </ScrollView>

      {total === 0 ? (
        null
      ) : (
        <Pressable
          onPress={() => navigation.navigate("PickUp")}
          style={{
            backgroundColor: "#7E57C2",
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
            <Text style={{ fontSize: 16, fontWeight: "600", color: "white" }}>{cart?.length} items |   ₹ {total}</Text>
            <Text style={{ fontSize: 13, fontWeight: "400", color: "white", marginVertical: 6 }}>Extra charges might apply</Text>
          </View>

          <Text style={{ fontSize: 16, fontWeight: "600", color: "white" }}>Proceed to pickup</Text>
        </Pressable>
      )}
    </>

  )
}

export default HomeScreen

const styles = StyleSheet.create({})