import { createContext, useContext, useEffect, useState } from "react";
import {
  getLocalUser,
  saveLocalUser,
  removeLocalUser,
  getAllUsers,
  saveAllUsers,
} from "../utils/localStorage";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedInUser = getLocalUser();
    if (loggedInUser) {
      setUser(loggedInUser);
    }
    setLoading(false);
  }, []);

  const signup = (userData) => {
    const existingUsers = getAllUsers();

    const userExists = existingUsers.some(
      (user) =>
        user.username === userData.username || user.email === userData.email
    );

    if (userExists) {
      throw new Error("Username or email already exists");
    }

    const updatedUsers = [...existingUsers, userData];
    saveAllUsers(updatedUsers);

    setUser(userData);
    saveLocalUser(userData);

    return userData;
  };

  const login = (credentials) => {
    const users = getAllUsers();
    const user = users.find(
      (u) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );

    if (!user) {
      throw new Error("Invalid username or password");
    }

    setUser(user);
    saveLocalUser(user);
    return user;
  };

  const logout = () => {
    setUser(null);
    removeLocalUser();
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
