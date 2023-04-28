import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { signup } from "./UserSlice";
import { UserEntity } from "./UserEntity";

export default function SignupScreen() {
  const error: string | undefined = useSelector((state: RootState) => state.user.error)
  const dispatch = useDispatch<AppDispatch>()
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signupAccount = (e: any) => {
    e.preventDefault();
    dispatch(signup(new UserEntity(username, password)));

  }

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
        Signup
      </Text>
      <Text
        style={{
          flex: 0,
          marginTop: 15,
          color: "#667085",
          fontWeight: "400",
          fontSize: 15,
        }}
      >
        Enter your details and create an account.
      </Text>
      <Text style={{ marginTop: 50, color: "#101828", fontWeight: "500" }}>
        Username
      </Text>
      <TextInput
        placeholder="Enter a username"
        style={{
          marginTop: 10,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 15,
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: "#D0D5DD",
          borderRadius: 5,
        }}
        value={username}
        onChangeText={setUsername}
      />
      <Text style={{ marginTop: 20, color: "#101828", fontWeight: "500" }}>
        Password
      </Text>
      <TextInput
        placeholder="Enter a password"
        style={{
          marginTop: 10,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 15,
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: "#D0D5DD",
          borderRadius: 5,
        }}
        value={password}
        onChangeText={setPassword}
      />
      <Pressable
        style={{
          marginTop: 30,
          paddingTop: 15,
          paddingBottom: 15,
          backgroundColor: "#101828",
          borderRadius: 5,
        }}
        onPress={signupAccount}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          Sign up
        </Text>
      </Pressable>
      <Text>{error}</Text>
    </SafeAreaView>
  );
}
