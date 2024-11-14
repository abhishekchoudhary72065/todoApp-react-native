import { createContext, useContext, useState } from "react";
import { Alert } from "react-native";

const appContext = createContext();

export const useAppContext = () => useContext(appContext);

export default function AppContextProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

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

  return (
    <appContext.Provider
      value={{
        todos,
        input,
        setTodos,
        setInput,
        handleTodo,
        handleCompleted,
        editTodo,
        handleDelete,
        completeUpdate,
      }}
    >
      {children}
    </appContext.Provider>
  );
}
