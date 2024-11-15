import { createContext, useContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import {
  addTodo,
  changeEditValue,
  completeEdit,
  getCurrentUser,
  getTodos,
  todoComplete,
} from "../../lib/appwrite";

const appContext = createContext();

export const useAppContext = () => useContext(appContext);

export default function AppContextProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
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

  const listTodos = async () => {
    setLoading(true);
    try {
      const todoDocs = await getTodos(user?.accountId);
      if (todoDocs) {
        setTodos(todoDocs);
      }
    } catch (err) {
      throw new Error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTodo = async () => {
    if (input.length < 1) {
      Alert.alert("Your todo is empty");
    }
    setLoading(true);
    try {
      await addTodo(input, user?.accountId);
      await listTodos();
      setInput("");
    } catch (err) {
      Alert.alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (id, complete) => {
    if (!id) return;
    setLoading(true);
    await todoComplete(id, complete);
    await listTodos();
    setLoading(false);
  };

  const handleEdit = async (id, complete) => {
    try {
      if (complete) {
        Alert.alert("You cannot edit completed edit!!");
        return;
      }
      await changeEditValue(id);
      await listTodos();
    } catch (err) {
      Alert.alert(err.message);
    }
  };

  const completeTodoEdit = async (id, newTodo) => {
    try {
      await completeEdit(id, newTodo);
      await listTodos();
    } catch (err) {
      Alert.alert(err.message);
    }
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
        listTodos,
        handleTodo,
        handleComplete,
        handleEdit,
        completeTodoEdit,
      }}
    >
      {children}
    </appContext.Provider>
  );
}
