
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import AuthModal from "@/components/auth/AuthModal";
import Logo from "@/components/layout/header/Logo";
import DesktopNav from "@/components/layout/header/DesktopNav";
import UserDropdown from "@/components/layout/header/UserDropdown";
import AuthButtons from "@/components/layout/header/AuthButtons";
import MobileMenuToggle from "@/components/layout/header/MobileMenuToggle";
import MobileMenu from "@/components/layout/header/MobileMenu";
import { NavItem } from "@/components/layout/header/types";

const Header = () => {
  const { user, signOut } = useAuth();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalDefaultTab, setAuthModalDefaultTab] = useState<'sign-in' | 'sign-up'>('sign-in');

  const navLinks: NavItem[] = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Explore", path: "/explore" },
    { name: "Feed", path: "/feed" },
    { name: "Impact", path: "/impact" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const openSignIn = () => {
    setAuthModalDefaultTab('sign-in');
    setIsAuthModalOpen(true);
    closeMenu();
  };

  const openSignUp = () => {
    setAuthModalDefaultTab('sign-up');
    setIsAuthModalOpen(true);
    closeMenu();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        
        {!isMobile && <DesktopNav navLinks={navLinks} />}
        
        <div className="flex items-center space-x-4">
          {user ? (
            <UserDropdown signOut={signOut} />
          ) : (
            <AuthButtons openSignIn={openSignIn} openSignUp={openSignUp} />
          )}
          
          {isMobile && (
            <MobileMenuToggle isOpen={isMenuOpen} toggleMenu={toggleMenu} />
          )}
        </div>
        
        {isMobile && (
          <MobileMenu
            isOpen={isMenuOpen}
            navLinks={navLinks}
            user={user}
            closeMenu={closeMenu}
            openSignIn={openSignIn}
            openSignUp={openSignUp}
            signOut={signOut}
          />
        )}
      </div>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalDefaultTab}
      />
    </header>
  );
};

export default Header;
