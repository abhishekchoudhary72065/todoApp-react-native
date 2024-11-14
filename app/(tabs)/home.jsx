import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import TodoComp from "../../components/TodoComp";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { StatusBar } from "expo-status-bar";
import { useAppContext } from "../../components/context/Context";
import GradientBackground from "../../components/GradientBackground";

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
    <GradientBackground>
      <SafeAreaView className="flex-1 p-5">
        <View className="flex-1 gap-10">
          <View
            style={{
              padding: 15,
              justifyContent: "center",
              gap: 15,
              alignItems: "center",
              borderRadius: 10,
            }}
            className="bg-orange-400"
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
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: "white",
    width: "100%",
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
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
