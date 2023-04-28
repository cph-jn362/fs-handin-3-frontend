import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, Text } from "react-native";
import LoginScreen from "../features/users/LoginScreen";
import React from "react";
import SignupScreen from "../features/users/SignupScreen";
import HomeScreen from "../screens/HomeScreen";
import ProblemScreen from "../features/problems/ProblemScreen";
import TodoScreen from "../features/todos/TodoScreen";

const Stack = createNativeStackNavigator();

export default function StackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Todo"
        component={TodoScreen}
        options={{
          title: "Booking App",
          headerTitleStyle: { fontWeight: "bold", color: "#101828" },
          headerRight: () => (
            <Pressable
              style={{
                backgroundColor: "#A5ED7B",
                borderRadius: 5,
                paddingRight: 10,
                paddingLeft: 10,
                paddingBottom: 4,
                paddingTop: 4,
              }}
            >
              <Text style={{ color: "#1A1B22", fontWeight: '500' }}>Login</Text>
            </Pressable>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
