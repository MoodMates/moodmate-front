"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  age: number;
  genre: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    userData: Omit<User, "id"> & { password: string }
  ) => Promise<boolean>;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Charger l'utilisateur depuis localStorage au démarrage
  useEffect(() => {
    const storedUser = localStorage.getItem("moodmate_user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Erreur lors du chargement de l'utilisateur:", error);
        localStorage.removeItem("moodmate_user");
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Récupérer les utilisateurs enregistrés
      const users = JSON.parse(localStorage.getItem("moodmate_users") || "[]");

      // Chercher l'utilisateur
      const foundUser = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        setIsLoggedIn(true);
        localStorage.setItem(
          "moodmate_user",
          JSON.stringify(userWithoutPassword)
        );
        return true;
      }

      return false;
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      return false;
    }
  };

  const register = async (
    userData: Omit<User, "id"> & { password: string }
  ): Promise<boolean> => {
    try {
      // Récupérer les utilisateurs existants
      const users = JSON.parse(localStorage.getItem("moodmate_users") || "[]");

      // Vérifier si l'email existe déjà
      const emailExists = users.some((u: any) => u.email === userData.email);
      if (emailExists) {
        return false;
      }

      // Créer un nouvel utilisateur
      const newUser = {
        ...userData,
        id: Date.now().toString(),
      };

      // Ajouter aux utilisateurs
      users.push(newUser);
      localStorage.setItem("moodmate_users", JSON.stringify(users));

      // Connecter automatiquement l'utilisateur
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      setIsLoggedIn(true);
      localStorage.setItem(
        "moodmate_user",
        JSON.stringify(userWithoutPassword)
      );

      return true;
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("moodmate_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
