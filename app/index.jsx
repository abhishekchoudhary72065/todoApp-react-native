import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import TodoComp from "../components/TodoComp";

const App = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const handleTodo = () => {
    if (input.length < 5) {
      Alert.alert("Your task is too short!");
      return;
    }
    setTodos([
      ...todos,
      { todo: input, id: Date.now(), completed: false, edit: false },
    ]);
    setInput("");
  };

  const handleCompleted = (id) => {
    if (!id) return;
    setTodos(
      todos.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      }),
    );
  };
  console.log(todos);

  const handleDelete = (id) => {
    if (!id) return;
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const {
    container,
    todoWrapper,
    emptyText,
    textStyle,
    buttonText,
    buttonStyle,
  } = styles;
  return (
    <SafeAreaView style={container}>
      <View style={todoWrapper}>
        <View
          style={{
            padding: 15,
            backgroundColor: "white",
            borderRadius: 10,
            justifyContent: "center",
            gap: 15,
            alignItems: "center",
          }}
        >
          <TextInput
            value={input}
            onChangeText={(e) => setInput(e)}
            placeholder="Enter your task"
            style={{
              width: "100%",
              padding: 10,
              borderWidth: 2,
              fontSize: 20,
              borderColor: "red",
              borderRadius: 5,
            }}
          />
          <TouchableOpacity style={buttonStyle} onPress={handleTodo}>
            <Text style={[textStyle, buttonText]}>Add Task</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={todos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TodoComp handleCompleted={handleCompleted} item={item} handleDelete={handleDelete} />
            )}
            ListEmptyComponent={() => (
              <View>
                <Text style={[textStyle, emptyText]}>
                  There are no todos, add one!!
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "purple",
  },
  todoWrapper: {
    flex: 1,
    gap: 40,
  },
  buttonStyle: {
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "purple",
    width: "100%",
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "purple",
  },
  textStyle: {
    fontWeight: "800",
    fontSize: 20,
    fontStyle: "italic",
  },
  emptyText: {
    color: "white",
  },
});

export default App;
