import { TodoEntity } from "./TodoEntity";
import { TodoItem } from "./TodoItem";
import { useGetTodos, usePostTodo } from "./TodoHooks";
import { View, Text, FlatList, TextInput, Pressable } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function TodoScreen(){
  const [text, setText] = useState("");
  const { isLoading, error, data } = useGetTodos();
  const queryClient = useQueryClient();
  const { mutate: createTodo } = usePostTodo();

  const handleAddTodo = () => {
    const todoEntity: TodoEntity = new TodoEntity(text, false);
    createTodo(todoEntity, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todo"] }),
    });
  };


  return (
    <View>
      <View style={{ margin: 20 }}>
        <Text
          style={{
            flex: 0,
            marginTop: 50,
            color: "#101828",
            fontWeight: "600",
            fontSize: 25,
          }}
        >
          Todo
        </Text>
        <Text style={{ marginTop: 50, color: "#101828", fontWeight: "500" }}>
          Text
        </Text>
        <TextInput
          placeholder="Add text"
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
          onChangeText={setText}
          value={text}
        />
        <Pressable
          style={{
            marginTop: 30,
            paddingTop: 15,
            paddingBottom: 15,
            backgroundColor: "#101828",
            borderRadius: 5,
          }}
          onPress={handleAddTodo}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            Add todo
          </Text>
        </Pressable>
      </View>
      <View style={{ margin: 20 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TodoItem done={item.done} text={item.text} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};
