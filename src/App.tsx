
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import BackgroundAnimation from "./components/three/BackgroundAnimation";
import CustomCursor from "./components/ui/custom-cursor";
import ScrollProgress from "./components/ui/scroll-progress";
import PageTransition from "./components/ui/page-transition";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import Feed from "./pages/Feed";
import NGODetail from "./pages/NGODetail";
import Impact from "./pages/Impact";
import About from "./pages/About";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";
import SignupRedirect from "./pages/SignupRedirect";

// Add Auth Callback component to handle redirects
const AuthCallback = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    // If user is signed in, go to home, otherwise to sign in
    if (user) {
      navigate('/');
    } else {
      navigate('/');
    }
  }, [user, navigate]);
  
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="ml-2">Completing authentication...</p>
    </div>
  );
};

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="h-screen w-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Enhanced Routes with smoother page transitions
const AppRoutes = () => {
  const location = useLocation();
  
  return (
    <PageTransition key={location.pathname} duration={800} className="min-h-screen">
      <Routes location={location}>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/ngos" element={<Explore />} />
        <Route path="/ngos/:id" element={<NGODetail />} />
        <Route path="/profile" element={<UserProfile />} />
        {/* Add a signup route that redirects to auth modal */}
        <Route path="/signup" element={<SignupRedirect />} />
        {/* Add auth callback route */}
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route 
          path="/impact" 
          element={
            <ProtectedRoute>
              <Impact />
            </ProtectedRoute>
          } 
        />
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageTransition>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        {/* Add our 3D background animation */}
        <BackgroundAnimation />
        {/* Add custom cursor */}
        <CustomCursor />
        {/* Add scroll progress indicator */}
        <ScrollProgress color="bg-primary" height={4} zIndex={100} position="top" />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
