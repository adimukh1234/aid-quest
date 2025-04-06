
import React from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface MobileMenuToggleProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const MobileMenuToggle = ({ isOpen, toggleMenu }: MobileMenuToggleProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleMenu}
      aria-label="Toggle Menu"
    >
      {isOpen ? (
        <X className="h-6 w-6" />
      ) : (
        <Menu className="h-6 w-6" />
      )}
    </Button>
  );
};

export default MobileMenuToggle;
