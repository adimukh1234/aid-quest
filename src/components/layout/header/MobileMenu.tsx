
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import { NavItem } from "@/components/layout/header/types";

interface MobileMenuProps {
  isOpen: boolean;
  navLinks: NavItem[];
  user: any;
  closeMenu: () => void;
  openSignIn: () => void;
  openSignUp: () => void;
  signOut: () => Promise<void>;
}

const MobileMenu = ({
  isOpen,
  navLinks,
  user,
  closeMenu,
  openSignIn,
  openSignUp,
  signOut
}: MobileMenuProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-16 left-0 right-0 bg-background border-b z-50">
      <nav className="container py-4 flex flex-col space-y-4">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`px-4 py-2 rounded-md ${
              isActive(link.path) 
                ? "bg-muted font-medium" 
                : "hover:bg-muted/50"
            }`}
            onClick={closeMenu}
          >
            {link.name}
          </Link>
        ))}
        {!user ? (
          <div className="grid grid-cols-2 gap-2 pt-2">
            <Button variant="outline" onClick={openSignIn} className="w-full">
              Sign In
            </Button>
            <Button onClick={openSignUp} className="w-full">
              Sign Up
            </Button>
          </div>
        ) : (
          <div className="space-y-2 pt-2">
            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={() => { 
                navigate('/profile'); 
                closeMenu(); 
              }}
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
            <Button 
              variant="destructive" 
              className="w-full" 
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default MobileMenu;
