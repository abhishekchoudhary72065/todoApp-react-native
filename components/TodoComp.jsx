import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { CheckBox } from "react-native-elements";
import AntDesign from "@expo/vector-icons/AntDesign";
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
}) => {
  const randomValue = useSharedValue(1);
  const opacityValue = useSharedValue(1);
  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

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
      opacityValue.value = 0.9;
    }
    handleCompleted(id);
  };
  return (
    <Animated.View style={[styles.todoComp, style]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <CheckBox
          checked={completed}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor="green"
          onPress={() => todoComplete(id)}
        />
        <Text
          style={{
            ...styles.todoText,
            textDecorationLine: completed ? "line-through" : "none",
          }}
        >
          {todo}
        </Text>
      </View>
      <TouchableOpacity activeOpacity={0.8} onPress={() => handleDelete(id)}>
        <AntDesign name="delete" size={23} color="red" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  todoComp: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "white",
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
