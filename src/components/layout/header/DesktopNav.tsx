
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { NavItem } from "@/components/layout/header/types";
import { cn } from "@/lib/utils";

interface DesktopNavProps {
  navLinks: NavItem[];
}

const DesktopNav = ({ navLinks }: DesktopNavProps) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="hidden md:flex items-center space-x-6">
      {navLinks.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={cn(
            "text-sm font-medium transition-all duration-300 relative group",
            isActive(link.path) 
              ? "text-foreground" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {link.name}
          <span 
            className={cn(
              "absolute -bottom-1 left-0 h-0.5 bg-primary transform origin-left transition-all duration-300",
              isActive(link.path) 
                ? "w-full" 
                : "w-0 group-hover:w-full"
            )}
          />
        </Link>
      ))}
    </nav>
  );
};

export default DesktopNav;
