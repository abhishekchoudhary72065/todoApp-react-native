import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import TodoComp from "../../components/TodoComp";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useAppContext } from "../../components/context/Context";

const App = () => {
  const { todos, input, setTodos, setInput, handleTodo } = useAppContext();
  const renderItem = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={[styles.rowItem]}
        >
          <TodoComp item={item} isActive={isActive} />
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  const { textStyle, buttonText, buttonStyle } = styles;
  return (
    <LinearGradient style={{ flex: 1 }} colors={["#322f49", "#20202f"]}>
      <SafeAreaView className="flex-1 p-5">
        <View className="flex-1 gap-10">
          <View
            style={{
              padding: 15,
              borderRadius: 10,
              justifyContent: "center",
              gap: 15,
              alignItems: "center",
            }}
            className="bg-gray-100"
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
                borderRadius: 5,
              }}
              className="border-gray-700"
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
