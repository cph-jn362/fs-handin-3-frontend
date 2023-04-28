import {
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { login, updateToken } from "./UserSlice";
import { RootState, AppDispatch } from "../../store";
import { UserEntity } from "./UserEntity";
import * as SecureStore from "expo-secure-store"

export default function LoginScreen() {
  const token: string | undefined | null = useSelector(
    (state: RootState) => state.user.token
  );
  const error: string | undefined = useSelector(
    (state: RootState) => state.user.error
  );
  const dispatch = useDispatch<AppDispatch>();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginAccount = (e: any) => {
    e.preventDefault();

    dispatch(login(new UserEntity(username, password)));
  };

  useEffect(() => {
    const asyncFunc = async () => {
      const token = await SecureStore.getItemAsync("token");
      dispatch(updateToken(token));

      console.log("token is", token);
    };
    asyncFunc();
  }, []);

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
        Login
      </Text>

      <Text style={{ marginTop: 50, color: "#101828", fontWeight: "500" }}>
        Username
      </Text>
      <TextInput
        placeholder="Enter your username"
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
        onChangeText={setUsername}
        value={username}
      />
      <Text style={{ marginTop: 20, color: "#101828", fontWeight: "500" }}>
        Password
      </Text>
      <TextInput
        placeholder="Enter your password"
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
        onChangeText={setPassword}
        value={password}
      />
      <Pressable
        style={{
          marginTop: 30,
          paddingTop: 15,
          paddingBottom: 15,
          backgroundColor: "#101828",
          borderRadius: 5,
        }}
        onPress={loginAccount}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          Log in
        </Text>
      </Pressable>
      <Text>token is {token}</Text>
      <Text>{error}</Text>
    </SafeAreaView>
  );
}
