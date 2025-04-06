
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "@/components/auth/AuthModal";
import { Loader2 } from "lucide-react";

const SignupRedirect = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);

  // Handle modal close - redirect to home page
  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex items-center justify-center mb-4">
        <Loader2 className="mr-2 h-6 w-6 animate-spin text-primary" />
        <p className="text-lg">Loading sign up...</p>
      </div>
      
      <AuthModal 
        isOpen={isModalOpen} 
        onClose={handleModalClose}
        defaultTab="sign-up"
      />
    </div>
  );
};

export default SignupRedirect;
