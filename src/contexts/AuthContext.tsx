
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define user roles
export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

// Define user type
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  forgotPassword: async () => {},
  resetPassword: async () => {},
  isAuthenticated: false,
  isAdmin: false,
});

// Sample users for demo purposes (in a real app, this would come from a backend)
const SAMPLE_USERS = [
  {
    id: "1",
    email: "admin@skylines.com",
    password: "admin123", // In a real app, passwords would be hashed
    name: "Admin User",
    role: UserRole.ADMIN,
  },
  {
    id: "2",
    email: "user@example.com",
    password: "user123",
    name: "Regular User",
    role: UserRole.USER,
  },
];

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for logged-in user in localStorage on initial load
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
    
    // Log for debugging
    console.log("Auth initialized, user from localStorage:", savedUser ? "exists" : "null");
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    console.log("Login attempt:", { email });
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const foundUser = SAMPLE_USERS.find(
        (u) => u.email === email && u.password === password
      );

      console.log("User found:", foundUser ? "yes" : "no");

      if (foundUser) {
        const userWithoutPassword = {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
          role: foundUser.role,
        };
        setUser(userWithoutPassword);
        localStorage.setItem("user", JSON.stringify(userWithoutPassword));
        console.log("User set in state and localStorage");
        return;
      } else {
        console.log("Invalid credentials");
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Mock signup function
  const signup = async (email: string, name: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if user already exists
      if (SAMPLE_USERS.some((u) => u.email === email)) {
        throw new Error("Email already in use");
      }

      // In a real app, this would create a user in the database
      console.log("User registered:", { email, name });
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Mock logout function
  const logout = () => {
    console.log("Logging out");
    setUser(null);
    localStorage.removeItem("user");
  };

  // Mock forgot password function
  const forgotPassword = async (email: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const user = SAMPLE_USERS.find((u) => u.email === email);
      if (!user) {
        throw new Error("No account found with this email");
      }

      // In a real app, this would send an email with a reset link
      console.log("Password reset requested for:", email);
    } catch (error) {
      console.error("Forgot password error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Mock reset password function
  const resetPassword = async (token: string, newPassword: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, this would validate the token and update the password
      console.log("Password reset with token:", token);
    } catch (error) {
      console.error("Reset password error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
    isAuthenticated: !!user,
    isAdmin: user?.role === UserRole.ADMIN,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext);
