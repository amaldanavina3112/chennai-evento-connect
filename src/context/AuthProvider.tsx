
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, User } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Check for existing session on load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const { data: userData } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          setUser(userData as User);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        toast({
          title: "Authentication Error",
          description: "Could not connect to authentication service. Please check your connection or try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
      
      // Setup auth state change listener
      try {
        const { data: { subscription } } = await supabase.auth.onAuthStateChange(async (_event, session) => {
          if (session) {
            const { data: userData } = await supabase
              .from('users')
              .select('*')
              .eq('id', session.user.id)
              .single();
              
            setUser(userData as User);
          } else {
            setUser(null);
          }
        });
        
        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Error setting up auth state listener:', error);
      }
    };
    
    checkSession();
  }, [toast]);

  // Sign in with email
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
        return { success: false, error: error.message };
      }
      
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      
      return { success: true };
    } catch (error) {
      console.error('Sign in error:', error);
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  // Sign up with email
  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        toast({
          title: "Registration Failed",
          description: error.message,
          variant: "destructive",
        });
        return { success: false, error: error.message };
      }
      
      // Create profile in the users table
      if (data.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            { 
              id: data.user.id,
              email: data.user.email,
              name: name,
            }
          ]);
          
        if (profileError) {
          console.error('Error creating user profile:', profileError);
        }
      }
      
      toast({
        title: "Registration Successful",
        description: "Your account has been created!",
      });
      
      return { success: true };
    } catch (error) {
      console.error('Sign up error:', error);
      toast({
        title: "Registration Failed",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Error",
        description: "Could not log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
