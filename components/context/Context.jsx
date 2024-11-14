import { createContext, useContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import { getCurrentUser } from "../../lib/appwrite";

const appContext = createContext();

export const useAppContext = () => useContext(appContext);

export default function AppContextProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
        loading,
        user,
        setLoading,
        setUser,
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
