"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  signUp: (email: string, password?: string) => Promise<boolean>;
  triggerGoogleLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if Supabase keys exist
  const isSupabaseConfigured =
    typeof window !== "undefined" &&
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  useEffect(() => {
    if (!isSupabaseConfigured) {
      // Fallback: Check localStorage on mount
      const authState = localStorage.getItem("fc_auth_state");
      if (authState === "true") {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
      return;
    }

    const supabase = createClient();
    
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setIsLoading(false);
    });

    // Listen to changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [isSupabaseConfigured]);

  const login = async (email: string, password?: string): Promise<boolean> => {
    setIsLoading(true);
    if (!isSupabaseConfigured) {
      // Fallback: Mock login
      await new Promise((resolve) => setTimeout(resolve, 800));
      localStorage.setItem("fc_auth_state", "true");
      setIsAuthenticated(true);
      setIsLoading(false);
      return true;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: password || "",
    });

    if (error) {
      setIsLoading(false);
      throw error;
    }

    setIsAuthenticated(true);
    setIsLoading(false);
    return true;
  };

  const signUp = async (email: string, password?: string): Promise<boolean> => {
    setIsLoading(true);
    if (!isSupabaseConfigured) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsLoading(false);
      return true;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password: password || "",
    });

    if (error) {
      setIsLoading(false);
      throw error;
    }

    setIsLoading(false);
    return true;
  };

  const triggerGoogleLogin = async () => {
    if (!isSupabaseConfigured) {
      alert("[Mock] Triggering Google OAuth flow. Redirecting to dashboard...");
      localStorage.setItem("fc_auth_state", "true");
      setIsAuthenticated(true);
      window.location.href = "/dashboard";
      return;
    }

    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  };

  const logout = async () => {
    if (!isSupabaseConfigured) {
      localStorage.removeItem("fc_auth_state");
      setIsAuthenticated(false);
      return;
    }
    const supabase = createClient();
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout, signUp, triggerGoogleLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

