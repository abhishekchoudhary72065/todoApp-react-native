import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import TodoComp from "../../components/TodoComp";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

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

  const editTodo = (id) => {
    setTodos(
      todos.map((item) => {
        if (item.id === id) {
          return { ...item, edit: true };
        }
        return item;
      }),
    );
  };

  const handleDelete = (id) => {
    if (!id) return;
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completeUpdate = (id, updateTodo) => {
    setTodos(
      todos.map((item) => {
        if (item.id === id) {
          return { ...item, todo: updateTodo, edit: false };
        }
        return item;
      }),
    );
  };

  const renderItem = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={[styles.rowItem]}
        >
          <TodoComp
            handleCompleted={handleCompleted}
            handleEdit={editTodo}
            item={item}
            isActive={isActive}
            handleDelete={handleDelete}
            completeEdit={completeUpdate}
          />
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  const {  textStyle, buttonText, buttonStyle } = styles;
  return (
    <LinearGradient style={{ flex: 1 }} colors={["#322f49", "#20202f"]}>
      <SafeAreaView className="flex-1 p-5">
        <View className="flex-1 gap-10">
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
            <DraggableFlatList
              data={todos}
              onDragEnd={({ data }) => setTodos(data)}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
            />
          </View>
        </View>
      </SafeAreaView>
      <StatusBar
        style="light"
        backgroundColor="transparent"
        translucent={true}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
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
  rowItem: {
    flex: 1,
  },
});

export default App;
