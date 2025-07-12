import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import * as API from "../api/APICalls";

interface User {
  children: boolean;
  enrolledCourses: any;
  _id: any;
  id: string;
  email: string;
  name: string;
  role: "student" | "teacher" | "parent";
  avatar?: string;
  preferences?: {
    darkMode: boolean;
    notifications: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  login: (
    email: string,
    password: string,
    role: "student" | "teacher" | "parent"
  ) => Promise<boolean>;
  register: (
    userData: Partial<User> & { password: string }
  ) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check token and fetch user on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Handle dummy parent token
          if (token.startsWith("dummy_parent_token_")) {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
              const parsedUser = JSON.parse(storedUser);
              setUser(parsedUser);
            }
          } else {
            // Handle real tokens for students and teachers
            const res = await API.verifyToken();
            setUser(res.user);
          }
        } catch (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
        }
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (
    email: string,
    password: string,
    role: "student" | "teacher" | "parent"
  ): Promise<boolean> => {
    try {
      setLoading(true);

      // Handle parent login with dummy authentication
      if (role === "parent") {
        // Simulate parent login without backend integration
        const dummyParentUser: User = {
          id: "parent_" + Date.now(),
          _id: "parent_" + Date.now(),
          email: email,
          name: "Parent User",
          role: "parent",
          children: true,
          enrolledCourses: [],
          avatar: "",
          preferences: {
            darkMode: false,
            notifications: true,
          },
        };

        // Store dummy token and user data
        localStorage.setItem("token", "dummy_parent_token_" + Date.now());
        localStorage.setItem("user", JSON.stringify(dummyParentUser));
        setUser(dummyParentUser);
        toast.success(`Welcome back, ${dummyParentUser.name}!`);
        return true;
      }

      // Handle student and teacher login with backend
      const res = await API.login({ email, password, role });
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      setUser(res.user);
      toast.success(`Welcome back, ${res.user.name}!`);
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please check your credentials.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    userData: Partial<User> & { password: string }
  ): Promise<boolean> => {
    try {
      setLoading(true);
      // Ensure required fields are present
      if (!userData.name || !userData.email || !userData.role) {
        toast.error("Please provide name, email, and role.");
        setLoading(false);
        return false;
      }
      if (userData.role !== "student" && userData.role !== "teacher") {
        toast.error("Registration is only allowed for students and teachers.");
        setLoading(false);
        return false;
      }
      const payload = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role as "student" | "teacher",
      };
      const res = await API.register(payload);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      setUser(res.user);
      toast.success(`Account created! Welcome, ${res.user.name}!`);
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Registration failed. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      setLoading(true);
      const res = await API.updateProfile(userData);
      localStorage.setItem("user", JSON.stringify(res.user));
      setUser(res.user);
      toast.success("Profile updated");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, updateUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
