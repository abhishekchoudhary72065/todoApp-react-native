import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { CheckBox } from "react-native-elements";
import { AntDesign, Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";

const TodoComp = ({
  item: { todo, id, completed, edit },
  handleCompleted,
  handleDelete,
  handleEdit,
  completeEdit,
  isActive,
}) => {
  const randomValue = useSharedValue(1);
  const opacityValue = useSharedValue(1);
  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const [input, setInput] = useState(todo);

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(randomValue.value, config) }],
      opacity: withTiming(opacityValue.value, config),
    };
  });

  const todoComplete = (id) => {
    if (completed) {
      randomValue.value = 1;
      opacityValue.value = 1;
    } else {
      randomValue.value = 0.9;
      opacityValue.value = 0.8;
    }
    handleCompleted(id);
  };
  return (
    <Animated.View
      style={[
        styles.todoComp,
        style,
        { backgroundColor: isActive ? "skyblue" : "white" },
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <CheckBox
          checked={completed}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor="green"
          onPress={() => todoComplete(id)}
        />
        {edit ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              flex: 1,
              marginRight: 10,
            }}
          >
            <TextInput
              value={input}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderColor: "black",
                flex: 1,
                borderWidth: 2,
                borderRadius: 5,
              }}
              onChangeText={(e) => setInput(e)}
            />
            <TouchableOpacity onPress={() => completeEdit(id, input)}>
              <Feather name="check-circle" color="green" size={23} />
            </TouchableOpacity>
          </View>
        ) : (
          <Text
            style={{
              ...styles.todoText,
              textDecorationLine: completed ? "line-through" : "none",
            }}
          >
            {todo}
          </Text>
        )}
      </View>
      {!edit && (
        <View style={{ flexDirection: "row", alignItem: "center", gap: 14 }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleDelete(id)}
          >
            <AntDesign name="delete" size={23} color="red" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => handleEdit(id)}>
            <Feather name="edit" size={23} color="blue" />
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  todoComp: {
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
    gap: 10,
    padding: 0,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    justifyContent: "space-between",
    paddingRight: 10,
    marginBottom: 15,
    tranform: [{ scale: 1 }],
  },
  todoText: {
    fontSize: 20,
    color: "#131313",
  },
});

export default TodoComp;
