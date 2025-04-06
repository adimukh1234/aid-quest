
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface AuthButtonsProps {
  openSignIn: () => void;
  openSignUp: () => void;
}

const AuthButtons = ({ openSignIn, openSignUp }: AuthButtonsProps) => {
  return (
    <div className="space-x-2 hidden md:flex">
      <Button variant="outline" onClick={openSignIn}>
        Sign In
      </Button>
      <Button onClick={openSignUp}>
        Sign Up
      </Button>
    </div>
  );
};

export default AuthButtons;
