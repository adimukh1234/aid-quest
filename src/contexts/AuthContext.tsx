
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string, metadata?: Record<string, any>) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // Function to run the match algorithm for the current user
  const runMatchAlgorithm = async (userId: string) => {
    try {
      // Call the Supabase Edge Function that matches users to NGOs
      const { data, error } = await supabase.functions.invoke('match-users-ngos', {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      
      if (error) {
        console.error('Error running match algorithm:', error);
      } else {
        console.log('Match algorithm result:', data);
      }
    } catch (error) {
      console.error('Error calling match algorithm function:', error);
    }
  };

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting session:', error);
        toast({
          title: 'Authentication Error',
          description: error.message,
          variant: 'destructive',
        });
      }
      
      setSession(data.session);
      setUser(data.session?.user || null);
      
      // If user is logged in, run the match algorithm
      if (data.session?.user) {
        runMatchAlgorithm(data.session.user.id);
      }
      
      setIsLoading(false);
    };
    
    getInitialSession();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        console.log('Auth state change event:', _event);
        setSession(session);
        setUser(session?.user || null);
        setIsLoading(false);
        
        // If user just signed in, check if we need to create a profile
        if (session?.user && _event === 'SIGNED_IN') {
          // Check if profile exists
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle();
            
          if (profileError) {
            console.error('Error checking profile:', profileError);
          }
          
          // If no profile, create one
          if (!profileData) {
            const { error: insertError } = await supabase
              .from('profiles')
              .insert([{ id: session.user.id }]);
              
            if (insertError) {
              console.error('Error creating profile:', insertError);
            } else {
              // Run match algorithm for new user
              runMatchAlgorithm(session.user.id);
            }
          } else {
            // Run match algorithm for existing user on login
            runMatchAlgorithm(session.user.id);
          }
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);
  
  const signUp = async (email: string, password: string, metadata?: Record<string, any>) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: { 
          data: metadata,
          emailRedirectTo: `${window.location.origin}/auth/callback` 
        }
      });
      
      if (error) {
        console.error('Sign up error:', error);
        toast({
          title: 'Sign Up Error',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
      
      // Handle the case where email confirmation is required
      if (data.user && !data.user.confirmed_at) {
        toast({
          title: 'Sign Up Successful',
          description: 'Please check your email for verification instructions.',
        });
      } else {
        toast({
          title: 'Account Created',
          description: 'Your account has been created successfully.',
        });
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        console.error('Sign in error:', error);
        toast({
          title: 'Sign In Error',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
      
      toast({
        title: 'Welcome back!',
        description: 'You have successfully signed in.',
      });
    } catch (error) {
      console.error('Error during sign in:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const signOut = async () => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
        toast({
          title: 'Sign Out Error',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
      
      toast({
        title: 'Signed Out',
        description: 'You have been signed out successfully.',
      });
    } catch (error) {
      console.error('Error during sign out:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetPassword = async (email: string) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        console.error('Password reset error:', error);
        toast({
          title: 'Password Reset Error',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
      
      toast({
        title: 'Password Reset Email Sent',
        description: 'Check your email for password reset instructions.',
      });
    } catch (error) {
      console.error('Error during password reset:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signUp,
        signIn,
        signOut,
        resetPassword,
      }}
    >
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
