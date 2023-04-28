import {
  Text,
  SafeAreaView,
  Platform,
  View,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ margin: 20 }}>
      <Text
        style={{
          flex: 0,
          marginTop: 50,
          color: "#101828",
          fontWeight: "600",
          fontSize: 25,
        }}
      >
        Home
      </Text>
      <Text
        style={{
          flex: 0,
          marginTop: 50,
          color: "#101828",
          fontWeight: "400",
          fontSize: 25,
        }}
      >
        Shortcuts
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
